[![view on npm](http://img.shields.io/npm/v/ddata.svg)](https://www.npmjs.org/package/ddata)
[![npm module downloads per month](http://img.shields.io/npm/dm/ddata.svg)](https://www.npmjs.org/package/ddata)
[![Build Status](https://travis-ci.org/75lb/ddata.svg?branch=master)](https://travis-ci.org/75lb/ddata)
[![Dependency Status](https://david-dm.org/75lb/ddata.svg)](https://david-dm.org/75lb/ddata)

<a name="module_ddata"></a>
#ddata
Ddata is a collection of handlebars helpers for working with the output of jsdoc-parse

**Example**  
```js
var handlebars = require("handlebars");
var ddata = require("ddata");
handlebars.registerHelper(ddata);
```

* [ddata](#module_ddata)
  * [.identifiers()](#module_ddata.identifiers)
  * [.orphans()](#module_ddata.orphans)
  * [.globals()](#module_ddata.globals)
  * [.modules()](#module_ddata.modules)
  * [.module()](#module_ddata.module)
  * [.classes()](#module_ddata.classes)
  * [.class()](#module_ddata.class)
  * [.misc()](#module_ddata.misc)
  * [.children()](#module_ddata.children)
  * [.link(id)](#module_ddata.link)
  * [.returnSig()](#module_ddata.returnSig)
  * [.isClass()](#module_ddata.isClass) ⇒ <code>boolean</code>
  * [._ophans()](#module_ddata._ophans) ⇒ <code>array</code>
  * [~_link(input, options)](#module_ddata.._link)
  * [~_identifiers([sortBy])](#module_ddata.._identifiers) ⇒ <code>array</code>
  * [~_children([sortBy], [min])](#module_ddata.._children) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [~descendants([sortBy], [min])](#module_ddata..descendants) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [~exported()](#module_ddata..exported) ⇒ <code>identifier</code>
  * [~identifier()](#module_ddata..identifier)
  * [~parent()](#module_ddata..parent)
  * [~anchorName()](#module_ddata..anchorName) ⇒ <code>string</code>
  * [~md()](#module_ddata..md)
  * [~methodSig()](#module_ddata..methodSig) ⇒ <code>string</code>
  * [~returnSig()](#module_ddata..returnSig) ⇒ <code>string</code>
  * [~parseLink(text)](#module_ddata..parseLink) ⇒ <code>Array.&lt;{original: string, caption: string, url: string}&gt;</code>
  * [~parentName()](#module_ddata..parentName) ⇒ <code>string</code>
  * [~option()](#module_ddata..option)

<a name="module_ddata.identifiers"></a>
##ddata.identifiers()
render the supplied block for each identifier in the query

<a name="module_ddata.orphans"></a>
##ddata.orphans()
render the supplied block for each parent (global identifier, or module)

<a name="module_ddata.globals"></a>
##ddata.globals()
render the supplied block for each parent (global identifier, or module)

<a name="module_ddata.modules"></a>
##ddata.modules()
render the supplied block for each module

<a name="module_ddata.module"></a>
##ddata.module()
render the supplied block for the specified module

<a name="module_ddata.classes"></a>
##ddata.classes()
render the block for each class

<a name="module_ddata.class"></a>
##ddata.class()
render the supplied block for the specified class

<a name="module_ddata.misc"></a>
##ddata.misc()
render the supplied block for each orphan with no scope set

<a name="module_ddata.children"></a>
##ddata.children()
render the supplied block for each child

<a name="module_ddata.link"></a>
##ddata.link(id)
| Param | Type | Description |
| ----- | ---- | ----------- |
| id | <code>string</code> | the ID to link to, e.g. `external:XMLHttpRequest`, `GlobalClass#propOne` etc. |

**Example**  
```hbs
{{#link "module:someModule.property"~}}
  {{name}} {{!-- prints 'property' --}}
  {{url}}  {{!-- prints 'module-someModule-property' --}}
{{/link}}
```
<a name="module_ddata.returnSig"></a>
##ddata.returnSig()
<a name="module_ddata.isClass"></a>
##ddata.isClass() ⇒ <code>boolean</code>
**context**: {identifier}  
<a name="module_ddata._ophans"></a>
##ddata._ophans() ⇒ <code>array</code>
Returns an array of the top-level elements which have no parents

<a name="module_ddata.._link"></a>
##ddata~_link(input, options)
e.g. namepaths `module:Something` or type expression `Array.<module:Something>`

| Param | Type | Description |
| ----- | ---- | ----------- |
| input | <code>string</code> | namepath or type expression |
| options | <code>object</code> | the handlebars helper options object |

<a name="module_ddata.._identifiers"></a>
##ddata~_identifiers([sortBy]) ⇒ <code>array</code>
Returns an array of identifiers matching the query

| Param | Type | Description |
| ----- | ---- | ----------- |
| \[sortBy\] | <code>string</code> | "kind" will sort by kind |

<a name="module_ddata.._children"></a>
##ddata~_children([sortBy], [min]) ⇒ <code>Array.&lt;identifier&gt;</code>
return the identifiers which are a `memberof` this one. Exclude externals without descriptions.

| Param | Type | Description |
| ----- | ---- | ----------- |
| \[sortBy\] | <code>string</code> | "kind" |
| \[min\] | <code>number</code> | only returns if there are `min` children |

**context**: {identifier}  
<a name="module_ddata..descendants"></a>
##ddata~descendants([sortBy], [min]) ⇒ <code>Array.&lt;identifier&gt;</code>
return a flat list containing all decendants

| Param | Type | Description |
| ----- | ---- | ----------- |
| \[sortBy\] | <code>string</code> | "kind" |
| \[min\] | <code>number</code> | only returns if there are `min` children |

**context**: {identifier}  
<a name="module_ddata..exported"></a>
##ddata~exported() ⇒ <code>identifier</code>
returns the exported identifier of this module

**context**: {identifier} - only works on a module  
<a name="module_ddata..identifier"></a>
##ddata~identifier()
Returns an identifier matching the query

<a name="module_ddata..parent"></a>
##ddata~parent()
Returns the parent

<a name="module_ddata..anchorName"></a>
##ddata~anchorName() ⇒ <code>string</code>
returns a unique ID string suitable for use as an `href`.

**context**: {identifier}  
**Example**  
```js
> ddata.anchorName.call({ id: "module:yeah--Yeah()" })
'module_yeah--Yeah_new'
```
<a name="module_ddata..md"></a>
##ddata~md()
converts the supplied text to markdown

<a name="module_ddata..methodSig"></a>
##ddata~methodSig() ⇒ <code>string</code>
Returns the method signature, e.g. `(options, [onComplete])`

**context**: {identifier}  
<a name="module_ddata..returnSig"></a>
##ddata~returnSig() ⇒ <code>string</code>
Returns the returns signature, e.g. `string | object`

**context**: {identifier}  
<a name="module_ddata..parseLink"></a>
##ddata~parseLink(text) ⇒ <code>Array.&lt;{original: string, caption: string, url: string}&gt;</code>
extracts url and caption data from @link tags

| Param | Type | Description |
| ----- | ---- | ----------- |
| text | <code>string</code> | a string containing one or more {@link} tags |

<a name="module_ddata..parentName"></a>
##ddata~parentName() ⇒ <code>string</code>
returns the parent name, instantiated if necessary

**context**: {identifier}  
<a name="module_ddata..option"></a>
##ddata~option()
returns a dmd option, e.g. "sort-by", "heading-depth" etc.



*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*

&copy; 2015 Lloyd Brookes <75pound@gmail.com>
