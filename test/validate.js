var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var glob = require('glob');
var yaml = require('js-yaml');
var ZSchema = require('z-schema');
var expect = require('chai').expect;
var RefParser = require('json-schema-ref-parser');

var schema = require('../schemas/v2.0/schema.json');

function validate(data) {
  var validator = new ZSchema();
  validator.validate(data, schema);
  var error = validator.getLastError();
  error = JSON.stringify(error, null, 2);
  expect(error).to.deep.equal('null');
}

function readFile(file, isYaml) {
  var ext = path.extname(file);
  var data = fs.readFileSync(file, 'utf8');

  expect(ext).to.be.oneOf(['.json', '.yaml']);
  if (ext === '.yaml')
    return yaml.safeLoad(data);
  else if (ext === '.json')
    return JSON.parse(data);
}

function validateFiles(pattern) {
  files = glob.sync(pattern)
  files.forEach(function(file) {
    it("should validate " + file, function() {
      var swagger = readFile(file);

      expect(swagger).to.be.an('object');
      if (_.isUndefined(swagger.swagger))
        return;

      validate(swagger);

      return RefParser.dereference(file, {
        $refs: {
          internal: false // Don't dereference internal $refs, only external
        }
      })
      .then(function(resolveSwagger) {
        validate(resolveSwagger);
      });
    })
  })
}

describe('JSON Samples', function() {
  validateFiles('./examples/**/*.json')
})

describe('YAML Samples', function() {
  validateFiles('./examples/**/*.yaml')
})
