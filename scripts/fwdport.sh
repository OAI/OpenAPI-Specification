#!/bin/sh

# Forward ports changes from the spec file of a source branch to the spec file of a target branch
# For example: porting interim changes made in v3.1.x patch releases to the v3.2.0 branch

# This script is designed to be run once per branch, when interim changes need merging in
# before another branch is released. It is not intended to be run multiple times to keep
# two branches in sync.

# Author: @MikeRalphson
# Issues: https://github.com/OAI/OpenAPI-Specification/pull/2163

mainbranch=main
myremote=origin
upstream=upstream

source=$1
target=$2

if [ -z "$source" ]; then
  echo You must specify a source and target branch
  exit 1
fi
if [ -z "$target" ]; then
  echo You must specify a source and target branch
  exit 1
fi

echo Checking working dir...
status=`git ls-files -m`
if [ -z "$status" ]; then
  echo All clear
else
  echo You have a dirty working tree, aborting
  echo ${status}
  exit 1
fi

cruft=`ls -1 *.patch *.rej *.mbox 2>/dev/null`
if [ -z "$cruft" ]; then
  echo No .patch, .rej or .mbox files found, continuing
else
  echo .patch / .rej / .mbox files found, aborting
  exit 1
fi

tmpbranch=forward-port-${source}
existing=`git branch | grep ${tmpbranch}`
if [ -z "$existing" ]; then
  echo No matching temp branch found, continuing
else
  echo Temp branch ${tmpbranch} already exists, aborting
  exit 1
fi

srcver=`echo $source | sed s/-dev//g | sed s/v//g`.md
tgtver=`echo $target | sed s/-dev//g | sed s/v//g`.md

echo Forward-porting changes from ${source}:versions/${srcver} to ${target}:${tgtver}
echo You may use the commands \'git fwdskip\' and \'git fwdcont\' to skip patches, or to continue after manually fixing.
echo Use `fwdabort.sh` to abort cleanly.
echo
echo Due to a bug in \`git am\`, git v2.22.1+ is required, you\'re running:
git --version
echo
echo Press a key to continue...
read

git config --add rerere.enabled true
git config alias.fwdskip '!git am -i --skip'
git config alias.fwdcont '!git am -i --continue'

git checkout ${source}
git pull ${upstream} ${source}

# look at using git merge-base as an alternative? say if we branched 3.1.0 part way through 3.0.2's life

firstsrc=`git log --abbrev-commit --format=format:%H -n 1 --reverse -- versions/${srcver}`
lastsrc=`git log --abbrev-commit --format=format:%H -- versions/${srcver} | tail -n 1`
changes=`git log --format=format:%H --reverse versions/${srcver}`

echo Applying changes from ${firstsrc} to ${lastsrc}

# remove first (creation) commit and uniq without sorting
oIFS="$IFS"
IFS=' '
changes=`echo ${changes} | tail -n +2 | awk '!x[$0]++'`
IFS="$oIFS"

for c in ${changes}; do
  git format-patch --stdout -1 $c | sed s/${srcver}/${tgtver}/g > $c.patch
done

git checkout ${target}
git pull ${upstream} ${target}
git checkout -b ${tmpbranch}
cat *.patch > fwdport.mbox
rm -f *.patch
git am -3 --interactive --ignore-whitespace -s fwdport.mbox

