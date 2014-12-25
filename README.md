[![view on npm](http://img.shields.io/npm/v/ddata.svg)](https://www.npmjs.org/package/ddata)
[![npm module downloads per month](http://img.shields.io/npm/dm/ddata.svg)](https://www.npmjs.org/package/ddata)
[![Build Status](https://travis-ci.org/75lb/ddata.svg?branch=master)](https://travis-ci.org/75lb/ddata)
[![Dependency Status](https://david-dm.org/75lb/ddata.svg)](https://david-dm.org/75lb/ddata)

<a name="module_ddata"></a>
#ddata
Ddata is a collection of handlebars helpers for working with doc-data

**Example**  
```js
var handlebars = require("handlebars");
var ddata = require("ddata");
handlebars.registerHelper(ddata);
```

**Members**

* [ddata](#module_ddata)
  * [ddata.identifiers()](#module_ddata.identifiers)
  * [ddata.orphans()](#module_ddata.orphans)
  * [ddata.globals()](#module_ddata.globals)
  * [ddata.modules()](#module_ddata.modules)
  * [ddata.module()](#module_ddata.module)
  * [ddata.classes()](#module_ddata.classes)
  * [ddata.class()](#module_ddata.class)
  * [ddata.misc()](#module_ddata.misc)
  * [ddata.children()](#module_ddata.children)
  * [ddata.link()](#module_ddata.link)
  * [ddata.returnSig()](#module_ddata.returnSig)
  * [ddata.isClass()](#module_ddata.isClass)
  * [ddata._ophans()](#module_ddata._ophans)
  * [ddata~_identifiers()](#module_ddata.._identifiers)
  * [ddata~_children()](#module_ddata.._children)
  * [ddata~descendants()](#module_ddata..descendants)
  * [ddata~exported()](#module_ddata..exported)
  * [ddata~identifier()](#module_ddata..identifier)
  * [ddata~linkTo()](#module_ddata..linkTo)
  * [ddata~anchorName()](#module_ddata..anchorName)
  * [ddata~md()](#module_ddata..md)
  * [ddata~methodSig()](#module_ddata..methodSig)
  * [ddata~returnSig()](#module_ddata..returnSig)
  * [ddata~linkify()](#module_ddata..linkify)
  * [ddata~parentName()](#module_ddata..parentName)
  * [ddata~option()](#module_ddata..option)

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
##ddata.link()
<a name="module_ddata.returnSig"></a>
##ddata.returnSig()
<a name="module_ddata.isClass"></a>
##ddata.isClass()
**Returns**: `boolean`  
<a name="module_ddata._ophans"></a>
##ddata._ophans()
Returns an array of the top-level elements which have no parents

**Returns**: `array`  
<a name="module_ddata.._identifiers"></a>
##ddata~_identifiers()
Returns an array of identifiers matching the query

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `array`  
<a name="module_ddata.._children"></a>
##ddata~_children()
return the identifiers which are a `memberof` this one

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `Array.<identifier>`  
<a name="module_ddata..descendants"></a>
##ddata~descendants()
return a flat list containing all decendants

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `Array.<identifier>`  
<a name="module_ddata..exported"></a>
##ddata~exported()
returns the exported identifier of this module

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `identifier`  
<a name="module_ddata..identifier"></a>
##ddata~identifier()
Returns an identifier matching the query

**Scope**: inner function of [ddata](#module_ddata)  
<a name="module_ddata..linkTo"></a>
##ddata~linkTo()
**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..anchorName"></a>
##ddata~anchorName()
returns a unique ID string suitable for use as an `href`.

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..md"></a>
##ddata~md()
converts the supplied text to markdown

**Scope**: inner function of [ddata](#module_ddata)  
<a name="module_ddata..methodSig"></a>
##ddata~methodSig()
Returns the method signature, e.g. `(options, [onComplete])`

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..returnSig"></a>
##ddata~returnSig()
Returns the returns signature, e.g. `string | object`

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..linkify"></a>
##ddata~linkify()
provides @link support

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..parentName"></a>
##ddata~parentName()
returns the parent name, instantiated if necessary

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `string`  
<a name="module_ddata..option"></a>
##ddata~option()
returns a dmd option, e.g. "sort-by", "heading-depth" etc.

**Scope**: inner function of [ddata](#module_ddata)  


*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*
