#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo

[[ ! -e src/schemas ]] && exit 0

branch=$(git branch --show-current)

echo
echo "Schema Test Coverage"
echo

node scripts/schema-test-coverage.mjs src/schemas/validation/schema-base.yaml tests/schema/pass
rc=$?

[[ "$branch" == "dev" ]] || exit $rc
