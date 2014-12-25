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
  * [.link()](#module_ddata.link)
  * [.returnSig()](#module_ddata.returnSig)
  * [.isClass()](#module_ddata.isClass) ⇒ <code>boolean</code>
  * [._ophans()](#module_ddata._ophans) ⇒ <code>array</code>
  * [~_identifiers()](#module_ddata.._identifiers) ⇒ <code>array</code>
  * [~_children()](#module_ddata.._children) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [~descendants()](#module_ddata..descendants) ⇒ <code>Array.&lt;identifier&gt;</code>
  * [~exported()](#module_ddata..exported) ⇒ <code>identifier</code>
  * [~identifier()](#module_ddata..identifier)
  * [~linkTo()](#module_ddata..linkTo) ⇒ <code>string</code>
  * [~anchorName()](#module_ddata..anchorName) ⇒ <code>string</code>
  * [~md()](#module_ddata..md)
  * [~methodSig()](#module_ddata..methodSig) ⇒ <code>string</code>
  * [~returnSig()](#module_ddata..returnSig) ⇒ <code>string</code>
  * [~parseLink()](#module_ddata..parseLink) ⇒ <code>object</code>
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
##ddata.link()
**params**: id {string} - the ID to link to, e.g. &#x60;external:XMLHttpRequest&#x60;, &#x60;GlobalClass#propOne&#x60; etc.  
**Example**  
{{#link "module:someModule.property"~}}
  {{name}} {{!-- prints 'property' --}}
  {{url}}  {{!-- prints 'module-someModule-property' --}}
{{/link}}
<a name="module_ddata.returnSig"></a>
##ddata.returnSig()
<a name="module_ddata.isClass"></a>
##ddata.isClass() ⇒ <code>boolean</code>
**context**: {identifier}  
<a name="module_ddata._ophans"></a>
##ddata._ophans() ⇒ <code>array</code>
Returns an array of the top-level elements which have no parents

<a name="module_ddata.._identifiers"></a>
##ddata~_identifiers() ⇒ <code>array</code>
Returns an array of identifiers matching the query

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**params**: [sortBy] {string} - &quot;kind&quot; will sort by kind  
<a name="module_ddata.._children"></a>
##ddata~_children() ⇒ <code>Array.&lt;identifier&gt;</code>
return the identifiers which are a `memberof` this one

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**params**: [sortBy] {string} - &quot;kind&quot;  
**params**: [min] {number} - only returns if there are &#x60;min&#x60; children  
**context**: {identifier}  
<a name="module_ddata..descendants"></a>
##ddata~descendants() ⇒ <code>Array.&lt;identifier&gt;</code>
return a flat list containing all decendants

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**params**: [sortBy] {string} - &quot;kind&quot;  
**params**: [min] {number} - only returns if there are &#x60;min&#x60; children  
**context**: {identifier}  
<a name="module_ddata..exported"></a>
##ddata~exported() ⇒ <code>identifier</code>
returns the exported identifier of this module

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**context**: {identifier} - only works on a module  
<a name="module_ddata..identifier"></a>
##ddata~identifier()
Returns an identifier matching the query

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata..linkTo"></a>
##ddata~linkTo() ⇒ <code>string</code>
**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**params**: id {string} - the id to convert into a link  
**params**: options.hash.style {string} - &#x60;plain&#x60; or &#x60;code&#x60;  
<a name="module_ddata..anchorName"></a>
##ddata~anchorName() ⇒ <code>string</code>
returns a unique ID string suitable for use as an `href`.

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**context**: {identifier}  
<a name="module_ddata..md"></a>
##ddata~md()
converts the supplied text to markdown

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata..methodSig"></a>
##ddata~methodSig() ⇒ <code>string</code>
Returns the method signature, e.g. `(options, [onComplete])`

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**context**: {identifier}  
<a name="module_ddata..returnSig"></a>
##ddata~returnSig() ⇒ <code>string</code>
Returns the returns signature, e.g. `string | object`

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**context**: {identifier}  
<a name="module_ddata..parseLink"></a>
##ddata~parseLink() ⇒ <code>object</code>
extracts url and caption data from @link tags

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
<a name="module_ddata..parentName"></a>
##ddata~parentName() ⇒ <code>string</code>
returns the parent name, instantiated if necessary

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  
**context**: {identifier}  
<a name="module_ddata..option"></a>
##ddata~option()
returns a dmd option, e.g. "sort-by", "heading-depth" etc.

**Scope**: inner function of <code>[ddata](#module_ddata)</code>  


*documented by [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)*
