require './koda_app.rb'
set :protection, :except => [:remote_token, :frame_options, :json_csrf]
set :public_folder, File.dirname(__FILE__) + '/public'

if ENV['ENVIRONMENT']
  set :environment, ENV['ENVIRONMENT']
end
if ENV['ENABLE_CACHE']
  set :enable_cache, ENV['ENABLE_CACHE']
else
  set :enable_cache, false
end
set :janrain_api_key, "6c7c4318166d62ad9416231aedca6385e7d7978f"
set :cache, Dalli::Client.new
set :short_ttl, 400
set :long_ttl, 4600
set :sessions, true
set :session_secret, "something"

run Sinatra::Application