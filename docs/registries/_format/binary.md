---
owner: DarrelMiller
issue: 
description: any sequence of octets
base_type: string
layout: default
deprecated_note: '3.1'
remarks: "In OpenAPI 3.1, instead set the media type appropriately and do not use a schema property. Note that only complete HTTP message bodies or complete parts in a multipart media type can accommodate binary data. JSON strings and URL path components cannot."
source: https://spec.openapis.org/oas/v3.0.3.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents any sequence of octets. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).
{% endcapture %}

{% include format-entry.md summary=summary %}
