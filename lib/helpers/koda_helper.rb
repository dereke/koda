require 'sinatra'

require 'json'
require 'dalli'
require 'uri'
require 'net/https'

helpers do
    
  def fetch_linked_docs doc
    if(doc)

      koda_doc_links = doc['_koda_doc_links']
      if(doc && koda_doc_links && koda_doc_links != '')
  
        doc_links = koda_doc_links.split(',')
        doc['includes'] = []

        doc_links.each do |doc_link|
          begin
            if(doc_link.include? 'http')
              doc_to_include = JSON.parse(get_raw_from_external URI(doc_link))
            else
              if(doc_link.include? '/search/')
                doc_to_include = JSON.parse(get_raw "#{doc_link}")
              else
                doc_to_include = JSON.parse(get_raw "#{doc_link}?include=false")
              end
            end
            rescue Exception => e  
              doc_to_include = {'failed' => e.message}
            end

          key = doc.stripped_document.select{|k,v| v==doc_link}.map{|k,v| k}.first()
          
          if(doc_to_include)
            linked_doc_item = {
              'ref' => key,
              'document' => doc_to_include
            }
            doc['includes'].push linked_doc_item
          end
        end

      end

    end
  end
  
  def current_user 
    UserContext.current_user
  end
  
  def logged_in?
    @uap.logged_in?
  end
  
  def is_admin?
    @uap.is_admin?
  end
  
  def is_allowed?(action, collection_name)
    @uap.is_allowed? action, collection_name
  end
  
  def is_public_read? collection_name
    @uap.is_public_read? collection_name
  end
  
  def log_out
    @uap.log_out
  end
  
  def is_allowed_in_console?
    @uap.is_allowed_in_console?
  end
  
  def is_allowed_in_explorer?
    @uap.is_allowed_in_explorer?
  end
  
  def sign_in_return_url
    if settings.environment == :development
      "#{request.host}:#{request.port}"
    else
      "#{request.host}"
    end
  end
  
  def get_raw(url)     
      http = Net::HTTP.new(request.host, request.port)
      request = Net::HTTP::Get.new(url)
      response = http.request(request)
      response.body
  end
  
  def get_raw_from_external(uri)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true if uri.to_s.include? 'https'
      request = Net::HTTP::Get.new("#{uri.path}?#{uri.query}")
      response = http.request(request)
      response.body
  end
  
end