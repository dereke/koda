require 'test/spec'
require 'bson'
require File.join(File.dirname(__FILE__), %w[../mongo_database])
require File.join(File.dirname(__FILE__), %w[doubles/mongo_db_double])

describe 'Mongo Database' do
  
  it "outputs all user collections urls" do
    db = MongoDatabase.new MongoDbDouble.instance   
    
    collections= db.resource_collection_urls
        
    collections.detect { |e| e == '/trucks'}.should.not == nil
    collections.detect { |e| e == '/iguanas'}.should.not == nil
    collections.detect { |e| e == '/cars'}.should.not == nil
  end

  it "excludes system collections for urls" do
    db = MongoDatabase.new MongoDbDouble.instance   
    
    collections= db.resource_collection_urls
        
    collections.detect { |e| e == '/system.indexes'}.should == nil
    collections.detect { |e| e == '/system.users'}.should == nil
  end
  
  
  it "outputs all user collections" do
    db = MongoDatabase.new MongoDbDouble.instance   
    
    collections= db.resource_collections
        
    collections.detect { |e| e == 'trucks'}.should.not == nil
    collections.detect { |e| e == 'iguanas'}.should.not == nil
    collections.detect { |e| e == 'cars'}.should.not == nil
  end

  it "excludes system collections" do
    db = MongoDatabase.new MongoDbDouble.instance   
    
    collections= db.resource_collections
        
    collections.detect { |e| e == 'system.indexes'}.should == nil
    collections.detect { |e| e == 'system.users'}.should == nil
  end
  
  it "is able to find an existing collecton" do
    db = MongoDatabase.new MongoDbDouble.instance   

    db.contains_collection('trucks').should == true
  end

  it "cannot find an existing collecton" do
    db = MongoDatabase.new MongoDbDouble.instance   

    db.contains_collection('birds').should.not == true
  end
  
  it "cannot find an system collecton" do
    db = MongoDatabase.new MongoDbDouble.instance   

    db.contains_collection('system.indexes').should.not == true
  end
  
  
end
