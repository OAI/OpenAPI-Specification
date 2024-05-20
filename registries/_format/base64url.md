---
owner: baywet
issue:
description: Binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5)
base_type: string
layout: default
deprecated_note: '3.1'
remarks: "When using OpenAPI 3.1 it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

{% capture summary %}
The `{{page.slug}}` format is binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5).
{% endcapture %}

{% include format-entry.md summary=summary %}
