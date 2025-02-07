#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo

echo
echo "Schema Test Coverage"
echo

for schemaDir in schemas/v3* ; do
  version=$(basename "$schemaDir")
  echo $version

  node scripts/schema-test-coverage.mjs $schemaDir/schema.yaml tests/schemas/$version/pass

  echo
done

echo src
node scripts/schema-test-coverage.mjs src/schemas/validation/schema.yaml tests/schemas/dev/pass
