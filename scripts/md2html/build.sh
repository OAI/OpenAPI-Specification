#!/bin/sh
mkdir -p deploy/oas
mkdir -p deploy/js
cd scripts/md2html
cp -p js/* ../../deploy/js
cp -p markdown/* ../../deploy/

node md2html.js --respec --maintainers ./history/MAINTAINERS_v2.0.md ../../versions/2.0.md > ../../deploy/oas/v2.0.html

for filename in ../../versions/[3456789].*.md ; do
  node md2html.js --respec --maintainers ../../MAINTAINERS.md ${filename} > ../../deploy/oas/v$(basename "$filename" .md).html
done

