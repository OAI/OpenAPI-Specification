---
owner:
issue:
description: A decimal floating-point number with 34 significant decimal digits
base_type: string, number
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a [128-bit decimal floating-point number](https://en.wikipedia.org/wiki/Decimal128_floating-point_format) as defined by IEEE 754 2008 and ISO/IEC/IEEE 60559:2011.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.issue }}
{% endif %}
