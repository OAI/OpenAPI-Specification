---
owner: mikekistler
issue: 
description: structured fields token as defined in [RFC 8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-tokens
source_label: RFC 8941
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a structured fields token as defined in [RFC 8941].

```abnf
sf-token = ( ALPHA / "*" ) *( tchar / ":" / "/" )
```

Tokens are short textual words; their abstract model is identical to their expression in the HTTP field value serialization.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

[RFC 8941]: https://www.rfc-editor.org/rfc/rfc8941#name-tokens
