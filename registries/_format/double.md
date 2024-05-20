---
owner: DarrelMiller
issue: 
description: double precision floating point number
base_type: number
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents a double precision (64bit) floating point number as defined by [IEEE Std 754-2019](https://ieeexplore.ieee.org/document/8766229). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).
{% endcapture %}

{% include format-entry.md summary=summary %}
