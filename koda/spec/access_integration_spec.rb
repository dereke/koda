require 'test/spec'
require 'rack/test'
require 'json'
require 'time'
require File.join(File.dirname(__FILE__), %w[../../koda_app])

set :environment, :test
set :enable_cache, false

describe 'Mongo KodaCMS access integration' do
  include Rack::Test::Methods
  
  def clear_database database
     database.collections().each do |collection|
        begin
         collection.drop
        rescue
          nil
        end
       end
  end
  
  before(:each) do
    database = Mongo::Connection.new('localhost',27017).db('kodacms_test')
    clear_database database
  end
  
  before do
    MongoConfig.instance_eval do     
       def GetMongoDatabase 
         Mongo::Connection.new('localhost',27017).db('kodacms_test')
       end
     end
    UserContext.instance_eval do
      def current_user
        {'_koda_ref'=>'joey','isadmin'=>false,'isallowed'=>true}
      end
    end
  end
  
  def app
    Sinatra::Application
  end

  it "denies a resource into an existing collection if not allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    access_control = { 'read_users'=>'*', 'write_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
    
    get '/api/bikes/access-control'
    last_response.status.should == 200
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 405
  end
  
  it "allows a resource into an existing collection if user allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    access_control = { 'read_users'=>'*', 'write_users' => 'joey', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 201
  end
  
  it "allows a resource into an existing collection if all users allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    access_control = { 'read_users'=>'*', 'write_users' => '*', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 201
  end

  it "denies updating a resource in an existing collection if not allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'write_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    put '/api/bikes/expensivefastone', bike

    last_response.status.should == 405
  end
  
  it "allows updating a resource in an existing collection if user allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'write_users' => 'joey', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    put '/api/bikes/expensivefastone', bike

    last_response.status.should == 200
  end

  it "allows updating a resource in an existing collection if all users allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'write_users' => '*', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    put '/api/bikes/expensivefastone', bike

    last_response.status.should == 200
  end

  it "denies deleting a resource from an existing collection if not allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'modify_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    delete '/api/bikes/expensivefastone', bike

    last_response.status.should == 405
  end
  
  it "allows deleting a resource from an existing collection if user allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'modify_users' => 'joey', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    delete '/api/bikes/expensivefastone', bike

    last_response.status.should == 200
  end
  
  it "allows deleting a resource from an existing collection if all users allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users'=>'*', 'modify_users' => '*', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    delete '/api/bikes/expensivefastone', bike

    last_response.status.should == 200
  end

  it "denies viewing a resource from an existing collection if not allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    get '/api/bikes/expensivefastone'

    last_response.status.should == 405
  end
  
  it "allows viewing a resource from an existing collection if user allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users' => 'joey', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    get '/api/bikes/expensivefastone'

    last_response.status.should == 200
  end
  
  it "allows viewing a resource from an existing collection if all users allowed by access-control" do
    header 'Content-Type', 'application/json;charset=utf-8'
  
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'expensivefastone' }.to_json
    post '/api/bikes', bike
  
    access_control = { 'read_users' => '*', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control
  
    get '/api/bikes/expensivefastone'

    last_response.status.should == 200
  end
  
end