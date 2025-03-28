---
owner: handrews
description: Forms
media_types:
  - name: application/x-www-form-urlencoded
    registered: true
  - name: multipart/form-data
    registered: true
references:
  - section: Encoding the x-www-form-urlencoded Media Type
    anchor: encoding-the-x-www-form-urlencoded-media-type
  - section: Encoding By Name
    anchor: encoding-by-name
  - section: Encoding multipart Media Types
    anchor: encoding-multipart-media-types
  - section: "Appendix C: Using RFC6570-Based Serialization"
    anchor: appendix-c-using-rfc6570-based-serialization
  - section: "Appendix E: Percent-Encoding and Form Media Types"
    anchor: appendix-e-percent-encoding-and-form-media-types
layout: default
---

{% capture summary %}
Web-style form data consists of name-value pairs, with duplicate names allowed, and are structured either in a way compatible with URI form query strings or as a `multipart` document.
{% endcapture %}

{% capture remarks %}
Both form media types use the Encoding Object to map object properties from schema-ready data structures to name-value pairs, with special rules for arrays causing each array value to be treated as a separate pair with the same name.
While the ordering of pairs is significant in these formats, the OAS does not (as of v3.2) provide a way to control such ordering.

As of OAS v3.2, endpoint URL query strings can be modeled as a media type using `in: querystring` in the Parameter Object.  The query string can also be modeled using multiple `in: query` Parameter Objects through mechanisms similar to the Encoding Object.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
