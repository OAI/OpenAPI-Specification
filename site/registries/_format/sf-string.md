---
owner: mikekistler
issue:
description: structured fields string as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-strings
source_label: RFC 8941
base_type: string
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a structured fields string as defined in [RFC8941].

```abnf
sf-string = DQUOTE *chr DQUOTE
chr       = unescaped / escaped
unescaped = %x20-21 / %x23-5B / %x5D-7E
escaped   = "\" ( DQUOTE / "\" )
```

Strings are zero or more printable ASCII [RFC0020] characters (i.e., the range %x20 to %x7E).
Note that this excludes tabs, newlines, carriage returns, etc.

Strings are delimited with double quotes, using a backslash ("\") to escape double quotes and backslashes.

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.
{% endcapture %}

{% include format-entry.md summary=summary %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-strings
