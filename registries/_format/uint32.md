---
owner: baywet
issue: 4564
description: unsigned 32-bit integer
base_type: number
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents an unsigned 32-bit integer, with the range 0 to 4294967295.
{% endcapture %}

{% include format-entry.md summary=summary %}
