var assert = require('assert');
var fs = require('fs');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var jsonSchema = JSON.parse(fs.readFileSync(require.resolve('json-schema/draft-04/schema'), 'utf8'));
var swaggerSchema = require('./schema.json');

v.addSchema(jsonSchema, 'http://json-schema.org/draft-04/schema#');
v.addSchema(swaggerSchema, 'http://swagger.io/v2/schema.json#');


var goodDocument = {
  swagger: '2.0',
  info: {
    title: 'A valid API document',
    version: 'v1.0.0'
  },
  paths: {
  }
};
var errors = v.validate(goodDocument, swaggerSchema).errors;

if (errors.length) {
  console.error(errors);
}

assert.ok(!errors.length);
