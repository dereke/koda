// hiddenstring example
{
	"id" : "_koda_indexes",
	"control" : "hiddenstring",
	"defaultValue" : "name,tags"
},
// truefalse example
{
	"id" : "showuserfeed",
	"title" : "Show a user feed?",
	"description" : "Do you want to show a user timeline?",
	"control" : "truefalse",
	"defaultValue" : false
},
// textstring example
{
	"id" : "name",
	"title" : "Name",
	"description" : "The name of the image",
	"control" : "textstring",
	"defaultValue" : ""
},
// collection example
{
	"id" : "type",
	"title" : "Type",
	"description" : "Pick a media type",
	"control" : "collection",
	"values" : "png,jpg,mp3,avi",
	"defaultValue" : "jpg"
},
// imageupload example
{
	"id" : "file",
	"title" : "File",
	"description" : "The file to upload",
	"control" : "imageupload",
	"defaultValue" : ""
},
//passwordstring example
{
	"id" : "password",
	"title" : "Password",
	"description" : "Please enter your password",
	"control" : "passwordstring",
	"defaultValue" : ""
},
//textarea example
{
	"id" : "teaser",
	"title" : "Teaser text",
	"description" : "The teaser text at the bottom",
	"control" : "textarea",
	"defaultValue" : ""
},
// richtext example
{
	"id" : "body",
	"title" : "Body text",
	"description" : "The text under the teaser",
	"control" : "richtext",
	"defaultValue" : ""
},
// kodalinkeditor example
{
	"id" : "_koda_doc_links",
	"title" : "Document Link",
	"description" : "Link to another doc",
	"control" : "kodalinkeditor",
	"defaultValue" : ""
}