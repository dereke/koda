require File.join(File.dirname(__FILE__), %w[../lib/koda])
require File.join(File.dirname(__FILE__), %w[mongo_server_shared])
require File.join(File.dirname(__FILE__), %w[uniform_server_shared])
require File.join(File.dirname(__FILE__), %w[testdata/mongo_test_data])

set :environment, :test
set :enable_cache, false
set :short_ttl, 400
set :long_ttl, 4600

describe 'Mongo KodaRms Integration' do
  include Rack::Test::Methods
  
  def admin_user
    {'alias'=>'test_user','isadmin'=>true,'isallowed'=>true}
  end
  
  def clear_database database
     database.collections().each do |collection|
        begin
         collection.drop
        rescue
          nil
        end
       end
  end
  
  def populate_database_with_documents database
    MongoTestData.collections.each_pair do |collection_name, documents|
      database.create_collection collection_name
      documents.each do |document|
        database[collection_name].save document        
      end
    end
  end
  
  before(:each) do
    database = Mongo::Connection.new('localhost',27017).db('kodacms_test')
    clear_database database
    populate_database_with_documents database
  end
  
  before do
    @@current_user = admin_user
    MongoConfig.instance_eval do     
       def GetMongoDatabase 
         Mongo::Connection.new('localhost',27017).db('kodacms_test')
       end
     end
    UserContext.instance_eval do
      def current_user
        @@current_user
      end
    end
  end
  
  def app
    Sinatra::Application
  end

  it_should_behave_like "Uniform Spoon interface"
  it_should_behave_like "Mongo KodaRms options interface"
  it_should_behave_like "Mongo KodaRms read interface"
  it_should_behave_like "Mongo KodaRms write interface"
  
end