---
owner: handrews
name: Sequential JSON
description: Multiple concatenated JSON documents suitable for streaming
media_types:
  - name: application/jsonl
    registered: false
    specifications:
    - name: JSON Lines
      url: https://jsonlines.org/
  - name: application/json-seq
    registered: https://www.iana.org/assignments/media-types/application/json-seq
    specifications:
    - name: RFC7464
      url: https://www.rfc-editor.org/rfc/rfc7464
    - name: RFC8091
      url: https://www.rfc-editor.org/rfc/rfc8091
  - name: application/x-ndjson
    registered: false
    specifications:
    - name: Newline Delimited JSON
      url: https://github.com/ndjson/ndjson-spec
references:
  - section: Sequential Media Types
    anchor: sequential-media-types
    parent: Media Types
    parentAnchor: media-types
  - section: Streaming Sequential Media Types
    anchor: streaming-sequential-media-types
    parent: Media Type Object
    parentAnchor: media-type-object
  - section: Sequential JSON
    anchor: sequential-json
    parent: Media Type Examples
    parentAnchor: media-type-examples
layout: default
---

{% capture summary %}
Sequential JSON media types concatenate multiple JSON documents into one document or stream, and only vary in their choices of delimiter and the restrictions on what whitespace is allowed between JSON syntax tokens.
{% endcapture %}

{% capture remarks %}
All sequential JSON media types support the same two approaches:
* Use the `schema` field to model the whole document as if it were a JSON array
* Use `itemSchema` to model one item at a time for streaming purposes, where all items use the same schema
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
