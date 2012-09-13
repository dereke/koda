require 'sinatra'

helpers do
  def style_link(path)
    "<link rel=\"StyleSheet\" href=\"#{path}\" type=\"text/css\">"
  end
end