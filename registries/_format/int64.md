---
owner: DarrelMiller
issue: 
description: signed 64-bit integer
base_type: number
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a signed 64-bit integer, with the range -9223372036854775808 through 9223372036854775807. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}