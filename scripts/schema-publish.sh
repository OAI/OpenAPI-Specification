#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run by a GitHub workflow.

for schemaDir in schemas/v3* ; do
  vVersion=$(basename "$schemaDir")
  version=${vVersion:1}
  echo $version

  # list of schemas to process, dependent schemas come first
  schemas=(meta.yaml dialect.yaml schema.yaml schema-base.yaml)

  # find the newest commit date for each schema
  maxDate=""
  declare -A datesHash
  for schema in "${schemas[@]}"; do
    if [ -f  "$schemaDir/$schema" ]; then
      newestCommitDate=$(git log -1 --format="%ad" --date=short "$schemaDir/$schema")

      # the newest date across a schema and all its dependencies is its date stamp
      if [ "$newestCommitDate" \> "$maxDate" ]; then
        maxDate=$newestCommitDate
      fi
      datesHash["$schema"]=$maxDate
      echo $schema changed at $newestCommitDate
    fi
  done

  # construct sed command
  sedCmd=()
  for schema in "${!datesHash[@]}"; do
    base=$(basename "$schema" .yaml)
    sedCmd+=("-e s/$base\/WORK-IN-PROGRESS/$base\/${datesHash[$schema]}/g")
  done

  # create the date-stamped schemas
  for schema in "${!datesHash[@]}"; do
    base=$(basename "$schema" .yaml)
    target=deploy/oas/$version/$base/${datesHash[$schema]}

    mkdir -p "deploy/oas/$version/$base"

    sed ${sedCmd[@]} $schemaDir/$schema > $target.yaml
    node scripts/yaml2json/yaml2json.js $target.yaml
    rm $target.yaml
    mv $target.json $target

    mv deploy/oas/$version/$base/*.md $target.md
  done

  echo ""
done
