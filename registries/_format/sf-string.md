---
owner: mikekistler
issue: 
description: structured fields string as defined by `sf-string` in [RFC 8941]
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a structured fields string as defined by `sf-string` in [RFC 8941].

```abnf
sf-string = DQUOTE *chr DQUOTE
chr       = unescaped / escaped
unescaped = %x20-21 / %x23-5B / %x5D-7E
escaped   = "\" ( DQUOTE / "\" )
```

Strings are zero or more printable ASCII [RFC0020] characters (i.e., the range %x20 to %x7E).
Note that this excludes tabs, newlines, carriage returns, etc.

Strings are delimited with double quotes, using a backslash ("\") to escape double quotes and backslashes.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

[RFC 8941]: https://www.rfc-editor.org/rfc/rfc8941#name-strings
