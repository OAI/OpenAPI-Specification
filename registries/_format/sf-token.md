---
owner: mikekistler
issue:
description: structured fields token as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-tokens
source_label: RFC 8941
base_type: string
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a structured fields token as defined in [RFC8941].

```abnf
sf-token = ( ALPHA / "*" ) *( tchar / ":" / "/" )
```

Tokens are short textual words; their abstract model is identical to their expression in the HTTP field value serialization.

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.
{% endcapture %}

{% include format-entry.md summary=summary %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-tokens
