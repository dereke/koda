## Control Usages

```javascript
{
	"id" : "name",
	"title" : "Title",
	"description" : "Title of page",
	"control" : "input-text",
	"properties" : "required  placeholder='type a page title'",
	"defaultValue" : ""
}
```

###  Loading data into controls from Ajax (lists)

```javascript
{
	"id" : "homepage",
	"title" : "Select homepage",
	"description" : "Select the homepage",
	"control" : "collection",
	"defaultValue" : "",
	"ajax" : {
		"url" : "/content/mycollection",
		"displayfield" : "title",
		"valuefield" : "href"
	}
}
```

###  Loading data into controls from Ajax (single values)

```javascript
{
	"id" : "name",
	"title" : "Title",
	"description" : "Title of page",
	"control" : "input-text",
	"properties" : "required  placeholder='type a page title'",
	"defaultValue" : "",
	"ajax" : {
		"url" : "/content/pages/pageone",
		"displayfield" : "title"
	}
}
```

### Available data types

> input-hidden
> input-color
> input-date
> input-text
> input-password
> input-email
> input-url
> input-number
> input-range
> input-readonly
> imageupload
> mediaupload
> textarea
> richtext
> kodalinkeditor
> truefalse

### Collections

> collection
> collection-multi

```javascript
{
	"id" : "homepage",
	"title" : "Select homepage",
	"description" : "Select the homepage",
	"control" : "collection",
	"defaultValue" : "",
	"values" : "value1,value2,value3,value4"
}
```

