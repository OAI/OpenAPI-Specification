#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run manually in a release branch.

branch=$(git branch --show-current)
today=$(date +%Y-%m-%d)

if [[ ! $branch =~ ^v[0-9]+\.[0-9]+\.[0-9]+-rel$ ]]; then
  echo "This script is intended to be run from a release branch, e.g. v3.1.2-rel"
  exit 1
fi

vVersion=$(basename "$branch" "-rel")
version=${vVersion:1}
echo Prepare release of $version

# create snapshot of current editors
cp EDITORS.md versions/$version-editors.md
# Replace release date placeholder with current date - should only appear in the history table
sed "s/| TBD |/| $today |/g" src/oas.md > versions/$version.md
# show what changed in the spec - should only be the history table line for the current release
diff -Z src/oas.md versions/$version.md
# remove files that only exist in development branches and not on main
rm -r src
rm -r tests/schema/pass tests/schema/fail
rm tests/schema/schema.test.mjs
