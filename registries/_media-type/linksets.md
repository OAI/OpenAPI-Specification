---
owner: handrews
name: Link Sets
description: Sets of RFC8288 Web Links
media_types:
  - name: application/linkset
    iana: https://www.iana.org/assignments/media-types/application/linkset
    specifications:
    - name: RFC9264
      url: https://www.rfc-editor.org/rfc/rfc9264
    - name: RFC8288
      url: https://www.rfc-editor.org/rfc/rfc8288
  - name: application/linkset+json
    iana: https://www.iana.org/assignments/media-types/application/linkset+json
    specifications:
    - name: RFC9264
      url: https://www.rfc-editor.org/rfc/rfc9264
references:
  - section: Modeling Link Headers
    anchor: modeling-link-headers
    parent: Header Object
    parentAnchor: header-object
layout: default
---

{% capture summary %}
The JSON form for linksets is used to define the schema-ready data form for modeling the HTTP `Link` header, with the rules for converting from that form to `application/linkset` and then to the single-line HTTP field syntax defining the serialization process for that data.
{% endcapture %}

{% capture remarks %}
In addition to modeling the `Link` header, these two media types are supported anywhere else a media type document is allowed.
In all cases, the `application/linkset+json` data model is used with the [Schema Object](https://spec.openapis.org/oas/latest.html#schema-object), with the choice of the parent key for the [Media Type Object](https://spec.openapis.org/oas/latest.html#media-type-object) (with or without `+json`) determining only the serialization.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
