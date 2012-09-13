get '/' do
  @title = "KodaCMS - Coming soon."
  @message = "KodaCMS.org - Coming soon..."
  content_type :html
  erb :index
end