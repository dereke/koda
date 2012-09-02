###KodaRms

Koda is a Resource Management System that stores JSON and Images. Koda provides a RESTful API to store and retrieve your content from any type of HTTP client (Javascript, Mobile, Flash, Silverlight) and is language agnostic. 

**To access the console go to your instance/console**
**To access the explorer area go to your instance/explorer**

## Note about links

All references to other resources follow the json schema format, as specified at http://json-schema.org/json-ref
The only addition is the "title" field, which when present indicates a human readable phrase that is suitable to describe the item.

## Get Requests

###Root Document 

'/' returns the a list of urls for the 'user' (non-system) collections, for example 

`
Request:GET '/' 
Response:[{"href":"/trucks","rel":"full"},{"href":"/iguanas","rel":"full"},{"href":"/cars","rel":"full"}] 
`

###Collections

'/collectioname' returns a list of urls of the documents stored in the collection, for example 

`
Request:GET '/trucks' 
Response:[{"href":"/trucks/4db0dedb387f7123c9000001","title":"4db0dedb387f7123c9000001","rel":"full"},{"href":"/trucks/smallblueone","title":"smallblueone","rel":"full"}]
`

*Note* The url for a given resource will either be the internal Mongo ID, or a specifically chosen 'friendly' url. This is determined by the field '_koda_ref', discussed further below.
*Note* The value of title will either be '_koda_title', '_koda_ref', or the Mongo ID, in that order or precedence.

###Documents

'/collectionname/documentname' returns the Mongo document stored in that collection. 
There are two ways documents can be referred to. First is by the internal Mongo ID, for example 

`
Request: GET '/trucks/4db0dedb387f7123c9000001' 
Response: {"size":"big","wheels":4,"colour":"green","_koda_ref":"4db0dedb387f7123c9000001"} 
`

Secondly is by the '_koda_ref' value, for example 
`
Request: GET 'trucks/smallblueone' 
Response: {"_koda_ref":"smallblueone","size":"small","wheels":4,"colour":"blue"} 
`

## Post and Put Requests 

Documents can be created two ways - either by posting to the collection url, or putting directly to the desired url

###Post

`
Request: POST '/bikes' => {'cost':'expensive', 'speed':'fast', 'gears':27 } 
Response: Status 201, Location '/bikes/4db0dedb387f7123c9000007'  
/bikes/4db0dedb387f7123c9000007  
`

*Note* The internally created Mongo ID will usually be used to create the new resource url, returned in the response body and the Location header. This can be override by supplying a value in the '_koda_ref' field. This must be unique to this collection, otherwise a 409 (Conflict) will be returned, along with the url to the conflicting document in the body.

###Put

`
Request: POST '/bikes/bigred' => {'cost':'expensive', 'speed':'slow', 'gears':27, 'colour':'red' } 
Response: Status 201, Location 'bikes/bigred' 
bikes/bigred  
`

*Note* If the document did not already exist, the returned status code will be 201 (Created), otherwise 200 (OK) 
*Note* If the "_koda_ref" field is present in the request, and contradicts, the url posted to, the url will take precedence. 

## Delete Requests

### Collections

`
Request: DELETE '/trucks' 
Response: Status OK
`

### Documents

`
Request DELETE '/bikes/bigred' 
Response: Status OK
`

## Put and Delete through overloaded Post

In environments where Put and Delete requests are not supported, use this format instead: 

`
POST '/collectioname/document?_method=METHOD' 
`

For example 

`
POST '/trucks/smallblueone?_method=DELETE' will be interpreted the same as 
DELETE 'trucks/smallblueone' 
`

