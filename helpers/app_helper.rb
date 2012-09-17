require 'sinatra'

helpers do
  def style_link(path)
    "<link rel=\"StyleSheet\" href=\"#{path}\" type=\"text/css\">"
  end
  
  def script_link(path)
    "<script src=\"#{path}\"></script>"
  end
  
  def title
    if @current_page
      @current_page.name
    else
      'A fresh new start'
    end
  end
  
  def is_current ref
    if(@current_page._koda_ref.include? ref)
      'class="current"'
    else
      ''
    end
  end
  
  def is_current_page page
    if(@current_page._koda_ref.include? page._koda_ref)
      'class="current"'
    else
      ''
    end
  end
  
  def url page
    URI("/#{page._koda_ref}")
  end
end