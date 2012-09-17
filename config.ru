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
set :cache, Dalli::Client.new
set :short_ttl, 400
set :long_ttl, 4600
set :sessions, true
set :session_secret, "something"

run Sinatra::Application