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
			this.controls[key] = control;
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
		},
		
		hiddenString: function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="hidden" id="'+identifier+'" name="'+identifier+'" />',
				value: '',
				bind : function(form) {
					
				},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		kodaLinkEditor : function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="text" id="'+identifier+'" name="'+identifier+'" />',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
			
		textString: function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="text" id="'+identifier+'" name="'+identifier+'"/>',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		readOnlyString: function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="text" id="'+identifier+'" name="'+identifier+'" disabled="disabled"/>',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		passwordString: function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="password" id="'+identifier+'" name="'+identifier+'"/>',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		trueFalse: function(identifier) {
			
			return {
			
				id : identifier,
				defaultValue: '',
				html : '<input type="checkbox" id="'+identifier+'" name="'+identifier+'" />',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		textArea: function(identifier) {
			
			return {
			
				defaultValue: '',
				id : '',
				html : '<textarea id="'+identifier+'" name="'+identifier+'" class="input-xlarge"></textarea>',
				value: '',
				bind : function() {},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
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
		
		richText: function(identifier) {
			
			return {
			
				defaultValue: '',
				id : '',
				html : '<div class="richTextEditor" style="display:none"><textarea id="'+identifier+'" name="'+identifier+'"></textarea></div>',
				value: '',
				bind : function() {
					$('.richTextEditor').show();
					new nicEditor().panelInstance(identifier);					
				},
				create: function(id, value) {
					this.id = id;
					this.defaultValue = value;
					return this.html;
				},
				getValue: function(){
					return nicEditors.findEditor(this.id).getContent();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('textarea#'+this.id).val(value);
					}
				}
			}
			
		},
		
		imageUpload: function(identifier) {
			
			return {
			
				defaultValue: '',
				mediaKey: '',
				id : '',
				html : '<input type="hidden" id="'+identifier+'_file" /><ul id="'+identifier+'" class="unstyled fileuploader"></ul>',
				value: '',
				bind : function(){
					var uploader = new qq.FileUploader({
						element: $('.fileuploader')[0],
					    action: PathHelper.getPath('/_koda_media'),
						onComplete : this.complete
					});
				},
				create: function(id, value) {					
					this.id = id;
					this.defaultValue = value;
					return this.html;
				},
				getValue: function(){
					return $('#'+identifier+'_file').val();
				},
				setValue: function(value) {
					$('#'+identifier+'_file').val(value);
					$('#'+identifier+'_file').prev().append('<img class="uploadedImage" id="'+this.id+'_image" src="'+value+'" />');
				},
				complete : function(id, filename, response){
					$('#'+identifier+'_file').val(response.location);
					$('#'+identifier+'_image').attr('src', response.location+'?'+Math.random());
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
		
		var newControl = $.extend(true, {}, controls.all[field.control](field.id));
		controlsCollection[field.id] = newControl;
		
		if(field.title) {
			var labelHtml = $('<label class="control-label" for="'+field.id+'">'+field.title+'</label>');
			controlGroup.append(labelHtml);
		}

		var controlHtml = $(newControl.create(field.id, field.defaultValue));
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
				
				if(key in this.converters){
					this.converters[key](content[key], control);
				} else {
					if(content[key] != undefined && content[key] != null){
			  			control.setValue(content[key]);
					} else {
						control.setValue(control.defaultValue);
					}
					
					control.bind();
				}
			}
			
		}
	}

};
	
