---
owner: DarrelMiller
issue: 
description: single precision floating point number
base_type: number
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a single precision (32bit) floating point number as defined by [IEEE Std 754-2019](https://ieeexplore.ieee.org/document/8766229). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}