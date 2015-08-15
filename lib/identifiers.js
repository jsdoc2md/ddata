"use strict";
var ArrayTools = require("array-tools");
var util = require("util");
var Identifier = require("./identifier");

module.exports = Identifiers;

function Identifiers(identifiers){
    var self = this;
    this._data = identifiers.map(function(identifier){
        identifier = new Identifier(identifier);
        identifier.identifiers = self;
        return identifier;
    });
}
util.inherits(Identifiers, ArrayTools);

/**
e.g. namepaths `module:Something` or type expression `Array.<module:Something>`
@static
@param {string} - namepath or type expression
@param {object} - the handlebars helper options object
@returns {{url: string, name: string}}
@example
> identifiers.link("module:toolbar#yeah")
{ url: "#module-toolbaretc", name: "yeah" }
*/
Identifiers.prototype.link = function(to, options){
    if (typeof to !== "string") return null;

    var linked, matches, namepath;
    var output = {};

    /*
    test to for
    1. A type expression containing a namepath, e.g. Array.<module:Something>
    2. a namepath referencing an `id`
    3. a namepath referencing a `longname`
    */
    if (matches = to.match(/.*?<(.*?)>/)){
        namepath = matches[1];
    } else {
        namepath = to;
    }

    linked = this.findWhere({ id: namepath });
    if (!linked){
        linked = this.findWhere({ longname: namepath });
    }
    if (!linked){
        return { name: to, url: null };
    } else {
        output.name = to.replace(namepath, linked.name);
        if (linked.isExternal()){
            if (linked.description){
                output.url = "#" + linked.anchorName();
            } else {
                if (linked.see && linked.see.length){
                    var firstLink = this.parseLink(linked.see[0])[0];
                    output.url = firstLink ? firstLink.url : linked.see[0];
                } else {
                    output.url = null;
                }
            }
        } else {
            output.url = "#" + linked.anchorName();
        }
        return output;
    }
};

/**
Returns an array of the top-level elements which have no parents. Output only includes externals which have a description.
@returns {array}
@static
@category Returns list
*/
Identifiers.prototype.orphans = function(){
    return this.where({ memberof: undefined }).filter(function(identifier){
        if (identifier.isExternal()){
            return identifier.description && identifier.description.length > 0;
        } else {
            return true;
        }
    }).val();
};

Identifiers.prototype.all = function(){
    return this.filter(function(identifier){
        if (identifier.isExternal()){
            return identifier.description && identifier.description.length > 0;
        } else {
            return true;
        }
    }).val();
};

/**
extracts url and caption data from @link tags
@param {string} - a string containing one or more {@link} tags
@returns {Array.<{original: string, caption: string, url: string}>}
@static
*/
Identifiers.prototype.parseLink = function(text) {
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
