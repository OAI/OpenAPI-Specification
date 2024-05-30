---
owner: DarrelMiller
issue: 
description: base64 encoded data as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4)
base_type: string
layout: default
deprecated_note: '3.1'
remarks: "In OpenAPI 3.1, instead use [`contentEncoding: base64`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding), optionally alongside [contentMediaType](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentmediatype)."
source: https://spec.openapis.org/oas/v3.0.3.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents any sequence of octets encoded as a base64 string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).
{% endcapture %}

{% include format-entry.md summary=summary %}
