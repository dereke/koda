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
      documents.push document(collection_name, doc_ref._koda_ref)
    end
    
    documents
  end
  
  def document(collection_name, doc_ref)

    doc = get_document_from_cache collection_name, doc_ref
    
    if(doc)
      doc.content
    else
      nil
    end
  end
  
  def filtered(collection_name, filter_name)
    result = JSON.parse get_raw("/api/#{collection_name}/filtered/#{filter_name}")
    documents = []
    result.each do |doc_ref|      
       documents.push document(collection_name, doc_ref._koda_ref)
    end

    documents
  end
  
  def search(search_hash)
    result = @db_wrapper.search search_hash
    documents = []
    result.each do |collection, doc_refs|   
        doc_refs.each do |doc_ref|
          documents.push document(collection, doc_ref._koda_ref)
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
    
  def logged_in?
    if(settings.environment == :test)
      true
    else
      current_user != nil
    end
  end

  def current_user
      session['koda_user']
  end
  
  def sign_in_return_url
    if settings.environment == :development
      "#{request.host}:#{request.port}"
    else
      "#{request.host}"
    end
  end
  
  def show_document_help(collection, doc_name, doc)
     result = "<% doc = document('#{collection}','#{doc_name}') %>\n"
     doc.each do |k,v|
       if v.kind_of? Hash
         show_document_help(doc)
       end
       result += "<p><%=doc.#{k} %></p>\n"
     end
     return result
  end
  
  private
  
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
  
  def refresh_cache(collection_name, doc_ref, doc)
    key = "#{collection_name}_#{doc_ref}"
    
    if(settings.enable_cache)
      settings.cache.delete key
      settings.cache.set(key, doc, ttl=time_to_live+rand(100))
    end
  end
  
  def authenticate(token)

    response = JSON.parse(
      RestClient.post("https://rpxnow.com/api/v2/auth_info",
        :token => token,
        :apiKey => "6c7c4318166d62ad9416231aedca6385e7d7978f",
        :format => "json",
        :extended => "true"
      )
    )

    if response["stat"] == "ok"
      id = response["profile"]["googleUserId"]
      name = response["profile"]["displayName"]
      ref = name.gsub(/\s+/, "-").downcase 
      existing_user = search({ 'googleid' => id }).first()
      
      if(existing_user)
        if(existing_user.isadmin)
          session['koda_user']  = existing_user
        else
          redirect '/not-allowed'
        end
      else
        is_admin = documents('users').length == 0
        user = { 
          '_koda_ref'=> ref, 
          'googleid' => id,
          'name' => name, 
          'email' => response["profile"]["email"], 
          '_koda_indexes' => 'name,email', 
          '_koda_type' => '/koda/koda-types/koda-user.js',
          '_koda_editor' => '/koda/koda-editors/generic-editor.html',
          'isadmin' => is_admin
        }
        new_user = @db_wrapper.collection('users').save_document(user)
        if(is_admin)
          session['koda_user']  = user
        else
          redirect '/not-allowed'
        end
      end
      
      return true
    end

    return false
  
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