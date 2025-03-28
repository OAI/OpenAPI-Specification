---
owner: handrews
description: Sequential JSON
media_types:
  - name: application/jsonl
    registered: false
  - name: application/x-ndjson
    registered: false
  - name: application/json-seq
    registered: true
references:
  - section: Sequential Media Types
    anchor: sequential-media-types
  - section: Streaming Sequential Media Types
    anchor: streaming-sequential-media-types
  - section: Sequential JSON (examples)
    anchor: sequential-json
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
