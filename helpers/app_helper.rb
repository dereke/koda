require 'sinatra'

helpers do
  def style_link(path)
    "<link rel=\"StyleSheet\" href=\"#{path}\" type=\"text/css\">"
  end
  
  def script_link(path)
    "<script src=\"#{path}\"></script>"
  end
end