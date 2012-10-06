# What is KodaCMS

KodaCMS is unlike any other CMS you might have come across. It manages your content first, thinking about where it will be used later.
Create content in the Back-Office and present it on web page, mobile, tablet, flash, silverlight or Single page JS apps!

View our Trello board [here](https://trello.com/board/kodaexplorer/50506ef61302bbe50d6b0218)
Twitter: @kodacms
http://www.kodacms.org/

## Features

*	DropBox-like interface for managing your content
*	'Terminal' 'CLI'-like interface for quick browsing through your data.
*	Full RESTful API to your data (great for providing content to mobile apps, single page js apps etc)
*	Platform independent
*	Incredibly fast
*	Almost no learning curve
*	Out of box Heroku with MongoLab support (FREE 500mb MongoDb instance and hosting. You only pay if your site becomes big)
*	Always free! Open source MIT Licence

## Screenshot

## Explorer
![Content Editing](https://raw.github.com/KodaCMS/Koda/master/screenshots/adding-content.png)

## Where are we now?

In the pipeline

*	Publishing Workflow and Preview

ETA - October / November 2012

### Getting started

Follow the guide here to install mongodb on your preferred platform
http://www.mongodb.org/display/DOCS/Quickstart

If you are on windows you would need to install ruby [here](http://rubyinstaller.org/)
Also install the Ruby DevKit [here](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)

If you are on Mac OSX, you won't need to install anything
If you are on Linux, you probably don't need any help

Once you have this installed, simply...

*   Clone any starter kit
*	`gem install koda`
*   `ruby data.rb restore data/kodacms`
*	`shotgun -p 3000`

* 	Use your favourite editor to start developing
*	Go to `http://localhost:3000` to see your instance
*	Go to `http://localhost:3000/explorer` to register and start editing content
*	Go to `http://localhost:3000/console` after registration to browse your data

## Creating Layouts and Views

### Layouts

> /views/layout.rb
```html
<html>
  <body>
   <%= yield %>
  </body>
</html>
```

### Views

Views will automatically be rendered inside the layout

> /views/myview.rb
```html
<h3>Hello World!</h3>
```

produces...

```html
<html>
  <body>
   	<h3>Hello World!</h3>
  </body>
</html>
```

### Partials

> /views/partials/mypartial.rb
```html
<p>my partial</p>
```

> /views/myview.rb
```html
<h3>Hello World!</h3>
<% render_partial 'partials/mypartial' %>
```

produces...

```html
<html>
  <body>
   	<h3>Hello World!</h3>
	<p>my partial</p>
  </body>
</html>
```

### Using Content inside Views

```html
<% model.blogposts.all.each do |blogpost|%>
	<% safe('No Content has been added yet'){%>
    <h2><%=blogpost.title%></h2>
    <div>
      <%=blogpost.teaser%>
    </div>
	<%}%>
<% end%>
```

produces...

```html
   <h2>My first blogpost</h2>
   <div>
      My blogpost content
   </div>
   <h2>My second blogpost</h2>
   <div>
      My blogpost content
   </div>
   <h2>My third blogpost</h2>
   <div>
      My blogpost content
   </div>
```

> The default view-engine is [Embedded Ruby](http://en.wikipedia.org/wiki/ERuby), but you can configure your own [from these choices](http://sinatra-book.gittr.com/#templates)!
> But we also provide a very versatile, yet simple client API to use in your views

## Available content filters from within a view

### Where
`model.[collection].where {|item| item.someProp == 'something' && item.alias != nil } ` returns all items that match
### Single
`model.[collection].single {|item| item.someProp == 'something' } ` returns the first item that matches
### All
`model.[collection].all ` returns all items
### By Ref
`model.[collection].by_ref 'my_ref'` returns a reference document by referenceid

### Routes

Your routes live in the config.ru file.

```ruby
get '/:page?' do
  @current_page = params[:page]
  @title = "Welcome to KodaCMS"
  show :myview
end
```

this will respond to, eg. '/about_us', '/contact_us'
and means you can show the correct info based on the context

```html
<% page = model.pages.by_ref @current_page %>
	<% safe('No Content has been added yet'){%>
    <h2><%=page.title%></h2>
    <div>
      <%=page.intro_paragraph%>
    </div>
	<%}%>
<% end%>
```

this is a very simple example, but the possibilities when you can define your own routes...

```ruby
get '/blog/:author/:post/:?' do
  @author = params[:author]
  @post = params[:post]
  @title = "Welcome to KodaCMS"
  show :myview
end
```

and do...

```html
<% model.blogposts.where{|post| post.author.include? @author && post.alias == @post }.each do |blogpost|%>
	<% safe('No Content has been added yet'){%>
    <h2><%=blogpost.title%></h2>
    <div>
      <%=blogpost.teaser%>
    </div>
	<%}%>
<% end%>
```

### Creating Koda Types

To Create Koda types place a new javascript file in the `/public/koda/koda-types` folder

Register your type in the `/public/koda/koda-types/type_registration.js` file and you can now use it in the Koda Explorer!
A new type will appear under the "User Created" section on the right.


```javascript
{
	"title"  : "Kodacms.org Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/custom-blogpost.js"
		},
		{
			"id" : "_koda_editor",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-editors/generic-editor.html"
		},
		{
			"id" : "_koda_indexes",
			"control" : "input-hidden",
			"defaultValue" : "name,tags"
		},
		{
			"id" : "name",
			"title" : "Name",
			"description" : "The name of the content",
			"control" : "input-text",
			"defaultValue" : "",
			"properties" : "required"
		},
		{
			"id" : "alias",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
/*
	ALL Fields above are required for use with the generic editors.
	You can specify your own rules if you use your own editor.

	Add your custom variables below this comment... for example...
*/
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		}
	]
}
```

[KodaTypes supports most HTML5 input types and validation](http://www.the-art-of-web.com/html/html5-form-validation/)

### Deploying Koda to Heroku

We know that deploying CMS's to production can be a tedious process...
so to deploy koda to production just do...

after installing the koda gem and choosing your starter-kit

```ruby
heroku apps:create myapp
heroku config:add ENABLE_CACHE=true
heroku config:add ENVIRONMENT=production
heroku addons:add mongolab:starter
heroku addons:add memcache:5mb
git push heroku master
```

### Backup / Restore one koda instance to another

Most people want to 'set-up' or create their site on their local machine first and then migrate the content over to production
This couldn't be simpler with koda...

> Set up your data and run the following command on your local machine when done...
`ruby data.rb dump data/`
> Commit your files or zip them up and place them on production and run the following
`ruby data.rb restore data/kodacms`

This will backup /restore all your data and media to file.

### Backup / Restore on Heroku (or other shared hosting)

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

------------------

# Koka RESTful API Reference (for talking directly to the api from a mobile, single page js app etc.)

------------------

## Note about links

All references to other resources follow the json schema format, as specified at http://json-schema.org/json-ref
The only addition is the "title" field, which when present indicates a human readable phrase that is suitable to describe the item.

## Search

Regex Match

`
Request:GET '/api/search?tags=/page/'
Response:[{"href":"/api/pages/homepage","rel":"full"},{"href":"/api/pages/about","rel":"full"},{"href":"/api/pages/contact","rel":"full"}]
`

Exact Match

`
Request:GET '/api/search?tags=home'
Response:[{"href":"/api/pages/homepage","rel":"full"}]
`

Combining

`
Request:GET '/api/search?tags=/page/&someotherproperty=true'
Response:[{"href":"/api/pages/homepage","rel":"full"},{"href":"/api/pages/about","rel":"full"},{"href":"/api/pages/contact","rel":"full"}]
`

Skip and Take

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

*Note* The url for a given resource will either be the internal Mongo ID, or a specifically chosen 'friendly' url. This is determined by the field 'alias', discussed further below.
*Note* The value of title will either be '_koda_title', 'alias', or the Mongo ID, in that order or precedence.

###Documents

'/api/collectionname/documentname' returns the Mongo document stored in that collection.
There are two ways documents can be referred to. First is by the internal Mongo ID, for example

`
Request: GET '/api/trucks/4db0dedb387f7123c9000001'
Response: {"size":"big","wheels":4,"colour":"green","alias":"4db0dedb387f7123c9000001"}
`

Secondly is by the 'alias' value, for example
`
Request: GET '/api/trucks/smallblueone'
Response: {"alias":"smallblueone","size":"small","wheels":4,"colour":"blue"}
`

## Post and Put Requests (currently only logged in users)

Documents can be created two ways - either by posting to the collection url, or putting directly to the desired url

###Post

`
Request: POST '/api/bikes' => {'cost':'expensive', 'speed':'fast', 'gears':27 }
Response: Status 201, Location '/bikes/4db0dedb387f7123c9000007'
/bikes/4db0dedb387f7123c9000007
`

*Note* The internally created Mongo ID will usually be used to create the new resource url, returned in the response body and the Location header. This can be override by supplying a value in the 'alias' field. This must be unique to this collection, otherwise a 409 (Conflict) will be returned, along with the url to the conflicting document in the body.

###Put

`
Request: POST '/api/bikes/bigred' => {'cost':'expensive', 'speed':'slow', 'gears':27, 'colour':'red' }
Response: Status 201, Location 'bikes/bigred'
bikes/bigred
`

*Note* If the document did not already exist, the returned status code will be 201 (Created), otherwise 200 (OK)
*Note* If the "alias" field is present in the request, and contradicts, the url posted to, the url will take precedence.

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

# Any Questions?

KodaCMS on Twitter: @kodacms
Marcel du Preez on Twitter: @marceldupreez

