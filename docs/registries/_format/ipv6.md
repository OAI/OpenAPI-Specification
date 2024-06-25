---
owner: baywet
issue:
description: An IPv6 address as defined by RFC4673
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-ip-addresses
---

{% capture summary %}
The `{{page.slug}}` format is an IPv6 address as defined by [RFC4291](https://www.rfc-editor.org/info/rfc4291).
{% endcapture %}

{% include format-entry.md summary=summary %}
