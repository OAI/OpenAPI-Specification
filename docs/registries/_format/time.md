---
owner: baywet
issue: 
description: time as defined by full-time - RFC3339
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-dates-times-and-duration
---

{% capture summary %}
The `{{page.slug}}` format represents a time as defined by full-time - [RFC3339](https://www.rfc-editor.org/rfc/rfc3339.html#section-5.6).
{% endcapture %}

{% include format-entry.md summary=summary %}
