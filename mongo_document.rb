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
      @doc['_jam_last_modified']=modified_time
    end
  end
  
  def last_modified
    if !(@doc['_jam_last_modified']==nil)
      Time.httpdate(@doc['_jam_last_modified'])
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
    copy['_jam_ref'] = ref
    copy.delete('_id')
    copy.delete('_jam_last_modified')
    copy
  end
  
  def title
    if (@doc['_jam_title'])
      @doc['_jam_title']
    else
      ref
    end
  end

  def ref=(value)
      @doc['_jam_ref'] = value
  end
  
  def ref
    if (@doc['_jam_ref'] == nil)
      @doc['_id'].to_s
    else
      @doc['_jam_ref'].to_s
    end
  end
  
  def url
    '/' + @collection + '/' + ref
  end
  
end