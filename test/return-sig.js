var test = require("tape");
var ddata = require("../");
var l = console.log;

function makeOptions(data){
    return { data: { root: data }, hash: {} };
}

test("multiple returns specified", function(t){
    var identifier = { "returns": [ 
        { "type": { "names": [ "string" ] }, "description": "desc 1" },
        { "type": { "names": [ "object", "function" ] }, "description": "desc 2" }
    ]};
    
    t.equal(ddata.returnSig.call(identifier), "string | object | function")
    t.end();
});

test("no returns, one type", function(t){
    var identifier = { "type": { "names": [ "string" ] } };
    
    t.equal(ddata.returnSig.call(identifier), "string")
    t.end();
});
