var test = require("tape");
var a = require("array-tools");
var ddata = require("../");
var fixture = require("./fixture/handbrake");

var options = {
    data: { root: fixture },
    hash: {}
};
var options2 = {
    data: { root: fixture },
    hash: { style: "code" }
};

var l = console.log;

l(ddata.linkTo("module:handbrake-js~Handbrake", options))
l(ddata.linkTo("module:handbrake-js~Handbrake", options2))
l(ddata.linkTo("module:clive", options))
l(ddata.linkTo("number", options))
l(ddata.linkTo("number", options2))

// test("linkTo", function(t){
//     l(ddata.linkTo("clive", options))
//     t.end();
// });
