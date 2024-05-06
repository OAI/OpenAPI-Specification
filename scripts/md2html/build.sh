#!/bin/bash

# Author: @MikeRalphson

# run this script from the root of the repo. It is designed to be run by a GitHub workflow.
# It contains bashisms

mkdir -p deploy/oas
mkdir -p deploy/js

cd scripts/md2html
mkdir -p history
git show c740e95:MAINTAINERS.md > history/MAINTAINERS_v2.0.md
git show e9fe5bc:MAINTAINERS.md > history/MAINTAINERS_v3.0.0.md
cp history/MAINTAINERS_v3.0.0.md history/MAINTAINERS_v3.0.1.md
git show 3140640:MAINTAINERS.md > history/MAINTAINERS_v3.0.2.md
cp history/MAINTAINERS_v3.0.2.md history/MAINTAINERS_v3.0.3.md
cp history/MAINTAINERS_v3.0.2.md history/MAINTAINERS_v3.0.3.md
cp history/MAINTAINERS_v3.0.2.md history/MAINTAINERS_v3.1.0.md
# add lines for 3.0.4, 3.1.1, ...

cp -p js/* ../../deploy/js 2> /dev/null
cp -p markdown/* ../../deploy/ 2> /dev/null

latest=`git describe --abbrev=0 --tags`
latestCopied=none
for filename in ../../versions/[23456789].*.md ; do
  version=$(basename "$filename" .md)
  node md2html.js --respec --maintainers ./history/MAINTAINERS_v$version.md ${filename} > ../../deploy/oas/v$version.html
  if [ $version = $latest ]; then
    if [[ ${version} != *"rc"* ]];then
      # version is not a Release Candidate
      cp -p ../../deploy/oas/v$version.html ../../deploy/oas/latest.html
      latestCopied=v$version
    fi
  fi
done
echo Latest tag is $latest, copied $latestCopied to latest.html

