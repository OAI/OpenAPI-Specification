---
owner: handrews
name: Server-Sent Events
description: Event streams for SSE
media_types:
  - name: text/event-stream
    iana: false
    specifications:
    - name: WHATWG HTML §Server-Sent Events
      url: https://html.spec.whatwg.org/multipage/server-sent-events.html#parsing-an-event-stream
    - name: WHATWG HTML §IANA
      url: https://html.spec.whatwg.org/multipage/iana.html#text/event-stream
references:
  - section: Sequential Media Types
    anchor: sequential-media-types
    parentObject: Media Type Object
    parentAnchor: media-type-object
  - section: Special Considerations for Server-Sent Events
    anchor: special-considerations-for-server-sent-events
    parentObject: Media Type Object
    parentAnchor: media-type-object
  - section: Server-Sent Event Stream (Examples)
    anchor: server-sent-event-streams
    parentObject: Media Type Object
    parentAnchor: media-type-object
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
