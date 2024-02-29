---
owner: mikekistler
issue:
description: structured fields integer as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-integers
source_label: RFC 8941
base_type: integer, number
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a structured fields integer as defined in [RFC8941].

```abnf
sf-integer = ["-"] 1*15DIGIT
```

Integers have a range of -999,999,999,999,999 to 999,999,999,999,999 inclusive (i.e., up to fifteen digits, signed),
for IEEE 754 compatibility [IEEE754].

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-integers
[IEEE754]: https://ieeexplore.ieee.org/document/8766229