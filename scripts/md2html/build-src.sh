#!/usr/bin/env bash

# Author: @ralfhandl

# run this script from the root of the repo

mkdir -p deploy/oas
mkdir -p deploy/js
mkdir -p src-preview

cd scripts/md2html

cp -p ../../node_modules/respec/builds/respec-w3c.* ../../deploy/js/

filename=src/oas.md
tempfile=../../deploy/oas/oas.html
echo "=== ${filename} ==="

node md2html.js --maintainers ../../EDITORS.md ../../${filename} > $tempfile
npx respec --use-local --src $tempfile --out ../../src-preview/oas.html
rm $tempfile

echo Built src-preview/oas.html
echo

rm ../../deploy/js/respec-w3c.*
