---
owner: mikekistler
issue: 
description: an integer that can be stored in an IEEE 754 double-precision number without loss of precision
base_type: integer
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents an integer that can be stored in an IEEE 754 double-precision number without loss of precision. The range of values is -(2<sup>53</sup>)+1 to (2<sup>53</sup>)-1.

This format is useful for systems that need to support languages (such as JavaScript) that store all numeric values as IEEE 754 double-precision numbers.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
