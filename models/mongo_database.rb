require File.join(File.dirname(__FILE__), %w[mongo_collection])

class MongoDatabase
  def initialize database
   @db = database
  end
  
  def resource_collection_urls 
    resource_collections.map {|e| '/' + e }	    
  end
  
  def collection_links 
    all_user_collections.map do |collection|
      {'href' => '/api/' + collection, 'rel' => 'full', 'title' => collection}
    end
  end
  
  def all_user_collections
    resource_collections.push '_koda_media'
  end
  
  def collection collection_name
    MongoCollection.new @db.collection(collection_name)
  end
  
  def resource_collections
    collections = @db.collection_names
  	collections.delete 'system.indexes'  
  	collections.delete 'system.users'  
  	collections.delete '_koda_meta'
  	collections.delete 'objectlabs-system'  
  	collections.delete 'fs.chunks'  
  	collections.delete 'fs.files'
    collections
  end
  
  def contains_collection collection_name
    resource_collections.include?(collection_name)  
  end
  
end