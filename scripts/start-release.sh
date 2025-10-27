#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run manually in a development branch.

repoUrl="https://github.com/OAI/OpenAPI-Specification"
remote=$(git remote -v | grep "$repoUrl.git (fetch)" | head -1 | cut --fields=1)

branch=$(git branch --show-current)
if [[ ! $branch =~ ^v[0-9]+\.[0-9]+-dev$ ]]; then
  echo "This script is intended to be run from a development branch, e.g. v3.2-dev"
  exit 1
fi

vVersion=$(basename "$branch" "-dev")
minor=${vVersion:1}

# Find last published spec version for this minor version
lastSpec=$(git ls-tree $remote/main versions/ --name-only | grep -E "/$minor\.[0-9].md" | tail -1)

if [ -z "$lastSpec" ]; then
  # Find last published spec version
  lastSpec=$(git ls-tree $remote/main versions/ --name-only | grep -E "/.+\.[0-9].md" | tail -1)
  nextPatch=0
  releaseType="Release"
else
  lastPatch=$(basename "$lastSpec" ".md" | cut --delimiter=. --fields=3)
  nextPatch=$((lastPatch + 1))
  releaseType="Patch release"
fi

nextVersion="$minor.$nextPatch"

if [ -z "$lastSpec" ]; then
  echo "Could not find any published specification version in $remote/main"
  exit 1
fi

lastVersion=$(basename "$lastSpec" ".md")
echo === Initialize src/oas.md for $nextVersion from $lastVersion

# Create PR branch from development branch
prBranch="$branch-start-$nextVersion"
if git ls-remote --exit-code --heads $remote "$prBranch"; then
  echo "=== Failed: PR branch $prBranch already exists on the remote, please delete it and try again"
  exit 1  
fi
if ! git checkout -b "$prBranch"; then
  echo "=== Failed: PR branch $prBranch already exists locally, please delete it and try again"
  exit 1  
fi

# Create empty orphan branch and add src/oas.md with last spec's content and no history
orphan="v$minor-orphan"
if ! git switch --orphan "$orphan"; then
  git switch "$branch"
  git branch -d "$prBranch"
  echo "=== Failed: please delete branch $orphan and try again"
  exit 1
fi
mkdir src
git show "main:$lastSpec" > src/oas.md
git add src/oas.md
git commit -m "copy from $lastVersion"

# Merge orphan branch into PR branch, favoring orphan's version of src/oas.md
git switch "$prBranch"
git merge "$orphan" -X theirs --allow-unrelated-histories -m "reset src/oas.md history"
git branch -D "$orphan"

# Bump version headline, add line to history table
temp=$(mktemp)

historyTableHeader="\n| Version | Date | Notes |\n| ---- | ---- | ---- |\n"
sed -z -e "s/\n## Version $lastVersion\n/\n## Version $nextVersion\n/" \
    -z -e "s/$historyTableHeader/$historyTableHeader| $nextVersion | TBD | $releaseType of the OpenAPI Specification $nextVersion |\n/" \
    src/oas.md > "$temp"
mv -f "$temp" src/oas.md

git add src/oas.md
git commit -m "bump version"

echo === Initialized src/oas.md 

# when starting a new major or minor version
if [ "$nextPatch" == "0" ]; then
  lastMinor=$(echo "$lastVersion" | cut -d . -f 1,2)

  echo === Adjust schemas for new version $minor
  minorRegex=$(echo "$minor" | sed 's/\./\\\\\\./')
  lastMinorRegex=$(echo "$lastMinor" | sed 's/\./\\\\\\./')

  for file in src/schemas/validation/*.yaml; do
    sed -e "s/$lastMinor/$minor/g" \
        -e "s/\^$lastMinorRegex\\\./\^$minorRegex\\\./g" \
        "$file" > "$temp"
    mv -f "$temp" "$file"
  done
  
  echo === Adjust tests for new version $minor

  sed -e "s/$lastMinor/$minor/g" tests/schema/schema.test.mjs > "$temp"
  mv -f "$temp" tests/schema/schema.test.mjs

  for file in tests/schema/{pass,fail}/*.yaml; do
    sed -e "s/$lastMinor/$minor/g" "$file" > "$temp"
    mv -f "$temp" "$file"
  done

  git commit --all -m "adjust schemas, test script, and test data"

  echo === Adjusted schemas and tests
fi

# Push PR branch to remote
git push -u $remote $prBranch

# Clean up
git switch "$branch"
echo === Done
