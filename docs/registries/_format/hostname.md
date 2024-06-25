---
owner: baywet
issue:
description: A host name as defined by RFC1123
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-hostnames
---

{% capture summary %}
The `{{page.slug}}` format is a host name as defined by [RFC1123](https://www.rfc-editor.org/info/rfc1123).
{% endcapture %}

{% include format-entry.md summary=summary %}
