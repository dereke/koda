require 'sinatra'
require 'net/http'
require 'json'
require 'dalli'

helpers do
  
  def get(path)
      http = Net::HTTP.new(request.host, request.port)
      request = Net::HTTP::Get.new(path)
      response = http.request(request)
      JSON.parse(response.body)
  end
  
end