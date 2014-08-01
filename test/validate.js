var Q = require('q');
var glob = require('glob');
var tv4 = require('tv4');
var ZSchema = require('z-schema');
var fs = require('fs');
var assert = require('chai').assert;
var yaml = require('js-yaml');
var request = require("request")

var schema = JSON.parse(fs.readFileSync("./schemas/v2.0/schema.json", 'utf8'));

var setupTV4 = function() {
  var deferred = Q.defer();
  request({
    url: "http://json-schema.org/draft-04/schema",
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      tv4.addSchema("http://json-schema.org/draft-04/schema", body);
      deferred.resolve();
    } else {
      deferred.reject(new Error("Request failed"));
    }
  })
  return deferred.promise;
}

var setupZSchema = function() {
  var deferred = Q.defer()
  request({
    url: "http://json-schema.org/draft-04/schema"
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      ZSchema.setRemoteReference("http://json-schema.org/draft-04/schema", body);
      deferred.resolve();
    } else {
      deferred.reject(new Error("Request failed"));
    }
  })
  return deferred.promise;
}

describe('JSON Samples', function() {
  before(function(done) {
    return Q.all([setupTV4(), setupZSchema()]).then(function() {
      done();
    })
  })
  files = glob.sync("./examples/**/*.json")
  for(i in files) {
    var file = files[i];
    var data = JSON.parse(fs.readFileSync(file, 'utf8'));
    it("should validate " + file + " with tv4", function() {
      validateWithTV4(schema, data)
    })
    it("should validate " + file + " with zschema", function() {
      validateWithZSchema(schema, data);
    })
  }
})

describe('YAML Samples', function() {
  files = glob.sync("./examples/**/*.yaml")
  for(i in files) {
    var file = files[i];
    var data = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    it("should validate " + file + " with tv4", function() {
      validateWithTV4(schema, data)
    })
    it("should validate " + file + " with zschema", function() {
      validateWithZSchema(schema, data);
    })
  }
})

var validateWithTV4 = function(schema, data) {
  var result = tv4.validateMultiple(data, schema, true, true);
  assert(result.missing.length == 0, "Missing schemas: " + result.missing)
  if (result.errors.length > 0) {
    for (i in result.errors) {
      // Remove stack trace so results are readable
      delete result.errors[i].stack;
    }
  }
  assert(result.valid == true, "Validation failed: " + JSON.stringify(result, null, "\t"));
}

var validateWithZSchema = function(schema, data) {
  var validator = new ZSchema({ sync: true });
  var valid = validator.validate(data, schema);
  if (!valid) {
      var error = validator.getLastError();
      throw new Error("ZSchema failed: " + JSON.stringify(error, null, "\t"));
  }
  assert(valid == true)

  // Async version
  // ZSchema.validate(data, schema)
  //   .then(function(report){
  //     expect(report.warnings).to.eql([]);
  //     expect(report.successful).to.be.true;
  //   })
  //   .catch(function(err){
  //     expect(err.errors).to.eql([]);
  //     throw "Failed";
  //   }).done();
}
