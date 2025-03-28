---
owner: handrews
issue:
description: Binary or Unknown
media_type: application/octet-stream
specification:
    name: RFC2046 §4.5.1
    url: https://www.rfc-editor.org/rfc/rfc2046.html#section-4.5.1
reference:
    section: Working with Binary Data
    anchor: working-with-binary-data
layout: default
---

{% capture summary %}
Binary data (also including `image/*`, `video/*`, `audio/*` and other binary media types) is modeled using an empty Schema Object, in accordance with JSON Schema's guidance regarding [non-JSON instances](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-non-json-instances).
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
