require 'sinatra'

require 'json'
require 'dalli'
require 'uri'

helpers do
    
  def get_content()
    @db_wrapper.flat_file
  end  
    
  def get_document_at(path)
      JSON.parse get_raw(path)
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