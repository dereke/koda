/*
	REMOVE ALL COMMENTS BEFORE USING
	querying the properties that you have indexed would be very fast
	using properties that you have not indexes will be slower
*/
{ 
	"filter" : { 
		"tags" : "/home/" // "/substring/" for regex match or "Homepage" for exact match
	},
	"sort" : { // add properties that you would like to sort on (doesn't have to be the indexed props)
		"name" : "1"
	}
}