#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run by a GitHub workflow.

schemaDir="src/schemas/validation"
branch=$(git branch --show-current)


if [ -z "$1" ]; then
  if [[ $branch =~ ^v([0-9]+\.[0-9]+)-dev$ ]]; then
    version="${BASH_REMATCH[1]}"
    deploydir="./deploy/oas/${version}"
  else
    echo "Unable to determine version from branch name; should be vX.Y-dev"
    exit 1
  fi
elif [ $1 = "src" ]; then
  deploydir="./deploy-preview"
else
  echo "Unrecognized argument"
  exit 1
fi

# create the date-stamped schemas
publish_schema() {
  local schema="$1"
  local date="$2"
  local sedCmd="$3"

  local base=$(basename $schema '.yaml')
  local target=$deploydir/$base/$date

  mkdir -p $deploydir/$base

  # replace the WORK-IN-PROGRESS placeholders
  sed ${sedCmd[@]} $schemaDir/$schema | npx yaml --json --indent 2 --single > $target

  # find the jekyll lander markdown file
  local jekyllLander=$(find "$deploydir/$base" -maxdepth 1 -name "*.md")

  # rename or create the jekyll lander markdown file for this iteration
  if [ ! -z "$jekyllLander" ]; then
    mv $jekyllLander $target.md
    echo " * $newestCommitDate: $schema & jekyll lander $(basename $jekyllLander)"
  else
    # find the most recent preceding version
    local lastdir=""; for fn in $(dirname $deploydir)/?.?; do test "$fn" "<" "$deploydir" && lastdir="$fn"; done
    local lastVersion=$(basename $lastdir)
    # find the jekyll lander markdown file for the preceding version
    local lastLander=$(find "$lastdir/$base" -maxdepth 1 -name "*.md")

    if [ ! -z "$lastLander" ]; then
      # copy and adjust the lander file from the preceding version
      sed "s/$lastVersion/$version/g" $lastLander > $target.md
      echo " * $newestCommitDate: $schema & jekyll lander $(basename $lastLander) of $lastVersion"
    else
      echo " * $newestCommitDate: $schema"
    fi
  fi

}

echo === Building schemas into $deploydir

# list of schemas to process, dependent schemas come first
schemas=(meta.yaml dialect.yaml schema.yaml schema-base.yaml)

# publish each schema using its or any of its dependencies newest commit date
maxDate=""
sedCmds=()
for schema in "${schemas[@]}"; do
  if [ -f  "$schemaDir/$schema" ]; then
    newestCommitDate=$(git log -1 --format="%ad" --date=short "$schemaDir/$schema")

    # the newest date across a schema and all its dependencies is its date stamp
    if [ "$newestCommitDate" \> "$maxDate" ]; then
      maxDate=$newestCommitDate
    fi

    base=$(basename $schema '.yaml')
    # add the replacement for this schema's placeholder to list of sed commands
    sedCmds+=("s/${base}\/WORK-IN-PROGRESS/${base}\/${maxDate}/g")

    publish_schema "$schema" "$maxDate" $(printf '%s;' "${sedCmds[@]}")
  fi
done

echo === Built
