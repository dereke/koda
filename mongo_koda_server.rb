require 'mongo'
require 'sinatra'
require 'json'
require 'sinatra/jsonp'
require 'rack-methodoverride-with-params'
require File.join(File.dirname(__FILE__), %w[mongo_document])
require File.join(File.dirname(__FILE__), %w[mongo_database])
require File.join(File.dirname(__FILE__), %w[mongo_collection])
require File.join(File.dirname(__FILE__), %w[mongo_media])
require File.join(File.dirname(__FILE__), %w[mongo_grid])

class MongoJamSpoon 

use Rack::MethodOverrideWithParams

set :public, File.dirname(__FILE__) + '/public'

configure do
  class << Sinatra::Base
    def options(path, opts={}, &block)
      route 'OPTIONS', path, opts, &block
    end
  end
  Sinatra::Delegator.delegate :options
end

before do
  content_type :json
  response['Access-Control-Allow-Origin'] = '*'
  response['Access-Control-Allow-Methods'] = 'PUT, DELETE, GET, POST, HEADER, OPTIONS'
  response['Access-Control-Allow-Headers'] = 'content-type'
  
  if (@env['HTTP_CACHE_CONTROL'] == 'no-cache')
    response['Cache-Control'] = 'no-cache'
    response['Pragma'] = 'no-cache'
    expires = -1
  end
  
  db = MongoJamSpoon::GetMongoDatabase()
  @db_wrapper = MongoDatabase.new db
  @grid_wrapper = MongoGrid.new(MongoJamSpoon::GetGridFS(), @db_wrapper.collection('_koda_meta'))
end

def self.GetGridFS
  db = MongoJamSpoon::GetMongoDatabase()
  Mongo::Grid.new db
end

def self.GetMongoDatabase 
  config = {:server => "localhost",:db => "kodarms"}

  if ENV['MONGOLAB_URI']
	  uri = URI.parse(ENV['MONGOLAB_URI'])
    conn = Mongo::Connection.from_uri(ENV['MONGOLAB_URI'])
    conn.db(uri.path.gsub(/^\//, ''))
  else
	  Mongo::Connection.new(config[:server],config[:port] || 27017).db(config[:db])
	end
end  

get '/console' do
  content_type :html
  File.new('public/console.html').readlines
end

get '/explorer' do
  content_type :html
  File.new('public/explorer.html').readlines
end

get '/' do
  content_type :json, 'jammeta' => 'list'
  JSONP @db_wrapper.collection_links
end

put '/' do
  status 405
  response['Allow'] = 'GET'
end

post '/' do
  response['Allow'] = 'GET'
  status 405
end

delete '/' do
  response['Allow'] = 'GET'
  status 405
end

options '/' do
  response['Allow'] = 'GET'
end

get '/_koda_media/?' do
  content_type :json, 'jammeta' => 'list'
  media = @grid_wrapper.media_links.to_json
end

put '/' do
  status 405
  response['Allow'] = 'GET,POST'
end

post '/_koda_media/?' do  
    
  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media media
  
  new_location = '/_koda_media/' + file_name
  response['Location'] = new_location
  status 201
  body new_location
end

delete '/_koda_media/?' do
  response['Allow'] = 'GET,POST'
  status 405
end

options '/_koda_media/?' do
  response['Allow'] = 'GET,POST'
end

get '/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]
    
  if (media == nil)
    halt 404
  end
  
  last_modified(media.last_updated)  
    
  content_type media.content_type
  body media.body  
end

put '/_koda_media/:filename?' do
  
  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media(media, params[:filename])
  
  new_location = '/_koda_media/' + file_name
  response['Location'] = new_location
  status 201
  body new_location
end

post '/_koda_media/:filename?' do
  response['Allow'] = 'GET,PUT,DELETE'
  status 405
end

delete '/_koda_media/:filename?' do
  @grid_wrapper.delete_media(params[:filename])
end

options '/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]
    
  if (media == nil)
    response['Allow'] = 'PUT'
    return
  end
  
  response['Allow'] = 'GET,PUT,DELETE'
end

get '/:collection/?' do
  content_type :json, 'jammeta' => 'list'
  collection_name = params[:collection]
  
  halt 404 if not @db_wrapper.contains_collection(collection_name)  
    
  search_query = params[:q]

  if(params[:sort] != nil)
    sort_hash = JSON.parse params[:sort]
  end
  
  if (search_query != nil)
    search_hash = JSON.parse search_query    
    JSONP @db_wrapper.collection(collection_name).query(search_hash, params[:take], params[:skip], sort_hash)
  else    
    JSONP @db_wrapper.collection(collection_name).resource_links(params[:take], params[:skip], sort_hash)
  end
end

post '/:collection/?' do
    collection_name = params[:collection]
    hash = JSON.parse request.env["rack.input"].read
    
    new_doc = @db_wrapper.collection(collection_name).save_document(hash)
        
    response['Location'] = new_doc.url
    status 201
    body new_doc.url
end

put '/:collection/?' do
  status 405
  response['Allow'] = 'GET,POST,DELETE'
end  

delete '/:collection/?' do
  @db_wrapper.collection(params[:collection]).delete()
end

options '/:collection/?' do
  halt 404 if not @db_wrapper.contains_collection(params[:collection])  
  response['Allow'] = 'GET,POST,DELETE'
end

get '/:collection/:resource' do
  collection_name = params[:collection]
  doc_ref = params[:resource]
    
  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
  
  halt 404 if doc==nil
  
  last_modified(doc.last_modified)  
  JSONP doc.standardised_document
end

post '/:collection/:resource' do
  status 405
end

put '/:collection/:resource' do
  collection_name=params[:collection]
  resource_name = params[:resource]
  hash = JSON.parse request.env["rack.input"].read
    
  doc = @db_wrapper.collection(collection_name).save_document(hash, resource_name)  
  status 201 if doc.is_new
  
  response['Location'] = doc.url
  body doc.url
end

delete '/:collection/:resource' do
  @db_wrapper.collection(params[:collection]).delete_document(params[:resource])  
end

options '/:collection/:resource' do
  collection_name = params[:collection]
  doc_ref = params[:resource]
  
  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
    
  if (doc==nil)
    response['Allow'] = 'PUT'
    return
  end
  
  response['Allow'] = 'GET,PUT,DELETE'
end

options '*' do
end

end

