/* ========================================================================
 * EachJS API Connection Framework
 * Inspired by the Twitter Bootstrap & the AugularJS
 * ========================================================================
 * Copyright (c) 2016 Joe Gao
 * Licensed under MIT:
 * http://www.opensource.org/licenses/mit-license.php
 * ======================================================================== */
/*
 * Initialize
 */
var eachjs = eachjs || {};
/*
 * @description
 * Attributes are used for storing data 
 * @example
 * <div data-ej-load="/data/dot">
 */
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
	// Data model
	dataModel: "data-ej-model",
	dataValue: "data-ej-value",
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
	// Base uri for API connection
	dataBase: "data-ej-base",
};
/*
 * @description
 * Data stores used to store data
 * If not specified, data are stored at the element.
 * @example
 * <div data-ej-load-auth="(storage)accountToken">
 */
eachjs.dataStores = {
	url: "url",
	storage: "storage",
	localstorage: "localstorage",
	sessionstorage: "sessionstorage",
	cookie: "cookie",
};
/*
 * @description
 * Internal events
 */
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
/*
 * @description
 * Actions are used for applying effects/actions to HTML elements
 * @example
 * <button data-ej-click-output="#tab1(addclass<lightgray>)">
 */
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
	redirect: "redirect",
	reload: "reload",
	reset: "reset",
	removeclass: "removeclass",
	show: "show",
};
/*
 * @description
 * Reserved data keys are used for function/index shortcuts
 * @example
 * <div>Total: {{count}}</div>
 */
eachjs.reservedDataKeys = {
	index: "i",
	length: "length",
	count: "count",
};
/*
 * @description
 * Checked values
 */
eachjs.dataStoreCheckedValues = {
	True: "true",
	On: "on",
	One: "1",
};
/*
 * @description
 * System attributes
 */
eachjs.systemAttributes = {	
	// Element id
	dataEid: "data-ej-eid",
	// Page id keeps same without a refresh and can thus be used as part of cache keys
	dataPid: "data-ej-psid"
};
/*
 * @description
 * Registered tag controls
 */
eachjs.registeredControls = [];
/*
 * @description
 * Restorable HTML contents 
 */
eachjs.restorableHtmlContents = [];
/*
 * @description
 * Variables passed from input on to output
 */
eachjs.passedOnVars = [];
/*
 * @description
 * Action statuses
 */
eachjs.actionStatuses = [];
/*
 * @description
 * Action status enum values
 */
eachjs.actionStatusEnum = {
	processing: 1,
	completed: 10,
	failed: -1
};
/*
 * @description
 * Default child tags
 */
eachjs.defaultChildTags = [];
/*
 * @description
 * Optional child tags
 */
eachjs.optionalChildTags = [];
/*
 * @description
 * Default attribute of a tag control
 * @example
 * The default attribute of "input" is "value";
 * The default attribute of "img" is "src"
 */
eachjs.defaultAttributes = [];
/*
 * @description
 * Default parameter for flash effects/actions
 */
eachjs.defaultFlashParameter = 800;
/*
 * @description
 * Evaluates if an object is in JSON format or can be converted into JSON format
 * @param {object} o A javascript object.
 */
eachjs.isJson = function(o) {
	if (typeof o != 'string')
        o = JSON.stringify(o);
    try {
        JSON.parse(o);
        return true;
    } catch (e) {
        return false;
    }
};
/*
 * @description
 * Registers default child tag
 * @param {string} tag The tag name, such as "ul".
 * @param {string} childTag The tag name, such as "li".
 */
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
/*
 * @description
 * Gets default child tag
 * @param {string} tag The tag name, such as "ul".
 */
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
/*
 * @description
 * Registers optional child tag
 * @param {string} tag The tag name, such as "table".
 * @param {string} childTag The child tag name, such as "tbody".
 */
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
/*
 * @description
 * Gets optional child tag
 * @param {string} tag The tag name.
 */
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
/*
 * @description
 * Registers default attribute
 * @param {string} tag The tag name.
 * @param {string} attribute The attribute name.
 */
eachjs.registerDefaultAttribute = function(tag, attribute) {
	var exists = false;
	for(var i = 0, len = this.defaultAttributes.length; i < len; i++) {
		if( this.defaultAttributes[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.defaultAttributes.push({ tag: tag, attribute: attribute });
	}	
};
/*
 * @description
 * Gets default attribute
 * @param {string} tag The tag name.
 */
eachjs.getDefaultAttribute = function(tag) {
	var attribute;
	for(var i = 0, len = this.defaultAttributes.length; i < len; i++) {
		if( this.defaultAttributes[i].tag === tag.toLowerCase() ) {
			attribute = this.defaultAttributes[i].attribute;
			break;
		}        	
	}
	return attribute;
};
/*
 * @description
 * Registers tag control for tracking
 * @param {string} tag The tag name.
 * @param {object} control The control instance object.
 */
eachjs.registerControl = function(tag, control) {
	var exists = false;
	for(var i = 0, len = this.registeredControls.length; i < len; i++) {
		if( this.registeredControls[i].tag === tag ) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.registeredControls.push({ tag: tag, control: control });
	}
};
/* 
 * @description
 * Gets registered tag control
 * @param {string} tag The tag name.
 */
eachjs.getRegisteredControl = function(tag) {
	var control;
	for(var i = 0, len = this.registeredControls.length; i < len; i++) {
		if( this.registeredControls[i].tag === tag ) {
			control = this.registeredControls[i].control;
			break;
		}        	
	}
	return control;
};
/*
 * @description
 * Registers action status
 * @param {string} eid The element id.
 * @param {enum} status The element's status.
 */
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
/*
 * @description
 * Gets registered action status
 * @param {string} eid The element id.
 */
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
/*
 * @description
 * Adds the original HTML contents to array so they can be re-storable when needed to refresh
 * @param {string} eid The element id.
 * @param {string} htmlContent The HTML content.
 */
eachjs.registerRestorableHtmlContent = function(eid, htmlContent) {
	var exists = false;
	for (var i = 0, len = this.restorableHtmlContents.length; i < len; i++) {
		if (eid != undefined && this.restorableHtmlContents[i].eid === eid) {
			exists = true;
			break;
		}        	
	}
	if (!exists) {
		this.restorableHtmlContents.push({ eid: eid, htmlContent: htmlContent });
		return true;
	} else {
		return false;
	}		
};
/*
 * @description
 * Restores the original HTML contents
 * @param {string} eid The element id.
 */
eachjs.getRestorableHtmlContent = function(eid) {
	var htmlContent;
	if (eid != undefined) {
		for (var i = 0, len = this.restorableHtmlContents.length; i < len; i++) {
			if (eid != undefined && this.restorableHtmlContents[i].eid === eid) {
				htmlContent = this.restorableHtmlContents[i].htmlContent;
				break;
			}        	
		}
	}
	return htmlContent;
};
/*
 * @description
 * Registers variables that can be passed on to output elements
 * @param {string} eid The element id.
 * @param {json} vars The variables that can be passed on to output elements.
 */
eachjs.registerPassedOnVars = function(eid, vars) {
	var isUpdated = false;
	for(var i = 0, len = this.passedOnVars.length; i < len; i++) {
		if( this.passedOnVars[i]["eid"] === eid ) {
			this.passedOnVars[i]["vars"] = vars;
			isUpdated = true;
			break;
		}        	
	}
	if (!isUpdated) {
		this.passedOnVars.push({ eid: eid, vars: vars });
	}
};
/*
 * @description
 * Gets variables that can be passed on to output elements
 * @param {string} eid The element id.
 */
eachjs.getPassedOnVars = function(eid) {
	var vars;
	if (eid != undefined) {
		for (var i = 0, len = this.passedOnVars.length; i < len; i++) {
			if (eid != undefined && this.passedOnVars[i].eid === eid) {
				vars = this.passedOnVars[i].vars;
				break;
			}        	
		}
	}
	return vars;
};
/*
 * @description
 * Gets page id in lower case in the <body> tag
 */
eachjs.getPid = function() {
	var pid = $("body").attr(this.systemAttributes.dataPid);
	// Custom page id
	if (pid == undefined) {
		pid = this.getUuid().toLowerCase();
		$("body").attr(this.systemAttributes.dataPid, pid);
	}
	return pid;
};	
/*
 * @description
 * Gets element id in lower case
 * @param {string} element The jquery element.
 */
eachjs.getEid = function(element) {
	var eid = element.attr(this.systemAttributes.dataEid);
	// Custom element id
	if (eid == undefined) {
		eid = this.getUuid().toLowerCase();
		element.attr(this.systemAttributes.dataEid, eid);
	}
	return eid;
};
/*
 * @description
 * Gets Web API URL/URI
 * @param {string} data The value retrieved from "data" attributes.
 */
eachjs.getUrl = function(data) {
	var urlPart;
	var prefix = this.getPartBeforeColon(data);
	if (prefix === undefined || prefix.toLowerCase() == "http" || prefix.toLowerCase() == "https") {
		urlPart = data;
	} else {
		urlPart = this.getPartAfterColon(data);
	}
	if (urlPart != undefined && urlPart.toLowerCase().indexOf("http://") != 0 && urlPart.toLowerCase().indexOf("https://") != 0) {
		var basePrefix = $(document.body).attr(this.attributes.dataBase);
		if (basePrefix.slice(-1) == "/") {
			basePrefix = basePrefix.slice(0, -1);
		}
		if (urlPart.charAt(0) != "/") {
			urlPart = "/" + urlPart;
		}
		urlPart = basePrefix + urlPart;
	}		
	return urlPart;
};
/*
 * @description
 * Sets content in element
 * @param {string} element The jquery element.
 * @param {string} data The value to be set at the element.
 */
eachjs.setContent = function(element, data) {
	var defaultAttribute = this.getDefaultAttribute(element.prop("tagName"));
	if (defaultAttribute !== undefined) {
		if (defaultAttribute.toLowerCase() === "value") {
			element.val(data);
		} else {
			element.attr(defaultAttribute.toLowerCase(), data);
		}
	} else {
		element.html(data);
	}
};
/*
 * @description
 * Gets content from element
 * @param {string} element The jquery element.
 */
eachjs.getContent = function(element) {
	var content;
	var defaultAttribute = this.getDefaultAttribute(element.prop("tagName").toLowerCase());
	if (defaultAttribute != undefined) {
		if (defaultAttribute === "value") {
			content = element.val();
		} else {
			content = element.attr(defaultAttribute);
		}
	} else {
		content = element.html();
	}
	return content;
};
/*
 * @description
 * Gets data model from attribute
 * @param {string} selector The jquery selector.
 */
eachjs.getDataModelAtAttribute = function(selector) {
	var dataModel = $(selector).attr(this.attributes.dataModel);
	return dataModel;
};
/*
 * @description
 * Gets string within specified characters
 * @param {string} data The value to be processed.
 * @param {regex} rgx The regular expression.
 */
eachjs.getPartWithin = function(data, rgx) {
	var matched;
	if (data != undefined) {
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[1];
		}
	}
	return matched;
};
/*
 * @description
 * Gets string before or after specified characters
 * @param {string} data The value to be processed.
 * @param {regex} rgx The regular expression.
 */
eachjs.getPartBeforeOrAfter = function(data, rgx) {
	var matched;
	if (data != undefined) {
		var match = rgx.exec(data);
		if (match != undefined) {
			matched = match[0];					
		}
	}
	return matched;
};
/*
 * @description
 * Gets string in the parentheses
 * @param {string} data The value to be processed.
 * @example
 * Gets "post" from "(post)/data/items"
 * Gets "refresh<800>" from "#name(refresh<800>)"
 */
eachjs.getPartWithinParentheses = function(data) {
	return this.getPartWithin(data, /\(([\#\<\w,-\>]*)\)/gi);
};
/*
 * @description
 * Gets string in the leading parentheses
 * @param {string} data The value to be processed.
 * @example
 * Gets "storage" from "(storage)accountToken"
 */
eachjs.getPartWithinLeadingParentheses = function(data) {
	return this.getPartWithin(data, /^\(([\#\<\w,-\>]*)\).+/gi);
};
/*
 * @description
 * Gets string without the parentheses
 * @param {string} data The value to be processed.
 * @example
 * Gets "#name" from "#name(refresh<800>)"
 */
eachjs.getPartWithoutParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\(([\#\<\w,-\>]*)\)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};	
/*
 * @description
 * Gets string without the leading parentheses
 * @param {string} data The value to be processed.
 * @example
 * Gets "accountToken" from "(storage)accountToken"
 */
eachjs.getPartWithoutLeadingParentheses = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /^\(([\#\<\w,-\>]*)\)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
/*
 * @description
 * Gets string within the first brackets
 * @param {string} data The value to be processed.
 */
eachjs.getPartWithinBrackets = function(data) {
	return this.getPartWithin(data, /\[([\#\<\w,-\>\$\!]*)\]/gi);
};
/*
 * @description
 * Gets string without the brackets
 * @param {string} data The value to be processed.
 */
eachjs.getPartWithoutBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\[([\#\<\w,-\>\$\!]*)\]/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
/*
 * @description
 * Gets string within the first angle brackets
 * @param {string} data The value to be processed.
 */
eachjs.getPartWithinAngleBrackets = function(data) {
	return this.getPartWithin(data, /\<([\#\<\w,-\>:]*)\>/gi);
};
/*
 * @description
 * Gets string without the angle brackets
 * @param {string} data The value to be processed.
 */
eachjs.getPartWithoutAngleBrackets = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /\<([\#\<\w,-\>:]*)\>/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
/*
 * @description
 * Gets string before the @ character
 * @param {string} data The value to be processed.
 * @example
 * Gets "name" from "name@#itemName"
 */
eachjs.getPartBeforeAtChar = function(data) {
	return this.getPartBeforeOrAfter(data, /^.*?(?=@)/gi);
};
/*
 * @description
 * Gets string after the @ character
 * @param {string} data The value to be processed.
 * @example
 * Gets "#itemName" from "name@#itemName" 
 * Gets "(cookie)price" from "price@(cookie)price".	
 */
eachjs.getPartAfterAtChar = function(data) {
	return this.getPartBeforeOrAfter(data, /[^@]*$/gi);
};
/*
 * @description
 * Gets string before the colon : character
 * @param {string} data The value to be processed.
 * @example
 * Gets "post" from "post:/data/items".
 */
eachjs.getPartBeforeColon = function(data) {
	return this.getPartBeforeOrAfter(data, /^.*?(?=:)/gi);
};
/*
 * @description
 * Gets string after the colon : character
 * @param {string} data The value to be processed.
 * @example
 * Gets "/data/items" from "post:/data/items".
 */
eachjs.getPartAfterColon = function(data) {
	return this.getPartBeforeOrAfter(data, /[^:]*$/gi);
};
/*
 * @description
 * Gets string before the first brackets []
 * @param {string} data The value to be processed.
 * @example
 * Gets "items" from "items[0].name"
 */
eachjs.getPartBeforeBrackets = function(data) {
	return this.getPartBeforeOrAfter(data, /^.*?(?=\[\w*\])/gi);
};
/*
 * @description
 * Gets string after the last brackets [] and dot . characters
 * @param {string} data The value to be processed.
 * @example
 * Gets "name" from "items[0].name"
 */
eachjs.getPartAfterBrackets = function(data) {
	return this.getPartBeforeOrAfter(data, /[^@\[\].]*$/gi);
};
/*
 * @description
 * Removes change line and space characters
 * @param {string} data The value to be processed.
 */
eachjs.getPartWithoutNewLineAndSpaceChars = function(data) {
	var matched;
	if (data != undefined) {
		var rgx = /(\r\n|\n|\r|\s)/gi;
		matched = data.replace(rgx, '');
	}
	return matched;
};
/*
 * @description
 * Whether the string contains word characters only
 * @param {string} data The value to be processed.
 */
eachjs.containsWordCharsOnly = function(data) {
	return /^[\w]+$/.test(data);;
};
/*
 * @description
 * Whether the string contains variable characters only
 * @param {string} data The value to be processed.
 */
eachjs.containsVaraibleCharsOnly = function(data) {
	return /^[\w:$]+$/.test(data);;
};
/*
 * @description
 * Gets a sub entity of data
 * @param {string} data The data object
 * @param {string} repeatKey The part's key
 */
eachjs.getDataPart = function(data, partKey) {
	if (partKey != "" && partKey.match(/(\w+)/gi)) {
		return eval("data." + partKey);
	} else {
		return data;
	}		
};
/*
 * @description
 * Formats the data as JSON format
 * @param {string} data The string to be converted to JSON format if applicable
 */
eachjs.formatDataAsJson = function(data) {
	if (typeof data == "string" && this.isJson(data)) {
		data = JSON.parse(data);
	}
	return data;
};
/*
 * @description
 * Whether the JSON object contains the string as a value
 * @param {string} str The string to be evaluated.
 * @param {string} json The JSON object
 */
eachjs.isValueOf = function(str, json) {
	var isContained = false;
	var i = 0;
	while (!isContained && i<Object.keys(json).length) {
		if (json[Object.keys(json)[i]] == str) {
			isContained = true;
		}
		i++;
	}
	return isContained;
};
/*
 * @description
 * Whether the string is a reversed data key, such as "count".
 * @param {string} str The string to be evaluated.
 */
eachjs.isReservedDataKey = function(str) {
	return this.isValueOf(str, this.reservedDataKeys);
};
/*
 * @description
 * Whether the string is a checked value, such as "on".
 * @param {string} str The string to be evaluated.
 */
eachjs.isCheckedValue = function(str) {
	return this.isValueOf(str, this.checkedValues);
};
/*
 * @description
 * Moves data values from "dataValue" attribute to its destinated location
 * @param {string} The HTML data to be processed.
 */
eachjs.moveDataValues = function(data) {
	var root = $("<div/>").html(data);
	var matchedElements = root.find("[" + this.attributes.dataValue + "]");
	
	for (var i = 0; i < matchedElements.length; i++) {
		var matched = matchedElements.eq(i);
		var value = matched.attr(this.attributes.dataValue);
		if (matched.is(":checkbox")) {
			if (value == "true") {
				matched.attr("checked", "checked");				
			}
		} else {
			this.setContent(matched, value);
		}
		matched.removeAttr(this.attributes.dataValue);
	}
	return root.html();
};
/*
 * @description
 * Gets data store
 * @param {string} data The data to be processed.
 * @example
 * "localstorage", "storage<#checkboxElementId:checked>"
 */
eachjs.getDataStore = function(data) {
	var store = this.getPartWithoutAngleBrackets(data).toLowerCase();
	var parameter = this.getPartWithinAngleBrackets(data);
	if (parameter != null) {
		parameter = parameter.toLowerCase();
	}
	if (store != this.dataStores.localstorage && 
			store != this.dataStores.sessionstorage) {
		if (parameter != null) {
			var paraVal = $(parameter).val();
			if (this.isCheckedValue(parameter) || 
					(paraVal != undefined && this.isCheckedValue(paraVal.toLowerCase()))) {
				store = this.dataStores.localstorage;
			} else {
				store = this.dataStores.sessionstorage;
			}
		}
	}
	// localstorage or sessionstorage
	return store;
};
/*
 * @description
 * Gets parameter data from URL
 * @param {string} dataKey The key in the URL path.
 */
eachjs.getUrlDataValue = function(dataKey) {	
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
/*
 * @description
 * Whether the condition is met
 * @param {string} condition The condition string.
 * @param {string} element The jquery element.
 */
eachjs.isConditionMet = function(condition, data, element) {
	var isMet = true;
	if (condition != undefined) {
		var toBeReversed = false;
		if (condition.indexOf("!") == 0) {
			toBeReversed = true;
			condition = condition.substring(1);
		} 
		isMet = eval("data." + condition);
		if (isMet == undefined) {
			var eid = this.getEid(element);	
			var vars = this.getPassedOnVars(eid);
			isMet = vars[condition];
		}
		if (toBeReversed) {
			isMet = !isMet;
		}
	}
	return isMet;
};
/*
 * @description
 * Gets data from cookie
 * @param {string} cookieKey The cookie's key.
 * @example
 * Price@(cookie)price
 */
eachjs.getCookieDataValue = function(cookieKey) {	
	return this.getCookie(cookieKey);
};
/*
 * @description
 * Gets data from localStorage or sessionStorage
 * @param {string} dataKey The storage key.
 * @param {string} dataStore The data store.
 * @example
 * Name@(storage)name;Name@(localstorage)name;Name@(sessionstorage)name
 */
eachjs.getStorageDataValue = function(dataKey, dataStore) {
	var dataValue;
	if (dataStore == this.dataStores.storage) {
		// Get from sessionStorage first
		dataValue = window.sessionStorage.getItem(dataKey) || window.localStorage.getItem(dataKey);
	} else if (dataStore == this.dataStores.sessionstorage) {
		dataValue = window.sessionStorage.getItem(dataKey);
	} else if (dataStore == this.dataStores.localstorage) {
		dataValue = window.localStorage.getItem(dataKey);
	} 
	return dataValue;
};	
/*
 * @description
 * Gets URL parameter by key
 * @param {string} key The parameter key.
 */
eachjs.getUrlParameterByKey = function(key) {
	key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var rgx = new RegExp("[\\?&]" + key + "=([^&#]*)");
	var matched = rgx.exec(location.search);
	var dataValue = matched === null ? "" : decodeURIComponent(matched[1].replace(/\+/g, " "));
	return dataValue;
};
/*
 * @description
 * Gets URL fragment by key
 * @param {string} key The fragment key.
 */
eachjs.getUrlFragmentByKey = function(key) {
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
/*
 * @description
 * Gets AJAX type such as "GET", "POST", "PUT", and "DELETE"
 * @param {string} str The path string.
 */
eachjs.getAjaxType = function(str) {
	var ajaxType;
	var prefix = this.getPartBeforeColon(str);
	if (prefix === undefined || prefix.toLowerCase() == "http" || prefix.toLowerCase() == "https") {
		ajaxType = "GET"; 
	} else {
		ajaxType = prefix;
	}
	return ajaxType;
};
/*
 * @description
 * Gets auth key
 * @param {string} selector The jquery selector.
 * @param {string} event The event name.
 */
eachjs.getAuthKey = function(selector, event) {
	var dataKey;
	if (event === undefined || event === this.events.load) {
		dataKey = $(selector).attr(this.attributes.dataLoadAuth);
	} else if (event === this.events.change) {
		dataKey = $(selector).attr(this.attributes.dataChangeAuth);
	} else if (event === this.events.click) {
		dataKey = $(selector).attr(this.attributes.dataClickAuth);
	} else if (event === this.events.doubleclick) {
		dataKey = $(selector).attr(this.attributes.dataDoubleClickAuth);
	} else if (event === this.events.keydown) {
		dataKey = $(selector).attr(this.attributes.dataKeyDownAuth);
	} else if (event === this.events.keyup) {
		dataKey = $(selector).attr(this.attributes.dataKeyUpAuth);
	} else if (event === this.events.mousedown) {
		dataKey = $(selector).attr(this.attributes.dataMouseDownAuth);
	} else if (event === this.events.mouseup) {
		dataKey = $(selector).attr(this.attributes.dataMouseUpAuth);
	} else if (event === this.events.rightclick) {
		dataKey = $(selector).attr(this.attributes.dataRightClickAuth);
	}
	return dataKey;
};
/*
 * @description
 * Gets output attribute
 * @param {string} event The event name.
 */
eachjs.getOutputAttribute = function(event) {
	var attr;
	if (event === undefined || event === this.events.load) {
		attr = this.attributes.dataLoadOutput;
	} else if (event === this.events.change) {
		attr = this.attributes.dataChangeOutput;
	} else if (event === this.events.click) {
		attr = this.attributes.dataClickOutput;
	} else if (event === this.events.doubleclick) {
		attr = this.attributes.dataDoubleClickOutput;
	} else if (event === this.events.keydown) {
		attr = this.attributes.dataKeyDownOutput;
	} else if (event === this.events.keyup) {
		attr = this.attributes.dataKeyUpOutput;
	} else if (event === this.events.mousedown) {
		attr = this.attributes.dataMouseDownOutput;
	} else if (event === this.events.mouseup) {
		attr = this.attributes.dataMouseUpOutput;
	} else if (event === this.events.rightclick) {
		attr = this.attributes.dataRightClickOutput;
	}	
	return attr;
};
/*
 * @description
 * Gets error attribute
 * @param {string}
 */
eachjs.getErrorAttribute = function(event) {
	var attr;
	if (event === undefined || event === this.events.load) {
		attr = this.attributes.dataLoadError;
	} else if (event === this.events.change) {
		attr = this.attributes.dataChangeError;
	} else if (event === this.events.click) {
		attr = this.attributes.dataClickError;
	} else if (event === this.events.doubleclick) {
		attr = this.attributes.dataDoubleClickError;
	} else if (event === this.events.keydown) {
		attr = this.attributes.dataKeyDownError;
	} else if (event === this.events.keyup) {
		attr = this.attributes.dataKeyUpError;
	} else if (event === this.events.mousedown) {
		attr = this.attributes.dataMouseDownError;
	} else if (event === this.events.mouseup) {
		attr = this.attributes.dataMouseUpError;
	} else if (event === this.events.rightclick) {
		attr = this.attributes.dataRightClickError;
	}	
	return attr;
};
/*
 * @description
 * Gets input key
 * @param {string} selector The jquery selector.
 * @param {string} event The event name.
 */
eachjs.getInputKey = function(selector, event) {
	var dataKey;
	if (event === undefined || event === this.events.load) {
		dataKey = $(selector).attr(this.attributes.dataLoadInput);
	} else if (event == this.events.change) {
		dataKey = $(selector).attr(this.attributes.dataChangeInput);
	} else if (event == this.events.click) {
		dataKey = $(selector).attr(this.attributes.dataClickInput);
	} else if (event == this.events.doubleclick) {
		dataKey = $(selector).attr(this.attributes.dataDoubleClickInput);
	} else if (event == this.events.keydown) {
		dataKey = $(selector).attr(this.attributes.dataKeyDownInput);
	} else if (event == this.events.keyup) {
		dataKey = $(selector).attr(this.attributes.dataKeyUpInput);
	} else if (event == this.events.mousedown) {
		dataKey = $(selector).attr(this.attributes.dataMouseDownInput);
	} else if (event == this.events.mouseup) {
		dataKey = $(selector).attr(this.attributes.dataMouseUpInput);
	} else if (event == this.events.rightclick) {
		dataKey = $(selector).attr(this.attributes.dataRightClickInput);
	} 
	return dataKey;
};
/*
 * @description
 * Resets element with original HTML content
 * @param {object} element The jquery element.
 */
eachjs.resetElementData = function(element) {
	var eid = this.getEid(element);
	var added = this.registerRestorableHtmlContent(eid, element.html());
	if (!added) {
		// Get original HTML content
		var originalHtmlContent = this.getRestorableHtmlContent(eid);
		element.html(originalHtmlContent);
	}	
};
/*
 * @description
 * Clones template and insert new element
 * @param {object} parentElement The parent element.
 * @param {object} templateElement The template element.
 * @param {int} position The template element's position.
 * @param {int} index The new element's position after the template.
 */
eachjs.cloneTemplateAsNewElement = function(parentElement, templateElement, position, index) {
	var newElement = templateElement.clone();
	// Clean up attribute
	newElement.removeAttr(this.attributes.dataRepeat);
	// Handle indexes
	newElement.html(templateElement.html().replace('{{' + this.reservedDataKeys.index + '}}', index + 1)); 
	newElement.insertAfter(parentElement.children().eq(position + index));
	return newElement;
};
/*
 * @description
 * Clones template to a new element
 * @param {string} tag The tag name.
 * @param {object} parentElement The parent element.
 */
eachjs.getNewElement = function(tag, parentElement) {
	var newElement = $("<" + tag + ">");
	parentElement.append(newElement);
	return newElement;
};
/*
 * @description
 * Adds count to element
 * @param {object} element The jquery element.
 * @param {object} data The JSON data.
 */
eachjs.addCountToElement = function(element, data) {
	var dataLength = (data != undefined && data.length != undefined) ? data.length : 0;
	// Handle the total count
	element.html(element.html().replace('{{' + this.reservedDataKeys.count + '}}', dataLength)); 		
	element.html(element.html().replace('{{' + this.reservedDataKeys.length + '}}', dataLength)); 
	return element;
};
/*
 * @description
 * Handles when optionalChildTag does not exist, such as <tbody>
 * @param {object} element The jquery element.
 * @param {string} optionalChildTag The optional child tag.
 */
eachjs.skipToHiddenElement = function(element, optionalChildTag) {
	if (element.children("[" + this.attributes.dataRepeat + "]").length == 0 && 
			element.children().length == 1 && 
			element.children().first().prop("tagName").toLowerCase() == optionalChildTag) {
		// Get the hidden child tag element, such as <tbody>
		element = element.children().eq(0);
	}
	return element;
};
/*
 * @description
 * Gets parameters for local function
 * @param {object} The JSON data from input
 */
eachjs.getFunctionPara = function(inputData) {
	var para = "";
	if (inputData != null) {						
		var paras = [];
		for (var i = 0; i < Object.keys(inputData).length; i++) {
			paras.push("\"" + inputData[Object.keys(inputData)[i]] + "\"");
		}
		para = paras.join();
	}
	return para;
};
/*
 * @description
 * Gets authorization data
 * Supports sessionStorage and localStorage
 * @param {string} selector The jquery selector.
 * @param {string} event The event name.
 */
eachjs.getAuthData = function(selector, event) {
	var authKey = this.getAuthKey(selector, event);
	var dataValue;
	if (authKey != undefined) {
		var dataSource = this.getPartWithinParentheses(authKey);
		var dataKey = this.getPartWithoutParentheses(authKey);
		if (dataSource != undefined) {			
			if (dataSource == this.dataStores.cookie) {
				dataValue = this.getCookieDataValue(dataKey);
			} else if (dataSource.indexOf(this.dataStores.storage) >= 0) {
				dataValue = this.getStorageDataValue(dataKey, dataSource);
			} else {
				// Invalid
			}
		} else {
			// Default to "storage"
			dataValue = this.getStorageDataValue(dataKey, this.dataStores.storage);
		}		
	}
	return dataValue;
};
/*
 * @description
 * Gets data from element
 * @param {string} data The string containing data key. 
 * @example
 * h4.category;input#itemName;#itemQuantity[data-quantity];
 */
eachjs.getElementDataValue = function(data) {
	var dataValue;
	var dataAttr = this.getPartWithinBrackets(data);
	var dataKey = this.getPartWithoutBrackets(data);
	if (dataAttr != undefined) {
		dataValue = $(dataKey).attr(dataAttr);
	} else {
		if ($(dataKey).length == 1) {
			dataValue = this.getContent($(dataKey));		
		} else if ($(dataKey).length > 1) {
			dataValue = [];
			for (var i = 0; i < $(dataKey).length; i++) {
				dataValue.push(this.getContent($(dataKey).eq(i)));
			}
		}
	}
	return dataValue;
};
/* 
 * @description
 * Replaces dataModel with dataValue and removes repeat key prefixes
 * @param templateContent The template's content in HTML format.
 * @param repeatKey The repeatKey.
 */
eachjs.cleanTemplateContent = function(templateContent, repeatKey) {
	var rgx = new RegExp(this.attributes.dataModel + "=(\"|')(\\w*\\[\\]\.\\w+)(\"|')", "gi");
	templateContent = templateContent.replace(rgx, this.attributes.dataValue + "=$1{{$2}}$3");
	if (repeatKey != null) {	
		// Removes repeat key prefixes, such as from "{{a[].b}}" to "{{b}}"
		var reg = new RegExp('({{' + repeatKey + '\\[\\]\\.)', 'gi');
		templateContent = templateContent.replace(reg, '{{');
	}
	return templateContent;
};
/*
 * @description
 * Gets content to fill
 * @param {object} dataObject The JSON data.
 * @param {string} templateContent The template's content in HTML format.
 * @param {string} repeatKey The repeat key.
 */
eachjs.getContentToFill = function(dataObject, templateContent, repeatKey) {	
	var content;
	if (templateContent == "" || templateContent == null) {
		if (this.isJson(dataObject)) {
			// Takes "value" or "Value" if there is not a template element
			content = dataObject.value || dataObject.Value;
		} else {			
			content = dataObject;	
		}
	} else {
		var $this = this;
		var getNewValue = function(str, p1, offset, s) {
			var newValue = $this.isReservedDataKey(p1) ? str : eval("dataObject." + p1);
			return  newValue; 
		};
		templateContent = this.cleanTemplateContent(templateContent, repeatKey);
		// Replace with JSON data
		content = templateContent.replace(/{{(\w+)}}/gi, getNewValue);
		content = this.moveDataValues(content);
	}
	return content;
};
/* 
 * @description
 * Gets model data array
 * @param {string} selector The jquery selector.
 * @param {string} event The event name.
 */
eachjs.getModelData = function(selector, event) {
	var modelData = [];
	var passedOnData = {};
	var inputKey = this.getInputKey(selector, event);
	if (inputKey != undefined) {
		var arrInputKey= inputKey.split(";");
		for (var i = 0; i < arrInputKey.length; i++) {		
			var inputKey = this.getPartWithoutNewLineAndSpaceChars(arrInputKey[i]);			
			var modelValue = this.getInputModelValue(inputKey, selector);
			modelData.push(modelValue);
		}		
		// Move out pass-on variables
		for (var i = 0; i < modelData.length; i++) {
			if (modelData[i][0].indexOf("$") == 0 && modelData[i][1] != undefined) {
				passedOnData[modelData[i][0]] = modelData[i][1];	
				modelData.splice(i, 1);
				i -= 1;
			}
		}	
		// Register pass-on variables
		if (passedOnData != undefined && !$.isEmptyObject(passedOnData)) {
			var eid = this.getEid($(selector));
			this.registerPassedOnVars(eid, passedOnData);
		}		
	}
	return modelData;
};
/*
 * @description
 * Gets input key/value and put them into array
 * @param {string} selector The jquery selector.
 * @param {event} event The event name.
 * @example
 * InputKey: item[].name@.item-name, item[].text@.item-text
 * InputData: { items: [{ name: 1, text: 12 }, { name: 2, text: 23 }] }
 */
eachjs.getInputData = function(selector, event) {
	var inputData = {};
	var modelData = this.getModelData(selector, event);
	if (modelData.length == 1 && modelData[0][0] != undefined && modelData[0][1] == undefined) {
		inputData = modelData[0][0];
	} else {
		inputData = {};
		for (var i = 0; i < modelData.length; i++) {
			var key = this.getPartBeforeBrackets(modelData[i][0]);
			if (key == undefined) {
				inputData[modelData[i][0]] = modelData[i][1];	
			} else {
				var subKey = this.getPartAfterBrackets(modelData[i][0]);
				if (inputData[key] == undefined) {
					inputData[key] = [];
					for (var iArray = 0; iArray < modelData[i][1].length; iArray++) {
						var subData = {};
						subData[subKey] = modelData[i][1][iArray];
						inputData[key].push(subData);
					}						
				} else {
					for (var iArray = 0; iArray < modelData[i][1].length; iArray++) {
						inputData[key][iArray][subKey] = modelData[i][1][iArray];
					}	
				}
			}
		}			
	}
	return inputData;
};
/*
 * @description
 * Gets input data model
 * @param {string} inputKey The input key.
 */
eachjs.getInputDataModel = function(inputKey) {
	var dataModel;
	// Get part before @
	if (inputKey.indexOf("@") < 0) {
		dataModel = inputKey;
	} else {
		dataModel = this.getPartBeforeAtChar(inputKey);		
		// Get data model from attribute if not set
		if (dataModel == undefined) {			
			dataModel = this.getDataModelAtAttribute(inputKey);	
		}
	}	
	return dataModel;
};
/*
 * @description
 * Gets input key
 * @param {string} inputKey The input key.
 */
eachjs.getInputDataKey = function(inputKey) {
	var dataKey;
	// Get part before @
	if (inputKey.indexOf("@") >= 0) {
		// Get part after @
		dataKey = this.getPartAfterAtChar(inputKey);
	}
	return dataKey;
};
/*
 * @description
 * Gets input model/value pair
 * @param {string} inputKey The input key.
 * @param {string} selector The jquery selector.
 */
eachjs.getInputModelValue = function(inputKey, selector) {	
	var dataValue;
	var dataModel = this.getInputDataModel(inputKey);
	var dataKey = this.getInputDataKey(inputKey);	
	var store = this.getPartWithinParentheses(dataKey);
	if (store != null) {
		store = store.toLowerCase();		
		var methodKey = this.getPartWithoutParentheses(dataKey);		
		if (store == this.dataStores.url) {
			dataValue = this.getUrlDataValue(methodKey);
		} else if (store == this.dataStores.cookie) {
			dataValue = this.getCookieDataValue(methodKey);
		} else if (store.indexOf(this.dataStores.storage) >= 0) {
			dataValue = this.getStorageDataValue(storageKey, store);
		} else {
			// invalid
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
				dataValue = this.getContent($(selector));
			} else {
				dataValue = [];
				for (var i = 0; i < $(selector).length; i++) {
					dataValue.push(this.getContent($(selector).eq(i)));
				}
			}
		}
	}	
	return [dataModel, dataValue];
};
/*
 * @description
 * Removes data storage
 * @param {string} dataStore The data store.
 * @param {string} storageKey The key of storage.
 */
eachjs.removeStorage = function(dataStore, storageKey) {
	if (dataStore == undefined || dataStore == this.dataStores.storage) {
		// Remove both localStorage and sessionStorage if authorization method is unspecified
		window.localStorage.removeItem(storageKey);
		window.sessionStorage.removeItem(storageKey);
	} else if (dataStore == this.dataStores.localstorage) {
		window.localStorage.removeItem(storageKey);
	} else {
		window.sessionStorage.removeItem(storageKey);
	}
};
/*
 * @description
 * Adds data storage
 * @param {string} dataStore The data store.
 * @param {string} storageKey The key of storage.
 */
eachjs.addStorage = function(dataStore, storageKey, data) {
	if (dataStore != undefined && dataStore == this.dataStores.localstorage) {							
		window.localStorage.setItem(storageKey, data);
	} else {			
		window.sessionStorage.setItem(storageKey, data);				
	}	
};
/*
 * @description
 * Processes output url
 * @param {string} action The URL action.
 */
eachjs.processOutputUrl = function(action, url) {
	if (action == this.actions.reload) {
		window.location.reload();
	} else if (action == this.actions.redirect) {
		window.location.replace(url);
	}
};
/*
 * @description
 * Processes output cookies
 * @param {string} condition The condition string.
 * @param {object} data The data to be stored.
 * @param {string} element The jquery element.
 * @param {string} cookieKey The cookie key.
 */
eachjs.processOutputCookies = function(condition, data, element, cookieKey) {
	var isMet = this.isConditionMet(condition, data, element);
	if (isMet && cookieKey != undefined) {
		if (cookieKey.indexOf("-") == 0) {
			// Remove cookie
			cookieKey = cookieKey.substring(1);
			this.setCookie(cookieKey, data, -1);
		} else {	
			this.setCookie(cookieKey, data);
		}	
	}
};
/*
 * @description
 * Processes output storages
 * @param {string} condition The condition string.
 * @param {string} element The jquery element.
 * @param {object} data The data to be stored.
 * @param {string} storageMethod The storage method.
 * @param {string} storageKey The storage key.
 */
eachjs.processOutputStorages = function(condition, data, element, storageMethod, storageKey) {
	var isMet = this.isConditionMet(condition, data, element);
	if (isMet && storageKey != undefined) {
		if (storageKey.indexOf("-") == 0) {
			// Remove storage
			storageKey = storageKey.substring(1);
			this.removeStorage(storageMethod, storageKey);
		} else {	
			this.addStorage(storageMethod, storageKey, data);
		}	
	}
};
/*
 * @description
 * Processes output to a data store
 * @param {string} condition The condition string.
 * @param {object} data The data to be stored.
 * @param {string} element The jquery element.
 * @param {string} dataStore The data store value.
 * @param {string} target The target string.
 * @param {string} targetModel The target model.
 */
eachjs.processOutputStore = function(condition, data, element, dataStore, target, targetModel) {
	if (dataStore == this.dataStores.url) {
		// Url
		var actionAndUrl = this.getPartWithoutLeadingParentheses(target);
		var action = this.getPartWithoutAngleBrackets(actionAndUrl);
		var url = this.getPartWithinAngleBrackets(actionAndUrl);
		this.processOutputUrl(action, url);
	} else if (dataStore == this.dataStores.cookie) {
		// Cookie
		var cookieKey = this.getPartWithoutLeadingParentheses(target);
		var objectData = (targetModel == null) ? data : this.getDataPart(data, targetModel);
		this.processOutputCookies(condition, objectData, element, cookieKey);		
	} else {
		// localstorage or sessionstorage
		var storageMethod = this.getDataStore(dataStore);
		var storageKey = this.getPartWithoutLeadingParentheses(target);
		var objectData = (targetModel == null) ? data : this.getDataPart(data, targetModel);
		this.processOutputStorages(condition, objectData, element, storageMethod, storageKey);							
	}
};
/*
 * @description
 * Adds data to element
 * @param {string} tag The tag name.
 * @param {string} defaultChildTag The default child tag name.
 * @param {string} optionalChildTag The optional child tag name.
 * @param {object} element The jquery element.
 * @param {object} data The JSON data.
 * @param {string} repeatKey The repeat key.
 */
eachjs.addDataToElement = function(tag, element, data, repeatKey, defaultChildTag, optionalChildTag) {
	if (typeof data != "object") {
		// Data is a pure string
		this.setContent(element, data);
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
				var templateTag = (defaultChildTag == undefined || defaultChildTag == "") ? tag : defaultChildTag;
				var newElement = this.getNewElement(templateTag, element);
				this.addDataToElement(templateTag, newElement, data[i]);
			}				
		} else {
			// Handle when optionalChildTag does not exist, such as <tbody>
			element = this.skipToHiddenElement(element, optionalChildTag);
			this.addRepeatedDataToElement(tag, defaultChildTag, optionalChildTag, element, data);
		}			
	} 		
};	
/*
 * @description
 * Adds data to elements with data-repeat attributes
 * @param {string} tag The tag name.
 * @param {string} defaultChildTag The default child tag name.
 * @param {string} optionalChildTag The optional child tag name.
 * @param {object} element The jquery element.
 * @param {object} data The JSON data.
 */
eachjs.addRepeatedDataToElement = function(tag, defaultChildTag, optionalChildTag, element, data) {
	// Children with data-repeat attributes
	var templates = element.children("[" + this.attributes.dataRepeat + "]");
	if (templates.length > 0) {
		for(var i = 0; i < templates.length; i++) {
			var template = templates.eq(i);
			var position = element.children().index(template);
			var repeatKey = template.attr(this.attributes.dataRepeat);
			// Get the sub data for the current HTML element
			var dataPart = this.getDataPart(data, repeatKey);	
			if (dataPart != undefined && dataPart.length > 0) {
				// Multiple sub data entities
				for(var j = 0; j < dataPart.length; j++) {
					var newElement = this.cloneTemplateAsNewElement(element, template, position, j);							
					// Set the sub data entity into the new HTML element
					this.addDataToElement(tag, newElement, dataPart[j], repeatKey, defaultChildTag, optionalChildTag);
				}	
			}
			// Remove template
			template.remove();
		}
		// Add count to element
		element = this.addCountToElement(element, dataPart);	
	}
};
/*
 * @description
 * Sets the data into the tag element
 * @param {object} dataObject The data object to fill.
 * @param {object} element The jquery element to be filled.
 * @param {string} repeatKey The repeat key.
 */
eachjs.setElementData = function(dataObject, element, repeatKey) {
	$this = this;
	// Set HTML content
	var data = this.getContentToFill(dataObject, element.html(), repeatKey);
	element.html(data);
	// Set all attributes
	$.each(element[0].attributes, function() {
		if(this.specified) {
			var content = this.value;
			data = $this.getContentToFill(dataObject, content, repeatKey);
			this.value = data;
		}
	});
};	
/*
 * @description 
 * Gets output string array
 * @param {object} element The jquery element.
 * @param {string} attribute The attribute name.
 */
eachjs.getOutputs = function(element, attribute) {
	var newArrDataOutput = [];
	if (attribute != undefined && element.attr(attribute) != undefined) {
		var arrDataOutput = element.attr(attribute).split(";");
		for (var i = 0; i < arrDataOutput.length; i++) {
			var isValid = true;
			// Remove change line characters and space characters
			//	but keep the empty one
			arrDataOutput[i] = this.getPartWithoutNewLineAndSpaceChars(arrDataOutput[i]);
			if (arrDataOutput[i].length == 0 && i == arrDataOutput[i].length - 1) {
				isValid = false;
			}
			if (isValid) {
				newArrDataOutput.push(arrDataOutput[i]);
			}
		}
	}		
	return newArrDataOutput;
};
/*
 * @description
 * Sets cookie
 * @param {string} cookieName The cookie's name.
 * @param {string} value The cookie's value.
 * @param {string} extendedHours The expiration extension in hours.
 */
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
/*
 * @description
 * Gets cookie
 * @param {string} cookieName The cookie's name.
 */
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
/*
 * @description
 * Gets universally unique identifier
 * @param {string} len The desired number of characters.
 * @param {int} radix The number of allowable values for each character. Default is 62.
 */
eachjs.getUuid = function (len, radix) {
	/*!
	Math.uuid.js (v1.4)
	http://www.broofa.com
	mailto:robert@broofa.com
	Copyright (c) 2010 Robert Kieffer
	Dual licensed under the MIT and GPL licenses.
	*/	
	// Private array of chars to use
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
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
/*
 * @description
 * Registers a control
 * @param {object} control The tag control.
 */
eachjs.register = function(control) {
	// Register tag control if not registered
	this.registerControl(control.tag, control);
};
/*
 * @description
 * Processes all controls
 */
eachjs.process = function() {
	for(var i = 0; i < this.registeredControls.length; i++) {
		this.registeredControls[i].control.process();
	}
};

/*
 * @description
 * Functions shared by supported HTML elements
 */
eachjs.control = function() {};    
/*
 * @description
 * Initializes tag control
 * @param {string} tag The tag name.
 * @param {string} defaultChildTag The default child tag name.
 * @param {string} optionalChildTag The optional child tag name.
 * @param {string} changeEventKey The change event's key. Default is "change".
 */
eachjs.control.prototype.init = function(tag, defaultChildTag, optionalChildTag, changeEventKey) {    
    this.parent = eachjs;
    this.tag = tag;
	this.changeEventKey = "change";
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
	// Change event key
	if (changeEventKey != undefined) {
		this.changeEventKey = changeEventKey;
	}
};
/*
 * @description
 * Sets default attribute.
 * @param {string} attribute The attribute value.
 */
eachjs.control.prototype.setDefaultAttribute = function(attribute) {
	this.defaultAttribute = attribute;
	this.parent.registerDefaultAttribute(this.tag, attribute);
};
/*
 * @description
 * Executes the AJAX action
 * @param {string} eid The element id.
 * @param {string} url The URL string.
 * @param {object} $control The tag control.
 * @param {string} ajaxType The ajax type such as "GET" and "POST".
 * @param {object} inputData The input data.
 * @param {object} authData The authorization data.
 * @param {string} event The event name.
 */
eachjs.control.prototype.executeAjax = function(eid, url, $control, ajaxType, inputData, authData, event) {
	var $this = this;
	// Add header
	var dataEid = this.parent.systemAttributes.dataEid;
	var dataPid = this.parent.systemAttributes.dataPid;
	var authorization = "Authorization";
	var pid = this.parent.getPid();
	$.ajax({
		type: ajaxType,
		url: url,
		beforeSend: function (request)
		{
			// PID can be used for session-based caches
			request.setRequestHeader(dataPid, pid);
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
			json = $this.parent.formatDataAsJson(json);		
			// Compatible with Google JSON style guide
			// Compatible with JSONAPI.org style
			if (json != "" && json != undefined && json.error == undefined && json.status != "error") {
				$control.processResults(eid, json, event);				
			} else {
				$control.handleErrors(eid, json, event);
			}
			$this.parent.registerActionStatus(eid, $this.parent.actionStatusEnum.completed);
		}, 
		error: function(e) {
		   console.debug("Error: " + e.statusText);
		   $control.handleErrors(eid); 
		   $this.parent.registerActionStatus(eid, $this.parent.actionStatusEnum.failed);
		}
	});		
};
/*
 * @description
 * Executes the local data source
 * @param {string} eid The element id.
 * @param {object} data The JSON data.
 * @param {object} $control The tag control.
 * @param {string} event The event name.
 */
eachjs.control.prototype.executeLocal = function(eid, data, $control, event) {
	$control.processResults(eid, data, event);	
	this.parent.registerActionStatus(eid, this.parent.actionStatusEnum.completed);	
};
/*
 * @description
 * Processes data including output/authorization data
 * @param {string} eid The element id.
 * @param {object} data The JSON data.
 * @param {string} event The event name.
 */
eachjs.control.prototype.processResults = function(eid, data, event) {
	var element = $(this.tag + "[" + this.parent.systemAttributes.dataEid + "='" + eid + "']");
	// Handle data-output
	var attr = this.parent.getOutputAttribute(event);
	this.processOutputs(data, element, attr, this.populateData);
};
/*
 * @description
 * Processes output/failure data
 * @param {object} data The JSON data.
 * @param {object} element The jquery element.
 * @param {string} attribute The attribute name.
 * @param {function} fnPopulateData the function used to populate data.
 */
eachjs.control.prototype.processOutputs = function(data, element, attribute, fnPopulateData) {
	var arrOutputs = this.parent.getOutputs(element, attribute);
	if (arrOutputs.length > 0) {
		for (var i = 0; i < arrOutputs.length; i++) {
			if (arrOutputs[i].length > 0) {				
				this.processOutput(data, arrOutputs[i], element, fnPopulateData);
			} else {
				// Self is a target
				fnPopulateData(null, data, element, this);
			}
		}
	} else {
		// Self is a target
		fnPopulateData(null, data, element, this);
	}
};

/*
 * @description
 * Processes an output part
 * @param {object} data The JSON data.
 * @param {string} output The output string.
 * @param {object} element The jquery element.
 * @param {function} fnPopulateData the function used to populate data.
 */
eachjs.control.prototype.processOutput = function(data, output, element, fnPopulateData) {
	// Matching action
	var targetModel = this.parent.getPartBeforeAtChar(output);
	var target = this.parent.getPartAfterAtChar(output);
	if (target == undefined) target = output;	
	var condition = this.parent.getPartWithinBrackets(target);
	if (condition != undefined) {
		target = this.parent.getPartWithoutBrackets(target);
	}
	
	var dataStorePart = this.parent.getPartWithinLeadingParentheses(target);
	if (dataStorePart != undefined) {
		this.parent.processOutputStore(condition, data, element, dataStorePart.toLowerCase(), target, targetModel);
	} else {
		this.executeOutputActions(condition, data, element, target, targetModel, fnPopulateData);		
	}	
};
/*
 * @description
 * Processes output actions
 * @param {string} condition The condition string.
 * @param {object} data The JSON data.
 * @param {object} element The jquery element.
 * @param {string} target The target string.
 * @param {function} targetModel The target model.
 */
eachjs.control.prototype.executeOutputActions = function(condition, data, element, target, targetModel, fnPopulateData) {
	var targetObjectAndAction = this.parent.getPartWithoutLeadingParentheses(target);
	if (targetObjectAndAction == undefined) targetObjectAndAction = target;
	
	var targetObject = this.parent.getPartWithoutParentheses(targetObjectAndAction);		
	if (targetObject.indexOf("@") == 0) targetObject = targetObject.substring(1);
	// Evaluate if the target object exists
	var targetElement = (targetObject != '') ? $(targetObject) : element;
	
	if (targetElement.length > 0) {
		// Find matched actions/parameters
		var targetActionAndParameters = this.parent.getPartWithinParentheses(targetObjectAndAction);
		
		// Handles multiple target actions
		var arrTargetActionAndParameter = (targetActionAndParameters == null) ? [""] : targetActionAndParameters.split(",");
		for (var iAction = 0; iAction < arrTargetActionAndParameter.length; iAction++) {
			var targetAction = this.parent.getPartWithoutAngleBrackets(arrTargetActionAndParameter[iAction]);
					
			// Find matched model
			// Get data model from attribute if not set
			// targetObject cannot be empty (the current element)
			if (targetModel == undefined) {		
				targetModel = this.parent.getDataModelAtAttribute(targetObject);
			}
			var objectData = (targetModel == null) ? data : this.parent.getDataPart(data, targetModel);
			// Evaluate the target action value
			if (targetAction == null || targetAction == "") {
				// Default action is populate
				fnPopulateData(condition, objectData, targetElement, this);
			} else {							
				// Handles multiple target actions
				var customParameter = this.parent.getPartWithinAngleBrackets(arrTargetActionAndParameter[iAction]);
				this.executeOutputAction(condition, objectData, targetElement, targetAction, fnPopulateData, customParameter);
			}								
		}					
	}  else {
		// Call custom function
		if (this.parent.containsVaraibleCharsOnly(targetObject) && typeof eval(targetObject) == "function") {			
			eval(targetObject)(data);
		}
	}			
};
/*
 * @description
 * Processes output action
 * @param {string} condition The condition string.
 * @param {object} data The JSON data.
 * @param {object} element The jquery element.
 * @param {string} action The action name.
 * @param {function} fnPopulateData the function used to populate data.
 * @param {int} customParameter The custom parameter.
 */
eachjs.control.prototype.executeOutputAction = function(condition, data, element, action, fnPopulateData, customParameter) {
	var isMet = this.parent.isConditionMet(condition, data, element);
	if (isMet) {
		// Handles multiple target actions
		var eid = this.parent.getEid(element);		
		if (action == this.parent.actions.addclass) {
			element.addClass(customParameter);
		} else if (action == this.parent.actions.class) {
			element.removeClass().addClass(customParameter);
		} else if (action == this.parent.actions.clear) {
			this.parent.setContent(element, "");
		} else if (action == this.parent.actions.disable) {
			element.prop("disabled", true);
		} else if (action == this.parent.actions.enable) {
			element.prop("disabled", false);
		} else if (action == this.parent.actions.fadein) {
			element.fadeIn();
		} else if (action == this.parent.actions.fadeout) {
			element.fadeOut();
		} else if (action == this.parent.actions.flash) {
			// Handle custom delay length
			var delayLength = (customParameter != undefined) ? customParameter : this.parent.defaultFlashParameter;
			element.fadeIn().delay(delayLength).fadeOut();
		} else if (action == this.parent.actions.hide) {
			element.hide();
		} else if (action == this.parent.actions.populate || 
				action == "") {
			fnPopulateData(condition, data, element, this);
		} else if (action == this.parent.actions.reload) {
			// Reload data in target
			this.processElement(element, this.parent.attributes.dataLoad, this.parent.events.load);
		} else if (action == this.parent.actions.reset) {
			this.parent.resetElementData(element);
		} else if (action == this.parent.actions.removeclass) {
			element.removeClass(customParameter);
		} else if (action == this.parent.actions.show) {
			element.show();
		}	
	}		
};
/*
 * @description
 * Populates data to target
 * @param {string} condition The condition string.
 * @param {object} data The JSON data.
 * @param {object} element The jquery element.
 */
eachjs.control.prototype.populateData = function(condition, data, element, $this) {
	var isMet = $this.parent.isConditionMet(condition, data, element);
	if (isMet && data != undefined) {
		var tag = element.prop("tagName").toLowerCase();
		var $control = (tag == $this.tag) ? $this : $this.parent.getRegisteredControl(tag);
		// Reset element with original HTML content
		$this.parent.resetElementData(element);
		// Add data to element
		$this.parent.addDataToElement($control.tag, element, data, null, $control.defaultChildTag, $control.optionalChildTag);
	}
};
/*
 * @description
 * Handles targets upon failures and errors
 * Similar to how the data-output is handled
 * @param {string} eid The element id.
 * @param {object} data The JSON data.
 * @param {string} event The event name.
 */
eachjs.control.prototype.handleErrors = function(eid, data, event) {
	var element = $(this.tag + "[" + this.parent.systemAttributes.dataEid + "='" + eid + "']");
	// Process data target failures and errors
	var attr = this.parent.getErrorAttribute(event);
	this.processOutputs(data, element, attr, this.populateErrorData);
};
/*
 * @description
 * Processes error data
 * @param {string} condition The condition string.
 * @param {object} data The JSON data.
 * @param {object} element The jquery element.
 */
eachjs.control.prototype.populateErrorData = function(condition, data, element, $this) {
	var isMet = $this.parent.isConditionMet(condition, data, element);
	if (isMet && data != undefined) {
		$this.parent.resetElementData(element);
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
/*
 * @description
 * Processes element
 * @param {string} selector The jquery selector.
 * @param {string} attribute The attribute value.
 * @param {string} event The event name.
 */
eachjs.control.prototype.processElement = function(selector, attribute, event) {
	var tag = $(selector).prop("tagName").toLowerCase();
	var $control = (tag == this.tag) ? this : this.parent.getRegisteredControl(tag);
	var eid = this.parent.getEid($(selector));
	var inputData = this.parent.getInputData(selector, event);
	var attr = $(selector).attr(attribute);
	this.parent.registerActionStatus(eid, this.parent.actionStatusEnum.processing);	
	if (attr !== undefined && attr !== "") {		
		if (this.parent.containsVaraibleCharsOnly(attr) && typeof eval(attr) == "object") {		
			$control.executeLocal(eid, eval(attr), $control, event);
		} else if (this.parent.containsVaraibleCharsOnly(attr) && typeof eval(attr) == "function") {	
			var para = this.parent.getFunctionPara(inputData);
			$control.executeLocal(eid, eval(attr + "(" + para + ")"), $control, event);
		} else {
			var ajaxType = this.parent.getAjaxType(attr);	
			var url = this.parent.getUrl(attr);
			var authData = this.parent.getAuthData(selector, event);
			$control.executeAjax(eid, url, $control, ajaxType, inputData, authData, event);
		} 
	} else {
		this.processResults(eid, inputData, event);	
	}
};
/*
 * @description
 * Processes load event.
 */
eachjs.control.prototype.processLoadEvent = function() {
	var $this = this;
	$(this.tag + '[' + this.parent.attributes.dataLoad + '], ' +
			this.tag + '[' + this.parent.attributes.dataLoadOutput + ']:not([' + this.parent.attributes.dataLoad + '])').each(function() {
		$this.processElement(this, $this.parent.attributes.dataLoad, $this.parent.events.load);
	});
};
/*
 * @description
 * Processes change event.
 */
eachjs.control.prototype.processChangeEvent = function() {
	var $this = this;
	$(document).on(this.changeEventKey, this.tag + '[' + this.parent.attributes.dataChange + '], ' +
			this.tag + '[' + this.parent.attributes.dataChangeOutput + ']:not([' + this.parent.attributes.dataChange + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataChange, $this.parent.events.change);
	});
};
/*
 * @description
 * Processes click event.
 */
eachjs.control.prototype.processClickEvent = function() {
	var $this = this;
	$(document).on('click', this.tag + '[' + this.parent.attributes.dataClick + '], ' +
			this.tag + '[' + this.parent.attributes.dataClickOutput + ']:not([' + this.parent.attributes.dataClick + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataClick, $this.parent.events.click);
	});
};
/*
 * @description
 * Processes double click event.
 */
eachjs.control.prototype.processDblClickEvent = function() {
	var $this = this;
	$(document).on('dblclick', this.tag + '[' + this.parent.attributes.dataDoubleClick + '], ' +
			this.tag + '[' + this.parent.attributes.dataDoubleClickOutput + ']:not([' + this.parent.attributes.dataDoubleClick + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataDoubleClick, $this.parent.events.doubleclick);
	});
};
/*
 * @description
 * Processes key down event.
 */
eachjs.control.prototype.processKeyDownEvent = function() {
	var $this = this;
	$(document).on('keydown', this.tag + '[' + this.parent.attributes.dataKeyDown + '], ' +
			this.tag + '[' + this.parent.attributes.dataKeyDownOutput + ']:not([' + this.parent.attributes.dataKeyDown + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataKeyDown, $this.parent.events.keydown);
	});
};
/*
 * @description
 * Processes key up event.
 */
eachjs.control.prototype.processKeyUpEvent = function() {
	var $this = this;
	$(document).on('keyup', this.tag + '[' + this.parent.attributes.dataKeyUp + '], ' +
			this.tag + '[' + this.parent.attributes.dataKeyUpOutput + ']:not([' + this.parent.attributes.dataKeyUp + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataKeyUp, $this.parent.events.keyup);
	});
};
/*
 * @description
 * Processes mouse down event.
 */
eachjs.control.prototype.processMouseDownEvent = function() {
	var $this = this;
	$(document).on('mousedown', this.tag + '[' + this.parent.attributes.dataMouseDown + '], ' +
			this.tag + '[' + this.parent.attributes.dataMouseDownOutput + ']:not([' + this.parent.attributes.dataMouseDown + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataMouseDown, $this.parent.events.mousedown);
	});
};
/*
 * @description
 * Processes mosue up event.
 */
eachjs.control.prototype.processMouseUpEvent = function() {
	var $this = this;
	$(document).on('mouseup', this.tag + '[' + this.parent.attributes.dataMouseUp + '], ' +
			this.tag + '[' + this.parent.attributes.dataMouseUpOutput + ']:not([' + this.parent.attributes.dataMouseUp + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataMouseUp, $this.parent.events.mouseup);
	});
};
/*
 * @description
 * Processes right click event.
 */
eachjs.control.prototype.processRightClickEvent = function() {
	var $this = this;
	$(document).on('contextmenu', this.tag + '[' + this.parent.attributes.dataRightClick + '], ' +
			this.tag + '[' + this.parent.attributes.dataRightClickOutput + ']:not([' + this.parent.attributes.dataRightClick + '])', function(e) {
		e.preventDefault();
		$this.processElement(this, $this.parent.attributes.dataRightClick, $this.parent.events.rightclick);
	});
};
/*
 * @description
 * Processes elements with the current tag
 */
eachjs.control.prototype.process = function() {
	// data event handlers
	this.processLoadEvent();
	this.processChangeEvent();
	this.processClickEvent();
	this.processDblClickEvent();
	this.processKeyDownEvent();
	this.processKeyUpEvent();
	this.processMouseDownEvent();
	this.processMouseUpEvent();
	this.processRightClickEvent();
};
/*
 * @description
 * Supported controls
 */
// A control
eachjs.controlA = function() {};
eachjs.controlA.prototype = new eachjs.control();
eachjs.instanceA = new eachjs.controlA();
eachjs.instanceA.init("a");
eachjs.instanceA.setDefaultAttribute("href");
eachjs.register(eachjs.instanceA);
// ARTICLE control
eachjs.controlArticle = function() {};
eachjs.controlArticle.prototype = new eachjs.control();
eachjs.instanceArticle = new eachjs.controlArticle();
eachjs.instanceArticle.init("article");
eachjs.register(eachjs.instanceArticle);
// AUDIO control
eachjs.controlAudio = function() {};
eachjs.controlAudio.prototype = new eachjs.control();
eachjs.instanceAudio = new eachjs.controlAudio();
eachjs.instanceAudio.init("audio", "source");
eachjs.register(eachjs.instanceAudio);
// BUTTON control
eachjs.controlButton = function() {};
eachjs.controlButton.prototype = new eachjs.control();
eachjs.instanceButton = new eachjs.controlButton();
eachjs.instanceButton.init("button");
eachjs.register(eachjs.instanceButton);
// DATALIST control
eachjs.controlDataList = function() {};
eachjs.controlDataList.prototype = new eachjs.control();
eachjs.instanceDataList = new eachjs.controlDataList();
eachjs.instanceDataList.init("datalist", "option");
eachjs.register(eachjs.instanceDataList);
// DIV control
eachjs.controlDiv = function() {};
eachjs.controlDiv.prototype = new eachjs.control();
eachjs.instanceDiv = new eachjs.controlDiv();
eachjs.instanceDiv.init("div");
eachjs.register(eachjs.instanceDiv);
// DL control
eachjs.controlDl = function() {};
eachjs.controlDl.prototype = new eachjs.control();
eachjs.instanceDl = new eachjs.controlDl();
eachjs.instanceDl.init("dl", "dt");
eachjs.register(eachjs.instanceDl);
// FIELDSET control
eachjs.controlFieldSet = function() {};
eachjs.controlFieldSet.prototype = new eachjs.control();
eachjs.instanceFieldSet = new eachjs.controlFieldSet();
eachjs.instanceFieldSet.init("fieldset");
eachjs.register(eachjs.instanceFieldSet);
// FIGURE control
eachjs.controlFigure = function() {};
eachjs.controlFigure.prototype = new eachjs.control();
eachjs.instanceFigure = new eachjs.controlFigure();
eachjs.instanceFigure.init("figure", "img");
eachjs.register(eachjs.instanceFigure);
// FOOTER control
eachjs.controlFooter = function() {};
eachjs.controlFooter.prototype = new eachjs.control();
eachjs.instanceFooter = new eachjs.controlFooter();
eachjs.instanceFooter.init("footer");
eachjs.register(eachjs.instanceFooter);
// FORM control
eachjs.controlForm = function() {};
eachjs.controlForm.prototype = new eachjs.control();
eachjs.instanceForm = new eachjs.controlForm();
eachjs.instanceForm.init("form");
eachjs.instanceForm.setDefaultAttribute("action");
eachjs.register(eachjs.instanceForm);
// HEADER control
eachjs.controlHeader = function() {};
eachjs.controlHeader.prototype = new eachjs.control();
eachjs.instanceHeader = new eachjs.controlHeader();
eachjs.instanceHeader.init("header");
eachjs.register(eachjs.instanceHeader);
// IMG control
eachjs.controlImg = function() {};
eachjs.controlImg.prototype = new eachjs.control();
eachjs.instanceImg = new eachjs.controlImg();
eachjs.instanceImg.init("img");
eachjs.instanceImg.setDefaultAttribute("src");
eachjs.register(eachjs.instanceImg);
// INPUT control
eachjs.controlInput = function() {};
eachjs.controlInput.prototype = new eachjs.control();
eachjs.instanceInput = new eachjs.controlInput();
eachjs.instanceInput.init("input", null, null, "input");
eachjs.instanceInput.setDefaultAttribute("value");
eachjs.register(eachjs.instanceInput);
// LI control
eachjs.controlLi = function() {};
eachjs.controlLi.prototype = new eachjs.control();
eachjs.instanceLi = new eachjs.controlLi();
eachjs.instanceLi.init("li");
eachjs.register(eachjs.instanceLi);
// MAIN control
eachjs.controlMain = function() {};
eachjs.controlMain.prototype = new eachjs.control();
eachjs.instanceMain = new eachjs.controlMain();
eachjs.instanceMain.init("main");
eachjs.register(eachjs.instanceMain);
// NAV control
eachjs.controlNav = function() {};
eachjs.controlNav.prototype = new eachjs.control();
eachjs.instanceNav = new eachjs.controlNav();
eachjs.instanceNav.init("nav");
eachjs.register(eachjs.instanceNav);
// OL control
eachjs.controlOl = function() {};
eachjs.controlOl.prototype = new eachjs.control();
eachjs.instanceOl = new eachjs.controlOl();
eachjs.instanceOl.init("ol", "li");
eachjs.register(eachjs.instanceOl);
// OPTION control
eachjs.controlOption = function() {};
eachjs.controlOption.prototype = new eachjs.control();
eachjs.instanceOption = new eachjs.controlOption();
eachjs.instanceOption.init("option");
eachjs.instanceOption.setDefaultAttribute("value");
eachjs.register(eachjs.instanceOption);
// P control
eachjs.controlP = function() {};
eachjs.controlP.prototype = new eachjs.control();
eachjs.instanceP = new eachjs.controlP();
eachjs.instanceP.init("p");
eachjs.register(eachjs.instanceP);
// SECTION control
eachjs.controlSection = function() {};
eachjs.controlSection.prototype = new eachjs.control();
eachjs.instanceSection = new eachjs.controlSection();
eachjs.instanceSection.init("section");
eachjs.register(eachjs.instanceSection);
// SELECT control
eachjs.controlSelect = function() {};
eachjs.controlSelect.prototype = new eachjs.control();
eachjs.instanceSelect = new eachjs.controlSelect();
eachjs.instanceSelect.init("select", "option");
eachjs.instanceSelect.setDefaultAttribute("value");
eachjs.register(eachjs.instanceSelect);
// SOURCE control
eachjs.controlSource = function() {};
eachjs.controlSource.prototype = new eachjs.control();
eachjs.instanceSource = new eachjs.controlSource();
eachjs.instanceSource.init("source");
eachjs.instanceSource.setDefaultAttribute("src");
eachjs.register(eachjs.instanceSource);
// SPAN control
eachjs.controlSpan = function() {};
eachjs.controlSpan.prototype = new eachjs.control();
eachjs.instanceSpan = new eachjs.controlSpan();
eachjs.instanceSpan.init("span");
eachjs.register(eachjs.instanceSpan);
// TABLE control
eachjs.controlTable = function() {};
eachjs.controlTable.prototype = new eachjs.control();
eachjs.instanceTable = new eachjs.controlTable();
eachjs.instanceTable.init("table", "tr", "tbody");
eachjs.register(eachjs.instanceTable);
// TD control
eachjs.controlTd = function() {};
eachjs.controlTd.prototype = new eachjs.control();
eachjs.instanceTd = new eachjs.controlTd();
eachjs.instanceTd.init("td");
eachjs.register(eachjs.instanceTd);
// TR control
eachjs.controlTr = function() {};
eachjs.controlTr.prototype = new eachjs.control();
eachjs.instanceTr = new eachjs.controlTr();
eachjs.instanceTr.init("tr", "td");
eachjs.register(eachjs.instanceTr);
// VIDEO control
eachjs.controlVideo = function() {};
eachjs.controlVideo.prototype = new eachjs.control();
eachjs.instanceVideo = new eachjs.controlVideo();
eachjs.instanceVideo.init("video", "source");
eachjs.register(eachjs.instanceVideo);
// UL control
eachjs.controlUl = function() {};
eachjs.controlUl.prototype = new eachjs.control();
eachjs.instanceUl = new eachjs.controlUl();
eachjs.instanceUl.init("ul", "li");
eachjs.register(eachjs.instanceUl);
// Custom function provides overriding capabilities
var eachjsCustom;
if (eachjsCustom !== undefined) { eachjsCustom(); }    
// Processes controls
eachjs.process();  

