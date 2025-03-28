---
owner: handrews
description: Binary
media_types:
  - name: application/octet-stream
    registered: true
  - name: audio/*
    registered: true
  - name: image/*
    registered: true
  - name: video/*
    registered: true
default_for: binary
references:
  - section: Working with Binary Data
    anchor: working-with-binary-data
  - section: Binary Streams
    anchor: binary-streams
layout: default
---

{% capture summary %}
As of OAS v3.1, binary data is modeled using an empty Schema Object, in accordance with JSON Schema's guidance regarding [non-JSON instances](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-non-json-instances).
{% endcapture %}

{% capture remarks %}
As specified in the linked reference section ("Working with Binary Data"), modeling binary data that has been encoded into a string is handled differently from raw binary data, with two variations: With an Encoding Object or with the Schema Object's `contentMediaType` and `contentEncoding`.

In OAS v3.0, raw binary content was modeled as `type: string, format: binary`, while `type: string, format: byte` was used for base64-encoded binary.  This was dropped in favor of JSON Schema draft 2020-12's support because it did not allow specifying the media type along with the binary encoding.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
