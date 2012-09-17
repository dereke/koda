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

get '/' do
  content_type :html
  @current_page = search({'tags'=>'/home/'}).first()
  erb :index, :escape_html => true
end

get '/:page?' do
  content_type :html
  @current_page = document('pages', params[:page])
  if(@current_page)
    erb :generic, :escape_html => true
  else
    redirect '/'
  end
end