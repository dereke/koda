get '/console' do
  if(logged_in?)
    content_type :html
    erb :koda_console, :layout => false, :escape_html => true
  else
    session['return_url'] = '/console'
    redirect '/sign-in'
  end
end

get '/explorer' do
  if(logged_in?)
    content_type :html
    erb :koda_explorer, :layout => false, :escape_html => true
  else
    session['return_url'] = '/explorer'
    redirect '/sign-in'
  end
end

get "/sign-in" do
  content_type :html
  erb :login, :layout => false, :escape_html => true
end

get "/not-allowed" do
  content_type :html
  erb :not_allowed, :layout => false, :escape_html => true
end

post "/signed-in" do
  if authenticate(params[:token])
    puts session['return_url']
    redirect session['return_url']
  else
    redirect "/sign-in"
  end
end

get '/' do
  content_type :html
  erb :index, :escape_html => true
end

get '/:page?' do
  content_type :html
  erb params[:page], :escape_html => true
end