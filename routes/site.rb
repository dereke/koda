#
# MODIFY THESE IF YOU WANT A DIFFERENT LOGIN STRATEGY
#
get '/console' do
  if(logged_in?)
    content_type :html
    erb :'koda/console', :layout => false, :escape_html => true
  else
    session['return_url'] = '/console'
    redirect '/sign-in'
  end
end

get '/explorer' do
  if(logged_in?)
    content_type :html
    erb :'koda/explorer', :layout => false, :escape_html => true
  else
    session['return_url'] = '/explorer'
    redirect '/sign-in'
  end
end

get "/sign-in" do
  content_type :html
  erb :'koda/login', :layout => false, :escape_html => true
end

get "/not-allowed" do
  content_type :html
  erb :'koda/not_allowed', :layout => false, :escape_html => true
end

post "/signed-in" do
  if authenticate(params[:token])
    redirect session['return_url']
  else
    redirect "/sign-in"
  end
end

# ADD your own routes below

get '/' do
  content_type :html
  @title = 'Home'
  erb :index, :escape_html => true
end

get '/:page?' do
  content_type :html
  @title = params[:page]
  erb :generic, :escape_html => true
end