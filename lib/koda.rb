require 'mongo'
require 'sinatra'
require 'json'
require 'sinatra/jsonp'
require 'rack-methodoverride-with-params'
require 'erb'
require 'net/http'
require 'rest_client'
require 'dalli'

#
#  Register all models
#
Dir[File.dirname(__FILE__) + "/models/*.rb"].each {|file| require file }

#
#  Register Routes (don't fiddle with the order)
#
require File.join(File.dirname(__FILE__), %w[/routes/koda_api.rb])
require File.join(File.dirname(__FILE__), %w[/routes/koda_site.rb])

#
#   Register other helpers and routes
#
Dir[File.dirname(__FILE__) + "/helpers/*.rb"].each {|file| require file }


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



set :protection, :except => [:remote_token, :frame_options, :json_csrf]
set :public_folder, File.dirname(__FILE__) + '/public'

# --------------------------------------------------------------------------
# Sinatra View Options (don't modify)
# --------------------------------------------------------------------------
set :view_format, :erb
set :view_options, { :escape_html => true }

# --------------------------------------------------------------------------
# This is a workaround for Cedar apps where production ENV var not being set
# Please create an environment var on Heroku and set it to production
# --------------------------------------------------------------------------
if ENV['ENVIRONMENT']
  set :environment, ENV['ENVIRONMENT']
end

# --------------------------------------------------------------------------
# Cache documents until they are changed (recommended for production)
# To Use, set this env var to true
# --------------------------------------------------------------------------
if ENV['ENABLE_CACHE']
  set :enable_cache, ENV['ENABLE_CACHE']
else
  set :enable_cache, false
end

# --------------------------------------------------------------------------
# Sign up to Janrain Engage and paste your api key here
# --------------------------------------------------------------------------
set :janrain_api_key, "6c7c4318166d62ad9416231aedca6385e7d7978f"

# --------------------------------------------------------------------------
# Dalli (memcache) settings
# --------------------------------------------------------------------------
set :cache, Dalli::Client.new
set :short_ttl, 400
set :long_ttl, 4600

# --------------------------------------------------------------------------
# This is needed for janrain auth
# --------------------------------------------------------------------------
set :sessions, true

# --------------------------------------------------------------------------
# This is so shotgun keeps session vars
# --------------------------------------------------------------------------
set :session_secret, "something"