---
owner: handrews
description: Text
media_types:
  - name: text/*
    registered: true
  - name: text/plain
    registered: true
default_for: text-based (not just <tt>text/*</tt>)
references:
  - section: Parameter Object
    anchor: parameter-object
  - section: Header Object
    anchor: header-object
  - section: Encoding Object
    anchor: encoding-object
  - section: "Appendix D: Serializing Headers and Cookies"
    anchor: appendix-d-serializing-headers-and-cookies
layout: default
---

{% capture summary %}
A plain text document is modeled as a single string.
{% endcapture %}

{% capture remarks %}
In addition to normal use as HTTP message contents or `multipart` parts, `text/plain` is useful with the `content` field of the Parameter Object or Header Object to work around the automatic percent-encoding triggered by the use of the `schema` field.
In particular, cookies with multiple values are not well-served by `style: form` and are better modeled as text.

Note that unlike JSON strings, the contents of the string representing the plain text are not quoted when serializing to a document.  While a Schema Object of `{type: string, const: foo}` for JSON validates the JSON value `"foo"`, for plain text it validates `foo`, without quotes.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
