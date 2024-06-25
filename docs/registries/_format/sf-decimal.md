---
owner: mikekistler
issue:
description: structured fields decimal as defined in [RFC8941]
source: https://www.rfc-editor.org/rfc/rfc8941#name-decimals
source_label: RFC 8941
base_type: number
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a structured fields decimal as defined in [RFC8941].

```abnf
sf-decimal  = ["-"] 1*12DIGIT "." 1*3DIGIT
```

Decimals are numbers with an integer and a fractional component.
The integer component has at most 12 digits; the fractional component has at most three digits.

This format is appropriate for a header value that must conform to the {{page.slug}} structured field definition.
{% endcapture %}

{% include format-entry.md summary=summary %}

[RFC8941]: https://www.rfc-editor.org/rfc/rfc8941#name-decimals
