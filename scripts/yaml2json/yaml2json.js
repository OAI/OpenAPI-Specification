#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yaml = require('yaml');

function convert(filename) {
    console.log(filename);
    const s = fs.readFileSync(filename,'utf8');
    let obj;
    try {
        obj = yaml.parse(s, {prettyErrors: true});
        fs.writeFileSync(filename.replace('.yaml','.json'),JSON.stringify(obj,null,2),'utf8');
    }
    catch (ex) {
        console.warn('  ',ex.message);
        process.exitCode = 1;
    }
}

if (process.argv.length<3) {
    console.warn('Usage: yaml2json {infiles}');
}
else {
    for (let i=2;i<process.argv.length;i++) {
        convert(process.argv[i]);
    }
}

