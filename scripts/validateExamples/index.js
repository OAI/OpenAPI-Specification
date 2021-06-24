#!/usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('yaml');
const rf = require('node-readfiles');
const jsonschema = require('@hyperjump/json-schema');

const schema = {};
schema["v2.0"] = yaml.parse(fs.readFileSync('./schemas/v2.0/schema.json','utf8'));
schema["v3.0"] = yaml.parse(fs.readFileSync('./schemas/v3.0/schema.yaml','utf8'));

jsonschema.add(schema["v2.0"]);
jsonschema.add(schema["v3.0"]);

async function main(path,schema,propName) {
    return new Promise(async function(resolve,reject){
        let files = await rf(path, { readContents: false, filenameFormat: rf.FULL_PATH });
        files = files.sort();
        for (let file of files) {
            const instanceStr = fs.readFileSync(file,'utf8');
            let instanceObj;
            try {
                instanceObj = yaml.parse(instanceStr,{prettyErrors:true});
            }
            catch (ex) {
                process.exitCode = 1;
                console.warn(file,ex.message);
            }
            if (instanceObj && instanceObj[propName]) {
                console.log('Validating',file);
                try {
                    const schemaObj = await jsonschema.get(schema.id);
                    const result = await jsonschema.validate(schemaObj, instanceObj, jsonschema.DETAILED);
                    if (!result.valid) {
                        process.exitCode = 1;
                        console.warn(file,util.inspect(result.errors, {depth:null}));
                    }
                }
                catch (ex) {
                    process.exitCode = 1;
                    console.warn(file,ex.message);
                }
            }
        }
        resolve(files);
    });
}

async function validateExamples(){
  await main('./examples/v2.0/',schema["v2.0"],'swagger');
  await main('./examples/v3.0/',schema["v3.0"],'openapi');
}

validateExamples();
