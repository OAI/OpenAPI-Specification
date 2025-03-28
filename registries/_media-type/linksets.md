---
owner: handrews
description: Link Sets
media_types:
  - name: application/linkset
    registered: true
  - name: application/linkset+json
    registered: true
references:
  - section: Modeling Link Headers
    anchor: modeling-link-headers
layout: default
---

{% capture summary %}
The JSON form for linksets is used to define the schema-ready data form for modeling the HTTP `Link` header, with the rules for converting from that form to `application/linkset` and then to the single-line HTTP field syntax defining the serialization process for that data.
{% endcapture %}

{% capture remarks %}
In addition to modeling the `Link` header, these two media types are supported anywhere else a media type document is allowed.
In all cases, the `application/linkset+json` data model is used with the Schema Object, with the choice of the parent key for the Media Type Object (with or without `+json`) determining only the serialization.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
