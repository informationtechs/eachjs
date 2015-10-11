/* ========================================================================
 * EachJS API Connection Library
 * Inspired by the Twitter Bootstrap & the AugularJS
 * ========================================================================
 * Copyright (c) 2015 Joe Gao
 * Licensed under MIT:
 * http://www.opensource.org/licenses/mit-license.php
 * ======================================================================== */
// Global
// 03/18/2015 v0.1
// 04/05/2015 v0.2
// 04/11/2015 v0.3
// 04/26/2015 v0.4
// 05/30/2015 v0.5
// 08/07/2015 v0.6: Combined eachjs functions together and re-group them.
// v0.7: Re-define output data to support any entity value/html/attribute, URL parameters, storage, and cookie
// Renamed data-parameter to data-input and data-target to data-output and their related attribute names
// V0.8: Re-structure the eachjs as mediator; Add custom function support
// v0.9: Simplified logic by removing mediator and combining "base" and "element" classes.
// Added -ej to attributes, non-click events
// v0.10: added input array support
// v0.11: Standardize formats
// Data: {{}}, Action: (), Parameter/Attribute: <>, Model: <>
// The core has 2 functions: the executeAjax to communicate with web API and
//	the Register to link HTML elements with the communication built by executeAjax
// The core is the ProcessData function which calls many sub-functions to populate or process data
// The handleErrors function is to handle errors and failures
//TODO: add data-operation sync/async
//TODO: jquery selector/key name hints (tolerance customizable)
//TODO; add complex JSON schema definition for parameters
//TODO: add smart error detection and suggestions
//TODO: custom output action extension
//TODO: add warning/debug messages
var eachjs = eachjs || {};
// HTML tag attributes are customizable
eachjs.attributes = { 
	dataLoad: "data-ej-load",
	dataChange: "data-ej-change",
	dataClick: "data-ej-click",
	dataDoubleClick: "data-ej-doubleclick",
	dataKeyDown: "data-ej-keydown",
	dataKeyUp: "data-ej-keyup",
	dataMouseDown: "data-ej-mousedown",
	dataMouseUp: "data-ej-mouseup",
	dataRightClick: "data-ej-rightclick",
	// Match with data keys
	dataModel: "data-ej-model",
	// Input
	dataLoadInput: "data-ej-load-input",
	dataChangeInput: "data-ej-change-input",
	dataClickInput: "data-ej-click-input",
	dataDoubleClickInput: "data-ej-doubleclick-input",
	dataKeyDownInput: "data-ej-keydown-input",	
	dataKeyUpInput: "data-ej-keyup-input",
	dataMouseDownInput: "data-ej-mousedown-input",	
	dataMouseUpInput: "data-ej-mouseup-input",
	dataRightClickInput: "data-ej-rightclick-input",
	// Required to get authorization for data submission
	dataLoadAuth: "data-ej-load-auth",
	dataChangeAuth: "data-ej-change-auth",
	dataClickAuth: "data-ej-click-auth",
	dataDoubleClickAuth: "data-ej-doubleclick-auth",
	dataKeyDownAuth: "data-ej-keydown-auth",	
	dataKeyUpAuth: "data-ej-keyup-auth",
	dataMouseDownAuth: "data-ej-mousedown-auth",
	dataMouseUpAuth: "data-ej-mouseup-auth",
	dataRightClickAuth: "data-ej-rightclick-auth",
	// Indicates repeat data key. Can be empty.
	dataRepeat: "data-ej-repeat",
	// Output
	dataLoadOutput: "data-ej-load-output", 
	dataChangeOutput: "data-ej-change-output",
	dataClickOutput: "data-ej-click-output",
	dataDoubleClickOutput: "data-ej-doubleclick-output",
	dataKeyDownOutput: "data-ej-keydown-output",
	dataKeyUpOutput: "data-ej-keyup-output",
	dataMouseDownOutput: "data-ej-mousedown-output",
	dataMouseUpOutput: "data-ej-mouseup-output",
	dataRightClickOutput: "data-ej-rightclick-output",
	// Error
	dataLoadError: "data-ej-load-error",
	dataChangeError: "data-ej-change-error",
	dataClickError: "data-ej-click-error",
	dataDoubleClickError: "data-ej-doubleclick-error",
	dataKeyDownError: "data-ej-keydown-error",
	dataKeyUpError: "data-ej-keyup-error",
	dataMouseDownError: "data-ej-mousedown-error",
	dataMouseUpError: "data-ej-mouseup-error",
	dataRightClickError: "data-ej-rightclick-error",
	// The base URL
	dataBase: "data-ej-base",
};
// Storage methods
eachjs.storageMethods = {
	element: "element", // Default
	url: "url",
	storage: "storage",
	localstorage: "localstorage",
	sessionstorage: "sessionstorage",
	cookie: "cookie",
};
eachjs.events = {
	load: "load",
	change: "change",
	click: "click",
	doubleclick: "doubleclick",
	keyup: "keyup",
	keydown: "keydown",
	mouseup: "mouseup",
	mousedown: "mousedown",
	rightclick: "rightclick",
};
eachjs.actions = {
	addclass: "addclass",
	class: "class",
	clear: "clear",
	disable: "disable",
	enable: "enable",
	fadein: "fadein",
	fadeout: "fadeout",
	// Show for a period of time and then hide. Default is 800 milliseconds
	flash: "flash",
	hide: "hide",
	populate: "populate",
	// Reload data
	reload: "reload",
	reset: "reset",
	removeclass: "removeclass",
	show: "show",
};
eachjs.reservedDataKeys = {
	//TODO: "average", "sum"
	index: "i",
	average: "average",
	sum: "sum", 
	count: "count",
};
eachjs.systemAttributes = {	
	// Element id
	dataEid: "data-eid",
	// Page shared unified id
	// This id keeps same without a refresh and can thus be used as part of cache keys
	dataPsid: "data-psid"
};
eachjs.registeredElements = [];
eachjs.restorableElements = [];
eachjs.carryOverVars = [];
eachjs.actionStatuses = [];
eachjs.actionStatusEnum = {
	processing: 1,
	completed: 10,
	failed: -1
};
eachjs.defaultChildTags = [];
eachjs.optionalChildTags = [];
// Default attribute or value source
eachjs.valuables = [];
// Evaluates if the string can be converted into JSON format
eachjs.isJson = function(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
// Register default child tag
eachjs.registerDefaultChildTag = function(tag, childTag) {
	var exists = false;
	for(var i = 0, len = this.defaultChildTags.length; i < len; i++) {
		if( this.defaultChildTags[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.defaultChildTags.push({ tag: tag, childTag: childTag });
	}	
};
// Get default child tag
eachjs.getDefaultChildTag = function(tag) {
	var childTag;
	for(var i = 0, len = this.defaultChildTags.length; i < len; i++) {
		if( this.defaultChildTags[i].tag === tag ) {
			childTag = this.defaultChildTags[i].childTag;
			break;
		}        	
	}
	return childTag;
};
// Register optional child tag
eachjs.registerOptionalChildTag = function(tag, childTag) {
	var exists = false;
	for(var i = 0, len = this.optionalChildTags.length; i < len; i++) {
		if( this.optionalChildTags[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.optionalChildTags.push({ tag: tag, childTag: childTag });
	}	
};
// Get optional child tag
eachjs.getOptionalChildTag = function(tag) {
	var childTag;
	for(var i = 0, len = this.optionalChildTags.length; i < len; i++) {
		if( this.optionalChildTags[i].tag === tag ) {
			childTag = this.optionalChildTags[i].childTag;
			break;
		}        	
	}
	return childTag;
};
// Register default attribute
eachjs.registerValuable = function(tag, attribute) {
	var exists = false;
	for(var i = 0, len = this.valuables.length; i < len; i++) {
		if( this.valuables[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.valuables.push({ tag: tag, attribute: attribute });
	}	
};
// Get default attribute
eachjs.getValuable = function(tag) {
	var attribute;
	for(var i = 0, len = this.valuables.length; i < len; i++) {
		if( this.valuables[i].tag === tag ) {
			attribute = this.valuables[i].attribute;
			break;
		}        	
	}
	return attribute;
};
// Register tag control for an easier tracking
eachjs.registerElement = function(tag, element) {
	var exists = false;
	for(var i = 0, len = this.registeredElements.length; i < len; i++) {
		if( this.registeredElements[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.registeredElements.push({ tag: tag, element: element });
	}
};
// Get registered HTML element
eachjs.getRegisteredElement = function(tag) {
	var element;
	for(var i = 0, len = this.registeredElements.length; i < len; i++) {
		if( this.registeredElements[i].tag === tag ) {
			element = this.registeredElements[i].element;
			break;
		}        	
	}
	return element;
};
// Register action status
eachjs.registerActionStatus = function(eid, status) {
	var isUpdated = false;
	for(var i = 0, len = this.actionStatuses.length; i < len; i++) {
		if( this.actionStatuses[i]["eid"] === eid ) {
			this.actionStatuses[i]["status"] = status;
			isUpdated = true;
			break;
		}        	
	}
	if (!isUpdated) {
		this.actionStatuses.push({ eid: eid, status: status });
	}
};
// Get registered action status
eachjs.getRegisteredActionStatus = function(eid) {
	var actionStatus;
	for(var i = 0, len = this.actionStatuses.length; i < len; i++) {
		if( this.actionStatuses[i].eid === eid ) {
			actionStatus = this.actionStatuses[i].status;
			break;
		}        	
	}
	return actionStatus;
};
// Add the original element contents to array so they can be re-storable when needed to refresh
eachjs.registerRestorableElementHtmlContent = function(eid, htmlContent) {
	var exists = false;
	for (var i = 0, len = this.restorableElements.length; i < len; i++) {
		if (eid != undefined && this.restorableElements[i].eid === eid) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.restorableElements.push({ eid: eid, htmlContent: htmlContent });
		return true;
	} else {
		return false;
	}		
};
// Restore the original element contents
eachjs.getRestorableElementHtmlContent = function(eid) {
	var htmlContent;
	if (eid != undefined) {
		for (var i = 0, len = this.restorableElements.length; i < len; i++) {
			if (eid != undefined && this.restorableElements[i].eid === eid) {
				htmlContent = this.restorableElements[i].htmlContent;
				break;
			}        	
		}
	}
	return htmlContent;
};

eachjs.registerCarryOverVars = function(eid, vars) {
	var isUpdated = false;
	for(var i = 0, len = this.carryOverVars.length; i < len; i++) {
		if( this.carryOverVars[i]["eid"] === eid ) {
			this.carryOverVars[i]["vars"] = vars;
			isUpdated = true;
			break;
		}        	
	}
	if (!isUpdated) {
		this.carryOverVars.push({ eid: eid, vars: vars });
	}
};

eachjs.getCarryOverVars = function(eid) {
	var vars;
	if (eid != undefined) {
		for (var i = 0, len = this.carryOverVars.length; i < len; i++) {
			if (eid != undefined && this.carryOverVars[i].eid === eid) {
				vars = this.carryOverVars[i].vars;
				break;
			}        	
		}
	}
	return vars;
};
// Get page shared unified id (lower) in the <body> tag
eachjs.getPsid = function() {
	var psid = $("body").attr(this.systemAttributes.dataPsid);
	// Custom page shared unified id
	if (psid == undefined) {
		psid = Math.uuid().toLowerCase();
		$("body").attr(this.systemAttributes.dataPsid, psid);
	}
	return psid;
};	
// Get element unified id (lower)
eachjs.getEid = function(element) {
	var eid = $(element).attr(this.systemAttributes.dataEid);
	// Custom element unified id
	if (eid == undefined) {
		eid = Math.uuid().toLowerCase();
		$(element).attr(this.systemAttributes.dataEid, eid);
	}
	return eid;
};
// Get data URL
eachjs.getUrl = function(element, url) {
	if (url != undefined && url.toLowerCase().indexOf("http://") != 0 && url.toLowerCase().indexOf("https://") != 0) {
		var basePrefix = $(document.body).attr(this.attributes.dataBase);
		if (basePrefix.slice(-1) == "/") {
			basePrefix = basePrefix.slice(0, -1);
		}
		if (url.charAt(0) != "/") {
			url = "/" + url;
		}
		url = basePrefix + url;
	}		
	return url;
};
// Set content in element
eachjs.setContent = function(element, data) {
	var valuable = this.getValuable(element.prop("tagName").toLowerCase());
	if (valuable !== undefined) {
		if (valuable === "value") {
			element.val(data);
		} else {
			element.attr(valuable, data);
		}
	} else {
		element.html(data);
	}
};
// Get content from element
eachjs.getContent = function(element) {
	var content;
	var valuable = this.getValuable(element.prop("tagName").toLowerCase());
	if (valuable != undefined) {
		if (valuable === "value") {
			content = element.val();
		} else {
			content = element.attr(valuable);
		}
	} else {
		content = element.html();
	}
	return content;
};
// Get data model from attribute if not set
eachjs.getDataModelAtAttribute = function(dataModel, selector) {
	if (dataModel == undefined) {
		dataModel = $(selector).attr(this.attributes.dataModel);
	}
	return dataModel;
}
// Get string in the parentheses
//  For example, get "post" from "(post)/data/items"
eachjs.getPartWithinParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\(([\#\<\w,-\>]*)\)/gi;
		//var rgx = /\((\#?\<?\w+\>?)\)/gi;
		//var rgx = /\(([\w\,]+)\)/gi;
		//var rgx  = /\(([\w\,]+)(\#?\<?\w*\>?)\)/gi;
		// Get "refresh" from "#name(refresh<800>)"
		//var rgx  = /\(([\w\,]+)(\<?)(\w*)(\>?)\)/gi;
		// Get "refresh" from "#name(refresh<800>)"
		//var rgx  = /\(([\w\,]+)(\<?)(\w*)(\>?)\)/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[1];
		}
	}
	return matched;
};
// Get string in the leading parentheses
//  For example, get "storage" from "(storage)accountToken(blah)"
eachjs.getPartWithinLeadingParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^\(([\#\<\w,-\>]*)\).+/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[1];
		}
	}
	return matched;	
};
// Get string after the parentheses
//  For example, get "#name" from "#name(refresh<800>)"
eachjs.getPartWithoutParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\(([\#\<\w,-\>]*)\)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};	
// Get string in the leading parentheses
//  For example, get "accountToken(blah)" from "(storage)accountToken(blah)"
eachjs.getPartWithoutLeadingParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^\(([\#\<\w,-\>]*)\)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
eachjs.getPartWithinBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\[([\#\<\w,-\>\$\!]*)\]/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[1];
		}
	}
	return matched;
};
eachjs.getPartWithoutBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\[([\#\<\w,-\>\$\!]*)\]/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
eachjs.getPartWithinAngleBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\<([\#\<\w,-\>:]*)\>/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[1];
		}
	}
	return matched;
};
eachjs.getPartWithoutAngleBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\<([\#\<\w,-\>:]*)\>/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
// Get part before @, for example, get "name" from "name@#itemName".
eachjs.getPartBeforeAtChar = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^.*?(?=@)/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
};
// Get part after @, for example, get "#itemName" from "name@#itemName" 
// 	or "(cookie)price" from "price@(cookie)price".	
eachjs.getPartAfterAtChar = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /[^@]*$/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
}
// Get part before :, for example, get "post" from "post:/data/items".
eachjs.getPartBeforeColon = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^.*?(?=:)/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
};
// Get part after :, for example, get "/data/items" from "post:/data/items".
eachjs.getPartAfterColon = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /[^:]*$/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
}
// Get part before the first [], for example, get "items" from "items[0].name"
eachjs.getPartBeforeBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^.*?(?=\[\w*\])/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
}
// Get part after the last []., for example, get "name" from "items[0].name"
eachjs.getPartAfterBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /[^@\[\].]*$/gi;
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
}
// Remove change line and space characters
eachjs.getPartWithoutNewLineAndSpaceChars = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /(\r\n|\n|\r|\s)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
}
// Set cookie
eachjs.setCookie = function (cookieName, value, extendedHours) {
	try {
		if (!cookieName) return false;
		var expirationDate = new Date();
		expirationDate.setHours(expirationDate.getDate() + extendedHours);
		var cookieValue = escape(value) + ((extendedHours == null) ? "" : "; expires=" + expirationDate.toUTCString());
		document.cookie = cookieName + "=" + cookieValue;
	}
	catch (err) {
		return false;
	};
	return true;
};
// Get cookie
eachjs.getCookie = function (cookieName) {
	var cookieValue;
	try {
		var i, x, y, arrCookies = document.cookie.split(";");
		for (i = 0; i < arrCookies.length; i++) {
			x = arrCookies[i].substr(0, arrCookies[i].indexOf("="));
			y = arrCookies[i].substr(arrCookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == cookieName) {
				cookieValue = unescape(y);
			}
		};
	}
	catch (err) {
		cookieValue = null;
	};
	return cookieValue;
};
// Register an element
eachjs.register = function(element) {
	// Register tag control if not registered
	this.registerElement(element.tag, element);
};
// Process all elements
eachjs.process = function() {
	for(var i = 0; i < this.registeredElements.length; i++) {
		this.registeredElements[i].element.process();
	}
};
/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com
Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
+function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  };
}();
// Functions shared by all supported HTML elements
// The core is the ProcessData function which calls many sub-functions to populate or process data
eachjs.element = function() {};    
eachjs.element.prototype.init = function(tag, defaultChildTag, optionalChildTag) {    
    this.parent = eachjs;
	this.version = "0.9";
    this.tag = tag;
	// Default child tag is used to create child tags when it contains no children. Default is same as the parent tag.
	if (defaultChildTag !== undefined) {
		this.defaultChildTag = defaultChildTag; 
		this.parent.registerDefaultChildTag(tag, defaultChildTag);
	}
	// Optional child tag is used to be skipped when missing
	if (optionalChildTag !== undefined) {
		this.optionalChildTag = optionalChildTag; 
		this.parent.registerOptionalChildTag(tag, optionalChildTag);
	}
};
eachjs.element.prototype.setValuable = function(attribute) {
	this.valuable = attribute;
	this.parent.registerValuable(this.tag, attribute);
};
// Get a sub entity of data
eachjs.element.prototype.getDataPart = function(data, repeatKey) {
	if (repeatKey != "" && repeatKey.match(/(\w+)/gi)) {
		return eval("data." + repeatKey);
	} else {
		return data;
	}		
};
// Format the data as JSON format
eachjs.element.prototype.formatDataAsJson = function(data) {
	if (typeof data == "string" && this.parent.isJson(data)) {
		data = JSON.parse(data);
	}
	return data;
};
// Fill data into element
eachjs.element.prototype.getFilledData = function(dataObject, templateData, repeatKey) {	
	var getNewValue = function(str, p1, offset, s) {
		var newValue = eval("dataObject." + p1);
		return  newValue; 
	};
	var data;
	if (templateData == "" || templateData == null) {
		// Takes "value" or "Value" if there is not a template element
		data = dataObject.value || dataObject.Value;
	} else {
		if (repeatKey != null) {	
			// Removes repeat key prefixes, such as from "{{a[].b}}" to "{{b}}"
			var reg = new RegExp('({{' + repeatKey + '\\[\\]\\.)', 'gi');
			templateData = templateData.replace(reg, '{{');
		}
		// Replace with JSON data
		data = templateData.replace(/{{(\w+)}}/gi, getNewValue);
	}
	return data;
};

eachjs.element.prototype.isStorageMethod = function(property) {
	return this.parent.storageMethod.hasOwnProperty(property);
};
// Get storage method
eachjs.element.prototype.getStorageMethod = function(data) {
	// Such as "(localstorage)", "(sessionstorage)", "(storage<#checkboxElementId:checked>)"
	var method = this.parent.getPartWithoutAngleBrackets(data).toLowerCase();
	var parameter = this.parent.getPartWithinAngleBrackets(data);
	if (parameter != null) {
		parameter = parameter.toLowerCase();
	}
	//var rgx = /\((\#?\w+)\)/gi;	
	if (method != this.parent.storageMethods.localstorage && 
			method != this.parent.storageMethods.sessionstorage) {
		if (parameter != null) {
			var paraVal = $(parameter).val();
			if (parameter == "1" || parameter == "true" || parameter == "on" || (paraVal != undefined && 
					(paraVal.toLowerCase() == "1" || paraVal.toLowerCase() == "true" || paraVal.toLowerCase() == "on"))) {
				// If true, on, or 1, it uses localStorage
				method = this.parent.storageMethods.localstorage;
			} else {
				// If false, off, or 0, it uses sessionStorage
				method = this.parent.storageMethods.sessionstorage;
			}
		}
	}
	// localstorage or sessionstorage
	return method;
};
// Get input key/value and put them into array
eachjs.element.prototype.getInputData = function(selector, event) {
	var modalData = [];
	var inputData = {};
	var carryOverData = {};
	var parameter;
	if (event === undefined) {
		parameter = $(selector).attr(this.parent.attributes.dataLoadInput);
	} else if (event == this.parent.events.change) {
		parameter = $(selector).attr(this.parent.attributes.dataChangeInput);
	} else if (event == this.parent.events.click) {
		parameter = $(selector).attr(this.parent.attributes.dataClickInput);
	} else if (event == this.parent.events.doubleclick) {
		parameter = $(selector).attr(this.parent.attributes.dataDoubleClickInput);
	} else if (event == this.parent.events.keydown) {
		parameter = $(selector).attr(this.parent.attributes.dataKeyDownInput);
	} else if (event == this.parent.events.keyup) {
		parameter = $(selector).attr(this.parent.attributes.dataKeyUpInput);
	} else if (event == this.parent.events.mousedown) {
		parameter = $(selector).attr(this.parent.attributes.dataMouseDownInput);
	} else if (event == this.parent.events.mouseup) {
		parameter = $(selector).attr(this.parent.attributes.dataMouseUpInput);
	} else if (event == this.parent.events.rightclick) {
		parameter = $(selector).attr(this.parent.attributes.dataRightClickInput);
	} 
	if (parameter != undefined) {
		var arrParameter = parameter.split(";");
		for (var i = 0; i < arrParameter.length; i++) {		
			var parameter = this.parent.getPartWithoutNewLineAndSpaceChars(arrParameter[i]);			
			var modalValue = this.getParameterModalValue(parameter, selector);
			modalData.push(modalValue);
		}		
		
		for (var i = 0; i < modalData.length; i++) {
			if (modalData[i][0].indexOf("$") == 0 && modalData[i][1] != undefined) {
				carryOverData[modalData[i][0]] = modalData[i][1];	
				modalData.splice(i, 1);
			}
		}		
		if (modalData.length == 1 && modalData[0][0] != undefined && modalData[0][1] == undefined) {
			inputData = modalData[0][0];
		} else {
			//Handles item[].name@.item-name, item[].text@.item-text -> { items: [{ name: 1, text: 12 }, { name: 2, text: 23 }] }
			//TODO: handles [].name@.item-name, [].text@.item-text -> [{ name: 1, text: 12 }, { name: 2, text: 23 }]
			inputData = {};
			for (var i = 0; i < modalData.length; i++) {
				var key = this.parent.getPartBeforeBrackets(modalData[i][0]);
				if (key == undefined) {
					inputData[modalData[i][0]] = modalData[i][1];	
				} else {
					var subKey = this.parent.getPartAfterBrackets(modalData[i][0]);
					if (inputData[key] == undefined) {
						inputData[key] = [];
						for (var iArray = 0; iArray < modalData[i][1].length; iArray++) {
							var subData = {};
							subData[subKey] = modalData[i][1][iArray];
							inputData[key].push(subData);
						}						
					} else {
						for (var iArray = 0; iArray < modalData[i][1].length; iArray++) {
							inputData[key][iArray][subKey] = modalData[i][1][iArray];
						}	
					}
				}
			}			
		}
	}	
	// Register carry-over data (used for output)
	if (carryOverData != undefined && !$.isEmptyObject(carryOverData)) {
		var eid = this.parent.getEid($(selector));
		this.parent.registerCarryOverVars(eid, carryOverData);
	}
	return inputData;
};
// Get parameter modal/value pair
eachjs.element.prototype.getParameterModalValue = function(parameter, selector) {
	var dataModel;
	var dataKey;
	// Get part before @
	if (parameter.indexOf("@") < 0) {
		dataModel = parameter;
	} else {
		dataModel = this.parent.getPartBeforeAtChar(parameter);		
		// Get data model from attribute if not set
		dataModel = this.parent.getDataModelAtAttribute(dataModel, parameter);	
		// Get part after @
		dataKey = this.parent.getPartAfterAtChar(parameter);
	}
	
	var dataValue;
	var method = this.parent.getPartWithinParentheses(dataKey);
	if (method != null) {
		method = method.toLowerCase();
		
		var methodKey = this.parent.getPartWithoutParentheses(dataKey);
		
		if (method == this.parent.storageMethods.url) {
			dataValue = this.getUrlDataValue(methodKey);
		} else if (method == this.parent.storageMethods.cookie) {
			dataValue = this.getCookieDataValue(methodKey);
		} else if (method.indexOf(this.parent.storageMethods.storage) >= 0) {
			dataValue = this.getStorageDataValue(methodKey, method);
		} else {
			//TODO: invalid
		}
	} else {
		if (dataKey !== "" && dataKey !== undefined) {
			dataValue = this.getElementDataValue(dataKey);
			if (dataValue == undefined) {
				// Set it to false if undefined (check box / radio button)
				dataValue = false;
			}			
		} else {
			if ($(selector).length <= 1) {			
				dataValue = this.parent.getContent($(selector));
			} else {
				dataValue = [];
				for (var i = 0; i < $(selector).length; i++) {
					dataValue.push(this.parent.getContent($(selector).eq(i)));
				}
			}
		}
	}	
	return [dataModel, dataValue];
};
// Get authorization data
// Currently supports sessionStorage and localStorage
eachjs.element.prototype.getAuthData = function(object, event) {
	var dataValue;
	var dataKey;
	if (event === undefined) {
		dataKey = $(object).attr(this.parent.attributes.dataLoadAuth);
	} else if (event === this.parent.events.change) {
		dataKey = $(object).attr(this.parent.attributes.dataChangeAuth);
	} else if (event === this.parent.events.click) {
		dataKey = $(object).attr(this.parent.attributes.dataClickAuth);
	} else if (event === this.parent.events.doubleclick) {
		dataKey = $(object).attr(this.parent.attributes.dataDoubleClickAuth);
	} else if (event === this.parent.events.keydown) {
		dataKey = $(object).attr(this.parent.attributes.dataKeyDownAuth);
	} else if (event === this.parent.events.keyup) {
		dataKey = $(object).attr(this.parent.attributes.dataKeyUpAuth);
	} else if (event === this.parent.events.mousedown) {
		dataKey = $(object).attr(this.parent.attributes.dataMouseDownAuth);
	} else if (event === this.parent.events.mouseup) {
		dataKey = $(object).attr(this.parent.attributes.dataMouseUpAuth);
	} else if (event === this.parent.events.rightclick) {
		dataKey = $(object).attr(this.parent.attributes.dataRightClickAuth);
	}
	if (dataKey != undefined) {
		var rgxDataSource = /\((\#?\w+)\)/gi;
		var matchDataSource = rgxDataSource.exec(dataKey);
		if (matchDataSource != undefined) {
			var dataSource = matchDataSource[1];
			dataSource = dataSource.toLowerCase();
					
			dataKey = dataKey.replace(rgxDataSource, '');
			
			if (dataSource == this.parent.storageMethods.cookie) {
				dataValue = this.getCookieDataValue(dataKey);
			} else if (dataSource.indexOf(this.parent.storageMethods.storage) >= 0) {
				dataValue = this.getStorageDataValue(dataKey, dataSource);
			} else {
				//TODO: invalid
			}
		} else {
			// Default to "storage"
			dataValue = this.getStorageDataValue(dataKey, this.parent.storageMethods.storage);
		}		
	}
	return dataValue;
};
// Get data from element (HTML)
// Example: Category@h4.category;Name@input#itemName;Quantity@#itemQuantity[data-quantity];
eachjs.element.prototype.getElementDataValue = function(dataKey) {
	var dataValue;
	// Filter brackets
	/* var rgxDataAttr = /\[(\w+(-\w+)?)\]/gi;
	var matchDataAttr = rgxDataAttr.exec(dataKey);
	if (matchDataAttr != undefined) {
		var dataAttr = matchDataAttr.length == 1 ? matchDataAttr[0] : matchDataAttr[1];
		var dataKey = dataKey.replace(matchDataAttr, '');
		dataValue = $(dataKey).attr(dataAttr);
	} else if ($(dataKey).val() != "") {
		dataValue = $(dataKey).val();
	} else if ($(dataKey).html() != "") {
		dataValue = $(dataKey).html();
	} */
	var dataAttr = this.parent.getPartWithinBrackets(dataKey);
	dataKey = this.parent.getPartWithoutBrackets(dataKey);
	if (dataAttr != undefined) {
		dataValue = $(dataKey).attr(dataAttr);
	} else {
		if ($(dataKey).length == 1) {
			dataValue = this.parent.getContent($(dataKey));		
		} else if ($(dataKey).length > 1) {
			dataValue = [];
			for (var i = 0; i < $(dataKey).length; i++) {
				dataValue.push(this.parent.getContent($(dataKey).eq(i)));
			}
		}
	}
	return dataValue;
};
// Get parameter data from URL
// Example: Title@(url)title;Title@(url)#;Title@(url)#title
eachjs.element.prototype.getUrlDataValue = function(dataKey) {	
	var dataValue;
	if (dataKey.indexOf("#") != 0) {
		// Query parameter
		dataValue = this.getUrlParameterByKey(dataKey);
	} else {		
		// Hash fragment or named anchor
		dataValue = this.getUrlFragmentByKey(dataKey);
	}
	return dataValue;
};	
// Get data from cookie
// Example: Price@(cookie)price
eachjs.element.prototype.getCookieDataValue = function(dataKey) {	
	return this.parent.getCookie(dataKey);
};
// Get data from localStorage or sessionStorage
// Example: Name@(storage)name;Name@(localstorage)name;Name@(sessionstorage)name
eachjs.element.prototype.getStorageDataValue = function(dataKey, dataSource) {
	var dataValue;
	if (dataSource == this.parent.storageMethods.storage) {
		// Get from sessionStorage first
		dataValue = window.sessionStorage.getItem(dataKey) || window.localStorage.getItem(dataKey);
	} else if (dataSource == this.parent.storageMethods.sessionstorage) {
		dataValue = window.sessionStorage.getItem(dataKey);
	} else if (dataSource == this.parent.storageMethods.localstorage) {
		dataValue = window.localStorage.getItem(dataKey);
	} 
	return dataValue;
};	
// Generic: Get URL parameter by key
//TODO: evaluate with other Regex codes
eachjs.element.prototype.getUrlParameterByKey = function(key) {
	key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var rgx = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var matched = rgx.exec(location.search);
	var dataValue = matched === null ? "" : decodeURIComponent(matched[1].replace(/\+/g, " "));
	return dataValue;
};
// Generic: Get URL fragment by key
eachjs.element.prototype.getUrlFragmentByKey = function(key) {
	var dataValue;
	if (key == "#") {
		dataValue = location.hash.substring(1);
	} else {
		key = key.substring(1);
		var rgxData = new RegExp("[\\#&]" + key + "=([^&#]*)");
		var matched = rgxData.exec(location.hash);
		if (matched != undefined) {		
			dataValue = matched === null ? "" : decodeURIComponent(matched[1].replace(/\+/g, " "));
		} 
	}
	return dataValue;
};
// Get AJAX type such as "GET", "POST", "PUT", and "DELETE"
eachjs.element.prototype.getAjaxType = function(data) {
	var ajaxType;
	var prefix = this.parent.getPartBeforeColon(data);
	if (prefix === undefined || prefix.toLowerCase() == "http" || prefix.toLowerCase() == "https") {
		ajaxType = "GET"; 
	} else {
		ajaxType = prefix;
	}
	return ajaxType;
};
// Get URL part in the data attribute
eachjs.element.prototype.getUrl = function(element, data) {
	var urlPart;
	var prefix = this.parent.getPartBeforeColon(data);
	if (prefix === undefined || prefix.toLowerCase() == "http" || prefix.toLowerCase() == "https") {
		urlPart = data;
	} else {
		urlPart = this.parent.getPartAfterColon(data);
	}
	var url = this.parent.getUrl(element, urlPart);
	return url;
}
// Process elements with the current tag
eachjs.element.prototype.process = function() {
	// data event handlers
	var element = this;
	$(this.tag + '[' + this.parent.attributes.dataLoad + ']').each(function() {
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataLoad);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this);
			var inputData = element.getInputData(this);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid);	
		}
	});
	$(this.tag + '[' + element.parent.attributes.dataLoadOutput + ']:not([' + element.parent.attributes.dataLoad + '])').each(function() {
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.load);
		element.processData(eid, inputData);	
	});
	$(document).on('change', this.tag + '[' + element.parent.attributes.dataChange + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataChange);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.change);
			var inputData = element.getInputData(this, element.parent.events.change);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.change);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.change);	
		}
	});
	$(document).on('change', this.tag + '[' + element.parent.attributes.dataChangeOutput + ']:not([' + element.parent.attributes.dataChange + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.change);
		element.processData(eid, inputData, element.parent.events.change);	
	});		
	$(document).on('click', this.tag + '[' + element.parent.attributes.dataClick + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataClick);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.click);
			var inputData = element.getInputData(this, element.parent.events.click);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.click);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.click);	
		}
	});
	$(document).on('click', this.tag + '[' + element.parent.attributes.dataClickOutput + ']:not([' + element.parent.attributes.dataClick + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.click);
		element.processData(eid, inputData, element.parent.events.click);	
	});
	$(document).on('dblclick', this.tag + '[' + element.parent.attributes.dataDoubleClick + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataDoubleClick);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.doubleclick);
			var inputData = element.getInputData(this, element.parent.events.doubleclick);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.doubleclick);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.doubleclick);	
		}
	});
	$(document).on('dblclick', this.tag + '[' + element.parent.attributes.dataDoubleClickOutput + ']:not([' + element.parent.attributes.dataDoubleClick + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.doubleclick);
		element.processData(eid, inputData, element.parent.events.doubleclick);	
	});
	$(document).on('keydown', this.tag + '[' + element.parent.attributes.dataKeyDown + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataKeyDown);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.keydown);
			var inputData = element.getInputData(this, element.parent.events.keydown);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.keydown);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.keydown);	
		}
	});
	$(document).on('keydown', this.tag + '[' + element.parent.attributes.dataKeyDownOutput + ']:not([' + element.parent.attributes.dataKeyDown + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.keydown);
		element.processData(eid, inputData, element.parent.events.keydown);	
	});
	$(document).on('keyup', this.tag + '[' + element.parent.attributes.dataKeyUp + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataKeyUp);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.keyup);
			var inputData = element.getInputData(this, element.parent.events.keyup);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.keyup);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.keyup);	
		}
	});
	$(document).on('keyup', this.tag + '[' + element.parent.attributes.dataKeyUpOutput + ']:not([' + element.parent.attributes.dataKeyUp + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.keyup);
		element.processData(eid, inputData, element.parent.events.keyup);	
	});
	$(document).on('mousedown', this.tag + '[' + element.parent.attributes.dataMouseDown + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataMouseDown);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.mousedown);
			var inputData = element.getInputData(this, element.parent.events.mousedown);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.mousedown);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.mousedown);	
		}
	});
	$(document).on('mousedown', this.tag + '[' + element.parent.attributes.dataMouseDownOutput + ']:not([' + element.parent.attributes.dataMouseDown + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.mousedown);
		element.processData(eid, inputData, element.parent.events.mousedown);	
	});
	$(document).on('mouseup', this.tag + '[' + element.parent.attributes.dataMouseUp + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataMouseUp);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.mouseup);
			var inputData = element.getInputData(this, element.parent.events.mouseup);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.mouseup);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.mouseup);	
		}
	});
	$(document).on('mouseup', this.tag + '[' + element.parent.attributes.dataMouseUpOutput + ']:not([' + element.parent.attributes.dataMouseUp + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.mouseup);
		element.processData(eid, inputData, element.parent.events.mouseup);	
	});
	$(document).on('contextmenu', this.tag + '[' + element.parent.attributes.dataRightClick + ']', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var data = $(this).attr(element.parent.attributes.dataRightClick);
		if (data !== undefined && data !== "") {
			var ajaxType = element.getAjaxType(data);
			var url = element.getUrl(this, data);
			var authData = element.getAuthData(this, element.parent.events.rightclick);
			var inputData = element.getInputData(this, element.parent.events.rightclick);
			element.executeAjax(eid, url, element, ajaxType, inputData, authData, element.parent.events.rightclick);
			element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.processing);			
		} else {
			element.processData(eid, null, element.parent.events.rightclick);	
		}
	});
	$(document).on('contextmenu', this.tag + '[' + element.parent.attributes.dataRightClickOutput + ']:not([' + element.parent.attributes.dataRightClick + '])', function(e) {
		e.preventDefault();
		var eid = element.parent.getEid(this);
		var inputData = element.getInputData(this, element.parent.events.rightclick);
		element.processData(eid, inputData, element.parent.events.rightclick);	
	});
};
// Execute the AJAX action
eachjs.element.prototype.executeAjax = function(eid, url, element, ajaxType, inputData, authData, event) {
	var oThis = this;
	//TODO: add header for custom JSON
	var dataEid = this.parent.systemAttributes.dataEid;
	var dataPsid = this.parent.systemAttributes.dataPsid;
	var authorization = "Authorization";
	var psid = this.parent.getPsid();
	$.ajax({
		type: ajaxType,
		url: url,
		beforeSend: function (request)
		{
			// PSID can be used for session-based caches
			request.setRequestHeader(dataPsid, psid);
			// EID is not currently used
			request.setRequestHeader(dataEid, eid);
			// AuthData is used for authorization/authentication
			if (authData != null) {
				request.setRequestHeader(authorization, "bearer " + authData);
			}
		},
		data: inputData,
		async: true,
		success: function(json) {
			json = oThis.formatDataAsJson(json);		
			// Compatible with Google JSON style guide
			// Compatible with JSONAPI.org style
			if (json != "" && json != undefined && json.error == undefined && json.status != "error") {
				element.processData(eid, json, event);				
			} else {
				element.handleErrors(eid, json, event);
			}
			//oThis.parent.registerActionStatus(eid, oThis.parent.actionStatusEnum.completed);
			//TODO: support additional custom activity     
		}, 
		error: function(e) {
		   console.debug("Error: " + e.statusText);
		   element.handleErrors(eid); //TODO: evaluate 2nd/3rd parameter
		   element.parent.registerActionStatus(eid, element.parent.actionStatusEnum.failed);
		}
	});		
};
// Process data including output/authorization data
eachjs.element.prototype.processData = function(eid, data, event) {
	var element = $(this.tag + "[" + this.parent.systemAttributes.dataEid + "='" + eid + "']");
	//TODO: consider adding insertPosition	
	// Handles data-output
	//TODO: saving data to a global object might be a better choice
	var attr;
	if (event === undefined) {
		attr = this.parent.attributes.dataLoadOutput;
	} else if (event === this.parent.events.change) {
		attr = this.parent.attributes.dataChangeOutput;
	} else if (event === this.parent.events.click) {
		attr = this.parent.attributes.dataClickOutput;
	} else if (event === this.parent.events.doubleclick) {
		attr = this.parent.attributes.dataDoubleClickOutput;
	} else if (event === this.parent.events.keydown) {
		attr = this.parent.attributes.dataKeyDownOutput;
	} else if (event === this.parent.events.keyup) {
		attr = this.parent.attributes.dataKeyUpOutput;
	} else if (event === this.parent.events.mousedown) {
		attr = this.parent.attributes.dataMouseDownOutput;
	} else if (event === this.parent.events.mouseup) {
		attr = this.parent.attributes.dataMouseUpOutput;
	} else if (event === this.parent.events.rightclick) {
		attr = this.parent.attributes.dataRightClickOutput;
	}	
	this.processDataOutputs(data, element, attr, this.populateData);
};

eachjs.element.prototype.processDataOutputStorages = function(condition, element, data, storageMethod, storableKey) {
	var metCondition = true;
	if (condition != undefined) {
		//TODO: handle "!"
		var inverse = false;
		if (condition.indexOf("!") == 0) {
			inverse = true;
			condition = condition.substring(1);
		} 
		metCondition = eval("data." + condition);
		if (metCondition == undefined) {
			var eid = this.parent.getEid(element);	
			var vars = this.parent.getCarryOverVars(eid);
			metCondition = vars[condition];
		}
		if (inverse) {
			metCondition = !metCondition;
		}
	}
	if (metCondition && storableKey != undefined) {
		if (storableKey.indexOf("-") == 0) {
			// Remove authorization
			storableKey = storableKey.substring(1);
			if (storageMethod == undefined || storageMethod == this.parent.storageMethods.storage) {
				// Remove both localStorage and sessionStorage if authorization method is unspecified
				window.localStorage.removeItem(storableKey);
				window.sessionStorage.removeItem(storableKey);
			} else if (storageMethod == this.parent.storageMethods.localstorage) {
				window.localStorage.removeItem(storableKey);
			} else {
				window.sessionStorage.removeItem(storableKey);
			}
		} else {				
			// Set authorization
			if (storageMethod != undefined && storageMethod == this.parent.storageMethods.localstorage) {							
				window.localStorage.setItem(storableKey, data);
			} else {			
				window.sessionStorage.setItem(storableKey, data);				
			}
		}	
	}
};
//TODO: Process authorization
// Process output/failure data
eachjs.element.prototype.processDataOutputs = function(data, element, attribute, fnPopulateData) {
	if (element.attr(attribute) != undefined) {
		var arrDataOutput = element.attr(attribute).split(";");
		for (var i = 0; i < arrDataOutput.length; i++) {
			// Remove change line characters and space characters
			var dataOutput = this.parent.getPartWithoutNewLineAndSpaceChars(arrDataOutput[i]);
			if (dataOutput.length > 0) {
				// Matching action
				var targetModel = this.parent.getPartBeforeAtChar(dataOutput);
				var target = this.parent.getPartAfterAtChar(dataOutput);
				if (target == undefined) target = dataOutput;
				
				var condition = this.parent.getPartWithinBrackets(target);
				if (condition != undefined) {
					target = this.parent.getPartWithoutBrackets(target);
				}
				
				var storageMethodPart = this.parent.getPartWithinLeadingParentheses(target);
				if (storageMethodPart != undefined) {
					if (storageMethodPart.toLowerCase() == "url") {
						var urlData = this.parent.getPartWithoutLeadingParentheses(target);
						//TODO
						if (urlData == "reload") {
							document.location.reload();
						}
					} else if (storageMethodPart.toLowerCase() == "cookie") {
						var cookieKey = this.parent.getPartWithoutLeadingParentheses(target);
						var objectData = (targetModel == null) ? data : this.getDataPart(data, targetModel);
						this.processDataOutputCookies(condition, element, objectData, cookieKey);		
					} else {
						// localstorage or sessionstorage
						var storageMethod = this.getStorageMethod(storageMethodPart);
						var storableKey = this.parent.getPartWithoutLeadingParentheses(target);
						var objectData = (targetModel == null) ? data : this.getDataPart(data, targetModel);
						this.processDataOutputStorages(condition, element, objectData, storageMethod, storableKey);							
					}
				} else {
					var targetObjectAndAction = this.parent.getPartWithoutLeadingParentheses(target);
					if (targetObjectAndAction == undefined) targetObjectAndAction = target;
					
					var targetObject = this.parent.getPartWithoutParentheses(targetObjectAndAction);		
					//var rgxModel = /^.*?(?=@)/gi;
					//var targetObject = this.parent.getPartWithoutParentheses(dataOutput).replace(rgxModel, '');
					if (targetObject.indexOf("@") == 0) targetObject = targetObject.substring(1);
					// Evaluate if the target object exists
					var targetElement = (targetObject != '') ? $(targetObject) : element;
					
					if (targetElement.length > 0) {
						// Find matched actions/parameters
						var targetActionAndParameters = this.parent.getPartWithinParentheses(targetObjectAndAction);
						
						// Handles multiple target actions
						var arrTargetActionAndParameter = targetActionAndParameters.split(",");
						for (var iAction = 0; iAction < arrTargetActionAndParameter.length; iAction++) {
							var targetAction = this.parent.getPartWithoutAngleBrackets(arrTargetActionAndParameter[iAction]);
									
							// Find matched model
							// Get data model from attribute if not set
							// targetObject cannot be empty (the current element)
							targetModel = this.parent.getDataModelAtAttribute(targetModel, targetObject);
							var objectData = (targetModel == null) ? data : this.getDataPart(data, targetModel);
							// Evaluate the target action value
							if (targetAction == null) {
								// Default action is populate
								fnPopulateData(condition, objectData, targetElement, this);
							} else {							
								// Handles multiple target actions
								var customParameter = this.parent.getPartWithinAngleBrackets(arrTargetActionAndParameter[iAction]);
								if (customParameter == undefined) {							
									this.processTargetActions(condition, objectData, targetElement, targetAction, fnPopulateData);
								} else {
									this.processTargetActions(condition, objectData, targetElement, targetAction, fnPopulateData, customParameter);
								}
							}								
						}					
					}  else {
						//TODO: handles empty/default targetObject
						// Call custom function
						eval(targetObject)(data);
					}				
				}

			} else {
				// Self is a target
				fnPopulateData(null, data, element, this);
			}		
		}
	} else {
		// Self is the only target
		fnPopulateData(null, data, element, this);
	}		
};
// Process target actions
eachjs.element.prototype.processTargetActions = function(condition, data, element, targetAction, fnPopulateData, customParameter) {
	var metCondition = true;
	if (condition != undefined) {
		metCondition = eval("data." + condition);
	}
	if (metCondition) {
		// Handles multiple target actions
		var eid = this.parent.getEid(element);		
		if (targetAction == this.parent.actions.addclass) {
			element.addClass(customParameter);
		} else if (targetAction == this.parent.actions.class) {
			element.removeClass().addClass(customParameter);
		} else if (targetAction == this.parent.actions.clear) {
			//TODO: handle non-input controls
			element.val("");
		} else if (targetAction == this.parent.actions.disable) {
			element.prop("disabled", true);
			//$("[data-eid='" + eid + "']").prop("disabled", true);
		} else if (targetAction == this.parent.actions.enable) {
			element.prop("disabled", false);
			//$("[data-eid='" + eid + "']").prop("disabled", false);
		} else if (targetAction == this.parent.actions.fadein) {
			element.fadeIn();
		} else if (targetAction == this.parent.actions.fadeout) {
			element.fadeOut();
		} else if (targetAction == this.parent.actions.flash) {
			// Handle custom delay length
			var delayLength = (customParameter != undefined) ? customParameter : 800;
			element.fadeIn().delay(delayLength).fadeOut();
		} else if (targetAction == this.parent.actions.hide) {
			element.hide();
		} else if (targetAction == this.parent.actions.populate || 
				targetAction == "") {
			fnPopulateData(condition, data, element, this);
		} else if (targetAction == this.parent.actions.reload) {
			this.reloadData(element);
		} else if (targetAction == this.parent.actions.reset) {
			this.resetElementData(element);
		} else if (targetAction == this.parent.actions.removeclass) {
			element.removeClass(customParameter);
		} else if (targetAction == this.parent.actions.show) {
			element.show();
		}	
	}		
};
// Populate data to target
eachjs.element.prototype.populateData = function(condition, data, element, $this) {
	if (data != undefined) {
		// Reset element with original HTML content
		$this.resetElementData(element);
		// Add data to element
		$this.addDataToElement($this.tag, element, data);
	}
};
// Reload data in target
// Currently only resets elements with "data" attributes
eachjs.element.prototype.reloadData = function(element) {
	var eid = this.parent.getEid(element);		
	//TODO: remove prefix
	var url = element.attr(this.parent.attributes.dataLoad);	
	var url = this.parent.getUrl(element, url);
	if (url !== undefined && url !== "") {										
		var tag = element.prop("tagName").toLowerCase();
		var element1 = this.parent.getRegisteredElement(tag);										
		var authData = this.getAuthData(element);
		this.executeAjax(eid, url, element1, "GET", null, authData);
		this.parent.registerActionStatus(eid, this.parent.actionStatusEnum.processing);	
	}
};
// Reset element with original HTML content
eachjs.element.prototype.resetElementData = function(element) {
	var eid = this.parent.getEid(element);
	var added = this.parent.registerRestorableElementHtmlContent(eid, element.html());
	if (!added) {
		// Get original HTML content
		var originalHtmlContent = this.parent.getRestorableElementHtmlContent(eid);
		element.html(originalHtmlContent);
	}	
};
// Add data to element
eachjs.element.prototype.addDataToElement = function(tag, element, data, repeatKey) {
	if (typeof data != "object") {
		// Data is a pure string
		this.parent.setContent(element, data);
		//element.html(data);
	} else {
		if (!data.length) {
			// Data is a single object
			// Set single object data for the first round before evaluating the child entities
			this.setElementData(data, element, repeatKey);
		}
		// Get HTML element's children length
		// Set data based on the children length and the data object's length
		var childrenLen = element.children().length;
		if (childrenLen == 0) {
			// Create a child tag if there are no children
			for(var i = 0; i < data.length; i++) {
				var templateTag = (this.defaultChildTag == undefined || this.defaultChildTag == "") ? tag : this.defaultChildTag;
				var newElement = this.getNewElement(templateTag, element);
				this.addDataToElement(templateTag, newElement, data[i]);
			}				
		} else {
			// Handle when optionalChildTag does not exist, such as <tbody>
			element = this.skipToHiddenElement(element);
			this.addRepeatedDataToElement(tag, element, data);
		}			
	} 		
};	
// Add data to elements with data-repeat attributes
eachjs.element.prototype.addRepeatedDataToElement = function(tag, element, data) {
	// Children with data-repeat attributes
	var templates = element.children("[" + this.parent.attributes.dataRepeat + "]");
	if (templates.length > 0) {
		for(var i = 0; i < templates.length; i++) {
			var template = templates.eq(i);
			var position = element.children().index(template);
			var repeatKey = template.attr(this.parent.attributes.dataRepeat);
			// Get the sub data for the current HTML element
			var dataPart = this.getDataPart(data, repeatKey);	
			if (dataPart != undefined && dataPart.length > 0) {
				// Multiple sub data entities
				for(var j = 0; j < dataPart.length; j++) {
					var newElement = this.cloneTemplateToNewElement(element, template, position, j);							
					// Set the sub data entity into the new HTML element
					this.addDataToElement(tag, newElement, dataPart[j], repeatKey);
				}	
			}
			// Remove template
			template.remove();
		}
		// Add count to element
		element = this.addCountToElement(element, dataPart);	
	}
};
// Clone template and insert new element
eachjs.element.prototype.cloneTemplateToNewElement = function(element, template, position, index) {
	var newElement = template.clone();
	// Clean up attribute
	newElement.removeAttr(this.parent.attributes.dataRepeat);
	//TODO: any reserved keywords; zero-based/or one-based customization	
	// Handle indexes
	newElement.html(template.html().replace('{{' + this.parent.reservedDataKeys.index + '}}', index + 1)); 
	newElement.insertAfter(element.children().eq(position + index));
	return newElement;
};
// Clone template to a new element
eachjs.element.prototype.getNewElement = function(templateTag, element) {
	var template = $("<" + templateTag + ">");
	var newElement = template.clone();
	newElement.removeAttr(this.parent.attributes.dataRepeat);
	element.append(newElement);
	return newElement;
};
// Handle when optionalChildTag does not exist, such as <tbody>
//TODO: handles thead and tfoot
eachjs.element.prototype.skipToHiddenElement = function(element) {
	if (element.children("[" + this.parent.attributes.dataRepeat + "]").length == 0 && 
			element.children().length == 1 && 
			element.children().first().prop("tagName").toLowerCase() == this.optionalChildTag) {
		// Get the hidden child tag element, such as <tbody>
		element = element.children().eq(0);
	}
	return element;
};
// Add count to element
eachjs.element.prototype.addCountToElement = function(element, data) {
	if (data != undefined && data.length > 0) {
		// Handle the total count
		element.html(element.html().replace('{{' + this.parent.reservedDataKeys.count + '}}', data.length)); 
	}	
	return element;
};
// Set the data into the tag element
eachjs.element.prototype.setElementData = function(dataObject, element, repeatKey) {
	$this = this;
	// Set HTML content
	var data = this.getFilledData(dataObject, element.html(), repeatKey);
	element.html(data);
	// Set all attributes
	$.each(element[0].attributes, function() {
		if(this.specified) {
			var content = this.value;
			data = $this.getFilledData(dataObject, content, repeatKey);
			this.value = data;
		}
	});
};	
// Handle targets upon failures and errors
// Similar to how the data-output is handled
eachjs.element.prototype.handleErrors = function(eid, data, event) {
	var element = $(this.tag + "[" + this.parent.systemAttributes.dataEid + "='" + eid + "']");
	// Process data target failures and errors
	var attr;
	if (event === undefined) {
		attr = this.parent.attributes.dataLoadError;
	} else if (event === this.parent.events.change) {
		attr = this.parent.attributes.dataChangeError;
	} else if (event === this.parent.events.click) {
		attr = this.parent.attributes.dataClickError;
	} else if (event === this.parent.events.doubleclick) {
		attr = this.parent.attributes.dataDoubleClickError;
	} else if (event === this.parent.events.keydown) {
		attr = this.parent.attributes.dataKeyDownError;
	} else if (event === this.parent.events.keyup) {
		attr = this.parent.attributes.dataKeyUpError;
	} else if (event === this.parent.events.mousedown) {
		attr = this.parent.attributes.dataMouseDownError;
	} else if (event === this.parent.events.mouseup) {
		attr = this.parent.attributes.dataMouseUpError;
	} else if (event === this.parent.events.rightclick) {
		attr = this.parent.attributes.dataRightClickError;
	}	
	this.processDataOutputs(data, element, attr, this.populateErrorData);
};
// Process error data
eachjs.element.prototype.populateErrorData = function(condition, data, element, $this) {
	//TODO: condition
	if (data != undefined) {
		$this.resetElementData(element);
		if (data.error != undefined) {
			// Google JSON format guide
			// error { code, message }
			element.html(data.error.message);
		} else {
			// JSONAPI.org format
			// status, message
			element.html(data.message);
		}									
	}	
};
//TODO: evaluate case sensitivity
//TODO: Simulate JS for CANVAS
//TODO: Complex model for tags like <abbr>
//TODO: details, pre, 
// A element
eachjs.elementA = function() {};
eachjs.elementA.prototype = new eachjs.element();
eachjs.instanceA = new eachjs.elementA();
eachjs.instanceA.init("a");
eachjs.instanceA.setValuable("href");
eachjs.register(eachjs.instanceA);
// ARTICLE element
eachjs.elementArticle = function() {};
eachjs.elementArticle.prototype = new eachjs.element();
eachjs.instanceArticle = new eachjs.elementArticle();
eachjs.instanceArticle.init("article");
eachjs.register(eachjs.instanceArticle);
// AUDIO element
eachjs.elementAudio = function() {};
eachjs.elementAudio.prototype = new eachjs.element();
eachjs.instanceAudio = new eachjs.elementAudio();
eachjs.instanceAudio.init("audio", "source");
eachjs.register(eachjs.instanceAudio);
// BUTTON element
eachjs.elementButton = function() {};
eachjs.elementButton.prototype = new eachjs.element();
eachjs.instanceButton = new eachjs.elementButton();
eachjs.instanceButton.init("button");
eachjs.register(eachjs.instanceButton);
// DATALIST element
eachjs.elementDataList = function() {};
eachjs.elementDataList.prototype = new eachjs.element();
eachjs.instanceDataList = new eachjs.elementDataList();
eachjs.instanceDataList.init("datalist", "option");
eachjs.register(eachjs.instanceDataList);
// DIV element
eachjs.elementDiv = function() {};
eachjs.elementDiv.prototype = new eachjs.element();
eachjs.instanceDiv = new eachjs.elementDiv();
eachjs.instanceDiv.init("div");
eachjs.register(eachjs.instanceDiv);
// DL element
eachjs.elementDl = function() {};
eachjs.elementDl.prototype = new eachjs.element();
eachjs.instanceDl = new eachjs.elementDl();
eachjs.instanceDl.init("dl", "dt");
eachjs.register(eachjs.instanceDl);
// FIELDSET element
eachjs.elementFieldSet = function() {};
eachjs.elementFieldSet.prototype = new eachjs.element();
eachjs.instanceFieldSet = new eachjs.elementFieldSet();
eachjs.instanceFieldSet.init("fieldset");
eachjs.register(eachjs.instanceFieldSet);
// FIGURE element
eachjs.elementFigure = function() {};
eachjs.elementFigure.prototype = new eachjs.element();
eachjs.instanceFigure = new eachjs.elementFigure();
eachjs.instanceFigure.init("figure", "img");
eachjs.register(eachjs.instanceFigure);
// FOOTER element
eachjs.elementFooter = function() {};
eachjs.elementFooter.prototype = new eachjs.element();
eachjs.instanceFooter = new eachjs.elementFooter();
eachjs.instanceFooter.init("footer");
eachjs.register(eachjs.instanceFooter);
// FORM element
eachjs.elementForm = function() {};
eachjs.elementForm.prototype = new eachjs.element();
eachjs.instanceForm = new eachjs.elementForm();
eachjs.instanceForm.init("form");
eachjs.instanceForm.setValuable("action");
eachjs.register(eachjs.instanceForm);
// HEADER element
eachjs.elementHeader = function() {};
eachjs.elementHeader.prototype = new eachjs.element();
eachjs.instanceHeader = new eachjs.elementHeader();
eachjs.instanceHeader.init("header");
eachjs.register(eachjs.instanceHeader);
// IMG element
eachjs.elementImg = function() {};
eachjs.elementImg.prototype = new eachjs.element();
eachjs.instanceImg = new eachjs.elementImg();
eachjs.instanceImg.init("img");
eachjs.instanceImg.setValuable("src");
eachjs.register(eachjs.instanceImg);
// INPUT element
eachjs.elementInput = function() {};
eachjs.elementInput.prototype = new eachjs.element();
eachjs.instanceInput = new eachjs.elementInput();
eachjs.instanceInput.init("input");
eachjs.instanceInput.setValuable("value");
eachjs.register(eachjs.instanceInput);
// LI element
eachjs.elementLi = function() {};
eachjs.elementLi.prototype = new eachjs.element();
eachjs.instanceLi = new eachjs.elementLi();
eachjs.instanceLi.init("li");
eachjs.register(eachjs.instanceLi);
// MAIN element
eachjs.elementMain = function() {};
eachjs.elementMain.prototype = new eachjs.element();
eachjs.instanceMain = new eachjs.elementMain();
eachjs.instanceMain.init("main");
eachjs.register(eachjs.instanceMain);
// NAV element
eachjs.elementNav = function() {};
eachjs.elementNav.prototype = new eachjs.element();
eachjs.instanceNav = new eachjs.elementNav();
eachjs.instanceNav.init("nav");
eachjs.register(eachjs.instanceNav);
// OL element
eachjs.elementOl = function() {};
eachjs.elementOl.prototype = new eachjs.element();
eachjs.instanceOl = new eachjs.elementOl();
eachjs.instanceOl.init("ol", "li");
eachjs.register(eachjs.instanceOl);
// OPTION element
eachjs.elementOption = function() {};
eachjs.elementOption.prototype = new eachjs.element();
eachjs.instanceOption = new eachjs.elementOption();
eachjs.instanceOption.init("option");
eachjs.instanceOption.setValuable("value");
eachjs.register(eachjs.instanceOption);
// P element
eachjs.elementP = function() {};
eachjs.elementP.prototype = new eachjs.element();
eachjs.instanceP = new eachjs.elementP();
eachjs.instanceP.init("p");
eachjs.register(eachjs.instanceP);
// SECTION element
eachjs.elementSection = function() {};
eachjs.elementSection.prototype = new eachjs.element();
eachjs.instanceSection = new eachjs.elementSection();
eachjs.instanceSection.init("section");
eachjs.register(eachjs.instanceSection);
// SELECT element
eachjs.elementSelect = function() {};
eachjs.elementSelect.prototype = new eachjs.element();
eachjs.instanceSelect = new eachjs.elementSelect();
eachjs.instanceSelect.init("select", "option");
eachjs.instanceSelect.setValuable("value");
eachjs.register(eachjs.instanceSelect);
// SOURCE element
eachjs.elementSource = function() {};
eachjs.elementSource.prototype = new eachjs.element();
eachjs.instanceSource = new eachjs.elementSource();
eachjs.instanceSource.init("source");
eachjs.instanceSource.setValuable("src");
eachjs.register(eachjs.instanceSource);
// SPAN element
eachjs.elementSpan = function() {};
eachjs.elementSpan.prototype = new eachjs.element();
eachjs.instanceSpan = new eachjs.elementSpan();
eachjs.instanceSpan.init("span");
eachjs.register(eachjs.instanceSpan);
// TABLE element
eachjs.elementTable = function() {};
eachjs.elementTable.prototype = new eachjs.element();
eachjs.instanceTable = new eachjs.elementTable();
eachjs.instanceTable.init("table", "tr", "tbody");
eachjs.register(eachjs.instanceTable);
// TD element
eachjs.elementTd = function() {};
eachjs.elementTd.prototype = new eachjs.element();
eachjs.instanceTd = new eachjs.elementTd();
eachjs.instanceTd.init("td");
eachjs.register(eachjs.instanceTd);
// TR element
eachjs.elementTr = function() {};
eachjs.elementTr.prototype = new eachjs.element();
eachjs.instanceTr = new eachjs.elementTr();
eachjs.instanceTr.init("tr", "td");
eachjs.register(eachjs.instanceTr);
// VIDEO element
eachjs.elementVideo = function() {};
eachjs.elementVideo.prototype = new eachjs.element();
eachjs.instanceVideo = new eachjs.elementVideo();
eachjs.instanceVideo.init("video", "source");
eachjs.register(eachjs.instanceVideo);
// UL element
eachjs.elementUl = function() {};
eachjs.elementUl.prototype = new eachjs.element();
eachjs.instanceUl = new eachjs.elementUl();
eachjs.instanceUl.init("ul", "li");
eachjs.register(eachjs.instanceUl);
// Custom function provides overriding capabilities
var eachjsCustom;
if (eachjsCustom !== undefined) { eachjsCustom(); }    
// Process elements
eachjs.process();  

