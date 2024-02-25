---
owner: mikekistler
issue:
description: structured fields decimal as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-decimals
source_label: RFC 8941
base_type: number
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a structured fields decimal as defined in [RFC8941].

```abnf
sf-decimal  = ["-"] 1*12DIGIT "." 1*3DIGIT
```

Decimals are numbers with an integer and a fractional component.
The integer component has at most 12 digits; the fractional component has at most three digits.

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-decimals
