{
	"title"  : "Koda Media Editor",
	"fields" : [
		{
			"id" : "_koda_type",
			"control" : "input-hidden",
			"defaultValue" : "/koda/koda-types/koda-media.js"
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
			"description" : "The name of the image",
			"control" : "input-text",
			"properties" : "required",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_ref",
			"title" : "Alias",
			"description" : "This will be generated from the title",
			"control" : "input-readonly",
			"defaultValue" : ""
		},
		{
			"id" : "mime_type",
			"title" : "Mime Type",
			"description" : "Pick the type of file to upload",
			"control" : "collection",
			"values" : "application/pdf,application/zip, application/gzip,image/gif,image/jpeg,image/png,audio/mpeg,audio/ogg,video/mpeg,video/mp4,video/x-flv",
			"defaultValue" : "image/png"
		},
		{
			"id" : "media_file",
			"title" : "File to upload",
			"description" : "The media file to upload",
			"control" : "mediaupload",
			"defaultValue" : ""
		},
		{
			"id" : "tags",
			"title" : "Tags",
			"description" : "Comma separated",
			"control" : "input-text",
			"defaultValue" : ""
		}
	]
}