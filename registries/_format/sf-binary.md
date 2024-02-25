---
owner: mikekistler
issue:
description: structured fields byte sequence as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-byte-sequences
source_label: RFC 8941
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a structured fields byte sequence as defined in [RFC8941].

```abnf
sf-binary = ":" *(base64) ":"
base64    = ALPHA / DIGIT / "+" / "/" / "="
```

A Byte Sequence is delimited with colons and encoded using base64 ([RFC4648], Section 4).

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-byte-sequences
[RFC4648]: https://www.rfc-editor.org/rfc/rfc4648#section-4
