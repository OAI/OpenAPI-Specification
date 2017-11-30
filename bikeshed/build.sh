#!/bin/sh
node md2bs.js 3.0.0.md > 3.0.0.bs
cat heading.bs style-start.html syntax-github.css style-finish.html 3.0.0.bs > input.bs
curl https://api.csswg.org/bikeshed/ -F file=@input.bs -F output=err > oas_3.0.0.err
curl https://api.csswg.org/bikeshed/ -F file=@input.bs -F force=1 > oas_3.0.0.html
