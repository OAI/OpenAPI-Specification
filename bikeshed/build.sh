#!/bin/sh

node md2bs.js ../versions/3.0.0.md > v3/3.0.0.bs
cat v3/heading.bs style-start.html syntax-github.css style-finish.html v3/3.0.0.bs > v3/input.bs
curl https://api.csswg.org/bikeshed/ -F file=@v3/input.bs -F output=err > v3/oas_3.0.0.err
curl https://api.csswg.org/bikeshed/ -F file=@v3/input.bs -F force=1 > v3/oas_3.0.0.html

node md2bs.js ../versions/2.0.md > v2/2.0.bs
cat v2/heading.bs style-start.html syntax-github.css style-finish.html v2/2.0.bs > v2/input.bs
curl https://api.csswg.org/bikeshed/ -F file=@v2/input.bs -F output=err > v2/oas_2.0.err
curl https://api.csswg.org/bikeshed/ -F file=@v2/input.bs -F force=1 > v2/oas_2.0.html
