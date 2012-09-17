/*
   ----------------------------------------------------------
	KodaEditor 
   ----------------------------------------------------------
*/
var Editor = Editor || {};
var RootUrl = '/api';

String.prototype.startsWith = function(str) 
{return (this.match("^"+str)==str)}

var PathHelper = {
	getPath : function(path) {
		if(path.startsWith('/'))
			return (RootUrl + path).toLowerCase();
		else {
			return (RootUrl + '/' + path).toLowerCase();
		}
	}
}

Editor.Api = function() {
	
	function getParam(key) {

	  	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	  	var qs = regex.exec(window.location.href);

	    if(qs != undefined && qs.length > 0)
			return qs[1];

		return "";

	}
	
	var itemUrl = getParam('url');
	var typeUrl = getParam('kodatype');
	var isNew = getParam('isnew') == 'true';
	
	return {
			
			isNew: isNew,
			
			typeUrl : typeUrl,
			
			itemUrl: itemUrl,

			get: function(path, callback) {

				jQuery.ajax({
				    type: "GET",
				    url: path + '?include=false&cachebuster=' + new Date().getTime(),
				    dataType: "json",
				    success: function(results){
				        callback(results);
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
						callback(null);
				    }
				});

			},

			delete: function(path, callback) {

				jQuery.ajax({
				    type: "DELETE",
				    url: path,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(result){
				        callback(result);
				    }
				});

			},

			put: function(path, resource, callback) {

				jQuery.ajax({
				    type: "PUT",
				    url: path,
					data: resource,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(result){
				        if(result.status == "201" || result.status == "200") {
							callback("OK")
						}
						else {
							callback(result.status);
						}
				    }
				});

			},


			post: function(path, resource, callback) {

				jQuery.ajax({
				    type: "POST",
				    url: path,
					data: resource,
				    dataType: "json",
				    success: function(result){
						callback("OK");
				    },
				    error: function(result){

				        if(result.status == "201" || result.status == "200") {
							callback("OK")
						}
						else {
							callback(result.status);
						}
				    }
				});

			}

		}
}();

Editor.Controls = function() {
	
	return {
		
		all: new Object(),
		
		registerControl: function(key, control){
			this.all[key] = control;
		},
		
		load: function() {
			this.all['hiddenstring'] = this.hiddenString;
			this.all['textstring'] = this.textString;
			this.all['imageupload'] = this.imageUpload;
			this.all['textarea'] = this.textArea;
			this.all['passwordstring'] = this.passwordString;
			this.all['richtext'] = this.richText;
			this.all['kodalinkeditor'] = this.kodaLinkEditor;
			this.all['truefalse'] = this.trueFalse;
			this.all['readonlystring'] = this.readOnlyString;
			this.all['collection'] = this.collection;
		},
		
		hiddenString: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="hidden" id="'+field.id+'" name="'+field.id+'" />',
				value: '',
				bind : function(callback) {
					callback();
				},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).val(value);
					}
				}
			}
			
		},
		
		kodaLinkEditor : function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="text" id="'+field.id+'" name="'+field.id+'" />',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).val(value);
					}
				}
			}
			
		},
		/*
			USAGE:
			"source" : "/api",
			"text" : "title",
			"value" : "title"
			
			OR
			
			"values" : "comma,separated,values"
		*/
		collection: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<select id="'+field.id+'" name="'+field.id+'"/>',
				value: '',
				bind : function(callback) {
					var control = $('select#'+this.id);
					if(field.values) {
						var options = field.values.split(',');
						options.splice(0,0,"--Select--");
						var id = field.id;
						$.each(options, function(i, item){
							control.append('<option value="'+item+'">'+item+'</option>');
						});
						callback();
					}
				},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('select#'+this.id).val();
				},
				setValue: function(value) {
					$('select#'+this.id).val(value);
				}
			}
			
		},
			
		textString: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="text" id="'+field.id+'" name="'+field.id+'"/>',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).val(value);
					}
				}
			}
			
		},
		
		readOnlyString: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="text" id="'+field.id+'" name="'+field.id+'" disabled="disabled"/>',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).val(value);
					}
				}
			}
			
		},
		
		passwordString: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="password" id="'+field.id+'" name="'+field.id+'"/>',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).val(value);
					}
				}
			}
			
		},
		
		trueFalse: function(field) {
			
			return {
			
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="checkbox" id="'+field.id+'" name="'+field.id+'" />',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+this.id).is(':checked');
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+this.id).attr('checked', value);
					}
				}
			}
			
		},
		
		textArea: function(field) {
			
			return {
			
				defaultValue: field.defaultValue,
				id : field.id,
				html : '<textarea id="'+field.id+'" name="'+field.id+'" class="input-xlarge"></textarea>',
				value: '',
				bind : function(callback) {callback();},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('textarea#'+this.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('textarea#'+this.id).val(value);
					}
				}
			}
			
		},
		
		richText: function(field) {
			
			return {
			
				defaultValue: field.defaultValue,
				id : field.id,
				html : '<div class="richTextEditor" style="display:none"><textarea id="'+field.id+'" name="'+field.id+'"></textarea></div>',
				value: '',
				bind : function(callback) {
					$('.richTextEditor').show();
					new nicEditor().panelInstance(field.id);					
					callback();
				},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return nicEditors.findEditor(this.id).getContent();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						nicEditors.findEditor(this.id).setContent(value);
					}
				}
			}
			
		},
		
		imageUpload: function(field) {
			
			return {
			
				defaultValue: field.defaultValue,
				mediaKey: '',
				id : field.id,
				html : '<input type="hidden" id="'+field.id+'_file" /><ul id="'+field.id+'" class="unstyled fileuploader"></ul>',
				value: '',
				bind : function(callback){
					var uploader = new qq.FileUploader({
						element: $('.fileuploader')[0],
					    action: PathHelper.getPath('/_koda_media'),
						onComplete : this.complete
					});
					
					callback();
				},
				create: function() {					
					return this.html;
				},
				getValue: function(){
					return $('#'+this.id+'_file').val();
				},
				setValue: function(value) {
					$('#'+field.id+'_file').val(value);
					$('#'+field.id+'_file').prev().append('<img class="uploadedImage" id="'+field.id+'_image" src="'+value+'" />');
				},
				complete : function(id, filename, response){
					$('#'+field.id+'_file').val(response.location);
					$('#'+field.id+'_image').attr('src', response.location+'?'+Math.random());
				}
				
			}
		}
		
	}
	
}();

Editor.Form = function(container, spec, onSubmit) {

	var controls = Editor.Controls;
	controls.load();
	
	var controlsCollection = new Object();

	var form = $('<form id="koda-form" name="koda-form" method="post" class="form-horizontal"></form>');
	var fieldset = $('<fieldset></fieldset>');
	var legend = $('<legend>Koda Type Editor</legend>');
	
	fieldset.append(legend);
	
	$.each(spec.fields, function(i, field){
		
		var controlGroup = $('<div class="control-group"></div>');
		
		var newControl = $.extend(true, {}, controls.all[field.control](field));
		controlsCollection[field.id] = newControl;
		
		if(field.title) {
			var labelHtml = $('<label class="control-label" for="'+field.id+'">'+field.title+'</label>');
			controlGroup.append(labelHtml);
		}

		var controlHtml = $(newControl.create());
		controlGroup.append(controlHtml);
		
		if(field.description) {
			var descriptionHtml = $('<span class="help-inline">'+field.description+'</span>');
			controlGroup.append(descriptionHtml);
		}
		
		fieldset.append(controlGroup);
		
	});
	
	form.submit(function(evt) {
		
		evt.preventDefault();
		
		var formContent = new Object();
		for (var key in controlsCollection) {
		  formContent[key] = controlsCollection[key].getValue();
		};
		
		onSubmit(formContent);
		
	});
	
	var actionGroup = $('<div class="form-actions"></div>');
	
	actionGroup.append('<button type="submit" class="btn btn-primary">Save</button><div class="spacer"></div>');
	
	actionGroup.append('<div id="status" style="display:none"></div>');
	fieldset.append(actionGroup);
	
	if(spec.is_readonly){
		$('button[type="submit"]').attr("disabled", true);
		$('#status').text('This form is readonly');
	}
	
	form.append(fieldset);
	container.append(form);
	
	$('input[type="hidden"]').parent().addClass('no-wrap');
	
	return {
		converters: Object(),
		
		registerConverter: function(property, converter){
			this.converters[property] = converter;
		},
		
		load : function(content) {

			for (var key in controlsCollection) {
				var control = controlsCollection[key];
				var converters = this.converters;
				control.bind(function(){
					if(key in converters){
						converters[key](content[key], control);
					} else {
						if(content[key] != undefined && content[key] != null){
				  			control.setValue(content[key]);
						} else {
							control.setValue(control.defaultValue);
						}
					}
				});
			}
			
		}
	}

};
	
