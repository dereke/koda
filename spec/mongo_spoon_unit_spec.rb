require File.join(File.dirname(__FILE__), %w[../mongo_jam_spoon])
require File.join(File.dirname(__FILE__), %w[mongo_spoon_shared])
require File.join(File.dirname(__FILE__), %w[uniform_spoon_shared])
require File.join(File.dirname(__FILE__), %w[doubles/mongo_db_double])
require File.join(File.dirname(__FILE__), %w[doubles/mongo_grid_double])
require File.join(File.dirname(__FILE__), %w[doubles/mongo_collection_double])

set :environment, :test

describe 'Mongo Jam Spoon Unit' do
  include Rack::Test::Methods
  
  before(:each) do
     MongoDbDouble.instance.reset
  end
  
  before do
    
    MongoJamSpoon.instance_eval do
      
        def GetMongoDatabase 
          MongoDbDouble.instance
        end
        
        def GetGridFS
          MongoGridDouble.instance
        end
        
    end
  end

  def app
    Sinatra::Application
  end

  it_should_behave_like "Mongo Jam Spoon options interface"
  it_should_behave_like "Mongo Jam Spoon read interface"
  it_should_behave_like "Mongo Jam Spoon write interface"
  
end
