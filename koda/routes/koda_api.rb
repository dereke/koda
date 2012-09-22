#
# DO NOT MODIFY THESE UNLESS YOU KNOW WHAT YOU ARE DOING
#

get '/koda/koda-types/*' do 
  response['Allow'] = 'GET'
end

get '/api' do
  if(logged_in?) 
    content_type :json, 'kodameta' => 'list'
    JSONP @db_wrapper.collection_links current_user._koda_ref,current_user.isadmin
  else
    response['Allow'] = 'GET'
    status 405
  end
end

get '/api/' do
  if(logged_in?) 
    content_type :json, 'kodameta' => 'list'
    JSONP @db_wrapper.collection_links current_user._koda_ref,current_user.isadmin
  else
    response['Allow'] = 'GET'
    status 405
  end
end

get '/content?' do
  content_type :json, 'kodameta' => 'list'
  JSONP @db_wrapper.content_collection_links '*'
end

get '/content/?' do
  content_type :json, 'kodameta' => 'list'
  JSONP @db_wrapper.content_collection_links '*'
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

post '/api/_koda_media/?' do  

  if(logged_in?) 
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
  else
    response['Allow'] = 'GET'
    status 405
  end

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

  if(logged_in?) 
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
  else
    response['Allow'] = 'GET'
    status 405
  end

end

post '/api/_koda_media/:filename?' do
  response['Allow'] = 'GET,PUT,DELETE'
  status 405
end

delete '/api/_koda_media/:filename?' do
  if(logged_in?) 
    @grid_wrapper.delete_media(params[:filename])
  else
    response['Allow'] = 'GET'
    status 405
  end
end

options '/api/_koda_media/:filename' do
  media = @grid_wrapper.get_media params[:filename]

  if (media == nil)
    response['Allow'] = 'PUT'
    return
  end

  response['Allow'] = 'GET,PUT,DELETE'
end

get '/content/search/?' do 
  content_type :json, 'kodameta' => 'list'  
  JSONP @db_wrapper.search params
end

get '/content/:collection/filtered/:filter/?' do
  filter = params[:filter]
  content_type :json, 'kodameta' => 'list'
  collection_name = params[:collection]

  halt 404 if not @db_wrapper.contains_collection(collection_name)  

  response = get_raw "/koda/koda-filters/#{filter}.js"
  search_hash = JSON.parse response
  
  JSONP @db_wrapper.filter collection_name, search_hash, params[:take], params[:skip]
end

get '/api/:collection/?' do
  collection_name = params[:collection]
  
  if(is_allowed? :read,collection_name)
    
    content_type :json, 'kodameta' => 'list'
    halt 404 if not @db_wrapper.contains_collection(collection_name)  

    if(is_admin?)
      JSONP @db_wrapper.collection(collection_name).resource_links(params[:take], params[:skip], nil)
    else
      JSONP @db_wrapper.collection(collection_name).resource_links_no_hidden(params[:take], params[:skip], nil)
    end

  else
    response['Allow'] = 'GET'
    status 405
  end
end

get '/session/current_user' do
  if(logged_in?) 
    JSONP current_user
  else
    response['Allow'] = 'GET'
    status 405
  end
end

get '/content/:collection/?' do
  content_type :json, 'kodameta' => 'list'
  collection_name = params[:collection]

  halt 404 if not @db_wrapper.contains_collection(collection_name)  

  JSONP @db_wrapper.collection(collection_name).content_links(params[:take], params[:skip], nil)
end

post '/api/:collection/?' do
  collection_name = params[:collection]
  
  if(is_allowed? :write,collection_name)
      raw_doc = request.env["rack.input"].read
      hash = JSON.parse raw_doc
      new_doc = @db_wrapper.collection(collection_name).save_document(hash)
      
      response['Location'] = new_doc.url
      status 201
      result = {
        'success' => 'true',
        'location' => new_doc.url
      }
      body new_doc.url
    else
      response['Allow'] = 'GET'
      status 405
    end
end

put '/api/:collection/?' do
  status 405
  response['Allow'] = 'GET,POST,DELETE'
end  

delete '/api/:collection/?' do
  collection_name = params[:collection]
  
  if(is_allowed? :modify,collection_name)
    @db_wrapper.collection(collection_name).delete()
  else
    response['Allow'] = 'GET'
    status 405
  end
end

options '/api/:collection/?' do
  halt 404 if not @db_wrapper.contains_collection(params[:collection])  
  response['Allow'] = 'GET,POST,DELETE'
end

get '/api/:collection/:resource?' do
  collection_name = params[:collection]
  
  if(is_allowed? :read,collection_name)
    doc_ref = params[:resource]
    should_include = params[:include] != 'false'

    doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
    halt 404 if doc==nil
    last_modified(doc.last_modified)

    fetch_linked_docs doc if should_include

    JSONP doc.standardised_document
  else
    response['Allow'] = 'GET'
    status 405
  end
end

get '/content/:collection/:resource?' do
  
  collection_name = params[:collection]
  doc_ref = params[:resource]
  should_include = params[:include] != 'false'

  doc = @db_wrapper.collection(collection_name).find_document(doc_ref)
  halt 404 if doc==nil
  last_modified(doc.last_modified)
  
  fetch_linked_docs doc if should_include

  JSONP doc.stripped_document

end

post '/api/:collection/:resource' do
  status 405
end

put '/api/:collection/:resource' do
  collection_name = params[:collection]
  
  if(is_allowed? :write,collection_name)
    resource_name = params[:resource]
    hash = JSON.parse request.env["rack.input"].read
  
    if(hash['linked_documents'] != nil)
      hash.delete 'linked_documents'
    end

    doc = @db_wrapper.collection(collection_name).save_document(hash, resource_name)  
    refresh_doc_from_cache collection_name, resource_name, doc   
    
    status 201 if doc.is_new

    response['Location'] = doc.url

    body doc.url
  else
    response['Allow'] = 'GET'
    status 405
  end
end

delete '/api/:collection/:resource' do
  collection_name = params[:collection]

  if(is_allowed? :modify,collection_name)
    @db_wrapper.collection(collection_name).delete_document(params[:resource])  
  else
    response['Allow'] = 'GET'
    status 405
  end
end

options '/api/:collection/:resource' do
  collection_name = params[:collection]
  
  if(is_allowed? :read, collection_name)
      doc_ref = params[:resource]

      doc = @db_wrapper.collection(collection_name).find_document(doc_ref)

      if (doc==nil)
        response['Allow'] = 'PUT'
        return
      end

      response['Allow'] = 'GET,PUT,DELETE'
  else
    response['Allow'] = 'GET'
    status 405
  end
end

options '*' do
end