/* bikeshed claims to support markdown syntax, but not (yet) commonmark.
Hence we render the markdown to HTML ourselves, this gives us
complete control over formatting and syntax highlighting (where
highlight.js does a better job than bikeshed's Pygments) */

/**
@author Mike Ralphson <mike.ralphson@gmail.com>
**/

const fs = require('fs');
const hljs = require('highlightjs/highlight.pack.js');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
          try {
              return '<pre class="nohighlight"><code>' +
                  hljs.highlight(lang, str, true).value +
                  '</code></pre>';
          } catch (__) { }
      }

      return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});
let s = fs.readFileSync(process.argv[2],'utf8');

let lines = s.split('\r').join().split('\n');

let prevIndent = 0;

for (let l in lines) {
    let line = lines[l];

    if (line.startsWith('#') && line.indexOf('<a name=')>=0) {
        let indent = 0;
        while (line[indent] === '#') indent++;

        /* bikeshed is a bit of a pita when it comes to header nesting */
        if (indent>prevIndent+1) {
            indent = prevIndent+1;
        }

        let comp = line.split('</a>');
        let title = comp[1];
        let link = comp[0].split('<a ')[1].replace('name=','id=');
        line = ('<h'+indent+'><a '+link+title+'</a></h'+indent+'>');
        prevIndent = indent-1;
    }

    if (line.indexOf('"></a>')>=0) {
        line = line.replace(' name=',' id=');
        line = line.replace('"></a>','"> </a>');
    }

    if (line.indexOf('[RFC')>=0) {
        line = line.replace(/\[RFC ?([0-9]{1,5})\]/g,function(match,group1){
            console.warn('Fixing RFC reference',match,group1);
            return '[[!rfc'+group1+']]';
        });
    }

    while (line.indexOf('https://tools.ietf.org/html/rfc')>=0) {
        line = line.replace(/.https:..tools.ietf.org.html.rfc[0-9]{1,5}./g,'');
    }
    while (line.indexOf('http://tools.ietf.org/html/rfc')>=0) {
        line = line.replace(/.http:..tools.ietf.org.html.rfc[0-9]{1,5}./g,'');
    }

    if (line.indexOf('[ABNF]')>=0) {
        line = line.replace('[ABNF]','[Advanced Backus-Naur Form]');
    }

    if (line.startsWith('#')) {
        let indent = 0;
        while (line[indent] === '#') indent++;
        if (indent>prevIndent+1) {
            line = line.replace('#'.repeat(indent),'#'.repeat(prevIndent+1));
            indent = prevIndent+1;
        }
        prevIndent = indent;
    }
 
    if (line.startsWith('```')) line += '\n'; // fixes formatting of first line of syntax-highlighted blocks

    lines[l] = line;

}

s = lines.join('\n');
console.log(md.render(s));
