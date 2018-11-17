#!/usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('yaml');
const jsonschema = require('jsonschema').Validator;
const options = { base: process.argv[2] };
const validator = new jsonschema(options);

const schema = yaml.parse(fs.readFileSync(process.argv[2],'utf8'));
const metaSchema = yaml.parse(fs.readFileSync(process.argv[3],'utf8'));

console.log('Checking',process.argv[2]);

const result = validator.validate(schema, metaSchema);

if (result.errors.length) {
  console.warn(util.inspect(result.errors));
  process.exit(1);
}
else {
  console.log('OK');
}

