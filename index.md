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

{% include specification-version-list.md specification="arazzo" %}

## OpenAPI Specification

### Versions

{% include specification-version-list.md specification="oas" %}

### Non-Normative JSON Schemas

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
{%- assign last_kind = segments[3] %}
  * view [**{{ last_kind }}/{{ segments[4] }}**]({{ site.baseurl }}/oas/{{ last_version }}/{{ last_kind }}/{{ segments[4] }}.html)  
    download iteration
{%- assign separator = ": " -%}
{%- endif -%}
{{ separator }} [{{ file.basename | replace: "-", "&#8209;" }}]({{ site.baseurl }}{{ file.path }})
{%- assign separator = ", " -%}
{%- endif -%}
{%- endfor %}

## Overlay Specification

### Versions

{% include specification-version-list.md specification="overlay" %}
