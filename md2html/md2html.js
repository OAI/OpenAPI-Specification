/* bikeshed claims to support markdown syntax, but not (yet) commonmark.
ReSpec supports markdown formatting, but this shows up on the page before being rendered
Hence we render the markdown to HTML ourselves, this gives us
complete control over formatting and syntax highlighting (where
highlight.js does a better job than bikeshed's Pygments) */

'use strict';

/**
@author Mike Ralphson <mike.ralphson@gmail.com>
**/

const fs = require('fs');
const util = require('util');

const hljs = require('highlightjs/highlight.pack.js');
const cheerio = require('cheerio');

let argv = require('yargs')
    .boolean('respec')
    .alias('r','respec')
    .describe('respec','Output in respec format, default bikeshed')
    .string('maintainers')
    .alias('m','maintainers')
    .describe('maintainers','path to MAINTAINERS.md')
    .require(1)
    .argv;
let maintainers = [];

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang) && !argv.respec) {
          try {
              return '<pre class="nohighlight"><code>' +
                  hljs.highlight(lang, str, true).value +
                  '</code></pre>';
          } catch (__) { }
      }

      return '<pre class="highlight"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

function preface(title,options) {
    const respec = {
        specStatus: "base",
        editors: maintainers,
        publishDate: options.publishDate,
        subtitle: 'Version '+options.subtitle,
        processVersion: 2017,
        edDraftURI: "http://github.com/OAI/openapi-specification",
        github: {
            repoURL: "https://github.com/OAI/openapi-specification",
            branch: "master"
        },
        shortName: "dahut",
        noTOC: false,
        lint: false,
        additionalCopyrightHolders: "Copyright the Linux Foundation",
        includePermalinks: true
    };

    let preface = `<html><head><meta charset="UTF-8"><title>${md.utils.escapeHtml(title)}</title>`;
    if (options.respec) {
        preface += '<script src="https://mermade.github.io/static/respec-oai.js" class="remove"></script>';
        preface += `<script class="remove">var respecConfig = ${JSON.stringify(respec)};</script>`;
        preface += '</head><body>';
        preface += '<style>';
        preface += '#respec-ui { visibility: hidden; }';
        preface += 'h1,h2,h3 { color: #629b34; }';
        preface += 'a[href] { color: #45512c; }'; // #8ad000
        preface += 'body:not(.toc-inline) #toc h2 { color: #45512c; }';
        preface += 'table { display: block; width: 100%; overflow: auto; }';
        preface += 'table th { font-weight: 600; }';
        preface += 'table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }';
        preface += 'table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }';
        preface += 'table tr:nth-child(2n) { background-color: #f6f8fa; }';
        preface += '</style>';
        preface += '<section id="abstract">';
        preface += 'The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for REST APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.';
        preface += '</section>';
        preface += '<section class="notoc" id="sotd">';
        preface += '<h2>State of the document</h2>';
        preface += 'The source-of-truth for the specification is the GitHub markdown file referenced above.';
        preface += '</section>';
    }
    else {
        preface += '</head><body>';
    }
    return preface;
}

function doMaintainers() {
    let m = fs.readFileSync(argv.maintainers,'utf8');
    let h = md.render(m);
    let $ = cheerio.load(h);
    let u = $('ul').first();
    $(u).children('li').each(function(e){
        let t = $(this).text().split('@')[0];
        maintainers.push({name:t});
    });
}

function getPublishDate(m) {
    let h = md.render(m);
    let $ = cheerio.load(h);
    let t = $('tbody').last();
    let c = $(t).children('tr').children('td');
    let v = $(c[0]).text();
    let d = $(c[1]).text();
    argv.subtitle = v;
    if (d === 'TBA') return new Date();
    return new Date(d);
}

if (argv.maintainers) {
    doMaintainers();
}

let s = fs.readFileSync(argv._[0],'utf8');

if (argv.respec) {
    argv.publishDate = getPublishDate(s);
}

let lines = s.split('\r').join().split('\n');

let prevHeading = 0;
let lastIndent = 0;
let inTOC = false;
let inDefs = false;
let inCodeBlock = false;
let bsFix = true;

let indents = [0];

for (let l in lines) {
    let line = lines[l];

    if (line.startsWith('## Table of Contents')) inTOC = true;
    if (line.startsWith('<!-- /TOC')) inTOC = false;
    if (inTOC) line = '';

    if (line.startsWith('## Definitions')) {
        inDefs = true;
        bsFix = false;
    }
    else if (line.startsWith('## ')) inDefs = false;

    if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        line += '\n'; // fixes formatting of first line of syntax-highlighted blocks
    }

    if (!inCodeBlock && line.startsWith('#')) {
        let indent = 0;
        while (line[indent] === '#') indent++;
        let originalIndent = indent;

        let prevIndent = indents[indents.length-1]; // peek

        /* bikeshed is a bit of a pita when it comes to header nesting */
        let delta = indent-prevIndent;

        if (!argv.respec) {
            if (delta===0) indent = lastIndent
            else if (delta<0) indent = lastIndent-1
            else if (delta>0) indent = lastIndent+1;
        }

        if (indent < 0) {
            indent = 1;
        }
        if (argv.respec && (indent > 1)) {
            indent--;
        }
        let newIndent = indent;
        if (!argv.respec && (indent <= 2) && bsFix) {
            newIndent++;
        }

        if (line.indexOf('<a name=')>=0) {
            let comp = line.split('</a>');
            let title = comp[1];
            if (inDefs) title = '<dfn>'+title+'</dfn>';
            let link = comp[0].split('<a ')[1].replace('name=','id=');
            line = ('#'.repeat(newIndent)+' <a '+link+title+'</a>');
        }
        else {
            let title = line.split('# ')[1];
            if (inDefs) title = '<dfn>'+title+'</dfn>';
            line = ('#'.repeat(newIndent)+' '+title);
        }

        if (delta>0) indents.push(originalIndent);
        //if (delta<0) indents.pop();
        if (delta<0) {
            let d = Math.abs(delta);
            while (d>0) {
                indents.pop();
                d--;
            }
        }
        lastIndent = indent;
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

    line = line.split('\\|').join('&brvbar;');

    while (line.indexOf('https://tools.ietf.org/html/rfc')>=0) {
        line = line.replace(/.https:..tools.ietf.org.html.rfc[0-9]{1,5}./g,'');
    }
    while (line.indexOf('http://tools.ietf.org/html/rfc')>=0) {
        line = line.replace(/.http:..tools.ietf.org.html.rfc[0-9]{1,5}./g,'');
    }

    if (line.indexOf('[ABNF]')>=0) {
        line = line.replace('[ABNF]','[Augmented Backus-Naur Form]');
    }

    if (!inCodeBlock && argv.respec && line.startsWith('#')) {
        let heading = 0;
        while (line[heading] === '#') heading++;
        let delta = heading-prevHeading;
        if (delta>0) delta = 1;
        //if (delta<0) delta = -1;
        if (Math.abs(delta)>1) console.warn(delta,line);
        let prefix = '';

        // heading level delta is either 0 or is +1/-1, or we're in respec mode
        /* respec insists on <section>...</section> breaks around headings */

        if (delta === 0) {
            prefix = '</section><section>';
        }
        else if (delta > 0) {
            prefix = '<section>'.repeat(delta);
        }
        else {
            prefix = '</section>'+('</section>').repeat(Math.abs(delta))+'<section>';
        }
        prevHeading = heading;
        line = prefix+md.render(line);
    }

    lines[l] = line;

}

fs.writeFileSync('./md2html.tmp',lines.join('\n'),'utf8');

s = preface('OpenAPI Specification',argv)+'\n\n'+lines.join('\n');
let out = md.render(s);
out = out.replace(/\[([RGB])\]/g,function(match,group1){
    console.warn('Fixing',match,group1);
    return '\\'+group1;
});
console.log(out);
