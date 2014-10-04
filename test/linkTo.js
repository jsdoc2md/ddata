var test = require("tape");
var a = require("array-tools");
var ddata = require("../");

function makeOptions(data){
    return { data: { root: data }, hash: {}, fn: function(context){
        return context;
    }};
}

var options = makeOptions([
    { id: "module:handbrake-js~Handbrake", "name": "Handbrake" },
    { id: "module:cjs/class^ExportedClass~innerProp", "name": "innerProp" }
]);

test("link", function(t){
    var result = ddata.link("module:handbrake-js~Handbrake", options);
    t.deepEqual(result, { name: 'Handbrake', url: 'module_handbrake-js..Handbrake' });
    t.end();
});

test("link", function(t){
    var result = ddata.link("module:cjs/class^ExportedClass~innerProp", options);
    t.deepEqual(result, { name: 'innerProp', url: 'module_cjs/class^ExportedClass..innerProp' });
    t.end();
});

test("link", function(t){
    var result = ddata.link("clive", options);
    t.deepEqual(result, { name: 'clive', url: '' });
    t.end();
});
