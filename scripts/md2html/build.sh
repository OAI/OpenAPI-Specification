#!/bin/bash

# Author: @MikeRalphson

# run this script from the root of the repo. It is designed to be run by a GitHub workflow.
# It contains bashisms

mkdir -p deploy/oas
mkdir -p deploy/js

cd scripts/md2html

cp -p ../../node_modules/respec/builds/respec-w3c.* ../../deploy/js/

latest=`git describe --abbrev=0 --tags`
latestCopied=none
lastMinor="-"

# If $1 is not provided, process all versions
# If $1 is "latest", process the last-tagged version
# Otherwise, process the specified version
if [ -z "$1" ]; then
  files=$(ls -1 ../../versions/[23456789].*.md | sort -r)
elif [ "$1" = "latest" ]; then
  files="../../versions/$latest.md"
elif [ -f "../../versions/$1.md" ]; then
  files="../../versions/$1.md"
else
  echo "Error: version $1.md not found"
  exit 1
fi

for filename in $files; do

  if [[ ${filename} == *-editors.md ]]; then
    continue
  fi

  version=$(basename "$filename" .md)
  minorVersion=${version:0:3}
  tempfile=../../deploy/oas/v$version-tmp.html
  echo -e "\n=== v$version ==="

  node md2html.js --maintainers ../../versions/$version-editors.md ${filename} > $tempfile
  npx respec --use-local --src $tempfile --out ../../deploy/oas/v$version.html
  rm $tempfile

  if [ $version = $latest ]; then
    if [[ ${version} != *"rc"* ]]; then
      # version is not a Release Candidate
      ( cd ../../deploy/oas && ln -sf v$version.html latest.html )
      latestCopied=v$version
    fi
  fi

  if [ ${minorVersion} != ${lastMinor} ] && [ ${minorVersion} != 2.0 ]; then
    ( cd ../../deploy/oas && ln -sf v$version.html v$minorVersion.html )
    lastMinor=$minorVersion
  fi
done
echo Latest tag is $latest, copied $latestCopied to latest.html

rm ../../deploy/js/respec-w3c.*
