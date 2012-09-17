require 'mongo'
require 'sinatra'
require 'json'
require 'sinatra/jsonp'
require 'rack-methodoverride-with-params'
require 'erb'
require 'net/http'
require 'rest_client'
require 'dalli'

Dir[File.dirname(__FILE__) + "/models/*.rb"].each {|file| require file }
Dir[File.dirname(__FILE__) + "/helpers/*.rb"].each {|file| require file }
Dir[File.dirname(__FILE__) + "/routes/*.rb"].each {|file| require file }

class KodaApp 

use Rack::MethodOverrideWithParams

set :public, File.dirname(__FILE__) + '/public'
if ENV['ENVIRONMENT']
  set :environment, ENV['ENVIRONMENT']
end
if ENV['ENABLE_CACHE']
  set :enable_cache, ENV['ENABLE_CACHE']
else
  set :enable_cache, false
end
set :cache, Dalli::Client.new
set :short_ttl, 400
set :long_ttl, 4600
set :sessions, true
set :session_secret, "something"

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
  
  db = MongoConfig::GetMongoDatabase()
  @db_wrapper = MongoDatabase.new db
  @grid_wrapper = MongoGrid.new(MongoConfig::GetGridFS(), @db_wrapper.collection('_koda_meta'))
end

end

