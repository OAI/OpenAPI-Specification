#!/usr/bin/env node
'use strict';

const fs = require('fs');
const util = require('util');

const yaml = require('yaml');
const rf = require('node-readfiles');
const jsonschema = require('jsonschema').Validator;
const options = { };
const validator = new jsonschema(options);

const schema = {};
schema["v2.0"] = yaml.parse(fs.readFileSync('./schemas/v2.0/schema.json','utf8'));
schema.draft4 = yaml.parse(fs.readFileSync('./schemas/jsonSchema/draft-04/metaschema.json','utf8'));
schema["v3.0"] = yaml.parse(fs.readFileSync('./schemas/v3.0/schema.yaml','utf8'));

validator.addSchema(schema.draft4);

async function main(path,schema,propName) {
    return new Promise(async function(resolve,reject){
        let files = await rf(path, { readContents: false, filenameFormat: rf.FULL_PATH });
        files = files.sort();
        for (let file of files) {
            const contentStr = fs.readFileSync(file,'utf8');
            let contentObj;
            try {
                contentObj = yaml.parse(contentStr,{prettyErrors:true});
            }
            catch (ex) {
                process.exitCode = 1;
                console.warn(file,ex.message);
            }
            if (contentObj && contentObj[propName]) {
                console.log('Validating',file);
                try {
                    const result = await validator.validate(contentObj,schema);
                    if (result.errors && result.errors.length) {
                        process.exitCode = 1;
                        console.warn(file,util.inspect(result.errors));
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
