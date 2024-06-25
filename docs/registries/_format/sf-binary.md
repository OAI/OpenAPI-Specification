---
owner: mikekistler
issue:
description: structured fields byte sequence as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-byte-sequences
source_label: RFC 8941
base_type: string
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a structured fields byte sequence as defined in [RFC8941].

```abnf
sf-binary = ":" *(base64) ":"
base64    = ALPHA / DIGIT / "+" / "/" / "="
```

A Byte Sequence is delimited with colons and encoded using base64 ([RFC4648], Section 4).

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.
{% endcapture %}

{% include format-entry.md summary=summary %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-byte-sequences
[RFC4648]: https://www.rfc-editor.org/rfc/rfc4648#section-4
