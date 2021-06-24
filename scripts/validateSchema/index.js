#!/usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('yaml');
const jsonschema = require('@hyperjump/json-schema');

const schema = yaml.parse(fs.readFileSync(process.argv[2],'utf8'));
const metaSchema = yaml.parse(fs.readFileSync(process.argv[3],'utf8'));

async function main() {
  jsonschema.add(metaSchema);
  const msObj = await jsonschema.get(metaSchema.id);
  let result;
  try {
    result = await jsonschema.validate(msObj, schema, jsonschema.DETAILED);
  }
  catch (ex) {
    result = { valid: false, errors: [ ex ] };
  }
  if (!result.valid) {
    console.warn(util.inspect(result.errors, {depth:null}));
    process.exit(1);
  }
  else {
    console.log('OK');
  }
}

console.log('Checking',process.argv[2]);
main();
