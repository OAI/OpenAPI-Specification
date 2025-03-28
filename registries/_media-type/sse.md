---
owner: handrews
description: Server-Sent Events
media_types:
  - name: text/event-stream
    registered: false
references:
  - section: Sequential Media Types
    anchor: sequential-media-types
  - section: Special Considerations for `text/event-stream` Content
    anchor: special-considerations-for-text-event-stream-conten
  - section: Server-Sent Event Streams (example)
    anchor: server-sent-event-streams
layout: default
---

{% capture summary %}
Server-Sent Events use the `text/event-stream` media type to stream events.
Each event is modeled as if it were a JSON object with fields and types
as given in the SSE specification, ignoring comments (fields with an empty string for the name) and any variations in serialization that represent the same event content.
{% endcapture %}

{% capture remarks %}
A complete event stream can be modeled as if it were a JSON array of such objects in the `schema` field, but the more common use case is to use the `itemSchema` field to apply the same schema to each event as it is streamed.

Note that application-level conventions regarding event usage (e.g. "sentinel events") that are not part of the media type specification are not modeled, as the OAS does not currently (as of OAS v3.2) work with semantics above the media type level.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
