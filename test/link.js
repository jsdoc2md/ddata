"use strict";
var test = require("tape");
var a = require("array-tools");
var ddata = require("../");

function makeOptions(data){
    return { data: { root: data }, hash: {}, fn: function(context){
        return context;
    }};
}

test("{@link someSymbol}", function (t) {
    t.end();
});

test("{@link http://some.url.com}", function (t) {
    t.end();
});

test("[caption here]{@link someSymbol}", function (t) {
    t.end();
});

test("[caption here]{@link http://some.url.com}", function (t) {
    t.end();
});
