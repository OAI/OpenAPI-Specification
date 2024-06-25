---
owner: baywet
issue:
description: An IPv4 address as defined as dotted-quad by RFC2673
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-ip-addresses
---

{% capture summary %}
The `{{page.slug}}` format is an IPv4 address as defined as dotted-quad by [RFC2673](https://www.rfc-editor.org/info/rfc2673).
{% endcapture %}

{% include format-entry.md summary=summary %}
