---
owner: baywet
issue: 889
description: A fixed point decimal number of unspecified precision and range
base_type: string, number
layout: default
remarks: This format is used in a variety of conflicting ways and is not interoperable.
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a fixed point decimal number of unspecified precision and range.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.issue }}
{% endif %}
