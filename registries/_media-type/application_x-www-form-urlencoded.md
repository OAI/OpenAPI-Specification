---
owner: handrews
issue:
description: URL-Encoded Forms
media_type: application/x-www-form-urlencoded
specification:
    name: WHATWG URL
    url: https://url.spec.whatwg.org/#application/x-www-form-urlencoded
reference:
    section: Support for x-www-form-urlencoded Request Bodies
    anchor: support-for-x-www-form-urlencoded-request-bodies
layout: default
---

{% capture summary %}
URL-Encoded forms use the Encoding Object to control how the JSON-like structure defined by the Schema Object maps to the URL query string-like format.  Note that this is separate from how URL query parameters are managed, which is done with the Parameter Object.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
