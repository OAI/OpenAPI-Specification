---
owner: mikekistler
issue: 
description: date and time as defined by HTTP-date - [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1)
base_type: string
layout: default
---

{% capture summary %}
The `{{page.slug}}` format represents a date and time as defined by HTTP-date - [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1).

Example: "Sun, 06 Nov 1994 08:49:37 GMT"

This is the format for dates passed in HTTP headers.
{% endcapture %}

{% include format-entry.md summary=summary %}
