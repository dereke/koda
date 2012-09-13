require 'mongo'
require 'sinatra'
require 'json'
require 'sinatra/jsonp'
require 'rack-methodoverride-with-params'
require 'erb'
require 'dalli'

set :cache, Dalli::Client.new
set :enable_cache, true
set :short_ttl, 400
set :long_ttl, 4600

Dir[File.dirname(__FILE__) + "/models/*.rb"].each {|file| require file }
Dir[File.dirname(__FILE__) + "/helpers/*.rb"].each {|file| require file }

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

get '/' do
  @message = "KodaCms.org - Coming soon..."
  content_type :html
  erb :index
end

get '/console' do
  content_type :html
  File.new('public/koda/console.html').readlines
end

get '/explorer' do
  content_type :html
  File.new('public/koda/explorer.html').readlines
end

get '/koda/koda-types/*' do 
  response['Allow'] = 'GET'
end

get '/api' do
  content_type :json, 'jammeta' => 'list'
  JSONP @db_wrapper.collection_links
end

get '/api/' do
  content_type :json, 'jammeta' => 'list'
  JSONP @db_wrapper.collection_links
end

put '/api' do
  status 405
  response['Allow'] = 'GET'
end

post '/api' do
  response['Allow'] = 'GET'
  status 405
end

delete '/api' do
  response['Allow'] = 'GET'
  status 405
end

options '/api' do
  response['Allow'] = 'GET'
end

get '/api/_koda_media/?' do
  content_type :json, 'jammeta' => 'list'
  media = @grid_wrapper.media_links.to_json
end

put '/api' do
  status 405
  response['Allow'] = 'GET,POST'
end

post '/api/_koda_media/?' do  
    
  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media media
  
  new_location = '/api/_koda_media/' + file_name
  response['Location'] = new_location
  status 200
  result = {
    'success' => 'true',
    'location' => new_location,
  }
  body result.to_json
  
end

delete '/api/_koda_media/?' do
  response['Allow'] = 'GET,POST'
  status 405
end

options '/api/_koda_media/?' do
  response['Allow'] = 'GET,POST'
end

get '/api/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]
    
  if (media == nil)
    halt 404
  end
  
  last_modified(media.last_updated)  
  
  content_type media.content_type
  body media.body  
end

put '/api/_koda_media/:filename?' do
  
  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media(media, params[:filename])
  
  new_location = '/api/_koda_media/' + file_name
  response['Location'] = new_location
  status 200
  result = {
    'success' => 'true',
    'location' => new_location,
  }
  body result.to_json
  
end

post '/api/_koda_media/:filename?' do
  response['Allow'] = 'GET,PUT,DELETE'
  status 405
end

delete '/api/_koda_media/:filename?' do
  @grid_wrapper.delete_media(params[:filename])
end

options '/api/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]
    
  if (media == nil)
    response['Allow'] = 'PUT'
    return
  end
  
  response['Allow'] = 'GET,PUT,DELETE'
end

get '/api/:collection/?' do
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

post '/api/:collection/?' do
    collection_name = params[:collection]
    hash = JSON.parse request.env["rack.input"].read
    
    new_doc = @db_wrapper.collection(collection_name).save_document(hash)
        
    response['Location'] = new_doc.url
    status 201
    result = {
      'success' => 'true',
      'location' => new_doc.url
    }
    body new_doc.url
end

put '/api/:collection/?' do
  status 405
  response['Allow'] = 'GET,POST,DELETE'
end  

delete '/api/:collection/?' do
  @db_wrapper.collection(params[:collection]).delete()
end

options '/api/:collection/?' do
  halt 404 if not @db_wrapper.contains_collection(params[:collection])  
  response['Allow'] = 'GET,POST,DELETE'
end

get '/api/:collection/:resource' do
  collection_name = params[:collection]
  doc_ref = params[:resource]
    
  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
  
  halt 404 if doc==nil
  
  last_modified(doc.last_modified)  
  JSONP doc.standardised_document
end

post '/api/:collection/:resource' do
  status 405
end

put '/api/:collection/:resource' do
  collection_name=params[:collection]
  resource_name = params[:resource]
  hash = JSON.parse request.env["rack.input"].read
    
  doc = @db_wrapper.collection(collection_name).save_document(hash, resource_name)  
  status 201 if doc.is_new
  
  response['Location'] = doc.url
  body doc.url
end

delete '/api/:collection/:resource' do
  @db_wrapper.collection(params[:collection]).delete_document(params[:resource])  
end

options '/api/:collection/:resource' do
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

