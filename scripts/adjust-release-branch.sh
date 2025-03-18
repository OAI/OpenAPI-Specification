#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run manually in a release branch.

branch=$(git branch --show-current)

if [[ ! $branch =~ ^v[0-9]+\.[0-9]+\.[0-9]+-rel$ ]]; then
  echo "This script is intended to be run from a release branch, e.g. v3.1.2-rel"
  exit 1
fi

vVersion=$(basename "$branch" "-rel")
version=${vVersion:1}
echo Prepare release of $version

cp EDITORS.md versions/$version-editors.md
mv src/oas.md versions/$version.md
rm -r src/schemas
rm -r tests/schema
