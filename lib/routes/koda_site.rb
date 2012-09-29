#
# MODIFY THESE IF YOU WANT A DIFFERENT LOGIN STRATEGY
#
get '/console' do
  if(logged_in?)
    if(is_allowed_in_console?)
      show_koda :console
    else
     redirect  "/access-denied-console"
    end
  else
    session['return_url'] = '/console'
    redirect '/sign-in'
  end
end

get '/explorer' do
  if(logged_in?)
    if(is_allowed_in_explorer?)
      show_koda :explorer
    else
      redirect "/access-denied-explorer"
    end
  else
    session['return_url'] = '/explorer'
    redirect '/sign-in'
  end
end

get "/sign-in" do
  show_koda :login
end

get "/sign-out" do
  log_out
  redirect '/'
end

get "/access-denied-console" do
  @title = "Access denied"
  @message = 'You need to be an administrator to access the console.'
  show_koda :not_allowed
end

get "/access-denied-explorer" do
  @title = "Access denied"
  @message = 'If you have just registered, you will be able to gain access as soon as an administrator approves you.'
  show_koda :not_allowed
end

post "/signed-in" do
  if @uap.authenticate(params[:token])
    redirect session['return_url']
  else
    redirect "/sign-in"
  end
end