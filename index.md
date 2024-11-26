---
title: Home
description: HTML Spec. and extensible registry
layout: default
---

# OpenAPI Initiative Publications

This site contains the authoritative HTML renderings of the OpenAPI Initiative's [specifications](#specifications) and [extension registries](#registries), as well as official (but non-[normative](https://en.wikipedia.org/wiki/Normativity#Standards_documents)) [schemas](#non-normative-json-schemas) for those specifications that provide them.

Please see the [Learn OpenAPI](https://learn.openapis.org) site for additional documentation and [examples](https://learn.openapis.org/examples/), and the [OpenAPI Tooling](https://tools.openapis.org/) site for community-provided lists of tools implementing the specifications.

## Specifications

### Arazzo Specification

{% include specification-version-list.md specification="arazzo" %}

### OpenAPI Specification

{% include specification-version-list.md specification="oas" %}

### Overlay Specification

{% include specification-version-list.md specification="overlay" %}

## Registries

The [Registry Page](./registry/index.html) includes documentation as well as API and RSS access for all registries

Registry shortcuts:
{% for registry in site.collections %}{% unless registry.hidden %}
* <a href="registry/{{ registry.slug }}">{{ registry.name }}</a>{% endunless %}{% endfor %}

## Non-Normative JSON Schemas

_Note that while schemas can catch many errors, they are not guaranteed to catch all specification violations.  In the event of a disagreement between the schemas and the corresponding specificaton text, the specification text is presumed to be correct._

### Arazzo Schemas

_TBD_

### OpenAPI Specification Schemas

{% assign schema_files = site.static_files | where: "extname", "" | sort: "path" | reverse %}
{% assign last_version = "" %}
{% assign last_kind = "" %}
{%- for file in schema_files -%}
{%- assign segments = file.path | split: "/" -%}
{%- if segments[1] == "oas" -%}
{%- if segments[2] != last_version -%}
{%- assign last_version = segments[2] %}
* **v{{ last_version }}**
{%- endif -%}
{%- if segments[3] != last_kind -%}
{%- if segments[4] == "base" -%}
{%- continue -%}
{%- endif -%}
{%- assign last_kind = segments[3] %}
  * view [**{{ last_kind }}/{{ segments[4] }}**]({{ site.baseurl }}/oas/{{ last_version }}/{{ last_kind }}/{{ segments[4] }}.html)  
    download iteration
{%- assign separator = ": " -%}
{%- endif -%}
{{ separator }} [{{ file.basename | replace: "-", "&#8209;" }}]({{ site.baseurl }}{{ file.path }})
{%- assign separator = ", " -%}
{%- endif -%}
{%- endfor %}

### Overlay Specification Schemas

_TBD_
