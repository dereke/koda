/*
   ----------------------------------------------------------
	KodaEditor 
   ----------------------------------------------------------
*/
var Editor = Editor || {};
var RootUrl = '/api';

String.prototype.startsWith = function(str) {
	return (this.match("^"+str)==str)
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

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
			
			getError : function(error) {
				if(error.status == 405){
					return 'You were not allowed to perform this action!'
				}
				
				return error.statusText;
			},

			get: function(path, callback) {
				self = this;
								
				jQuery.ajax({
				    type: "GET",
				    url: path + '?include=false&cachebuster=' + new Date().getTime(),
				    dataType: "json",
				    success: function(results){
				        callback(results);
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
				        callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
				    }
				});

			},

			delete: function(path, callback) {
				self = this;
				
				jQuery.ajax({
				    type: "DELETE",
				    url: path,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(XMLHttpRequest, textStatus, errorThrown){
				        callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
				    }
				});

			},

			put: function(path, resource, callback) {
				self = this;
				
				jQuery.ajax({
				    type: "PUT",
				    url: path,
					data: resource,
				    dataType: "json",
				    success: function(result){
				        callback("OK");
				    },
				    error: function(XMLHttpRequest){
				        if(XMLHttpRequest.status == "201" || XMLHttpRequest.status == "200") {
							callback("OK")
						}
						else {
							callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
						}
				    }
				});

			},


			post: function(path, resource, callback) {
				self = this;
				
				jQuery.ajax({
				    type: "POST",
				    url: path,
					data: resource,
				    dataType: "json",
				    success: function(result){
						callback("OK");
				    },
				    error: function(XMLHttpRequest){
				        if(XMLHttpRequest.status == "201" || XMLHttpRequest.status == "200") {
							callback("OK")
						}
						else {
							callback({error: self.getError(XMLHttpRequest), code: XMLHttpRequest.status});
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
			
			this.all['input-hidden'] = this.inputType;
			this.all['input-color'] = this.inputType;
			this.all['input-date'] = this.inputType;
			this.all['input-text'] = this.inputType;
			this.all['input-password'] = this.inputType;
			this.all['input-email'] = this.inputType;
			this.all['input-url'] = this.inputType;
			this.all['input-number'] = this.inputType;
			this.all['input-range'] = this.inputType;
			this.all['input-readonly'] = this.readOnlyString;
			this.all['imageupload'] = this.imageUpload;
			this.all['mediaupload'] = this.mediaUpload;
			this.all['textarea'] = this.textArea;
			this.all['richtext'] = this.richText;
			this.all['kodalinkeditor'] = this.kodaLinkEditor;
			this.all['truefalse'] = this.trueFalse;
			this.all['collection'] = this.collection;
			
		},
		
		inputType : function(field) {
			
			var sections = field.control.split('-');
			
			if(sections.length < 2) {
				throw 'Invalid control identifier';
			}
			
			var type = sections[1];
			var properties = field.properties ? field.properties : '';

			return {
				
				id : field.id,
				defaultValue: field.defaultValue,
				html : '<input type="'+type+'" id="'+field.id+'" name="'+field.id+'" '+properties+' />',
				value: '',
				bind : function(callback) {
					callback();
				},
				create: function() {
					return this.html;
				},
				getValue: function(){
					return $('input#'+field.id).val();
				},
				setValue: function(value) {
					if(value != undefined && value != 'undefined') {
						$('input#'+field.id).val(value);
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
					new nicEditor({
						uploadURI : PathHelper.getPath('/_koda_media'), 
						buttonList : [
							'bold',
							'italic',
							'underline',
							'left',
							'center',
							'ol',
							'ul',
							'removeformat',
							'image',
							'upload',
							'link',
							'xhtml'
							]
					}).panelInstance(field.id);					
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
		
		// Please set an input with id=mime_type to the correct mime-type to upload
		// Otherwise it will default to nothing and let the browser decide		
		mediaUpload: function(field) {
			
			return {
			
				defaultValue: field.defaultValue,
				mediaKey: '',
				id : field.id,
				html : '<input type="hidden" id="'+field.id+'_file" /><ul id="'+field.id+'" class="unstyled fileuploader"></ul>',
				value: '',
				bind : function(callback){
 					var uploader = new qq.FileUploader({
						element: $('ul#'+field.id)[0],
					    action: PathHelper.getPath('/_koda_media'),
						onSubmit : function() {
							
							var control = $('#mime_type');

							if(control) {
								var type = control.val();

							 	uploader.setParams({
									"content_type" : type
								});
							}
							
						},
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
				},
				complete : function(id, filename, response){
					$('#'+field.id+'_file').val(response.location);
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
						element: $('ul#'+field.id)[0],
					    action: PathHelper.getPath('/_koda_media'),
						onSubmit : function(id, filename) {
							
							var content_type = '';

							if(filename.endsWith('.png')) {
							 	content_type = "image/png";
							} 
							else if(filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
							 	content_type = "image/jpeg";							}
							else if(filename.endsWith('.gif')) {
							 	content_type = "image/gif";
							}
							
							uploader.setParams({
								"content_type" : content_type
							});
													
						},
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
					$('#'+field.id+'_file').parent().append('<img class="uploadedImage" id="'+field.id+'_image" src="'+value+'" />');
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

	if(!spec) throw 'Could not parse KodaType';
	
	var controls = Editor.Controls;
	controls.load();
	
	var controlsCollection = new Object();

	var form = $('<form id="koda-form" name="koda-form" method="post" class="form-horizontal"></form>');
	var fieldset = $('<fieldset></fieldset>');
	var legend = $('<legend>Koda Type Editor</legend>');
	
	fieldset.append(legend);
	
	$.each(spec.fields, function(i, field) {
		
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
	
