#!/bin/sh

# run this script from the root of the repo

mkdir -p deploy/oas
mkdir -p deploy/js

cd scripts/md2html
mkdir -p history
git show c740e950d:MAINTAINERS.md > history/MAINTAINERS_v2.0.md
cp -p js/* ../../deploy/js 2> /dev/null
cp -p markdown/* ../../deploy/ 2> /dev/null

node md2html.js --respec --maintainers ./history/MAINTAINERS_v2.0.md ../../versions/2.0.md > ../../deploy/oas/v2.0.html

latest=`git describe --abbrev=0 --tags`
for filename in ../../versions/[3456789].*.md ; do
  version=$(basename "$filename" .md)
  node md2html.js --respec --maintainers ../../MAINTAINERS.md ${filename} > ../../deploy/oas/v$version.html
  if [ $version = $latest ]; then
    if [[ ${version} != *"rc"* ]];then
      # version is not a Release Candidate
      cp -p ../../deploy/oas/v$version.html ../../deploy/oas/latest.html
    fi
  fi
done

