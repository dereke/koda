### What is KodaCMS

Koda is a Content Management System unlike any you might have come accross. Koda provides a RESTful API to store and retrieve your content from any type of HTTP client (Website, Mobile, Flash, Silverlight) and is language agnostic. Koda comes with its own templating engine and can be used to create a website (similar to wordpress, umbraco etc), but Koda can also be used as a JSON Server. You can create multiple websites or create mobile apps that uses the content API.   

Koda Explorer will allow you to create your own document types, create filters and even link documents to filters or other documents. KodaCMS is built with Sinatra and MongoDb and is really fast. Use the Console for a quick familiar browse through your content (if you are in a hurry) or use the Explorer for a nicer user interface. (both just speaks to the default Koda API) 

*	To access the console go to your http://your.koda.instance/console
*	To access the explorer area go to your http://your.koda.instance/explorer

View our board [here](https://trello.com/board/kodaexplorer/50506ef61302bbe50d6b0218)

## Features

*	Code first approach (USiteBuilder) OR Instance editing (ala Wordpress, Umbraco)
*	NoSQL (MongoDb)
*	Back-office Explorer built with Twitter Bootstrap (drop box like interface for managing your content)
*	Back-office Console, 'Terminal' 'CLI'-like interface for quick browsing through your data.
*	Full RESTful API to your data (great for providing content to mobile apps)
*	Platform independent (Built with Sinatra, Html and Javascript)
*	Incredibly fast (Indexed Queries, Filters, and even Search queries can be cached)
*	Almost NO learning curve! (We will release a 5min video with our beta to prove this)
*	No rules or limits to your creativity (we don't force a schema or convention on you, use your creativity to provide the best structure for your data)
*	Out of box Heroku with MongoLab support (FREE 500mb MongoDb instance and hosting. You only pay if your site becomes big)
*	Loads of documentation will be provided including training videos
*	Always free! Open source MIT Licence
*	Developers: Build your own DataTypes, KodaTypes, Filters, Indexes. We don't touch your front-end code and we don't enforce a site structure.

## Where are we now?

We still need to do the following before we can Release a beta of KodaCMS, but please follow us and keep up to date.

*	Type Editor
*	View Editor
*	Filter Editor
*	Action permissions for specific users
*	Lots of Testing!

## Developing with Koda

Koda follows a "code first" approach. This means that all your business functionality will be stored on the file system. We only store content in the database!
This means that any changes you want to make to the system will be versioned and can be reverted and recreated if you use source control.

The only skills needed to be able to do to develop a website on Koda is some very basic JSON and some knowledge of HTML.
All Koda Types, Koda Filters are done using a simple JSON formatted file.

Knowledge of Javascript is needed to create your own DataTypes and Koda Editors, but we have added enough of our own so you probably won't need to.

Koda stays out of your Layouts and we do not generate any HTML. That's right. We believe that most 'CMS' systems should really be called "Site Management Systems" as they dictate your sitemap and generate your urls and routes based on their own policy. Koda is a 'true' CMS as it only manages your content. 

But enough talk... lets see what we mean...

## Getting started

> Follow the guide here to install mongodb on your preferred platform  
> http://www.mongodb.org/display/DOCS/Quickstart  

> If you are on windows you would need to install ruby [here](http://rubyinstaller.org/)  
> Also install the Ruby DevKit [here](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)  

> If you are on Mac OSX, you won't need to install anything   
> If you are on Linux, you probably don't need any help   

`
git clone git@github.com:KodaCMS/Default.git
`

## Layout

> Create a file called 'layout.erb' in the 'views' folder

```html
<html>
  <body>
   <%= yield %>
  </body>
</html>
```

> And a file called 'index.erb'  

```html
<h3>Hello World!</h3>
```

> We will automatically match '/' to 'index.erb' and '/[name]' to '[name].erb'  
> however, you can add your own routes in the '/routes/site.rb' file

```ruby
get '/' do
  content_type :html
  erb :index
end

get '/:page?' do
  content_type :html
  erb params[:page]
end
```

## Using Content inside Views

```html
<section>

    <h1>Featured</h1>
	<ul>
	<% documents('slides').each do |slide| %>
	<li>
         <div>
             <h1><%=slide.name%></h1>
             <p><strong><%=slide.teaser%></strong></p>
             <p><%=slide.body%></p>
				
             <p><a href="<%=slide.learnmorelink%>">Learn More</a></p>
         </div>
     </li>
	<% end %>
    </ul>
	
	<% homepage = filtered('pages', 'homepage').first() %>
	<ul>
		<li class="home"><%=homepage.name%></li>
		<% pages = search({'tags' => '/page/'}).find_all {|page| not page.tags.include? 'home'} %>
		<% pages.each do |page| %>
		<li><%=page.name%></li>
		<% end %>
	</ul>
	
</section>
```

> The language we use in your views is called [Embedded Ruby](http://en.wikipedia.org/wiki/ERuby)   
> Available methods to use inside a view   

`all()` returns all your content (use only if you have a small site)   
`documents(collection_name)`  eg. documents('slides')   
`document(collection_name, doc_ref)` eg. document('pages', 'about-us')   
`filtered(collection_name, filter_name)` eg. filtered('pages', 'homepage')   
`search(search_hash)` eg. search({'tags' => '/page/'})   


## Creating Koda Types

> To Create Koda types place a new js file in the `/public/koda/koda-types` folder  

> Register your type in the `/public/koda/koda-types/_type_registration.js` file and you can now use it in the Koda Explorer!   
> A new type will appear under the "User Created" section on the right.     


```javascript
{
	"fields" : [
		{
			"id" : "_koda_ref",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-types/custom-blogpost.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "hiddenstring",
			"defaultValue" : "" // add the indexes of your doc here
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "Name of the doc",
			"control" : "textstring",
			"defaultValue" : ""
		},	
/*
	ADD YOUR CUSTOM VARS HERE BUT REMOVE ALL COMMENTS FIRST
*/
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_doc_links",
			"title" : "Document Link",
			"description" : "Link to another doc",
			"control" : "kodalinkeditor",
			"defaultValue" : ""
		},
	]
}
```

## Creating Koda Filters

> Creating a new Koda Filter is as easy as placing a file into the `/public/koda/koda-filters` folder.   

> You can then call the filter on any collection   

> lets say we place a file `music.js` into the filters folder that wants to show a list things tagged as "music" in a collection  


```javascript
{ 
	"filter" : { 
		"tags" : "/music/" // add the forward-slashes means it will match the value using a regex
	},
	"sort" : { 
		"name" : "1"
	}
}
```

> You can also do more advanced filtering  

```javascript
{ 
	"filter" : { 
		"somenumber" : { $gt: 10 }, // greater than 10
		"someproperty" : { $exists : true },
		"age" : { $in : [18,19,20] },
		"name" : { $ne : "Adolf" }
	},
	"sort" : { 
		"name" : "1",
		"age"  : "1"
	}
}
```

> these and many more options [here](http://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-ConditionalOperators)  

> when we 'GET' (or visit the url)    
`/api/cars/filtered/icons`
> you will receive documents that match the criteria  

## Linked Documents

> You can add the urls of other documents, search queries or even filters to a document and it will
> Include the documents inside the result of the main doc

> Eg. If you set a field on a document called 'linked_documents' to '/api/pages/blog, /api/pages/filtered/last-two-days'  
> it will include those in the original

```javascript
{ "_koda_doc_links" : "/api/pages/blog",
  "_koda_ref" : "blogfeedaggregator",
  "linked_documents" : [ { "_koda_doc_link" : "/api/pages/blog",
        "document" : { "_koda_doc_links" : "/api/slides",
            "_koda_editor" : "/koda/koda-editors/generic-editor.html",
            "_koda_indexes" : "title",
            "_koda_ref" : "blog",
            "_koda_type" : "/koda/koda-types/custom-genericpage.js",
            "bottomleftbody" : "<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</div><div><br></div>",
            "introparagraph" : "Recent Posts",
            "mainbody" : "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            "tags" : "page"
          }
      } ],
  "name" : "Blog",
  "tags" : "root"
}
```

>  To avoid circular references included documents will not include their linked documents.

## Deploying Koda to Heroku

> We know that deploying CMS's to production can be a tedious process...   
> so to deploy koda to production just do...   

```ruby
git clone git@github.com:KodaCMS/Default.git
heroku apps:create myapp
git push heroku master
```

> So sorry, we were actually lying... it couldn't be that simple right?  
> Unfortunately you would have to add the free 500mb mongolab provider too...   

`
heroku addons:add mongolab:starter
`

> Everything should just work!

## Backup / Restore one koda instance to another

> Most people want to 'set-up' or create their site on their local machine first and then migrate the content over to production     
> This couldn't be simpler with koda...   

> Set up your data and run the following command on your local machine when done...   
`ruby backup.rb dump .`   
> Commit your files or zip them up and place them on production and run the following   
`ruby backup.rb restore .`  

> This will backup /restore all your data and media to file.

## Backup / Restore on Heroku (or other shared hosting)

Take your application into maintenance mode.

Please note: You will need your current `MONGOLAB_URI` (from your Heroku configs) available before you begin as the following steps will alter it permanently.

`$ heroku maintenance:on`
Run a mongodump of your current database.

`$ mongodump -h hostname.mongohq.com:port_number -d database_name -u username -p password -o /path/on/my/local/computer`
Deprovision the old database for this app, making sure that the mongodump in Step #2 completed successfully.

`$ heroku addons:remove mongolab:starter`
Provision a new database for this app.

`$ heroku addons:add mongolab:starter`
Make available the newly updated MONGOLAB_URI from your Heroku configs.

Run a mongorestore of your locally backed up database to your new database (updating your connection info.)

`$ mongorestore -h hostname.mongolab.com:port_number -d database_name -u username -p password /path/on/my/local/computer`
Return from maintenance mode.

`$ heroku maintenance:off`


### API

## Note about links

All references to other resources follow the json schema format, as specified at http://json-schema.org/json-ref
The only addition is the "title" field, which when present indicates a human readable phrase that is suitable to describe the item.

## Search

>  Regex Match  

`
Request:GET '/api/search?tags=/page/'   
Response:[{"href":"/api/pages/homepage","rel":"full"},{"href":"/api/pages/about","rel":"full"},{"href":"/api/pages/contact","rel":"full"}] 
`
>  Exact Match  

`
Request:GET '/api/search?tags=home'  
Response:[{"href":"/api/pages/homepage","rel":"full"}] 
`

> Combining  

`
Request:GET '/api/search?tags=/page/&someotherproperty=true'   
Response:[{"href":"/api/pages/homepage","rel":"full"},{"href":"/api/pages/about","rel":"full"},{"href":"/api/pages/contact","rel":"full"}] 
`

> Skip and Take  

`
Request:GET '/api/search?tags=/page/&someotherproperty=true&skip=1&take=2'   
Response:[{"href":"/api/pages/about","rel":"full"},{"href":"/api/pages/contact","rel":"full"}] 
`

## Get Requests

###Root Document 

'/' returns the a list of urls for the 'user' (non-system) collections, for example 

`
Request:GET '/api/'    
Response:[{"href":"/trucks","rel":"full"},{"href":"/iguanas","rel":"full"},{"href":"/cars","rel":"full"}] 
`

###Collections

'/collectioname' returns a list of urls of the documents stored in the collection, for example 

`
Request:GET '/api/trucks' 
Response:[{"href":"/trucks/4db0dedb387f7123c9000001","title":"4db0dedb387f7123c9000001","rel":"full"},{"href":"/trucks/smallblueone","title":"smallblueone","rel":"full"}]
`

*Note* The url for a given resource will either be the internal Mongo ID, or a specifically chosen 'friendly' url. This is determined by the field '_koda_ref', discussed further below.
*Note* The value of title will either be '_koda_title', '_koda_ref', or the Mongo ID, in that order or precedence.

###Documents

'/api/collectionname/documentname' returns the Mongo document stored in that collection. 
There are two ways documents can be referred to. First is by the internal Mongo ID, for example 

`
Request: GET '/api/trucks/4db0dedb387f7123c9000001' 
Response: {"size":"big","wheels":4,"colour":"green","_koda_ref":"4db0dedb387f7123c9000001"} 
`

Secondly is by the '_koda_ref' value, for example 
`
Request: GET '/api/trucks/smallblueone' 
Response: {"_koda_ref":"smallblueone","size":"small","wheels":4,"colour":"blue"} 
`

## Post and Put Requests (currently only logged in users)

Documents can be created two ways - either by posting to the collection url, or putting directly to the desired url

###Post

`
Request: POST '/api/bikes' => {'cost':'expensive', 'speed':'fast', 'gears':27 } 
Response: Status 201, Location '/bikes/4db0dedb387f7123c9000007'  
/bikes/4db0dedb387f7123c9000007  
`

*Note* The internally created Mongo ID will usually be used to create the new resource url, returned in the response body and the Location header. This can be override by supplying a value in the '_koda_ref' field. This must be unique to this collection, otherwise a 409 (Conflict) will be returned, along with the url to the conflicting document in the body.

###Put

`
Request: POST '/api/bikes/bigred' => {'cost':'expensive', 'speed':'slow', 'gears':27, 'colour':'red' } 
Response: Status 201, Location 'bikes/bigred' 
bikes/bigred  
`

*Note* If the document did not already exist, the returned status code will be 201 (Created), otherwise 200 (OK) 
*Note* If the "_koda_ref" field is present in the request, and contradicts, the url posted to, the url will take precedence. 

## Delete Requests (currently only logged in users)

### Collections

`
Request: DELETE '/api/trucks' 
Response: Status OK
`

### Documents

`
Request DELETE '/api/bikes/bigred' 
Response: Status OK
`

## Put and Delete through overloaded Post (currently only logged in users)

In environments where Put and Delete requests are not supported, use this format instead: 

`
POST '/api/collectioname/document?_method=METHOD' 
`

For example 

`
POST '/api/trucks/smallblueone?_method=DELETE' will be interpreted the same as 
DELETE '/api/trucks/smallblueone' 
`

### Development Quickstart

*	Clone the git repo
*	sudo gem install bundler
*	run `bundle install`

*	`gem install shotgun`
*	`gem install rspec`
*	`gem install watchr`

*	autotesting `watchr autotest.watchr`
*	auto-reload local `shotgun -p 3000 koda_app.rb`

### Roadmap

*	~~Simple User Authorisation~~ (Janrain engage)
*	More complex User Authorisation
*	Token based API access for PUT/POST/DELETE from mobiles etc.
*	UI Niceness
*	Browser Editing (deploy website and create from scratch)
*	More Editors
*	More Datatypes
*	Workflow
*	Plugin API