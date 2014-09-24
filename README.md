[![view on npm](http://img.shields.io/npm/v/ddata.svg)](https://www.npmjs.org/package/ddata)
[![npm module downloads per month](http://img.shields.io/npm/dm/ddata.svg)](https://www.npmjs.org/package/ddata)
[![Build Status](https://travis-ci.org/75lb/ddata.svg?branch=master)](https://travis-ci.org/75lb/ddata)
[![Dependency Status](https://david-dm.org/75lb/ddata.svg)](https://david-dm.org/75lb/ddata)

#ddata

##Install
```sh
$ npm install -g ddata
```
*Mac / Linux users may need to run with `sudo`*.

#API Reference
<a name="module_ddata"></a>
#ddata
helpers for working with doc-data

**Example**  
```js
var ddata = require("ddata");
```

**Members**

* [ddata](#module_ddata)
  * [ddata.identifiers()](#module_ddata.identifiers)
  * [ddata.orphans()](#module_ddata.orphans)
  * [ddata.globals()](#module_ddata.globals)
  * [ddata.modules()](#module_ddata.modules)
  * [ddata.module()](#module_ddata.module)
  * [ddata.classes()](#module_ddata.classes)
  * [ddata~class_()](#module_ddata..class_)
  * [ddata~misc()](#module_ddata..misc)
  * [ddata~isClass()](#module_ddata..isClass)
  * [ddata~orphans()](#module_ddata..orphans)
  * [ddata~identifiers()](#module_ddata..identifiers)
  * [ddata~children()](#module_ddata..children)
  * [ddata~descendants()](#module_ddata..descendants)
  * [ddata~exported()](#module_ddata..exported)
  * [ddata~identifier()](#module_ddata..identifier)
  * [ddata~linkTo()](#module_ddata..linkTo)
  * [ddata~anchorName()](#module_ddata..anchorName)
  * [ddata~md()](#module_ddata..md)
  * [ddata~methodSig()](#module_ddata..methodSig)
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

<a name="module_ddata..class_"></a>
##ddata~class_()
render the supplied block for the specified class

**Scope**: inner function of [ddata](#module_ddata)  
<a name="module_ddata..misc"></a>
##ddata~misc()
render the supplied block for each orphan with no scope set

**Scope**: inner function of [ddata](#module_ddata)  
<a name="module_ddata..isClass"></a>
##ddata~isClass()
**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `boolean`  
<a name="module_ddata..orphans"></a>
##ddata~orphans()
Returns an array of the top-level elements which have no parents

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `array`  
<a name="module_ddata..identifiers"></a>
##ddata~identifiers()
Returns an array of identifiers matching the query

**Scope**: inner function of [ddata](#module_ddata)  
**Returns**: `array`  
<a name="module_ddata..children"></a>
##ddata~children()
return the indentifiers which are a `memberof` this one

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
