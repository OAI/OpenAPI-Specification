---
owner: DarrelMiller
issue: 
description: date and time as defined by date-time - [RFC3339](https://www.rfc-editor.org/rfc/rfc3339#section-5.6)
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-dates-times-and-duration
---

{% capture summary %}
The `{{page.slug}}` format represents a date and time as defined by date-time - [RFC3339](https://www.rfc-editor.org/rfc/rfc3339#section-5.6). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).
{% endcapture %}

{% include format-entry.md summary=summary %}
