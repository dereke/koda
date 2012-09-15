#!/usr/bin/env ruby 


# This script is a backup tool for mongodb.
# 
# The main purpose is to dump files from gridfs to filesystem, 
# to take advantage of backup solutions based on tools like 
# rsync. 

# Developed against mongo 1.6.0 

# 
# The directory we want to create is 
# root_backup_dir 
#      \_____ gridfs_dump 
#               \_____ on dir per database with extracted files
#      \______ classic mongo dump 
#                   \______ one dir per database with BSON files
#

# Usage: 
#  backup.rb dump dump_path [database,database]
#  backup.rb restore dump_path [database,database]
# 

# Example: 
#   ruby backup.rb dump . my_database
#   ruby backup.rb restore . my_database
# 
#
# TODO: 
#   - A real opt parsing.
#   - Add cleanup of files which are no longer in fs.files
#
# Fabrizio Regini 17 Aug 2010

require 'rubygems'
require 'mongo'
require File.join(File.dirname(__FILE__), %w[/models/mongo_config])

include Mongo 

Username       = 'admin'
Password       = '1234abcd'
AdminDatabase  = 'admin'
UseAuth        = true
               
MongoDump      = 'mongodump'
MongoRestore   = 'mongorestore'
               
MainDir        = 'mongo_super_dump'
GridFsDumpDir  = 'gridfs_dump'
MongoDumpDir   = 'dump'
               
Command        = ARGV[0]
DumpPath       = ARGV[1] || ( File.join(File.dirname(__FILE__), MainDir ) )
WantedDbs      = ARGV[2].nil? ? nil : ARGV[2].split(',') 

FsChunksCollection = 'fs.chunks'
FsFilesCollection  = 'fs.files'

raise "Command must be 'dump' or 'restore'" unless ['dump', 'restore'].include?(Command)

def get_db()  
  MongoConfig.GetMongoDatabase()
end

def create_directory_if_not_exists(path)
  begin
    Dir.mkdir( path )
  rescue Errno::EEXIST 
    # continue
  end
end

def create_main_dir
  create_directory_if_not_exists(DumpPath)
end

def create_gridfs_dir 
  create_directory_if_not_exists(File.join(DumpPath, GridFsDumpDir))
end

def create_dump_dir 
  create_directory_if_not_exists(File.join(DumpPath, MongoDumpDir))
end

def create_gridfs_db_directory(dbname)
  create_directory_if_not_exists(gridfs_db_path(dbname))
end

def base_dump_path
  File.join(DumpPath, MongoDumpDir)
end

def dump_db_path(dbname)
  # File.join(DumpPath, MongoDumpDir, dbname)  
  File.join(DumpPath, MongoDumpDir, dbname)    
end

def gridfs_db_path(dbname)
  File.join(DumpPath, GridFsDumpDir, dbname)
end

def build_file_path(database, file_id) 
  File.join(gridfs_db_path(database), file_id.to_s)
end

def filename_from_metadata_row(row)
  filename = "#{row['_id']}-#{row['md5']}"
end

# If id and md5 match, file did not change
def dump_gridfs_file?(database, row)
  !File.exist?(File.join(gridfs_db_path(database), filename_from_metadata_row(row)))  
end

def dump 
  create_main_dir
  create_gridfs_dir
  create_dump_dir
  # Create dump directory if not exists
  db    = get_db()    
  grid  = Grid.new(db)   
  
  # ---------------------
  # Call dump without fs.chunks
  # ---------------------
  db_name = 'kodarms'
  # Strange issue with command line options, password seem to require no space after -p selector
  mongo_dump_command = "#{MongoDump} -d #{db_name} --out #{base_dump_path} "  
  db.collection_names.select {|n| n != FsChunksCollection }.each do |collection|      
    collection_dump_command = "#{mongo_dump_command} -c #{collection} "      
    puts "dumping database and collection: #{db_name}/#{collection}"
    `#{collection_dump_command}`      
  end
  # gzip all files 
  `gzip -f #{dump_db_path(db_name)}/*.bson`
  
  # ---------------------
  # Export export fs.chunks
  # ---------------------  
  
  create_gridfs_db_directory(db_name)
  puts "dumping gridfs #{db_name}/#{FsFilesCollection}. Files count: #{db.collection(FsFilesCollection).count} \n"    
  
  db.collection(FsFilesCollection).find({}, {:snapshot => true}).each do |row| 
    filename  = filename_from_metadata_row(row)
    grid_io   = grid.get(row['_id'])
    
    # Only dump file if databae source if newer than file date
    # TODO: optionize this
    # if grid_io.upload_date > file.ctime
    if dump_gridfs_file?(db_name, row)
      file = File.new(build_file_path(db_name, filename), 'w')
      STDOUT << '.' ; STDOUT.flush        
      file.write grid_io.read 
      file.close
    else 
      STDOUT << 'x' ; STDOUT.flush  
    end
    
    # ---------------------
    # Cleanup files from fs if they are no longer in the database
    # ---------------------
    Dir.new(gridfs_db_path(db_name)).each do |filename|
      next if %w(. ..).include?(filename)
      id, md5 = filename.split('-')
      if db.collection(FsFilesCollection).find({'_id' => BSON::ObjectId(id)}).count == 0
        File.unlink(build_file_path(db_name, filename))
      end
    end
    
  end
end

def restore      
  # ---------------------
  # Import mongodumps with mongorestore
  # ---------------------
  
  db_name = 'kodarms'
  db    = get_db()
  grid  = Grid.new(db)     
  
  mongo_restore_command = "#{MongoRestore} -d #{db_name} --drop #{dump_db_path(db_name)}"
  puts mongo_restore_command
  puts "importing database from path #{dump_db_path(db_name)} into database #{db_name}"
  `gunzip -f #{dump_db_path(db_name)}/*.gz`
  `#{mongo_restore_command}`  

  # ---------------------
  # Import files from filesystem back into GridFs
  # ---------------------
  
  puts "importing gridfs #{db_name}/#{FsFilesCollection}. Files count: #{db.collection(FsFilesCollection).count} \n"  
  db.collection(FsFilesCollection).find({}, {:snapshot => true}).each do |row|    
    STDOUT << '.' ; STDOUT.flush
    filename = filename_from_metadata_row(row)
    file = File.open(build_file_path(db_name, filename), 'r')      
    # TODO: assert the file is readable before to delete the record
    grid.delete(row['_id'])
    grid.put(file.read, {:_id => row['_id'], :filename => row['filename'], :content_type => row['contentType'] })
    file.close
  end
    
end

def add_admin_user_to_all_dbs
end

MainDb  = get_db()
Dbs     = MainDb.connection.database_names

add_admin_user_to_all_dbs if UseAuth

eval(Command)
