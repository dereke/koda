{
	"id" : "userCustomType",
	"title" : "Custom - User",
	"description" :"Add a user item",
	"icon" : "/assets/images/group_add.png",
	"editor" : "/koda-editors/generic-editor.html",
	"fields" : [
		{
			"id" : "_koda_ref",
			"control" : "hiddenstring",
			"defaultValue" : ""
		},
		{
			"id" : "_koda_type",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-types/custom-user.js"
		},	
		{
			"id" : "_koda_editor",
			"control" : "hiddenstring",
			"defaultValue" : "/koda-editors/generic-editor.html"
		},
		{
			"id" : "name",
			"title" : "Username",
			"description" : "Prefered Username",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "fullname",
			"title" : "Fullname",
			"description" : "User fullname",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "email",
			"title" : "Email address",
			"description" : "email address of user",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "password",
			"title" : "Password",
			"description" : "Your password",
			"control" : "textstring",
			"defaultValue" : ""
		},
		{
			"id" : "confirmpassword",
			"title" : "Confirm password",
			"description" : "Confirm your password",
			"control" : "textstring",
			"defaultValue" : ""
		}
	]
}