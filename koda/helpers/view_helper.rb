def show_koda(template, locals={})
  content_type :html
  options = {:layout => false}.merge(settings.view_options)
  template = template_for "koda/views/#{template}.#{settings.view_format}"
  render(settings.view_format, template, options, locals)
end

def show(template, locals={})
  content_type :html
  options = {:layout => true}.merge(settings.view_options)
  template = template_for "views/#{template}.#{settings.view_format}"
  render(settings.view_format, template, settings.view_options, locals)
end

def render_partial(template, locals={})
  template = template_for "views/#{template}.#{settings.view_format}"
  options = {:layout => false}.merge(settings.view_options)
  content_type :html
  render(settings.view_format, template, settings.view_options, locals)
end

def render_doc(doc)
  result = "<div id='#{doc._koda_ref}'>\n"
  if !(doc ==nil) 
    doc.each do |k,v|
      if(v.include? '_koda_media')
        result += "<img src='#{v}' title='#{k}' \>\n"
      else
        result += "<p data-key='#{k}'><%=#{v} %></p>\n"
      end
    end  
  else
    result += "<p>No content has yet been added...</p>\n"
  end
  
  result += "</div>"
  result
end

private

def template_for(path)
  puts path
  return nil  unless File.exists?(path)
  File.open(path) { |f| f.read }
end