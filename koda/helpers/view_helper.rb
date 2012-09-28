require 'json'
require 'dalli'
require 'uri'
require 'rest_client'

def show_koda(template, locals={})
  content_type :html
  options = {:layout => false}.merge(settings.view_options)
  template = template_for "koda/views/#{template}.#{settings.view_format}"
  render(settings.view_format, template, options, locals)
end

def show(template, locals={})
  content_type :html
  options = {:layout => true}.merge(settings.view_options)
  
  @content = create_content
  
  template = template_for "views/#{template}.#{settings.view_format}"
  render(settings.view_format, template, settings.view_options, locals)
end

def render_partial(template, locals={})
  template = template_for "views/#{template}.#{settings.view_format}"
  options = {:layout => false}.merge(settings.view_options)

  @content = create_content

  content_type :html
  render(settings.view_format, template, settings.view_options, locals)
end

def render_doc(doc)
  return "<p>No content has yet been added...</p>\n" if(doc == nil)
  result = "<dl id='#{doc.alias}'>\n" 
  doc.delete 'alias'

  doc.each do |k,v|
    if(v.to_s.include? '_koda_media')
      result += "<img src='#{v}' title='#{k}' \>\n"
    else
      result += "<dt>#{k}</dt><dd>#{v}</dd>\n"
    end
  end  
  
  result += "</dl>"
  result
end

def model
  @content
end

def safe(fallback='')
  begin
    return yield
  rescue
    fallback
  end
end

def create_content

  content = @db_wrapper.flat_file
  
  if(content)

    content.each do |collection|

      collection_obj = {}

      collection['docs'].each do |doc|
        k = doc['alias'].gsub(/-/,'_')
        v = doc.to_obj

        collection_obj.instance_variable_set("@#{k}", v)
        collection_obj.class.send(:define_method, k, proc{self.instance_variable_get("@#{k}")})
      end
    
      collection_obj.class.send(:define_method, "all", proc{self.instance_variables.map {|name| instance_variable_get name }})
      collection_obj.class.send(:define_method, "where", proc{|&block| self.instance_variables.map {|name| instance_variable_get name }.select{ |o| block.call o}})
      collection_obj.class.send(:define_method, "single", proc{|&block| self.instance_variables.map {|name| instance_variable_get name }.select{ |o| block.call o}.first})
      collection_obj.class.send(:define_method, "by_ref", proc{|ref| self.instance_variables.map {|name| instance_variable_get name }.select{ |o| ref.include? o.alias}.first})
    
      collection_k = collection['collection']
      collection_v = collection_obj
    
      content.instance_variable_set("@#{collection_k}", collection_v)
      content.class.send(:define_method, collection_k, proc{self.instance_variable_get("@#{collection_k}")})
    
    end  
  
    return content
  
  end
  
  {}

end

private

def template_for(path)
  return nil  unless File.exists?(path)
  File.open(path) { |f| f.read }
end