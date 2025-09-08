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
* **[v2.0]({{ site.baseurl }}/oas/v2.0.html)**

### Overlay Specification

{% include specification-version-list.md specification="overlay" %}

## Registries

The [Registry Page](./registry/index.html) includes documentation as well as API and RSS access for all registries

Registry shortcuts:
{% for registry in site.collections %}{% unless registry.hidden %}
* <a href="registry/{{ registry.slug }}">{{ registry.name }}</a>{% endunless %}{% endfor %}

## Non-Normative JSON Schemas

_Note that while schemas can catch many errors, they are not guaranteed to catch all specification violations.  In the event of a disagreement between the schemas and the corresponding specificaton text, the specification text is presumed to be correct._

All schemas for a given minor release (e.g. OAS 3.1) apply to all patch releases within that minor release (e.g. 3.1.0, 3.1.1, 3.1.2, etc.).  The dates are purely a way to distinguish which schema bug fixes are present, and are not intended to be correlated with patch release publication dates.  The latest date within a minor release is always the most correct schema for all patch releases.

### Arazzo Schemas

{% include schema-iteration-list.md specification="arazzo" %}

### OpenAPI Specification Schemas

Note that the OAS 3.1 `schema/YYYY-MM-DD` schema does _not_ validate the Schema Object, as it makes no assumptions about the JSON Schema dialect in use.  The OAS 3.1 `schema-base/YYYY-MM-DD` schema _does_ validate the Schema Object, and requires that if `jsonSchemaDialect` or `$schema` are present, that they use the appropriate `dialect/YYYY-MM-DD`.  The name `schema-base` comes from the JSON Schema dialect including the OAS extensions being referred to as the "base dialect" in the specification.

See [issue #4147](https://github.com/OAI/OpenAPI-Specification/issues/4147) for discussion of other possible JSON Schema dialect options, [issue #4152](https://github.com/OAI/OpenAPI-Specification/issues/4152) for programmatic access to the latest schemas, and [issue #4141](https://github.com/OAI/OpenAPI-Specification/issues/4141) for discussions on possibly providing linting schemas that could catch likely problems that do not directly violate the specification.

{% include schema-iteration-list.md specification="oas" %}

### Overlay Specification Schemas

{% include schema-iteration-list.md specification="overlay" %}
