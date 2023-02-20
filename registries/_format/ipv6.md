---
owner: baywet
issue:
description: An IPv6 address as defined by RFC4673
base_type: string
layout: default
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-ip-addresses
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is an IPv6 address as defined by RFC4673.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}