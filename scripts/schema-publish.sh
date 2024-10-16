#!/bin/bash

# Author: @ralfhandl

# run this script from the root of the repo. It is designed to be run by a GitHub workflow.

for filename in schemas/v3*/schema.yaml ; do
  version=$(basename $(dirname "$filename"))
  lastCommitDate=$(git log -1 --format="%ad" --date=format:"%Y%m%d" "$filename")

  echo "$filename $lastCommitDate"
  mkdir -p deploy/oas/$version/schema
  node scripts/schema-convert.js "$filename" $lastCommitDate > deploy/oas/$version/schema/$lastCommitDate.json

  filenameBase=$(dirname "$filename")/schema-base.yaml
  if [ -f "$filenameBase" ]; then
    echo "$filenameBase $lastCommitDate"
    mkdir -p deploy/oas/$version/schema-base
    node scripts/schema-convert.js "$filenameBase" $lastCommitDate > deploy/oas/$version/schema-base/$lastCommitDate.json
  fi
done
