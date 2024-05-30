---
owner:
issue:
description: A decimal floating-point number with 34 significant decimal digits
base_type: [string, number]
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a [128-bit decimal floating-point number](https://en.wikipedia.org/wiki/Decimal128_floating-point_format) as defined by IEEE 754 2008 and ISO/IEC/IEEE 60559:2011.

Representation as a JSON string is preferred as this avoids problems with recipients that parse JSON numbers into [binary64](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) memory representation.

String representation allows expressing the special values `NaN`, `-INF`, and `INF` that cannot be expressed as JSON numbers.
{% endcapture %}

{% include format-entry.md summary=summary %}
