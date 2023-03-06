---
owner: baywet
issue:
description: a string that hints to UIs to obscure input.
base_type: string
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a string that hints to UIs to obscure input.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}