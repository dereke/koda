require 'mongo'
require 'sinatra'
require 'json'
require 'sinatra/jsonp'
require 'rack-methodoverride-with-params'
require 'erb'
require 'net/http'
require 'rest_client'
require 'dalli'
require 'memcachier'

#
#  Register all models
#
Dir[File.dirname(__FILE__) + "/koda/models/*.rb"].each {|file| require file }

# 
#  Register Routes (don't fiddle with the order)
# 
require File.join(File.dirname(__FILE__), %w[/koda/routes/koda_api.rb])
require File.join(File.dirname(__FILE__), %w[/koda/routes/koda_site.rb])
require File.join(File.dirname(__FILE__), %w[/routes/site.rb])


#
#   Register other helpers and routes
#
Dir[File.dirname(__FILE__) + "/koda/helpers/*.rb"].each {|file| require file }
Dir[File.dirname(__FILE__) + "/helpers/*.rb"].each {|file| require file }
Dir[File.dirname(__FILE__) + "/routes/*.rb"].each {|file| require file }


#
#   Main Sinatra Application Class
#
class KodaApp 

use Rack::MethodOverrideWithParams

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
  
  #
  #  If you need to add database configuration other than local or mongolab
  #  Edit the MongoConfig class
  #
  db = MongoConfig::GetMongoDatabase()
  @db_wrapper = MongoDatabase.new db
  @grid_wrapper = MongoGrid.new(MongoConfig::GetGridFS(), @db_wrapper.collection('_koda_meta'))
  
  #
  #   Initialise the Usercontext and set the default UserAccessProvider
  #
  UserContext.user_bag = session
  @uap = UserAccessProvider.new(@db_wrapper)

end

end

