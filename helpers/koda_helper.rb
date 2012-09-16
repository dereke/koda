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
      documents.push document(collection_name, doc_ref.title)
    end
    
    documents
  end
  
  def document(collection_name, doc_ref)
    doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
    doc.content
  end
  
  def filtered(collection_name, filter_name)
    result = JSON.parse get_raw("/api/#{collection_name}/filtered/#{filter_name}")
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
  
  private
  
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