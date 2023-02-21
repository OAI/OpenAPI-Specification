---
owner: baywet
issue:
description: A JSON string representation of a relative JSON Pointer as defined in draft RFC 01
base_type: string
layout: default
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-json-pointers
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a JSON string representation of a relative JSON Pointer as defined in draft RFC 01.

[Relative JSON pointers draft RFC 01](https://datatracker.ietf.org/doc/html/draft-handrews-relative-json-pointer-01).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

#{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

#{{ page.remarks }}
{% endif %}
