---
owner: baywet
issue: 889
description: A fixed point decimal number
base_type: string
layout: default
remarks: Potential loss of precision when used with type number. Not specific enough about the size of the integral and fraction parts without the use of extensions.
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a fixed point decimal number.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

When the decimal format is used in combination with the number type, unintentional loss of precision can happen during serialization as most JSON serializers will serialize the value **1.10** to **1.1**.

This format is not prescriptive enough to enable interoperability and its usage is discouraged.

{% endif %}