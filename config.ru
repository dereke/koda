require './koda_app.rb'

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
# Sign up to Janrain Engage and paste your api key here
# --------------------------------------------------------------------------
set :janrain_api_key, "6c7c4318166d62ad9416231aedca6385e7d7978f"

# --------------------------------------------------------------------------
# This is needed for janrain auth
# --------------------------------------------------------------------------
set :sessions, true

# --------------------------------------------------------------------------
# This is so shotgun keeps session vars
# --------------------------------------------------------------------------
set :session_secret, "something"

run Sinatra::Application