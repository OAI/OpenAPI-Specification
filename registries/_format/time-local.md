---
owner: ya7010
issue: 4759
description: RFC3339 time without the timezone component
base_type: string
layout: default
source_label: RFC 3339
source: https://datatracker.ietf.org/doc/html/rfc3339#section-5.6
---

{% capture summary %}
The `{{page.slug}}` format represents a RFC3339 time without timezone.
{% endcapture %}

{% include format-entry.md summary=summary %}
