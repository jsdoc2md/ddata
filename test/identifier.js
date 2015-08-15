"use strict";
var test = require("tape");
var Identifier = require("../lib/identifier");
var Identifiers = require("../lib/identifiers");
var fixture = require("./fixture/file-set");


// test("constructor", function(t){
//     var identifier = new Identifier(fixture[0]);
//     t.ok(identifier.isModule())
//     t.end();
// });

var identifiers = new Identifiers(fixture);
// var method = identifiers.findWhere({ id: "module:file-set--FileSet#files" });
// console.log(method.sig());

console.log(identifiers.orphans());