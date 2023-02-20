---
owner: baywet
issue:
description: A Uniform Resource Identifier as defined in RFC3986
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a Uniform Resource Identifier as defined in RFC3986.

[Source](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-resource-identifiers).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}