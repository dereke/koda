get '/console' do
  content_type :html
  File.new('public/koda/console.html').readlines
end

get '/explorer' do
  content_type :html
  File.new('public/koda/explorer.html').readlines
end

get '/' do
  content_type :html
  erb :index
end

get '/:page?' do
  content_type :html
  erb params[:page]
end