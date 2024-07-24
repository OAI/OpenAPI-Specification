/* ReSpec supports markdown formatting, but this shows up on the page before being rendered
Hence we render the markdown to HTML ourselves, this gives us
complete control over formatting and syntax highlighting */

'use strict';

/**
@author Mike Ralphson <mike.ralphson@gmail.com>
**/

const fs = require('fs');
const path = require('path');
const url = require('url');

const hljs = require('highlight.js');
const cheerio = require('cheerio');

let argv = require('yargs')
    .boolean('respec')
    .alias('r','respec')
    .describe('respec','Output in respec format')
    .default('respec',true)
    .string('maintainers')
    .alias('m','maintainers')
    .describe('maintainers','path to MAINTAINERS.md')
    .demandCommand(1)
    .argv;
const abstract = 'What is the OpenAPI Specification?';
let maintainers = [];
let emeritus = [];

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) { // && !argv.respec) {
          try {
              return '<pre class="nohighlight" tabindex="0"><code>' +
                  hljs.highlight(str, { language: lang }).value +
                  '</code></pre>';
          } catch (__) { }
      }

      return '<pre class="highlight '+lang+'"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

function preface(title,options) {
    const respec = {
        specStatus: "base",
        latestVersion: "https://spec.openapis.org/oas/latest.html",
        editors: maintainers,
        formerEditors: emeritus,
        publishDate: options.publishDate,
        subtitle: 'Version '+options.subtitle,
        edDraftURI: "https://github.com/OAI/OpenAPI-Specification/",
        shortName: "OAS",
        historyURI: null, // prevent ReSpec from fetching a W3C history based on the shortName
        lint: false,
        logos:[{
            src: "https://raw.githubusercontent.com/OAI/OpenAPI-Style-Guide/master/graphics/bitmap/OpenAPI_Logo_Pantone.png",
            alt: "OpenAPI Initiative",
            height: 48,
            url: "https://openapis.org/"}],
        otherLinks: [
            {
                key: "Participate",
                data: [
                    {
                        value: "GitHub OAI/OpenAPI-Specification",
                        href: "https://github.com/OAI/OpenAPI-Specification/",
                    },
                    {
                        value: "File a bug",
                        href: "https://github.com/OAI/OpenAPI-Specification/issues",
                    },
                    {
                        value: "Commit history",
                        href: `https://github.com/OAI/OpenAPI-Specification/commits/main/versions/${options.subtitle}.md`,
                    },
                    {
                        value: "Pull requests",
                        href: "https://github.com/OAI/OpenAPI-Specification/pulls",
                    },
                ],
            },
        ]
    };

    let preface = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${md.utils.escapeHtml(title)}</title>`;

    // SEO
    preface += '<meta name="description" content="The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs.">';
    preface += '<link rel="canonical" href="https://spec.openapis.org/oas/latest.html" />';

    if (options.respec) {
        preface += '<script src="../js/respec-w3c.js" class="remove"></script>';
        preface += `<script class="remove">var respecConfig = ${JSON.stringify(respec)};</script>`;
        try {
          preface += fs.readFileSync('./analytics/google.html','utf8');
        }
        catch (ex) {}
        preface += '</head><body>';
        preface += '<style>';
        //TODO: extract to oai.css
        preface += '#respec-ui { visibility: hidden; }';
        preface += '#title { color: #629b34; } #subtitle { color: #45512c; }';
        preface += '.dt-published { color: #45512c; } .dt-published::before { content: "Published "; }';
        preface += 'h1,h2,h3,h4,h5,h6 { color: #45512c; font-weight: normal; font-style: normal; }';
        preface += 'a[href] { color: #45512c; }'; // third OAI colour is #8ad000
        preface += 'body:not(.toc-inline) #toc h2 { color: #45512c; }';
        // preface += '.toc > li li li li li { font-size: 90%;}';
        preface += 'table { display: block; width: 100%; overflow: auto; }';
        preface += 'table th { font-weight: 600; }';
        preface += 'table th, table td { padding: 6px 13px; border: 1px solid #dfe2e5; }';
        preface += 'table tr { background-color: #fff; border-top: 1px solid #c6cbd1; }';
        preface += 'table tr:nth-child(2n) { background-color: #f6f8fa; }';
        preface += 'pre { background-color: #f6f8fa !important; }';
        preface += 'code { color: #c83500 } th code { color: inherit }';
        preface += 'cite { font-weight: bold; text-decoration: underline;}';
        preface += '.hljs-literal { color: #0076c0; } .hljs-name { color: #986801; } .hljs-attribute,.hljs-symbol,.hljs-string { color: #428030; }';
        //TODO: end-of-extract
        // preface += fs.readFileSync(path.resolve(__dirname,'gist.css'),'utf8').split('\n').join(' ');
        preface += '</style>';
        preface += `<h1 id="title">${title.split('|')[0]}</h1>`;
        preface += `<p class="copyright">Copyright © ${options.publishDate.getFullYear()} the Linux Foundation</p>`;
        preface += `<section class="notoc" id="abstract"><h2>${abstract}</h2>`;
        preface += 'The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs, which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.';
        preface += '</section>';
        preface += '<section class="override" id="sotd" data-max-toc="0">';
        preface += '<h2>Status of This Document</h2>';
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
    if ($("ul").length < 2) return;
    u = $("ul").last();
    $(u).children('li').each(function(e){
        let t = $(this).text().split('@')[0];
        emeritus.push({name:t});
    });
}

function getPublishDate(m) {
    let result = new Date();
    let h = md.render(m);
    let $ = cheerio.load(h);
    $('table').each(function(i,table){
        const h = $(table).find('th');
        const headers = [];
        $(h).each(function(i,header){
            headers.push($(header).text());
        });
        if (headers.length >= 2 && headers[0] === 'Version' && headers[1] === 'Date') {
            let c = $(table).find('tr').find('td');
            let v = $(c[0]).text();
            let d = $(c[1]).text();
            argv.subtitle = v;
            if (d !== 'TBA') result = new Date(d);
        }
    });
    return result;
}

if (argv.maintainers) {
    doMaintainers();
}

let s = fs.readFileSync(argv._[0],'utf8');

if (argv.respec) {
    argv.publishDate = getPublishDate(s);
}

let lines = s.split(/\r?\n/);

let prevHeading = 0;
let lastIndent = 0;
let inTOC = false;
let inDefs = false;
let inCodeBlock = false;
let bsFix = true;

let indents = [0];

// process the markdown
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
        // line += '\n'; // fixes formatting of first line of syntax-highlighted blocks - actually breaks it
    }

    if (!inCodeBlock && line.startsWith('#')) {
        let indent = 0;
        while (line[indent] === '#') indent++;
        let originalIndent = indent;

        let prevIndent = indents[indents.length-1]; // peek
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

        let title = line.split('# ')[1];
        if (inDefs) title = '<dfn>'+title+'</dfn>';
        line = ('#'.repeat(newIndent)+' '+title);

        if (delta>0) indents.push(originalIndent);
        if (delta<0) {
            let d = Math.abs(delta);
            while (d>0) {
                indents.pop();
                d--;
            }
        }
        lastIndent = indent;
    }

    if (line.indexOf('<a name="')>=0) {
        if (line.indexOf('<a name="parameterAllowEmptyValue"/>')>=0) 
            // fix syntax error in 2.0.md
            line = line.replace('<a name="parameterAllowEmptyValue"/>','<span id="parameterAllowEmptyValue"></span>');
        else {
            line = line.replace('<a name=','<span id=');
            line = line.replace('</a>','</span>');
        }
    }

    line = line.split('\\|').join('&#124;'); // was &brvbar

    if (!inCodeBlock) {

        // minor fixups to get RFC links to work properly
        line = line.replace('RFC [','[RFC');
        line = line.replace('[Authorization header as defined in ','Authorization header as defined in [');
        line = line.replace('[JSON Pointer]','JSON Pointer [RFC6901]'); // only in 2.0.md

        //TODO: more "hidden" RFC references in older specs, for example
        // [media type range](https://tools.ietf.org/html/rfc7231#appendix-D)
        // [ABNF](https://tools.ietf.org/html/rfc5234)

        //TODO: unconventional references to RFCs in 3.0.4 and 3.1.1, for example
        // [RFC3986 §5.1.2 – 5.1.4](https://tools.ietf.org/html/rfc3986#section-5.1.2)
        // RFC6570 [mentions](https://www.rfc-editor.org/rfc/rfc6570.html#section-2.4.2)
        // [are not](https://datatracker.ietf.org/doc/html/rfc3986#appendix-A)
        // [special behavior](https://www.rfc-editor.org/rfc/rfc1866#section-8.2.1)
        // [RFC6570 considers to be _undefined_](https://datatracker.ietf.org/doc/html/rfc6570#section-2.3)

        if (line.indexOf('[RFC')>=0) {
            // also detect [RFC4648 §3.2] etc. in 3.0.4.md and 3.1.1.md
            line = line.replace(/\[RFC ?([0-9]{1,5})( §[0-9 .-]+)?\]/g,function(match,group1){
                // console.warn('Fixing RFC reference',match,group1);
                return '[[RFC'+group1+']]';
            });
        }

        //TODO: non-link mentions of RFCs in 3.0.4 and 3.1.1, for example
        // RFC3986's definition of [reserved](https://datatracker.ietf.org/doc/html/rfc3986#section-2.2)

        // harmonize RFC URLs
        line = line.replace('http://www.ietf.org/rfc/rfc2119.txt','https://tools.ietf.org/html/rfc2119'); // only in 2.0.md
        line = line.replace(/https:\/\/www.rfc-editor.org\/rfc\/rfc([0-9]{1,5})(\.html)?/g,'https://tools.ietf.org/html/rfc$1');
        line = line.replaceAll('https://datatracker.ietf.org/doc/html/rfc','https://tools.ietf.org/html/rfc');
        line = line.replaceAll('http://tools.ietf.org','https://tools.ietf.org');

        // handle url fragments in RFC links and construct section titles links as well as RFC links
        line = line.replace(/\]\]\(https:\/\/tools.ietf.org\/html\/rfc([0-9]{1,5})\/?(\#[^)]*)?\)/g, function(match, rfcNumber, fragment) {
            if (fragment) {
                // Extract section title from the fragment
                let sectionTitle = fragment.replace('#', '').replace(/-/g, ' ');
                sectionTitle = sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1); // Capitalize the first letter
                return `]] [${sectionTitle}](https://datatracker.ietf.org/doc/html/rfc${rfcNumber}${fragment})`;
            } else {
                return ']]';
            }
        });
    }

    if (!inCodeBlock && line.indexOf('](../') >= 0) {
        const regExp = /\((\.\.[^)]+)\)/g;
        line = line.replace(regExp,function(match,group1){
          console.warn('Fixing relative link',group1,line);
          return '('+url.resolve('https://github.com/OAI/OpenAPI-Specification/tree/master/versions/foo',group1)+')';
        });
    }

    if (!inCodeBlock && argv.respec && line.startsWith('#')) {
        let heading = 0;
        while (line[heading] === '#') heading++;
        let delta = heading-prevHeading;
        if (delta>1) console.warn(delta,line);
        if (delta>0) delta = 1;
        //if (delta<0) delta = -1;
        // if (Math.abs(delta)>1) console.warn(delta,line);
        let prefix = '';
        let newSection = '<section>';
        if (line.includes('## Version ')) {
            // our conformance section is headlined with 'Version x.y.z'
            newSection = '<section class="override" id="conformance">';
        }
        if (line.includes('Appendix')) {
            newSection = '<section class="appendix">';
        }

        // heading level delta is either 0 or is +1/-1, or we're in respec mode
        /* respec insists on <section>...</section> breaks around headings */

        if (delta === 0) {
            prefix = '</section>'+newSection;
        }
        else if (delta > 0) {
            prefix = newSection.repeat(delta);
        }
        else {
            prefix = '</section>'+('</section>').repeat(Math.abs(delta))+newSection;
        }
        prevHeading = heading;
        line = prefix+md.render(line);
    }

    lines[l] = line;
}

s = preface(`OpenAPI Specification v${argv.subtitle} | Introduction, Definitions, & More`,argv)+'\n\n'+lines.join('\n');
let out = md.render(s);
out = out.replace(/\[([RGB])\]/g,function(match,group1){
    console.warn('Fixing',match,group1);
    return '&#91;'+group1+'&#93;';
});
console.log(out);
