---
owner: handrews
name: Sequential Multipart
description: Multipart subtypes with unnamed parts
media_types:
  - name: multipart/*
    iana: https://www.iana.org/assignments/media-types/media-types.xhtml#multipart
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §5.1
      url: https://www.rfc-editor.org/rfc/rfc2046#section-5.1
  - name: multipart/mixed
    iana: https://www.iana.org/assignments/media-types/multipart/mixed
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §5.1.3
      url: https://www.rfc-editor.org/rfc/rfc2046#section-5.1.3
  - name: multipart/alternative
    iana: https://www.iana.org/assignments/media-types/multipart/alternative
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §5.1.4
      url: https://www.rfc-editor.org/rfc/rfc2046#section-5.1.4
  - name: multipart/related
    iana: https://www.iana.org/assignments/media-types/multipart/related
    specifications:
    - name: RFC2389
      url: https://www.rfc-editor.org/rfc/rfc2389
    - name: RFC2557
      url: https://www.rfc-editor.org/rfc/rfc2557
  - name: multipart/byteranges
    iana: https://www.iana.org/assignments/media-types/multipart/byteranges
    specifications:
    - name: RFC9110 §14.6
      url: https://www.rfc-editor.org/rfc/rfc9110#name-media-type-multipart-bytera
references:
  - section: Encoding By Position
    anchor: encoding-by-position
    parentObject: Media Type Object
    parentAnchor: media-type-object
  - section: Encoding `multipart` Media Types
    anchor: encoding-multipart-media-types
    parentObject: Encoding Object
    parentAnchor: encoding-object
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

Note that OAS v3.0 claimed support for `multipart/mixed`, but behaviour was undefined.  The claim of support was removed in OAS v3.0.4 and OAS v3.1.1, but can be seen in older patch releases of the 3.0 and 3.1 lines.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}

