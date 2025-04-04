---
owner: handrews
issue:
description: XML
media_type: application/xml
specification:
    name: RFC7303
    url: https://www.rfc-editor.org/rfc/rfc7303.html
reference:
    section: XML Object
    anchor: xml-object
layout: default
---

{% capture summary %}
XML is modeled using the OAS's `xml` extension keyword for JSON Schema, which has an XML Object as its value.  This allows fine-grained control over how each part of the JSON Schema description maps to XML elements or attributes.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
