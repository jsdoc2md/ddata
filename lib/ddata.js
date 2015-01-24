"use strict";
var a = require("array-tools");
var s = require("string-tools");
var util = require("util");
var boil = require("boil-js");
var o = require("object-tools");
var url = require("url");
var marked = require("marked");

/**
Ddata is a collection of handlebars helpers for working with the output of jsdoc-parse
@module
@example
```js
var handlebars = require("handlebars");
var ddata = require("ddata");
handlebars.registerHelper(ddata);
```
*/

/* data block helpers */
exports.identifiers = identifiers;
exports.orphans = orphans;
exports.globals = globals;
exports.modules = modules;
exports.module = module;
exports.classes = classes;
exports.class = class_;
exports.function = function_;
exports.namespace = namespace;
exports.enum = enum_;
exports.misc = misc;
exports.children = children;
exports.indexChildren = indexChildren;

/* utility block helpers */
exports.link = link;
exports.returnSig2 = returnSig2;

/* helpers which return objects */
exports._link = _link;

/* helpers which return booleans */
exports.isClass = isClass;
exports.isClassMember = isClassMember;
exports.isConstructor = isConstructor;
exports.isFunction = isFunction;
exports.isConstant = isConstant;
exports.isEvent = isEvent;
exports.isEnum = isEnum;
exports.isTypedef = isTypedef;
exports.isCallback = isCallback;
exports.isModule = isModule;
exports.isMixin = isMixin;
exports.isExternal = isExternal;
exports.isPrivate = isPrivate;
exports.isProtected = isProtected;
exports.showMainIndex = showMainIndex;

/* helpers which return lists */
exports._orphans = _orphans;
exports._identifiers = _identifiers;
exports._children = _children;
exports._globals = _globals;
exports.descendants = descendants;

/* helpers which return single identifiers */
exports.exported = exported;
exports.identifier = identifier;

/* helpers which return strings */
exports.anchorName = anchorName;
exports.md = md;
exports.md2 = md2;
exports.methodSig = methodSig;
exports.returnSig = returnSig;
exports.parseLink = parseLink;
exports.parentName = parentName;
exports.option = option;
exports.optionEquals = optionEquals;
exports.optionSet = optionSet;
exports.optionIsSet = optionIsSet;
exports.indent = indent;
exports.stripNewlines = stripNewlines;

/* helpers which keep state */
exports.headingDepth = headingDepth;
exports.depth = depth;
exports.depthIncrement = depthIncrement;
exports.depthDecrement = depthDecrement;
exports.indexDepth = indexDepth;
exports.indexDepthIncrement = indexDepthIncrement;
exports.indexDepthDecrement = indexDepthDecrement;

/**
render the supplied block for each identifier in the query
@alias module:ddata.identifiers
*/
function identifiers(options){
    return boil._handlebars.helpers.each(_identifiers(options), options);
}

/**
render the supplied block for each parent (global identifier, or module)
@alias module:ddata.orphans
*/
function orphans(options){
    return boil._handlebars.helpers.each(_orphans(options), options);
}

/**
render the supplied block for each parent (global identifier, or module)
@alias module:ddata.globals
*/
function globals(options){
    return boil._handlebars.helpers.each(_globals(options), options);
}

function _globals(options){
    options.hash.scope = "global";
    return _identifiers(options).filter(function(identifier){
        if (identifier.kind === "external"){
            return identifier.description && identifier.description.length > 0;
        } else {
            return true;
        }
    });
}

/**
render the supplied block for each module
@alias module:ddata.modules
*/
function modules(options){
    options.hash.kind = "module";
    return boil._handlebars.helpers.each(_identifiers(options), options);
}

/**
render the supplied block for the specified module
@alias module:ddata.module
*/
function module(options){
    options.hash.kind = "module";
    var result = _identifiers(options)[0];
    return result ? options.fn(result) : "ERROR, Cannot find module.";
}

/**
render the block for each class
@alias module:ddata.classes
*/
function classes(options){
    options.hash.kind = "class";
    return boil._handlebars.helpers.each(_identifiers(options), options);
}

/**
render the supplied block for the specified class
@alias module:ddata.class
*/
function class_(options){
    options.hash.kind = "class";
    var result = identifier(options);
    return result ? options.fn(result) : "ERROR, Cannot find class.";
}

/**
render the supplied block for the specified function
@alias module:ddata.function
*/
function function_(options){
    options.hash.kind = "function";
    var result = identifier(options);
    return result ? options.fn(result) : "ERROR, Cannot find function.";
}

/**
render the supplied block for the specified function
@alias module:ddata.namespace
*/
function namespace(options){
    options.hash.kind = "namespace";
    var result = identifier(options);
    return result ? options.fn(result) : "ERROR, Cannot find namespace.";
}

/**
render the supplied block for the specified enum
@alias module:ddata.enum
*/
function enum_(options){
    options.hash.kind = "member";
    options.hash.isEnum = true;
    var result = identifier(options);
    return result ? options.fn(result) : "ERROR, Cannot find enum.";
}


/**
render the supplied block for each orphan with no scope set
@alias module:ddata.misc
*/
function misc(options){
    options.hash.scope = undefined;
    options.hash["!kind"] = /module|constructor|external/;
    options.hash["!isExported"] = true;
    return boil._handlebars.helpers.each(_identifiers(options), options);
}

/**
render the supplied block for each child
@alias module:ddata.children
*/
function children(options){
    // return boil._handlebars.helpers.each(_children.call(this, options), options);
    var context = _children.call(this, options);
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (options.data) {
      data = boil._handlebars.createFrame(options.data);
    }

    for(var j = context.length; i<j; i++) {
      depthIncrement(options);
      if (data) {
        data.index = i;
        data.first = (i === 0);
        data.last  = (i === (context.length-1));

        if (contextPath) {
          data.contextPath = contextPath + i;
        }
      }
      ret = ret + fn(context[i], { data: data });
      depthDecrement(options);
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
}

function indexChildren(options){
    // return boil._handlebars.helpers.each(_children.call(this, options), options);
    var context = _children.call(this, options);
    var fn = options.fn, inverse = options.inverse;
    var i = 0, ret = "", data;

    var contextPath;
    if (options.data && options.ids) {
      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (options.data) {
      data = boil._handlebars.createFrame(options.data);
    }

    for(var j = context.length; i<j; i++) {
      indexDepthIncrement(options);
      if (data) {
        data.index = i;
        data.first = (i === 0);
        data.last  = (i === (context.length-1));

        if (contextPath) {
          data.contextPath = contextPath + i;
        }
      }
      ret = ret + fn(context[i], { data: data });
      indexDepthDecrement(options);
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
}

/**
@param id {string} - the ID to link to, e.g. `external:XMLHttpRequest`, `GlobalClass#propOne` etc.
@alias module:ddata.link
@example
{{#link "module:someModule.property"~}}
  {{name}} {{!-- prints 'property' --}}
  {{url}}  {{!-- prints 'module-someModule-property' --}}
{{/link}}
*/
function link(longname, options){
    return options.fn(_link(longname, options));
}

/**
e.g. namepaths `module:Something` or type expression `Array.<module:Something>`
@param {string} - namepath or type expression
@param {object} - the handlebars helper options object
*/
function _link(input, options){
    if (typeof input !== "string") return null;

    var linked, matches, namepath;
    var output = {};

    /*
    test input for
    1. A type expression containing a namepath, e.g. Array.<module:Something>
    2. a namepath referencing an `id`
    3. a namepath referencing a `longname`
    */
    if (matches = input.match(/.*?<(.*?)>/)){
        namepath = matches[1];
    } else {
        namepath = input;
    }

    options.hash = { id: namepath };
    linked = identifier(options);
    if (!linked){
        options.hash = { longname: namepath };
        linked = identifier(options);
    }
    if (!linked){
        return { name: input, url: null };
    } else {
        output.name = input.replace(namepath, linked.name);
        if (isExternal.call(linked)){
            if (linked.description){
                output.url = "#" + anchorName.call(linked);
            } else {
                if (linked.see && linked.see.length){
                    var firstLink = parseLink(linked.see[0])[0];
                    output.url = firstLink ? firstLink.url : linked.see[0];
                } else {
                    output.url = null;
                }
            }
        } else {
            output.url = "#" + anchorName.call(linked);
        }
        return output;
    }
}

/**
@alias module:ddata.returnSig
*/
function returnSig2(options){
    if (!isConstructor.call(this)){
        if (this.returns){
            var typeNames = a.arrayify(this.returns).map(function(ret){
                return ret.type && ret.type.names;
            });
            typeNames = typeNames.filter(function(name){
                return name;
            });
            if (typeNames.length){
                return options.fn({
                    symbol: "⇒",
                    types: a.flatten(typeNames)
                });
            } else {
                return options.fn({
                    symbol: null,
                    types: null
                });
            }
        } else if ((this.type || this.kind === "namespace") && this.kind !== "event"){
			if (this.kind === "namespace"){
	            return options.fn({
	                symbol: "→",
	                types: [ "object" ]
	            });
			} else {
	            return options.fn({
	                symbol: "→",
	                types: this.type.names
	            });
			}
        }
    }
}

/**
@context {identifier}
@returns {boolean}
@alias module:ddata.isClass
*/
function isClass(){ return this.kind === "class"; }
function isClassMember(options){
    var parent = a.findWhere(options.data.root, { id: this.memberof });
    if (parent){
        return parent.kind === "class";
    }
}
function isConstructor(){ return this.kind === "constructor"; }
function isFunction(){ return this.kind === "function"; }
function isConstant(){ return this.kind === "constant"; }
function isEvent(){ return this.kind === "event"; }
function isEnum(){ return this.isEnum; }
function isExternal(){ return this.kind === "external"; }
function isTypedef(){
    return this.kind === "typedef" && this.type.names[0] !== "function";
}
function isCallback(){
    return this.kind === "typedef" && this.type.names[0] === "function";
}
function isModule(){ return this.kind === "module"; }
function isMixin(){ return this.kind === "mixin"; }
function isExternal(){ return this.kind === "external"; }
function isPrivate(){ return this.access === "private"; }
function isProtected(){ return this.access === "protected"; }

function showMainIndex(options){
    return _orphans.call(this, options).length > 1;
}

/**
Returns an array of the top-level elements which have no parents
@returns {array}
@alias module:ddata._ophans
*/
function _orphans(options){
    options.hash.memberof = undefined;
    return _identifiers(options).filter(function(identifier){
        if (identifier.kind === "external"){
            return identifier.description && identifier.description.length > 0;
        } else {
            return true;
        }
    });
}

/**
Returns an array of identifiers matching the query
@param [sortBy] {string} - "kind" will sort by kind
@returns {array}
*/
function _identifiers(options){
    var query = {};
    var sortBy = options.hash.sortBy;
    delete options.hash.sortBy;

    for (var prop in options.hash){
        if (/^-/.test(prop)){
            query[prop.replace(/^-/, "!")] = options.hash[prop];
        } else if (/^_/.test(prop)){
            query[prop.replace(/^_/, "")] = new RegExp(options.hash[prop]);
        } else {
            query[prop] = options.hash[prop];
        }
    }
    return sort(a.where(options.data.root, query), sortBy);
}

function sort(array, sortBy){
    if (!sortBy || sortBy === "none"){
        return array;
    } else if (sortBy === "kind"){
        return array.sort(sortByKind);
    } else if (sortBy === "scope"){
        return array.sort(sortByScope);
    } else if (sortBy === "kind,scope"){
        return array.sort(sortByKindScope);
    } else if (sortBy === "scope,kind"){
        return array.sort(sortByScopeKind);
    } else {
        return array.sort(sortByProperty(sortBy));
    }
}

var order = {
    kind: ["class", "mixin", "constructor", "member", "namespace", "function", "constant", "typedef", "event", "external"],
    scope: ["instance", "static", "global", "inner"]
};

function sortByKind(a, b){
    var result = order.kind.indexOf(a.kind) - order.kind.indexOf(b.kind);
    return result === 0 ? sortByOriginalOrder(a, b): result;
}
function sortByKindScope(a, b){
    var result = order.kind.indexOf(a.kind) - order.kind.indexOf(b.kind);
    return result === 0 ? sortByScope(a, b) : result;
}
function sortByScope(a, b){
    var result = order.scope.indexOf(a.scope) - order.scope.indexOf(b.scope);
    return result === 0 ? sortByOriginalOrder(a, b): result;
}
function sortByOriginalOrder(a, b){
    return a.order - b.order;
}

function sortByScopeKind(a, b){
    var result = order.scope.indexOf(a.scope) - order.scope.indexOf(b.scope);
    return result === 0 ? sortByKind(a, b) : result;
}
function  sortByProperty(property){
    return function(a, b){
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    };
}

/**
return the identifiers which are a `memberof` this one. Exclude externals without descriptions.
@param [sortBy] {string} - "kind"
@param [min] {number} - only returns if there are `min` children
@context {identifier}
@returns {identifier[]}
*/
function _children(options){
    var min = options.hash.min;
    delete options.hash.min;
    options.hash.memberof = this.id;
    var output = _identifiers(options);
    output = output.filter(function(identifier){
        if (identifier.kind === "external"){
            return identifier.description && identifier.description.length > 0;
        } else {
            return true;
        }
    });
    if (output.length >= (min || 0)) return output;
}

/**
return a flat list containing all decendants
@param [sortBy] {string} - "kind"
@param [min] {number} - only returns if there are `min` children
@context {identifier}
@returns {identifier[]}
*/
function descendants(options){
    var min = options.hash.min;
    delete options.hash.min;
    options.hash.memberof = this.id;
    var output = [];
    function iterate(childrenList){
        if (childrenList.length){
            childrenList.forEach(function(child){
                output.push(child);
                iterate(_children.call(child, options));
            });
        }
    }
    iterate(_children.call(this, options));
    if (output.length >= (min || 0)) return output;
}

/**
returns the exported identifier of this module
@context {identifier} - only works on a module
@returns {identifier}
*/
function exported(options){
    var exported = a.findWhere(options.data.root, { "!kind": "module", id: this.id });
    return exported || this;
}

/**
Returns an identifier matching the query
*/
function identifier(options){
    return _identifiers(options)[0];
}

/**
Returns the parent
*/
function parent(options){
    options.id = this.memberof;
    return identifier
}

/**
returns a unique ID string suitable for use as an `href`.
@context {identifier}
@returns {string}
@example
```js
> ddata.anchorName.call({ id: "module:yeah--Yeah()" })
'module_yeah--Yeah_new'
```
*/
function anchorName(){
    if (!this.id) throw new Error("[anchorName helper] cannot create a link without a id: " + JSON.stringify(this));
    return util.format(
        "%s%s%s",
        this.isExported ? "exp_" : "",
        this.kind === "constructor" ? "new_" : "",
        this.id.replace(/:/g, "_").replace(/~/g, "..").replace(/\(\)/g, "_new")
    );
}

/**
converts the supplied text to markdown
*/
function md(options){
    var output = marked(options.fn(this).toString());
    return output.replace("lang-js", "language-javascript");
}
function md2(options){
    return marked.inlineLexer(options.fn(this).toString(), []);
}

/**
Returns the method signature, e.g. `(options, [onComplete])`
@context {identifier}
@returns {string}
*/
function methodSig(){
    return a.arrayify(this.params).filter(function(param){
        return param.name && !/\w+\.\w+/.test(param.name);
    }).map(function(param){
        if (param.variable){
            return param.optional ? "[..." + param.name + "]" : "..." + param.name;
        } else {
            return param.optional ? "[" + param.name + "]" : param.name;
        }
    }).join(", ");
}

/**
Returns the returns signature, e.g. `string | object`
@context {identifier}
@returns {string}
*/
function returnSig(){
    if (this.returns){
        var typeNames = a.arrayify(this.returns).map(function(ret){
            return ret.type.names;
        });
        return a.flatten(typeNames).join(" | ");
    } else if (this.type){
        return this.type.names.join(" | ");
    }
}


/**
extracts url and caption data from @link tags
@param {string} - a string containing one or more {@link} tags
@returns {Array.<{original: string, caption: string, url: string}>}
*/
function parseLink(text) {
    if (!text) return "";
    var results = [];
    var matches = null;
    var link1 = /{@link (\S+?)}/g;          // {@link someSymbol}
    var link2 = /\[(.+?)\]{@link (\S+?)}/g; // [caption here]{@link someSymbol}
    var link3 = /{@link ([^\s}]+?)\|(.+?)}/g;   // {@link someSymbol|caption here}
    var link4 = /{@link ([^\s}\|]+?) (.+?)}/g;   // {@link someSymbol Caption Here}

    while((matches = link4.exec(text)) !== null){
        results.push({
            original: matches[0],
            caption: matches[2],
            url: matches[1]
        });
        text = text.replace(matches[0], s.fill(" ", matches[0].length));
    }

    while((matches = link3.exec(text)) !== null){
        results.push({
            original: matches[0],
            caption: matches[2],
            url: matches[1]
        });
        text = text.replace(matches[0], s.fill(" ", matches[0].length));
    }

    while((matches = link2.exec(text)) !== null){
        results.push({
            original: matches[0],
            caption: matches[1],
            url: matches[2]
        });
        text = text.replace(matches[0], s.fill(" ", matches[0].length));
    }

    while((matches = link1.exec(text)) !== null){
        results.push({
            original: matches[0],
            caption: matches[1],
            url: matches[1]
        });
        text = text.replace(matches[0], s.fill(" ", matches[0].length));
    }
    return results;
}

/**
returns the parent name, instantiated if necessary
@context {identifier}
@returns {string}
*/
function parentName(options){
    function instantiate(input){
        return input.charAt(0).toLowerCase() + input.slice(1);
    }

    /* don't bother with a parentName for exported identifiers */
    if (this.isExported) return "";

    if (this.memberof && this.kind !== "constructor"){
        var parent = a.findWhere(options.data.root, { id: this.memberof });
        if (parent) {
            var name = parent.typicalname || parent.name;
            return this.scope === "instance"
                ? instantiate(name) : name;
        } else {
            return this.memberof;
        }
    }
}

/**
returns a dmd option, e.g. "sort-by", "heading-depth" etc.
*/
function option(name, options){
    return options.data.root.options[name];
}

function optionEquals(name, value, options){
    return options.data.root.options[name] === value;
}

function optionSet(name, value, options){
    options.data.root.options[name] = value;
}

function optionIsSet(name, options){
    return options.data.root.options[name] !== undefined;
}

function indent(input){
    if (input) return input.replace(/^/mg, "    ");
}

function stripNewlines(input){
    if (input) return input.replace(/(\n|\r\n)+/g, " ");
}

function headingDepth(options){
    return options.data.root.options._depth + (options.data.root.options["heading-depth"]);
}

function depth(options){
    return options.data.root.options._depth;
}

function depthIncrement(options){
    options.data.root.options._depth++;
}

function depthDecrement(options){
    options.data.root.options._depth--;
}

function indexDepth(options){
    return options.data.root.options._indexDepth;
}

function indexDepthIncrement(options){
    options.data.root.options._indexDepth++;
}

function indexDepthDecrement(options){
    options.data.root.options._indexDepth--;
}

function indexDepth(options){
    return options.data.root.options._indexDepth;
}
