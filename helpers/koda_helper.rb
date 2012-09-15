require 'sinatra'
require 'net/http'
require 'json'
require 'dalli'
require 'uri'

helpers do
    
  def get_folders()
    get_from_koda_server(request.host, request.port, '/api/')
  end
  
  def get_docs_in_folder(_koda_ref)
    get_from_koda_server(request.host, request.port, "/api/#{_koda_ref}")
  end
  
  def get_doc(_folder_koda_ref, _doc_koda_ref)
    get_from_koda_server(request.host, request.port, "/api/#{_folder_koda_ref}/#{_doc_koda_ref}")
  end
  
  def get_doc_from_url(full_url)
    uri = URI(full_url)
    get_from_koda_server(uri.host, uri.port, uri.path)
  end
  
  def get_document_at(path)
      puts path
      get_from_koda_server(request.host, request.port, path)
  end
  
  def get_from_koda_server(host, port, relative_url)
    #Implement Caching
    http = Net::HTTP.new(host, port)
    request = Net::HTTP::Get.new("#{relative_url}")
    response = http.request(request)
    puts response
    JSON.parse(response.body)
  end
  
end