#!/usr/bin/env bash

# Author: @ralfhandl

# run this script from the root of the repo

mkdir -p deploy/oas
mkdir -p deploy/js
mkdir -p deploy-preview

cp -p node_modules/respec/builds/respec-w3c.* deploy/js/

cd scripts/md2html

filename=src/oas.md
tempfile=../../deploy/oas/oas.html
echo "=== ${filename} ==="

node md2html.js --maintainers ../../EDITORS.md ../../${filename} > $tempfile
npx respec --use-local --src $tempfile --out ../../deploy-preview/oas.html
rm $tempfile

echo Built deploy-preview/oas.html
echo

rm ../../deploy/js/respec-w3c.*
