var test = require("tape");
var ddata = require("../");
var l = console.error;

function makeOptions(data){
    return { data: { root: data }, hash: {} };
}

test("_orphans", function(t){
    var options = makeOptions([
        { id: "1", memberof: "something" },
        { id: "2", memberof: "something" },
        { id: "3", kind: "external" },
        { id: "4" },
        { id: "5", memberof: "something", kind: "external" },
        { id: "6" }
    ]);
    var result = ddata._orphans(options);
    t.deepEqual(result, [
        { id: "4" },
        { id: "6" }
    ]);
    t.end();
});
