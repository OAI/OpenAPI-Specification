---
owner: baywet
issue: 4564
description: unsigned 64-bit integer
base_type: [number, string]
layout: default
source: https://spec.openapis.org/oas/latest.html#data-types
source_label: OAS
---

{% capture summary %}
The `{{page.slug}}` format represents an unsigned 64-bit integer, with the range 0 to 18446744073709551615.

Representation as a JSON string is recommended for values outside the 53-bit range (0 through 9007199254740991) as this avoids problems with recipients that parse JSON numbers into [binary64](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) memory representation.
{% endcapture %}

{% include format-entry.md summary=summary %}
