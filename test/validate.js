var Q = require('q');
var glob = require('glob');
var tv4 = require('tv4');
var ZSchema = require('z-schema');
var fs = require('fs');
var assert = require('chai').assert;
var yaml = require('js-yaml');
var request = require("request")

var schema = JSON.parse(fs.readFileSync("./schemas/v2.0/schema.json", 'utf8'));
var validators = (process.env.VALIDATORS || "tv4,zschema").split(",")

var validationMethods = {
  tv4: {
    setup: function() {
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
    },
    validate: function(schema, data) {
      var result = tv4.validateMultiple(data, schema, true, true);
      assert(result.missing.length == 0, "Missing schemas: " + result.missing)
      if (result.errors.length > 0) {
        for (i in result.errors) {
          // Remove stack trace so results are readable
          delete result.errors[i].stack;
        }
      }
      assert(result.valid == true, "Validation failed: " + JSON.stringify(result, null, "\t"));
    },
  },
  zschema: {
    setup: function() {
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
    },
    validate: function(schema, data) {
      var validator = new ZSchema({ sync: true });
      var valid = validator.validate(data, schema);
      if (!valid) {
          var error = validator.getLastError();
          throw new Error("ZSchema failed: " + JSON.stringify(error, null, "\t"));
      }
      assert(valid == true)
    }
  }
}

var setupValidators = function(done) {
  var setupPromises = []
  validators.forEach(function(validator) {
    setupPromises.push(validationMethods[validator].setup())
  });
  return Q.all(setupPromises).then(function() {
    done();
  })
}

var createYAMLTest = function(file, validator) {
  if (validators.indexOf(validator) == -1)
    return;

  it("should validate " + file + " with " + validator, function() {
    var data = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    validationMethods[validator].validate(schema, data);
  })
}

var createJSONTest = function(file, validator) {
  if (validators.indexOf(validator) == -1)
    return;

  it("should validate " + file + " with " + validator, function() {
    var data = JSON.parse(fs.readFileSync(file, 'utf8'));
    validationMethods[validator].validate(schema, data);
  })
}

describe('JSON Samples', function() {
  before(function(done) {
    setupValidators(done);
  })

  files = glob.sync("./examples/**/*.json")
  validators.forEach(function(validator) {
    files.forEach(function(file) {
      createJSONTest(file, validator);
    })
  })
})

describe('YAML Samples', function() {
  before(function(done) {
    setupValidators(done);
  })
  files = glob.sync("./examples/**/*.yaml")
  validators.forEach(function(validator) {
    files.forEach(function(file) {
      createYAMLTest(file, validator);
    })
  })
})
