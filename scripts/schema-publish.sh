#!/bin/bash

# Author: @ralfhandl

# run this script from the root of the repo. It is designed to be run by a GitHub workflow.

for filename in schemas/v3*/schema.yaml ; do
  version=$(basename $(dirname "$filename"))
  mkdir -p deploy/oas/$version

  lastCommitDate=$(git log -1 --format="%ad" --date=format:"%Y%m%d" "$filename")

  echo $filename $lastCommitDate $version
  #TODO:
  # - generate JSON file "deploy/oas/$version/schema/$lastCommitDate" from schema.yaml
  # - if schema-base.yaml exists, generate JSON file "deploy/oas/$version/schema-base/$lastCommitDate" from schema-base.yaml
done
