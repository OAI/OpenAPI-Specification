---
owner: handrews
description: XML
media_types:
  - name: application/xml
    registered: true
references:
  - section: XML Object
    anchor: xml-object
  - section: XML Modeling
    anchor: xml-modeling
layout: default
---

{% capture summary %}
XML is modeled using the OAS's `xml` extension keyword for JSON Schema, which has an XML Object as its value.
{% endcapture %}

{% capture remarks %}
As of OAS v3.2, the XML Object uses the `nodeType` field to determine the type of [interface node](https://dom.spec.whatwg.org/#interface-node) to which a given Schema Object corresponds: `element`, `attribute`, `text`, `cdata`, or `none`.  If `nodeType` is set to `none`, a Schema Object does not correspond to anything and the nodes corresponding to its immediate subschemas are placed directly under the node of its parent schema.

Certain behaviors are retained for compatibility with OAS v3.1, including implicit text nodes for elements with a primitive type, and somewhat complex rules for the default value of `nodeType`.
In OAS v3.1 and earlier, only elements, their implicit primitive-type text nodes, and attributes were supported, with the now-deprecated `attribute` and `wrapped` flags as controls.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
