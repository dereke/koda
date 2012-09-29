require 'sinatra'

require 'json'
require 'dalli'
require 'uri'
require 'net/https'

helpers do
    
  def all()
    @db_wrapper.flat_file.to_obj
  end
  
  def documents(collection_name, skip=nil, take=nil)
    documents = []
    @db_wrapper.collection(collection_name).resource_links(take, skip, nil).each do |doc_ref|
      documents.push document(collection_name, doc_ref.alias)
    end
    
    documents
  end
  
  def has_document?(collection_name, doc_ref)
    document(collection_name, doc_ref) != nil
  end
  
  def document(collection_name, doc_ref)
    doc = get_document_from_cache collection_name, doc_ref
    return doc.stripped_document if doc
    nil
  end
  
  def filtered(collection_name, filter_name)
    result = JSON.parse get_raw("/content/#{collection_name}/filtered/#{filter_name}")
    documents = []
    result.each do |doc_ref|      
       documents.push document(collection_name, doc_ref.title)
    end

    documents
  end
  
  def search(search_hash)
    result = @db_wrapper.search search_hash
    documents = []
    result.each do |collection, doc_refs|   
        doc_refs.each do |doc_ref|
          documents.push document(collection, doc_ref.title)
        end
    end
    
    documents
  end
  
  def fetch_linked_docs doc
    if(doc)

      koda_doc_links = doc['_koda_doc_links']
      if(doc && koda_doc_links && koda_doc_links != '')
  
        doc_links = koda_doc_links.split(',')
        doc['linked_documents'] = []

        doc_links.each do |doc_link|
          if(doc_link.include? 'http')
            doc_to_include = JSON.parse(get_raw_from_external URI(doc_link))
          else
            doc_to_include = JSON.parse(get_raw "#{doc_link}?include=false")
          end
          if(doc_to_include)
            linked_doc_item = {
              '_koda_doc_link' => doc_link,
              'document' => doc_to_include
            }
            doc['linked_documents'].push linked_doc_item
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
  
  def refresh_doc_from_cache(collection_name, doc_ref, doc)
    key = "#{collection_name}_#{doc_ref}"
    
    if(settings.enable_cache)
      settings.cache.delete key
      settings.cache.set(key, doc, ttl=time_to_live+rand(100))
    end
  end
  
  def get_document_from_cache(collection_name, doc_ref, time_to_live=settings.long_ttl)

    key = "#{collection_name}_#{doc_ref}"

    if(!settings.enable_cache)
      doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
      fetch_linked_docs doc
      return doc
    end
    
    if(settings.cache.get(key) == nil)
      doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
      fetch_linked_docs doc
      settings.cache.set(key, doc, ttl=time_to_live+rand(100))
    end

    return settings.cache.get(key)

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