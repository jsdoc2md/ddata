var test = require("tape");
var ddata = require("../");
var l = console.error;

function makeOptions(data){
    return { data: { root: data }, hash: {} };
}

test("sort by property", function(t){
    var options = makeOptions([
        { one: "fff" }, { one: "aaa" }, { one: "ggg" }
    ]);
    options.hash.sortBy = "one";
    t.deepEqual(ddata._identifiers(options), [
        { one: "aaa" }, { one: "fff" }, { one: "ggg" }
    ])
    t.end();
});

test("sort by none", function(t){
    var options = makeOptions([
        { one: "fff" }, { one: "aaa" }, { one: "ggg" }
    ]);
    options.hash.sortBy = "none";
    t.deepEqual(ddata._identifiers(options), [
        { one: "fff" }, { one: "aaa" }, { one: "ggg" }
    ]);
    t.end();
});

test("descendants", function(t){
    var options = makeOptions([
        { id: "one" }, { id: "two", memberof: "one" }, { id: "three", memberof: "two" }, { id: "four"}
    ]);
    t.deepEqual(ddata.descendants.call({ id: "one" }, options), [
        { id: 'two', memberof: 'one' }, { id: 'three', memberof: 'two' }
    ]);
    t.deepEqual(ddata.descendants.call({ id: "two" }, options), [
        { id: 'three', memberof: 'two' }
    ]);
    t.deepEqual(ddata.descendants.call({ id: "four" }, options), []);
    t.end();
});
