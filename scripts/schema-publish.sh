#!/usr/bin/env bash

# Author: @ralfhandl

# Run this script from the root of the repo. It is designed to be run by a GitHub workflow.

for schemaDir in schemas/v3* ; do
  vVersion=$(basename "$schemaDir")
  version=${vVersion:1}
  echo $version

  schemas=(meta.yaml dialect.yaml schema.yaml schema-base.yaml)

  # find the latest commit date for each schema
  maxDate="-"
  declare -A datesHash
  for schema in "${schemas[@]}"; do
    if [ -f  "$schemaDir/$schema" ]; then
      lastCommitDate=$(git log -1 --format="%ad" --date=short "$schemaDir/$schema")
      if [ "$lastCommitDate" \> "$maxDate" ]; then
        maxDate=$lastCommitDate
      fi
      datesHash["$schema"]=$maxDate
      echo $schema changed at $lastCommitDate
    else
      datesHash["$schema"]="-"
    fi
  done

  # construct sed command
  sedCmd=()
  for schema in "${schemas[@]}"; do
    if [ -f  "$schemaDir/$schema" ]; then
      base=$(basename "$schema" .yaml)
      sedCmd+=("-e s/$base\/WORK-IN-PROGRESS/$base\/${datesHash[$schema]}/g")
    fi
  done

  # create the date-stamped schemas
  for schema in "${schemas[@]}"; do
    if [ -f  "$schemaDir/$schema" ]; then
      base=$(basename "$schema" .yaml)
      target=deploy/oas/$version/$base/${datesHash[$schema]}

      mkdir -p "deploy/oas/$version/$base"

      sed ${sedCmd[@]} $schemaDir/$schema > $target.yaml
      node scripts/yaml2json/yaml2json.js $target.yaml
      rm $target.yaml
      mv $target.json $target

      mv deploy/oas/$version/$base/*.md $target.md
    fi
  done

  echo ""
done
