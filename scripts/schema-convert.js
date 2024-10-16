#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yaml = require('yaml');

function convert(filename,date) {
    const s = fs.readFileSync(filename,'utf8');
    let obj;
    try {
        obj = yaml.parse(s, {prettyErrors: true});
        // replace last segment of id, $id, and $ref value with date
        for (const p of ["id","$id","$ref"]) {
            if (obj[p]) {
                obj[p] = obj[p].replace(/\/[^\/]+$/,'/'+date);
            }
        }
        console.log(JSON.stringify(obj,null,2));
    }
    catch (ex) {
        console.warn('  ',ex.message);
        process.exitCode = 1;
    }
}

if (process.argv.length<4) {
    console.warn('Usage: convert-schema.js file.yaml YYYYMMDD');
}
else {
  convert(process.argv[2], process.argv[3]);
}

