#
# MODIFY THESE IF YOU WANT A DIFFERENT LOGIN STRATEGY
#
get '/console' do
  if(logged_in?)
    if(is_admin?)
      show_koda :console
    else
      redirect '/not-allowed'
    end
  else
    session['return_url'] = '/console'
    redirect '/sign-in'
  end
end

get '/explorer' do
  if(logged_in?)
    show_koda :explorer
  else
    session['return_url'] = '/explorer'
    redirect '/sign-in'
  end
end

get "/sign-in" do
  show_koda :login
end

get "/sign-out" do
  puts 'current_user'
  log_out
  puts current_user
  redirect '/'
end

get "/not-allowed" do
  show_koda :not_allowed
end

post "/signed-in" do
  if authenticate(params[:token])
    redirect session['return_url']
  else
    redirect "/sign-in"
  end
end
#
# add or modify these routes at your own discretion
#
get '/' do
  show :index
end

get '/:page?' do
  show :generic
end