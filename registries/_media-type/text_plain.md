---
owner: handrews
issue:
description: Plain Text
media_type: text/plain
specification:
    name: RFC2046
    url: https://www.rfc-editor.org/rfc/rfc2046.html
reference:
    section: Encoding Object
    anchor: encoding-object
layout: default
---

{% capture summary %}
Plain text is modeled as a single string.  Note that unlike JSON strings, the contents of the string representing the plain text are not quoted when serializing to a document.  While a Schema Object of `{type: string, const: foo}` for JSON validates the JSON value `"foo"`, for plain text it validates `foo`, without quotes.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}  
