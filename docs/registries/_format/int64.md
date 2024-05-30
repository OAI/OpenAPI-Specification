---
owner: DarrelMiller
issue: 
description: signed 64-bit integer
base_type: [number, string]
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents a signed 64-bit integer, with the range -9223372036854775808 through 9223372036854775807. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

Representation as a JSON string is recommended for values outside the 53-bit range (-9007199254740991 through 9007199254740991) as this avoids problems with recipients that parse JSON numbers into [binary64](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) memory representation.
{% endcapture %}

{% include format-entry.md summary=summary %}
