#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo

echo
echo "Schema Test Coverage"
echo

for schemaDir in schemas/v3* ; do
  version=$(basename "$schemaDir")
  echo $version

  node scripts/schema-test-coverage.mjs $schemaDir/schema.yaml tests/$version/pass

  echo
done