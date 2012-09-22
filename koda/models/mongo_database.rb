require File.join(File.dirname(__FILE__), %w[mongo_collection])

class MongoDatabase
  def initialize database
   @db = database
  end
  
  def resource_collection_urls 
    resource_collections.map {|e| '/' + e }	    
  end
  
  def collection_links user,isadmin=false
    all_user_collections(user).map do |collection|
      {'href' => '/api/' + collection, 'rel' => 'full', 'title' => collection, '_koda_ref' => collection}
    end
  end
  
  def content_collection_links user,isadmin=false
    collections = all_user_collections(user).clone
    collections.map do |collection|
      { 'href' => '/content/' + collection, 'title' => collection }
    end
  end
  
  def all_user_collections(user,isadmin=false)
    user_collections = resource_collections.clone
    return user_collections if(isadmin)
    user_collections.each do |collection|
  	  access_control = collection(collection).find_document('access-control')
  	  if(access_control && access_control['read_users'] != "*" && !(access_control['read_users'].include? user))
  	    user_collections.delete collection
	    end
	  end
	  user_collections
  end
  
  def collection collection_name
    MongoCollection.new @db.collection(collection_name)
  end
  
  def resource_collections
    collections = @db.collection_names
  	collections.delete 'system.indexes'  
  	collections.delete 'system.users'  
  	collections.delete '_koda_meta'
  	collections.delete 'fs.chunks'  
  	collections.delete 'fs.files'
  	  	
    collections
  end
  
  def contains_collection collection_name
    resource_collections.include?(collection_name)  
  end
  
  def flat_file
    flat_file = []
      all_user_collections('*').each do |collection|

        docs = collection(collection).resource_links(nil, nil, nil)
        docs_in_collection = []
        docs.each do |doc|
          doc_from_db = collection(collection).find_document(doc['_koda_ref'])
          puts doc_from_db
          docs_in_collection.push(doc_from_db.stripped_document)
        end
        flat_file.push({'collection'=>collection, 'docs' => docs_in_collection})
      end
    flat_file
  end
  
  def search(params)
    
    search_hash = Hash.new
    sort_hash = Hash.new

    if(params && params.length > 0)
      params.each do |k,v|
        if(v.include? '/')
          search_hash[k] = eval v
        else
          search_hash[k] = v
        end
        if (v == 'true' || v == 'false')
          search_hash[k] = v == 'true'
        end
        sort_hash[k] = 1
      end

      results = Hash.new

      all_user_collections('*').each do |collection|
        results[collection] = collection(collection).query(search_hash, params[:take], params[:skip], sort_hash)
      end
      
      results
  
    else
      flat_file
    end
    
  end
  
  def filter(collection_name, search_hash, take, skip)
    
    if(search_hash["sort"] != nil)
      sort_hash = search_hash["sort"]
    end

    search_hash["filter"].each do |k,v|
      if(v.include? '/')
        search_hash["filter"][k] = eval v
      else
        search_hash["filter"][k] = v
      end
    end

    collection(collection_name).query(search_hash["filter"], take, skip, sort_hash)
    
  end
  
end