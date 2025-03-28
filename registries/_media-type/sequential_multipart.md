---
owner: handrews
description: Sequential Multipart
media_types:
  - name: multipart/*
    registered: true
  - name: multipart/mixed
    registered: true
  - name: multipart/alternative
    registered: true
  - name: multipart/related
    registered: true
  - name: multipart/byteranges
    registered: true
references:
  - section: Encoding By Position
    anchor: encoding-by-position
  - section: Encoding multipart Media Types
    anchor: encoding-multipart-media-types
layout: default
---

{% capture summary %}
All `multipart` media types are based on a common syntax defined by `multipart/mixed`, and any `multipart` subtype not explicitly registered is expected to be usable by treating it as `multipart/mixed` in accordance with [RFC2046 §5.1.3](https://www.rfc-editor.org/rfc/rfc2046.html#section-5.1.3).
{% endcapture %}

{% capture remarks %}
All known `multipart` subtypes except `multipart/form-data` are ordered, without any names for the parts.
They are either modeled as arrays using `schema`, or a uniform schema can be applied to each part for streaming purposes using `itemSchema` (this is particularly relevant to `multipart/byteranges`).
In both cases, `itemEncoding` can used to manage the media type and headers of each, while if `schema` is used, `prefixEncoding` is also available for describing some fixed number of initial parts in a specific order.

The `boundary` required parameter is common to all `multipart` subtypes, but does not need to be described explicitly in OpenAPI Descriptions as it is typically generated and used automatically, with a value that is not predictable in advance.

Note that OAS v3.0 claimed support for `multipart/mixed`, but did not define a mechanism for doing so for reasons that are no longer known.  This claim of support was removed in OAS v3.0.4 and OAS v3.1.1, but can be seen in older patch releases of the 3.0 and 3.1 lines.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}

