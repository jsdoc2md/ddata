[![view on npm](http://img.shields.io/npm/v/ddata.svg)](https://www.npmjs.org/package/ddata)
[![npm module downloads per month](http://img.shields.io/npm/dm/ddata.svg)](https://www.npmjs.org/package/ddata)
[![Build Status](https://travis-ci.org/75lb/ddata.svg?branch=master)](https://travis-ci.org/75lb/ddata)
[![Dependency Status](https://david-dm.org/75lb/ddata.svg)](https://david-dm.org/75lb/ddata)

<a name="module_ddata"></a>
# ddata
Ddata is a collection of handlebars helpers for working with the output of jsdoc-parse

**Example**  
```js
var handlebars = require("handlebars");
var ddata = require("ddata");
handlebars.registerHelper(ddata);
```

* [ddata](#module_ddata)
  * [._globals()](#module_ddata._globals)
  * [.class()](#module_ddata.class)
  * [.function()](#module_ddata.function)
  * [.namespace()](#module_ddata.namespace)
  * [.enum()](#module_ddata.enum)
  * [.misc()](#module_ddata.misc)
  * [.children()](#module_ddata.children)
  * [.indexChildren()](#module_ddata.indexChildren)
  * [.link(id)](#module_ddata.link)
  * [._link(input, options)](#module_ddata._link)
  * [.returnSig2()](#module_ddata.returnSig2) ⇒ <code>Object</code>
  * [.isClass()](#module_ddata.isClass) ⇒ <code>boolean</code>
  * [._identifiers([sortBy])](#module_ddata._identifiers) ⇒ <code>array</code>
  * [._children([sortBy], [min])](#module_ddata._children) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [.descendants([sortBy], [min])](#module_ddata.descendants) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [.exported()](#module_ddata.exported) ⇒ <code>identifier</code>
  * [.identifier()](#module_ddata.identifier)
  * [.parent()](#module_ddata.parent)
  * [.methodSig()](#module_ddata.methodSig) ⇒ <code>string</code>
  * [.returnSig()](#module_ddata.returnSig) ⇒ <code>string</code>
  * [.parseLink(text)](#module_ddata.parseLink) ⇒ <code>Array.&lt;{original: string, caption: string, url: string}&gt;</code>
  * [.parentName()](#module_ddata.parentName) ⇒ <code>string</code>
  * [.option()](#module_ddata.option)
  * [.optionEquals()](#module_ddata.optionEquals)
  * [.optionSet()](#module_ddata.optionSet)
  * [.optionIsSet()](#module_ddata.optionIsSet)
  * [.indent()](#module_ddata.indent)
  * [.stripNewlines()](#module_ddata.stripNewlines)
  * [.headingDepth()](#module_ddata.headingDepth)
  * [.depth()](#module_ddata.depth)
  * [.depthIncrement()](#module_ddata.depthIncrement)
  * [.depthDecrement()](#module_ddata.depthDecrement)
  * [.indexDepth()](#module_ddata.indexDepth)
  * [.indexDepthIncrement()](#module_ddata.indexDepthIncrement)
  * [.indexDepthDecrement()](#module_ddata.indexDepthDecrement)
  * [.indexDepth()](#module_ddata.indexDepth)
  * _Data block helper_
    * [.identifiers()](#module_ddata.identifiers)
    * [.orphans()](#module_ddata.orphans)
    * [.globals()](#module_ddata.globals)
    * [.modules()](#module_ddata.modules)
    * [.module()](#module_ddata.module)
    * [.classes()](#module_ddata.classes)
  * _Returns list_
    * [._orphans()](#module_ddata._orphans) ⇒ <code>array</code>
  * _Returns string_
    * [.anchorName()](#module_ddata.anchorName) ⇒ <code>string</code>
    * [.md()](#module_ddata.md)

<a name="module_ddata._globals"></a>
## ddata._globals()
omits externals without a description

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.class"></a>
## ddata.class()
render the supplied block for the specified class

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.function"></a>
## ddata.function()
render the supplied block for the specified function

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.namespace"></a>
## ddata.namespace()
render the supplied block for the specified function

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.enum"></a>
## ddata.enum()
render the supplied block for the specified enum

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.misc"></a>
## ddata.misc()
render the supplied block for each orphan with no scope set

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.children"></a>
## ddata.children()
render the supplied block for each child

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indexChildren"></a>
## ddata.indexChildren()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.link"></a>
## ddata.link(id)
**Scope**: static method of <code>[ddata](#module_ddata)</code>  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the ID to link to, e.g. `external:XMLHttpRequest`, `GlobalClass#propOne` etc. |

**Example**  
```hbs
{{#link "module:someModule.property"~}}
  {{name}} {{!-- prints 'property' --}}
  {{url}}  {{!-- prints 'module-someModule-property' --}}
{{/link}}
```
<a name="module_ddata._link"></a>
## ddata._link(input, options)
e.g. namepaths `module:Something` or type expression `Array.<module:Something>`

**Scope**: static method of <code>[ddata](#module_ddata)</code>  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | namepath or type expression |
| options | <code>object</code> | the handlebars helper options object |

<a name="module_ddata.returnSig2"></a>
## ddata.returnSig2() ⇒ <code>Object</code>
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.isClass"></a>
## ddata.isClass() ⇒ <code>boolean</code>
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  
<a name="module_ddata._identifiers"></a>
## ddata._identifiers([sortBy]) ⇒ <code>array</code>
Returns an array of identifiers matching the query

**Scope**: static method of <code>[ddata](#module_ddata)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [sortBy] | <code>string</code> | "kind" will sort by kind |

<a name="module_ddata._children"></a>
## ddata._children([sortBy], [min]) ⇒ <code>Array.&lt;identifier&gt;</code>
return the identifiers which are a `memberof` this one. Exclude externals without descriptions.

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  

| Param | Type | Description |
| --- | --- | --- |
| [sortBy] | <code>string</code> | "kind" |
| [min] | <code>number</code> | only returns if there are `min` children |

<a name="module_ddata.descendants"></a>
## ddata.descendants([sortBy], [min]) ⇒ <code>Array.&lt;identifier&gt;</code>
return a flat list containing all decendants

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  

| Param | Type | Description |
| --- | --- | --- |
| [sortBy] | <code>string</code> | "kind" |
| [min] | <code>number</code> | only returns if there are `min` children |

<a name="module_ddata.exported"></a>
## ddata.exported() ⇒ <code>identifier</code>
returns the exported identifier of this module

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  
<a name="module_ddata.identifier"></a>
## ddata.identifier()
Returns an identifier matching the query

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.parent"></a>
## ddata.parent()
Returns the parent

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.methodSig"></a>
## ddata.methodSig() ⇒ <code>string</code>
Returns the method signature, e.g. `(options, [onComplete])`

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  
<a name="module_ddata.returnSig"></a>
## ddata.returnSig() ⇒ <code>string</code>
Returns the returns signature, e.g. `string | object`

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  
<a name="module_ddata.parseLink"></a>
## ddata.parseLink(text) ⇒ <code>Array.&lt;{original: string, caption: string, url: string}&gt;</code>
extracts url and caption data from @link tags

**Scope**: static method of <code>[ddata](#module_ddata)</code>  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | a string containing one or more {@link} tags |

<a name="module_ddata.parentName"></a>
## ddata.parentName() ⇒ <code>string</code>
returns the parent name, instantiated if necessary

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**this**: {identifier}  
<a name="module_ddata.option"></a>
## ddata.option()
returns a dmd option, e.g. "sort-by", "heading-depth" etc.

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.optionEquals"></a>
## ddata.optionEquals()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.optionSet"></a>
## ddata.optionSet()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.optionIsSet"></a>
## ddata.optionIsSet()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indent"></a>
## ddata.indent()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.stripNewlines"></a>
## ddata.stripNewlines()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.headingDepth"></a>
## ddata.headingDepth()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.depth"></a>
## ddata.depth()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.depthIncrement"></a>
## ddata.depthIncrement()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.depthDecrement"></a>
## ddata.depthDecrement()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indexDepth"></a>
## ddata.indexDepth()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indexDepthIncrement"></a>
## ddata.indexDepthIncrement()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indexDepthDecrement"></a>
## ddata.indexDepthDecrement()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.indexDepth"></a>
## ddata.indexDepth()
**Scope**: static method of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata.identifiers"></a>
## ddata.identifiers()
render the supplied block for each identifier in the query

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata.orphans"></a>
## ddata.orphans()
render the supplied block for each parent (global identifier, or module)

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata.globals"></a>
## ddata.globals()
render the supplied block for each parent (global identifier, or module)

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata.modules"></a>
## ddata.modules()
render the supplied block for each module

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata.module"></a>
## ddata.module()
render the supplied block for the specified module

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata.classes"></a>
## ddata.classes()
render the block for each class

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Data block helper  
<a name="module_ddata._orphans"></a>
## ddata._orphans() ⇒ <code>array</code>
Returns an array of the top-level elements which have no parents. Output only includes externals which have a description.

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Returns list  
<a name="module_ddata.anchorName"></a>
## ddata.anchorName() ⇒ <code>string</code>
returns a unique ID string suitable for use as an `href`.

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Returns string  
**this**: {identifier}  
**Example**  
```js
> ddata.anchorName.call({ id: "module:yeah--Yeah()" })
'module_yeah--Yeah_new'
```
<a name="module_ddata.md"></a>
## ddata.md()
converts the supplied text to markdown

**Scope**: static method of <code>[ddata](#module_ddata)</code>  
**Category**: Returns string  

*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*

&copy; 2015 Lloyd Brookes <75pound@gmail.com>
