require 'time'

class MongoDocument
  attr_accessor :is_new
  
  def initialize doc, collection, id=nil, modified_time=nil
    @doc = doc
    @collection = collection
    
    if !(id == nil)
      @doc['_id'] = id
    end
        
    if !(modified_time==nil)
      @doc['_koda_last_modified']=modified_time
    end
  end
  
  def last_modified
    if !(@doc['_koda_last_modified']==nil)
      Time.httpdate(@doc['_koda_last_modified'])
    end
  end
    
  def id
    @doc['_id']
  end

  def id=(value)
    @doc['_id'] = value
  end
  
  def raw_document
    @doc
  end
  
  def []=(index, value)
    @doc[index] = value
  end
  
  def [](index)
    @doc[index] 
  end
  
  
  def standardised_document
    copy = @doc.clone
    copy['_koda_ref'] = ref
    copy.delete('_id')
    copy.delete('_koda_last_modified')
    copy
  end
  
  def title
    if (@doc['_koda_title'])
      @doc['_koda_title']
    else
      ref
    end
  end
  
  def type
    if(@doc['_koda_type'])
      @doc['_koda_type'].to_s
    else
      'anon'
    end
  end
  
  def doc_link 
    if(@doc['_koda_link'])
      @doc['_koda_link'].to_s
    else
      ''
    end
  end

  def ref=(value)
      @doc['_koda_ref'] = value
  end
  
  def ref
    if (@doc['_koda_ref'] == nil)
      @doc['_id'].to_s
    else
      @doc['_koda_ref'].to_s
    end
  end
  
  def url
    '/api/' + @collection + '/' + ref
  end
  
end