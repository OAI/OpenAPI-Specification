---
owner: handrews
issue:
description: Multipart Form Data
media_type: multipart/form-data
specification:
    name: RFC7578
    url: https://www.rfc-editor.org/rfc/rfc7578.html
reference:
    section: Encoding multipart Media Types
    anchor: encoding-multipart-media-types
layout: default
---

{% capture summary %}
Multipart forms use the Encoding Object to control how the JSON-like structure defined by the Schema Object maps to each part.  Multipart media types that do not use named parts cannot be handled with this technique, although it may be possible to use `Content-Disposition: form` with a name parameter with such media types, but as no specification recommends this, support is unlikely to be dependable.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
