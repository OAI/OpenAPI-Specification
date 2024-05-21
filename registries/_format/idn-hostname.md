---
owner: baywet
issue:
description: An internationalized host name as defined by RFC5890
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-hostnames
---

{% capture summary %}
The `{{page.slug}}` format is an internationalized host name as defined by [RFC5890](https://www.rfc-editor.org/rfc/rfc5890.html).
{% endcapture %}

{% include format-entry.md summary=summary %}
