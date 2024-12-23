#!/usr/bin/env bash

# Author: @ralfhandl

# run this script from the root of the repo

mkdir -p deploy-preview
mkdir -p deploy-preview/js

cp -p node_modules/respec/builds/respec-w3c.* deploy-preview/js/

cd scripts/md2html

filename=src/oas.md
tempfile=../../deploy-preview/oas-temp.html
echo "=== ${filename} ==="

node md2html.js --maintainers ../../EDITORS.md ../../${filename} > $tempfile
npx respec --use-local --src $tempfile --out ../../deploy-preview/oas.html
rm $tempfile

echo Built deploy-preview/oas.html
echo

rm ../../deploy-preview/js/respec-w3c.*
