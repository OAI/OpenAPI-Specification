---
owner: MikeRalphson
issue: 845
description: signed 8-bit integer
base_type: number
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents a signed 8-bit integer, with the range -128 to 127.
{% endcapture %}

{% include format-entry.md summary=summary %}
