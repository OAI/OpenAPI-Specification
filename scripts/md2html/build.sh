#!/bin/bash

# Author: @MikeRalphson

# run this script from the root of the repo
# It is designed to be run by a GitHub workflow

# Usage: build.sh [version | "latest" | "src"]
# When run with no arguments, it builds artifacts for all published specification versions.
# It may also be run with a specific version argument, such as "3.1.1" or "latest"
# Finally, it may be run with "src" to build "src/oas.md"
#
# It contains bashisms

if [ "$1" = "src" ]; then
  deploydir="deploy-preview"
else
  deploydir="deploy/oas"
fi

mkdir -p $deploydir/js
mkdir -p $deploydir/temp
cp -p node_modules/respec/builds/respec-w3c.* $deploydir/js/

latest=$(git describe --abbrev=0 --tags)

allVersions=$(ls -1 versions/[23456789].*.md | grep -v -e "\-editors" | sort -r)

if [ -z "$1" ]; then
  specifications=$allVersions
elif [ "$1" = "latest" ]; then
  specifications=$(ls -1 versions/$latest.md)
elif [ "$1" = "src" ]; then
  specifications="src/oas.md"
else
  specifications=$(ls -1 versions/$1.md)
fi

latestCopied="none"
lastMinor="-"

for specification in $specifications; do
  version=$(basename $specification .md)

  if [ "$1" = "src" ]; then
    destination="$deploydir/$version.html"
    maintainers="EDITORS.md"
  else
    destination="$deploydir/v$version.html"
    maintainers="$(dirname $specification)/$version-editors.md"
  fi

  minorVersion=${version:0:3}
  tempfile="$deploydir/temp/$version.html"
  tempfile2="$deploydir/temp/$version-2.html"

  echo === Building $version to $destination

  node scripts/md2html/md2html.js --maintainers $maintainers $specification "$allVersions" > $tempfile
  npx respec --no-sandbox --use-local --src $tempfile --out $tempfile2
  # remove unwanted Google Tag Manager and Google Analytics scripts, non-deterministic changes, and ReSpec minor version
  sed -e 's/<script type="text\/javascript" async="" src="https:\/\/www.google-analytics.com\/analytics.js"><\/script>//' \
      -e 's/<script type="text\/javascript" async="" src="https:\/\/www.googletagmanager.com\/gtag\/js?id=G-[^"]*"><\/script>//' \
      -e 's/ toc-inline//' -e 's/ darkmode//' \
      -e 's/"ReSpec \([0-9]*\)[.0-9]*"/"ReSpec \1"/' \
      $tempfile2 > $destination

  echo === Built $destination

  if [ $version = $latest ]; then
    if [[ ${version} != *"rc"* ]]; then
      # version is not a Release Candidate
      ln -sf $(basename $destination) $deploydir/latest.html
      latestCopied="v$version"
    fi
  fi

  if [ ${minorVersion} != ${lastMinor} ] && [[ ${minorVersion} =~ ^[3-9] ]]; then
    ln -sf $(basename $destination) $deploydir/v$minorVersion.html
    lastMinor=$minorVersion
  fi
done

if [ "$latestCopied" != "none" ]; then
  echo Latest tag is $latest, copied $latestCopied to latest.html
fi

rm -r $deploydir/js
rm -r $deploydir/temp
