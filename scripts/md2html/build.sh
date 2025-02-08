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

if [ -z "$1" ]; then
  deploydir="deploy/oas"
else
  deploydir="deploy-preview"
fi

mkdir -p $deploydir/js
mkdir -p $deploydir/temp

latest=$(git describe --abbrev=0 --tags)
latestCopied="none"
lastMinor="-"

mkdir -p history
cat > history/MAINTAINERS_v2.0.md << EOF
## Active
* Jeremy Whitlock [@whitlockjc](https://github.com/whitlockjc)
* Marsh Gardiner [@earth2marsh](https://github.com/earth2marsh)
* Ron Ratovsky [@webron](https://github.com/webron)
* Tony Tam [@fehguy](https://github.com/fehguy)
EOF
cat > history/MAINTAINERS_v3.0.0.md << EOF
## Active
* Jeremy Whitlock [@whitlockjc](https://github.com/whitlockjc)
* Marsh Gardiner [@earth2marsh](https://github.com/earth2marsh)
* Ron Ratovsky [@webron](https://github.com/webron)
* Tony Tam [@fehguy](https://github.com/fehguy)

## Emeritus
* Jason Harmon [@jharmn](https://github.com/jharmn)
EOF
git show c740e95:MAINTAINERS.md > history/MAINTAINERS_v3.0.1.md
git show 3140640:MAINTAINERS.md > history/MAINTAINERS_v3.0.2.md
cp history/MAINTAINERS_v3.0.2.md history/MAINTAINERS_v3.0.3.md
cp history/MAINTAINERS_v3.0.2.md history/MAINTAINERS_v3.1.0.md
#TODO: adjust commit for 3.0.4, 3.1.1
git show c3b88ed:EDITORS.md > history/MAINTAINERS_v3.0.4.md
cp history/MAINTAINERS_v3.0.4.md history/MAINTAINERS_v3.1.1.md
# add lines for 3.2.0, ...

if [ -z "$1" ]; then
  specifications=$(ls -1 versions/[23456789].*.md | sort -r)
elif [ "$1" = "latest" ]; then
  specifications=$(ls -1 versions/$latest.md)
elif [ "$1" = "src" ]; then
  specifications="src/oas.md"
else
  specifications=$(ls -1 versions/$1.md)
fi

cp -p node_modules/respec/builds/respec-w3c.* $deploydir/js/

for specification in $specifications; do
  version=$(basename $specification .md)
  minorVersion=${version:0:3}
  destination="$deploydir/$version.html"
  tempfile="$deploydir/temp/$version.html"

  if [ "$1" = "src" ]; then
    maintainers="EDITORS.md"
  else
    maintainers="history/MAINTAINERS_v$version.md"
  fi

  echo === Building $version to $destination

  node scripts/md2html/md2html.js --maintainers $maintainers $specification > $tempfile
  npx respec --use-local --src $tempfile --out $destination
  rm $tempfile

  echo === Built $destination

  if [ $version = $latest ]; then
    if [[ ${version} != *"rc"* ]]; then
      # version is not a Release Candidate
      ln -sf $(basename $destination) $deploydir/latest.html
      latestCopied="v$version"
    fi
  fi

  if [ ${minorVersion} != ${lastMinor} ] && [ ${minorVersion} != 2.0 ]; then
    ln -sf $(basename $destination) $deploydir/v$minorVersion.html
    lastMinor=$minorVersion
  fi
done

if [ "$latestCopied" != "none" ]; then
  echo Latest tag is $latest, copied $latestCopied to latest.html
fi

rm $deploydir/js/respec-w3c.*
rmdir $deploydir/js
rmdir $deploydir/temp
rm -r history
