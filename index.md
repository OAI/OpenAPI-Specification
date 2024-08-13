---
title: Home
description: HTML Spec. and extensible registry
layout: default
---

# OpenAPI Initiative Registry

This site contains the OpenAPI Initiative Registry and content for the HTML versions of specifications managed by the OpenAPI Initiative such as the OpenAPI Specification and the Arazzo Specification.

## Registry

* Proceed to [Registry](./registry/index.html)

## Arazzo Specification

### Versions

<!-- TODO: make include  and call with parameter "arazzo" -->
{% assign html_files = site.static_files | where: "extname", ".html" | sort: "basename" | reverse %}
{% assign last_version = "" %}
{%- for file in html_files -%}
{%- assign segments = file.path | split: "/" -%}
{%- assign firstchar = file.basename | slice: 0 -%}
{%- if segments[1] == "arazzo" and firstchar == "v" -%}
{%- assign minor_version = file.basename | slice: 1, 3 -%}
{%- if minor_version != last_version -%}
{% assign last_version = minor_version %}
* **[{{ file.basename }}]({{ site.baseurl }}{{ file.path }})**
{%- else -%}
, [{{ file.basename }}]({{ site.baseurl }}{{ file.path }})
{%- endif -%}{%- endif -%}
{%- endfor- %}

## OpenAPI Specification

### Versions

<!-- TODO: make include  and call with parameter "oas" -->
{% assign html_files = site.static_files | where: "extname", ".html" | sort: "basename" | reverse %}
{% assign last_version = "" %}
{%- for file in html_files -%}
{%- assign segments = file.path | split: "/" -%}
{%- assign firstchar = file.basename | slice: 0 -%}
{%- if segments[1] == "oas" and firstchar == "v" -%}
{%- assign minor_version = file.basename | slice: 1, 3 -%}
{%- if minor_version != last_version -%}
{% assign last_version = minor_version %}
* **[{{ file.basename }}]({{ site.baseurl }}{{ file.path }})**
{%- else -%}
, [{{ file.basename }}]({{ site.baseurl }}{{ file.path }})
{%- endif -%}{%- endif -%}
{%- endfor- %}

### Non-Normative JSON Schemas

{% assign schema_files = site.static_files | where: "extname", "" | sort: "path" | reverse %}
{% assign last_version = "" %}
{%- for file in schema_files -%}
{%- assign segments = file.path | split: "/" -%}
{%- if segments[1] == "oas" and file.basename contains "lat" -%}
{%- if segments[2] != last_version -%}
{%- assign last_version = segments[2] %}
* **v{{ last_version }}**
{%- assign separator = ": " -%}
{%- endif -%}
{{ separator }}[{{ segments[3] }}]({{ file.path }})
{%- assign separator = ", " -%}
{%- endif -%}
{%- endfor -%}
