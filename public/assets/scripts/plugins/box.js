var Options = {mode : "prod", minify : "true" };
function Box(host, include, options){
	for(var key in options){
		Options[key] = options[key];
	}
	var url = "http://www.boxjs.com/boxme?host="+host+"&include="+include.join(',')+"&mode="+Options.mode+"&minify="+Options.minify;
	document.write('<scr'+'ipt src=\"'+url+'\"></scr'+'ipt>');
};