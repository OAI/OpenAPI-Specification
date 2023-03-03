---
owner: baywet
issue:
description: A fixed or floating point decimal number as defined by ISO/IEC 9075-2 2016 12 15
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a fixed or floating point decimal number as defined by ISO/IEC 9075-2 2016 12 15.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}