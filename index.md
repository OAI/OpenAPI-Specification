---
title: Home
nav_order: 1
description: HTML Spec. and extensible registry
layout: default
---

# OpenAPI Initiative Publications

This site contains the authoritative HTML renderings of the OpenAPI Initiative's [specifications](#specifications) and [extension registries](#registries).

Please see the [Learn OpenAPI](https://learn.openapis.org) site for additional documentation and [examples](https://learn.openapis.org/examples/), and the [OpenAPI Tooling](https://tools.openapis.org/) site for community-provided lists of tools implementing the specifications.

## Specifications

Each specification page lists all published specification versions and official (but non-[normative](https://en.wikipedia.org/wiki/Normativity#Standards_documents)) schema iterations.

* [Arazzo Specification](./arazzo/)
* [OpenAPI Specification](./oas/)
* [Overlay Specification](./overlay/)

## Registries

The [Registry Page](./registry/index.html) includes documentation as well as API and RSS access for all registries

Registry shortcuts:
{% for registry in site.collections %}{% unless registry.hidden %}
* <a href="registry/{{ registry.slug }}">{{ registry.name }}</a>{% endunless %}{% endfor %}
