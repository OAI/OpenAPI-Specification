---
owner: ya7010
issue: 4759
description: RFC3339 date-time without the timezone component
base_type: string
layout: default
source_label: TOML
source: https://toml.io/en/v1.0.0#local-date-time
---

{% capture summary %}
The `{{page.slug}}` format represents a RFC3339 date-time without timezone.
{% endcapture %}

{% include format-entry.md summary=summary %}
