
get '/' do
  content_type :html
  erb :index, :escape_html => true
end

get '/:page?' do
  content_type :html
  erb params[:page], :escape_html => true
end