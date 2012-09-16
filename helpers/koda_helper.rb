require 'sinatra'

require 'json'
require 'dalli'
require 'uri'

helpers do
    
  def get_all_content()
    @db_wrapper.flat_file
  end
  
  def get_documents(collection_name, skip=nil, take=nil)
    @db_wrapper.collection(collection_name).resource_links(take, skip, nil)
  end
  
  def get_document(collection_name, doc_ref)
    @db_wrapper.collection(collection_name).find_document(doc_ref)
  end
  
  def get_filtered(collection_name, filter_name)
    JSON.parse get_raw("/api/#{collection_Name}/filtered/#{index_name}")
  end
  
  def get_raw(url)
    http = Net::HTTP.new(request.host, request.port)
    request = Net::HTTP::Get.new(url)
    response = http.request(request)
    response.body
  end
  
  def get_raw_from_external(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.path)
    response = http.request(request)
    response.body
  end
  
end