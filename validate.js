var tv4 = require('tv4');
var fs = require('fs');
var assert = require('chai').assert;

var files = [
  "./examples/wordnik/petstore.json",
  "./examples/mads/petstore-expanded.json",
  "./examples/mads/petstore-simple.json"
];
var schema = JSON.parse(fs.readFileSync("./schemas/v2.0/schema.json", 'utf8'));
var allGood = true;
for(i in files) {
  var data = JSON.parse(fs.readFileSync(files[i], 'utf8'));
  var valid = tv4.validate(data, schema);
  if(!valid) allGood = false;
  assert(valid);
}

if(allGood) console.log("all good!");
else console.log("ooops");