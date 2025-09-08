---
owner: handrews
name: XML
description: Extensible markup language
media_types:
  - name: application/xml
    iana: https://www.iana.org/assignments/media-types/application/xml
    specifications:
    - name: RFC7303
      url: https://www.rfc-editor.org/rfc/rfc7303
    - name: XML 1.0
      url: https://www.w3.org/TR/xml/
      note: commonly used
    - name: XML 1.1
      url: https://www.w3.org/TR/xml11/
      note: rarely used
    - name: WHATWG DOM
      url: https://dom.spec.whatwg.org/
references:
  - section: XML Object
    anchor: xml-object
  - section: XML Modeling
    anchor: xml-modeling
    parentObject: Schema Object
    parentAnchor: schema-object
layout: default
---

{% capture summary %}
XML is modeled using the OAS's `xml` extension keyword for JSON Schema, which has an XML Object as its value.
{% endcapture %}

{% capture remarks %}
As of OAS v3.2, the [XML Object](https://spec.openapis.org/oas/latest.html#xml-object) uses the `nodeType` field to determine the type of [interface node](https://dom.spec.whatwg.org/#interface-node) to which a given Schema Object corresponds: `element`, `attribute`, `text`, `cdata`, or `none`.  If `nodeType` is set to `none`, a Schema Object does not correspond to anything and the nodes corresponding to its immediate subschemas are placed directly under the node of its parent schema.

Certain behaviors are retained for compatibility with OAS v3.1, including implicit text nodes for elements with a primitive type, and somewhat complex rules for the default value of `nodeType`.
In OAS v3.1 and earlier, only elements, their implicit primitive-type text nodes, and attributes were supported, with the now-deprecated `attribute` and `wrapped` flags as controls.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
