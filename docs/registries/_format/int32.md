---
owner: DarrelMiller
issue: 
description: signed 32-bit integer
base_type: number
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents a signed 32-bit integer, with the range −2,147,483,648 through 2,147,483,647. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).
{% endcapture %}

{% include format-entry.md summary=summary %}
