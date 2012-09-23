require 'test/spec'
require 'rack/test'
require 'json'
require File.join(File.dirname(__FILE__), %w[testdata/resource_test_data])
require 'time'

shared_examples_for "Mongo KodaRms write interface" do
  
  it "accepts a resource into an existing collection" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 201
    last_response.location.should.start_with? '/api/bikes/'
    last_response.body.should.start_with? '/api/bikes/'
    last_response.content_type.should == 'application/json;charset=utf-8'
  end
  
  it "actually creates the resource added into an existing collection" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 201
    get last_response.location

    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should.not == nil
    response_json['cost'].should == 'expensive'
    response_json['speed'].should == 'fast'
    response_json['gears'].should == 27
  end
  
  it "should hide folders with access-control set to non-public" do
    header 'Content-Type', 'application/json;charset=utf-8'
    access_control = { 'read_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control

    last_response.status.should == 201
    get '/content'

    last_response.body.detect { |e| e.to_s == '/bikes'}.should == nil
  end
  
  it "should deny access to folders with access-control set to non-public" do
    header 'Content-Type', 'application/json;charset=utf-8'
    access_control = { 'read_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control

    last_response.status.should == 201
    get '/content/bikes'
    
    last_response.status.should == 405
  end
  
  it "should deny access to documents with parent folder access-control set to non-public" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27, '_koda_ref' => 'fastexpensiveone' }.to_json
    post '/api/bikes', bike
    
    access_control = { 'read_users' => '-', '_koda_ref' => 'access-control' }.to_json
    post '/api/bikes', access_control

    last_response.status.should == 201
    get '/content/bikes/fastexpensiveone'
    
    last_response.status.should == 405
  end
  
  it "creates a resource at the right location when jam ref supplied" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'_koda_ref'=>'thefastexpensiveone','cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes', bike

    last_response.status.should == 201
    last_response.location.should == '/api/bikes/thefastexpensiveone'
    
    get last_response.location

    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should.not == nil
    response_json['cost'].should == 'expensive'
    response_json['speed'].should == 'fast'
    response_json['gears'].should == 27
  end
  
  it "creates a media at the right location" do
       header 'Content-Type', 'text/plain'
       content = 'just some normal plain text, nothing special'
       post '/api/_koda_media', content

       last_response.status.should == 200
       last_response.location.should.start_with? '/api/_koda_media/'

       last_response.body.should.include? '/api/_koda_media/'
       last_response.content_type.should == 'application/json;charset=utf-8'
  end
  
  it "create retrievable media at the right location" do
       header 'Content-Type', 'text/plain'
       content = 'just some normal plain text, nothing special'
       post '/api/_koda_media', content

       get last_response.location

       last_response.should.be.ok
       last_response.body.should == 'just some normal plain text, nothing special'
       last_response.content_type.should.start_with? 'text/plain'
  end
  
  it "creates retrievable media at the right location" do
       header 'Content-Type', 'text/plain'
       content = 'just some normal plain text, nothing special'
       put '/api/_koda_media/thisisthename', content

       get last_response.location

       last_response.should.be.ok
       last_response.body.should == 'just some normal plain text, nothing special'
       last_response.content_type.should.start_with? 'text/plain'
  end
  
  it "creates retrievable media from multipart form with many files at the right location" do
    
       put '/api/_koda_media/thisisthename', 'files[]' => Rack::Test::UploadedFile.new('koda/spec/testdata/IMG_0380.JPG', 'image/jpg')

       get last_response.location

       last_response.should.be.ok
       last_response.content_type.should.start_with? 'image/jpg'
  end
  
  it "creates retrievable media from multipart form with many files at the right location with correct file contents" do
    
       put '/api/_koda_media/thisisthename', 'files[]' => Rack::Test::UploadedFile.new('koda/spec/testdata/simpletext.txt', 'text/plain')

       get last_response.location

       last_response.should.be.ok
       last_response.content_type.should.start_with? 'text/plain'
       last_response.body.should == 'some simple text'
       
  end
  
  it "creates retrievable media from multipart form with many files at the right location" do
    
       put '/api/_koda_media/thisisthename', 'file' => Rack::Test::UploadedFile.new('koda/spec/testdata/IMG_0380.JPG', 'image/jpg')

       get last_response.location

       last_response.should.be.ok
       last_response.content_type.should.start_with? 'image/jpg'
  end
  
  it "creates retrievable media from multipart form with many files at the right location with correct file contents" do
    
       put '/api/_koda_media/thisisthename', 'file' => Rack::Test::UploadedFile.new('koda/spec/testdata/simpletext.txt', 'text/plain')

       get last_response.location

       last_response.should.be.ok
       last_response.content_type.should.start_with? 'text/plain'
       last_response.body.should == 'some simple text'       
  end
  
  it "creates retrievable media from multipart form with many files at the right location with correct file contents" do
    
       post '/api/_koda_media', 'file' => Rack::Test::UploadedFile.new('koda/spec/testdata/simpletext.txt', 'text/plain')

       get last_response.location

       last_response.should.be.ok
       last_response.content_type.should.start_with? 'text/plain'
       last_response.body.should == 'some simple text'       
  end
  
  
  it "accepts a resource into an existing collection when trailing slash added" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes/', bike

    last_response.status.should == 201
    last_response.location.should.start_with? '/api/bikes/'
    last_response.body.should.start_with? '/api/bikes/'
    last_response.content_type.should == 'application/json;charset=utf-8'
  end

  it "creates a new resource at a set location through put" do
    header 'Content-Type', 'application/json;charset=utf-8'
    new_truck = {'size' => 'biggest', 'speed' => 'fast', 'gears' => 27 }.to_json
  
    put '/api/trucks/4db0dedb387f7123c9900001', new_truck
    
    last_response.status.should == 201    
    get last_response.location

    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should.not == nil
    response_json['size'].should == 'biggest'
    response_json['speed'].should == 'fast'
    response_json['gears'].should == 27    
  end
  
  it "creates a new resource at a set non-id location through put" do
    header 'Content-Type', 'application/json;charset=utf-8'
    new_truck = {'size' => 'biggest', 'speed' => 'fast', 'gears' => 27 }.to_json
  
    put '/api/trucks/bigone', new_truck
    
    last_response.status.should == 201 
    last_response.location.should == '/api/trucks/bigone'
    get last_response.location

    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should.not == nil
    response_json['size'].should == 'biggest'
    response_json['speed'].should == 'fast'
    response_json['gears'].should == 27    
  end

  it "replaces an existing resource through put" do
    header 'Content-Type', 'application/json;charset=utf-8'
    new_truck = {'size' => 'anupdatedvalue', 'speed' => 'fast', 'gears' => 27 }.to_json
  
    put '/api/trucks/4db0dedb387f7123c9000001', new_truck
    last_response.should.be.ok
    
    get '/api/trucks/4db0dedb387f7123c9000001'
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['size'].should == 'anupdatedvalue'
  end
  
  it "replaces an existing resource through put to overridden ref" do
    header 'Content-Type', 'application/json;charset=utf-8'
    new_truck = {'_koda_ref'=>'smallblueone','size' => 'anupdatedvalue', 'speed' => 'fast', 'gears' => 27 }.to_json
  
    put '/api/trucks/smallblueone', new_truck
    last_response.should.be.ok
    
    get '/api/trucks/smallblueone'
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['size'].should == 'anupdatedvalue'
  end

  it "replaces an existing resource through put method override of post" do
    header 'Content-Type', 'application/json;charset=utf-8'
    new_truck = {'size' => 'anupdatedvalue', 'speed' => 'fast', 'gears' => 27 }.to_json
  
    post '/api/trucks/4db0dedb387f7123c9000001?_method=put', new_truck
    last_response.should.be.ok
    
    get '/api/trucks/4db0dedb387f7123c9000001'
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json['size'].should == 'anupdatedvalue'
  end


  it "removes an existing resource through delete" do
    delete '/api/trucks/4db0dedb387f7123c9000002'    
    last_response.should.be.ok
  end
  
  it "removes an existing resource through delete of friendly url" do
    delete '/api/trucks/smallblueone'    
    last_response.should.be.ok
  end

  it "removes an existing collection through delete" do
    delete '/api/trucks/'    
    last_response.should.be.ok
  end
  
  it "removes an existing resource through post faked delete" do
    post '/api/trucks/4db0dedb387f7123c9000002?_method=delete'  
    last_response.should.be.ok
  end
  
end

shared_examples_for "Mongo KodaRms options interface" do
  it "returns just get option for root" do
    options '/api'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'GET'
  end

  it "returns get and post for media dir" do
    options '/api/_koda_media/'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'GET,POST'
  end
  
  it "returns get, post and delete for collection dir" do
    options '/api/_koda_media/'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'GET,POST'
  end
  
  it "returns get, post and delete for collection dir" do
    options '/api/trucks/'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'GET,POST,DELETE'
  end
  
  it "returns get, put and delete for resource" do
    options '/api/trucks/smallblueone'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'GET,PUT,DELETE'
  end
  
  it "returns just put for non-existent resource" do
    options '/api/trucks/smallredone'
    
    last_response.should.be.ok
    last_response.headers['Allow'].should == 'PUT'
  end
  
  
end

shared_examples_for "Mongo KodaRms read interface" do
  it "returns a non-empty list of collection urls at the root" do
    get '/api'
    
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json.count.should.be > 0
  end
  
  it "returns the correct collections at root" do
    get '/api'

    response_json = JSON.parse last_response.body    
    response_json.detect { |e| e['href'] == '/api/iguanas'}.should.not == nil      
    response_json.detect { |e| e['href'] == '/api/trucks'}.should.not == nil
    response_json.detect { |e| e['href'] == '/api/cars'}.should.not == nil
  end
  
  it "should not include the media folder at root" do
    get '/api'

    response_json = JSON.parse last_response.body    
    response_json.detect { |e| e['href'] == '/api/_koda_media'}.should == nil      
  end
  
  
  it "returns a non-empty list of resource urls from the trucks collection" do
    get '/api/trucks'
    
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json.count.should.be > 0
  end
  

  it "accepts the trailing slash after a collection" do
    get '/api/trucks/'
    
    last_response.should.be.ok
    response_json = JSON.parse last_response.body
    response_json.count.should.be > 0
  end
  
  it "returns the expected resource urls from the trucks collection" do
    get '/api/trucks'
    
    response_json = JSON.parse last_response.body
    response_json.detect { |e| e['href'] == '/api/trucks/4db0dedb387f7123c9000001'}.should.not == nil
    response_json.detect { |e| e['href'] == '/api/trucks/4db0dedb387f7123c9000002'}.should.not == nil
    response_json.detect { |e| e['href'] == '/api/trucks/smallblueone'}.should.not == nil
  end
  
  it "returns the expected resource titles from the trucks collection" do
    get '/api/trucks'
    
    response_json = JSON.parse last_response.body
    response_json.detect { |e| e['title'] == '4db0dedb387f7123c9000001'}.should.not == nil
    response_json.detect { |e| e['title'] == '4 wheeled truck'}.should.not == nil
    response_json.detect { |e| e['title'] == 'smallblueone'}.should.not == nil
  end
  
  it "excludes system indexes from root" do
    get '/api'
    
    response_json = JSON.parse last_response.body
    response_json.detect { |e| e == '/api/system.indexes'}.should == nil
  end
  
  it "returns a resource for a valid url" do
    get '/api/trucks/4db0dedb387f7123c9000001'
    last_response.should.be.ok
  end
  
  it "fetches resource by ref when present" do
    get '/api/trucks/smallblueone'
    last_response.should.be.ok
  end
  
  
  it "returns the expected resource for a valid url" do
    get '/api/trucks/4db0dedb387f7123c9000001'
    
    last_response.should.be.ok
    
    response_json = JSON.parse last_response.body
    response_json['size'].should == 'big'
    response_json['colour'].should == 'green'
  end
  
  it "returns the id as the ref when not specifically set" do
    get '/api/trucks/4db0dedb387f7123c9000001'
    
    last_response.should.be.ok
    
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should == '4db0dedb387f7123c9000001'
  end
  
  it "returns the ref, not the id, when specifically set" do
    get '/api/trucks/4db0dedb387f7123c9000008'
    
    last_response.should.be.ok
    
    response_json = JSON.parse last_response.body
    response_json['_koda_ref'].should == 'smallblueone'
  end
  
  it "strips the id from returned resources" do
    get '/api/trucks/4db0dedb387f7123c9000001'
    
    response_json = JSON.parse last_response.body
    response_json['_id'].should == nil
  end
  
  it "invokes the jsonp callback" do
    get '/api/trucks/4db0dedb387f7123c9000001?callback=functionA'
    last_response.body.should.include('functionA(')
  end
  
  
  it "returns a 404 for a non-existant resource url" do
    get '/api/trucks/4db0dedb387f7123c9000007'
    last_response.should.be.not_found
  end
  
  it "returns not modified for an unchanged resource url" do
    header 'Content-Type', 'application/json;charset=utf-8'
    bike = {'cost' => 'expensive', 'speed' => 'fast', 'gears' => 27 }.to_json
    post '/api/bikes/', bike

    header 'If-Modified-Since', Time.now.httpdate.to_s
    get last_response.location
    
#    last_response.status.should == 304
  end
  
  it "clients request no cache, then no cache returned" do
    header 'Cache-Control', 'no-cache'
    get '/api'
    
    last_response['Cache-Control'].should == 'no-cache'
  end
  
  it "can be requested to restrict the number of results" do
    get URI.encode('/api/trucks?take=2')
    
    response_json = JSON.parse last_response.body
    response_json.length.should == 2
  end
  
    
  it "can be requested to skip results" do
    get URI.encode('/api/trucks?skip=2')
    
    response_json = JSON.parse last_response.body
    response_json.length.should == 1
    response_json.detect { |e| e['title'] == 'smallblueone'}.should.not == nil    
  end

  it "can be requested to skip and take results" do
    get URI.encode('/api/trucks?skip=1&take=1')
    
    response_json = JSON.parse last_response.body
    response_json.length.should == 1
    response_json.detect { |e| e['title'] == '4 wheeled truck'}.should.not == nil    
  end
  
end