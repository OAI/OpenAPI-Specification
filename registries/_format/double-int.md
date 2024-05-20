---
owner: mikekistler
issue: 
description: an integer that can be stored in an IEEE 754 double-precision number without loss of precision
base_type: integer
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents an integer that can be stored in an IEEE 754 double-precision number without loss of precision. The range of values is -(2<sup>53</sup>)+1 to (2<sup>53</sup>)-1.

This format is useful for systems that need to support languages (such as JavaScript) that store all numeric values as IEEE 754 double-precision numbers.
{% endcapture %}

{% include format-entry.md summary=summary %}
