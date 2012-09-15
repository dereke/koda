get '/koda/koda-types/*' do 
  response['Allow'] = 'GET'
end

get '/api' do
  content_type :json, 'kodameta' => 'list'
  JSONP @db_wrapper.collection_links
end

get '/api/' do
  content_type :json, 'kodameta' => 'list'
  JSONP @db_wrapper.collection_links
end

put '/api' do
  status 405
  response['Allow'] = 'GET'
end

post '/api' do
  response['Allow'] = 'GET'
  status 405
end

delete '/api' do
  response['Allow'] = 'GET'
  status 405
end

options '/api' do
  response['Allow'] = 'GET'
end

get '/api/_koda_media/?' do
  content_type :json, 'kodameta' => 'list'
  media = @grid_wrapper.media_links.to_json
end

put '/api' do
  status 405
  response['Allow'] = 'GET,POST'
end

get '/api/flattened/?' do
  JSONP @db_wrapper.flat_file
end

post '/api/_koda_media/?' do  

  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media media

  new_location = '/api/_koda_media/' + file_name
  response['Location'] = new_location
  status 200
  result = {
    'success' => 'true',
    'location' => new_location,
  }
  body result.to_json

end

delete '/api/_koda_media/?' do
  response['Allow'] = 'GET,POST'
  status 405
end

options '/api/_koda_media/?' do
  response['Allow'] = 'GET,POST'
end

get '/api/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]

  if (media == nil)
    halt 404
  end

  last_modified(media.last_updated)  

  content_type media.content_type
  body media.body  
end

put '/api/_koda_media/:filename?' do

  media = MongoMedia.new request, params
  file_name = @grid_wrapper.save_media(media, params[:filename])

  new_location = '/api/_koda_media/' + file_name

  response['Location'] = new_location
  status 200
  result = {
    'success' => 'true',
    'location' => new_location,
  }
  body result.to_json

end

post '/api/_koda_media/:filename?' do
  response['Allow'] = 'GET,PUT,DELETE'
  status 405
end

delete '/api/_koda_media/:filename?' do
  @grid_wrapper.delete_media(params[:filename])
end

options '/api/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]

  if (media == nil)
    response['Allow'] = 'PUT'
    return
  end

  response['Allow'] = 'GET,PUT,DELETE'
end

get '/api/:collection/indexed/:query/?' do
  query = params[:query]
  content_type :json, 'kodameta' => 'list'
  collection_name = params[:collection]

  halt 404 if not @db_wrapper.contains_collection(collection_name)  

  response = get_raw "/koda/koda-indexes/#{query}.js"
  search_hash = JSON.parse response

  if(search_hash["sort"] != nil)
    sort_hash = search_hash["sort"]
  end
  
  search_hash["query"].each do |k,v|
    if(v.include? '/')
      search_hash["query"][k] = eval v
      search_hash["query"][k]
    end
  end
  
  JSONP @db_wrapper.collection(collection_name).query(search_hash["query"], params[:take], params[:skip], sort_hash)
end

get '/api/:collection/?' do
  content_type :json, 'kodameta' => 'list'
  collection_name = params[:collection]

  halt 404 if not @db_wrapper.contains_collection(collection_name)  

  JSONP @db_wrapper.collection(collection_name).resource_links(params[:take], params[:skip], nil)
end

post '/api/:collection/?' do
    collection_name = params[:collection]
    raw_doc = request.env["rack.input"].read
    hash = JSON.parse raw_doc
    new_doc = @db_wrapper.collection(collection_name).save_document(hash)
    
    if(hash['linked_documents'] != nil)
      hash.delete 'linked_documents'
    end
    
    response['Location'] = new_doc.url
    status 201
    result = {
      'success' => 'true',
      'location' => new_doc.url
    }
    body new_doc.url
end

put '/api/:collection/?' do
  status 405
  response['Allow'] = 'GET,POST,DELETE'
end  

delete '/api/:collection/?' do
  @db_wrapper.collection(params[:collection]).delete()
end

options '/api/:collection/?' do
  halt 404 if not @db_wrapper.contains_collection(params[:collection])  
  response['Allow'] = 'GET,POST,DELETE'
end

get '/api/:collection/:resource?' do
  collection_name = params[:collection]
  doc_ref = params[:resource]
  should_include = params[:include] == nil || params[:include] == 'true'

  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
  if(doc)
    
    koda_doc_links = doc['_koda_doc_links']
    if(should_include && doc && koda_doc_links && koda_doc_links != '')
      doc_links = koda_doc_links.split(',')
      doc['linked_documents'] = []
      
      doc_links.each do |doc_link|
        doc_to_include = JSON.parse(get_raw "#{doc_link}?include=false")
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

  halt 404 if doc==nil

  last_modified(doc.last_modified)  
  JSONP doc.standardised_document
end

post '/api/:collection/:resource' do
  status 405
end

put '/api/:collection/:resource' do
  collection_name=params[:collection]
  resource_name = params[:resource]
  hash = JSON.parse request.env["rack.input"].read
  
  if(hash['linked_documents'] != nil)
    hash.delete 'linked_documents'
  end

  doc = @db_wrapper.collection(collection_name).save_document(hash, resource_name)  
  status 201 if doc.is_new

  response['Location'] = doc.url

  body doc.url
end

delete '/api/:collection/:resource' do
  @db_wrapper.collection(params[:collection]).delete_document(params[:resource])  
end

options '/api/:collection/:resource' do
  collection_name = params[:collection]
  doc_ref = params[:resource]

  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)

  if (doc==nil)
    response['Allow'] = 'PUT'
    return
  end

  response['Allow'] = 'GET,PUT,DELETE'
end

options '*' do
end