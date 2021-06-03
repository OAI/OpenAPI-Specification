#!/bin/sh

# Aborts a fwdport.sh run cleanly

# Author: @MikeRalphson

git am -i --abort
rm -f *.mbox *.patch *.rej
git checkout main

