---
owner: handrews
issue:
description: SSE Events
specification:
    name: WHATWG HTML
    url: https://html.spec.whatwg.org/multipage/iana.html#text/event-stream
media_type: text/event-stream
media_type_unregistered: true
reference:
    section: Server-Sent Event Streams
    anchor: server-sent-event-streams
versions: "3.2+"
layout: default
---

{% capture summary %}
Event streams build on the sequential media type support used by sequential JSON media types by further defining a mapping of the individual event format into the Schema Object's data model.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
