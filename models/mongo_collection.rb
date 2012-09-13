require File.join(File.dirname(__FILE__), %w[mongo_document])
require 'time'

class MongoCollection
  def initialize collection
    @collection = collection
  end

  def resource_urls
    @collection.find.map{|doc| (create_document_wrapper doc).url}
  end

  def resource_links take=nil, skip=nil, sort=nil
    resource_links_from_docs @collection.find({},build_options(take, skip, sort)).map
  end

  def find_document doc_ref
    doc = create_document_wrapper @collection.find_one("_koda_ref"=>doc_ref)

    if (doc == nil)
      begin
        bsonid = BSON::ObjectId.from_string doc_ref
        doc = create_document_wrapper @collection.find_one(bsonid)
      rescue
      end
    end

    doc
  end

  def query query_map, take=nil, skip=nil, sort=nil
    resource_links_from_docs @collection.find(query_map, build_options(take, skip, sort))
  end

  def save_document raw_resource, ref=nil

    if !(ref==nil)
      existing_doc = find_document(ref)
    end

    if !(existing_doc == nil)
      updated_doc = MongoDocument.new raw_resource, @collection.name, existing_doc.id, Time.now.httpdate
      @collection.save(updated_doc.raw_document)
    else
      new_id = @collection.insert(raw_resource)
      updated_doc = MongoDocument.new raw_resource, @collection.name, new_id, Time.now.httpdate

      if(ref and updated_doc.ref != ref)
        updated_doc.ref = ref
        @collection.save(raw_resource)
      end

      updated_doc.is_new = true
    end

    updated_doc
  end

  def delete_document ref
    existing_doc = find_document(ref)

    if (existing_doc)
      @collection.remove('_id' => existing_doc.id)
    end
  end

  def delete
    @collection.drop
  end

  private

  def resource_links_from_docs docs
    docs.map do |doc|
      doc_wrapper = create_document_wrapper doc
      {'href' => doc_wrapper.url, '_koda_type' => doc_wrapper.type, 'rel' => 'full', 'title' => doc_wrapper.title}
    end

  end

  def build_options take, skip, sort
    options = {}
    options[:limit] = take.to_i if take != nil
    options[:skip] = skip.to_i if skip != nil

    if (sort != nil)
      sort_array = sort.to_a
      sort_expression = sort_array[0][0]
      sort_order = sort_array[0][1] == "desc" ? Mongo::DESCENDING : Mongo::ASCENDING

      options[:sort] = [sort_expression, sort_order]
    end

    options
  end

  def create_document_wrapper(doc)
    if !(doc==nil)
      doc_wrapper=MongoDocument.new doc, @collection.name
    end
    doc_wrapper
  end

end
