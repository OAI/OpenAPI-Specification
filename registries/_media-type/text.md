---
owner: handrews
name: Text
description: Text-based media types
media_types:
  - name: text/*
    iana: https://www.iana.org/assignments/media-types/media-types.xhtml#text
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §4.1
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.1
  - name: text/plain
    iana: https://www.iana.org/assignments/media-types/text/plain
    specifications:
    - name: RFC2046 §4.1.3
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.1.3
    - name: RFC3676
      url: https://www.rfc-editor.org/rfc/rfc3676
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

Note also that unlike JSON strings, the contents of the string representing the plain text are not quoted when serializing to a document.  While a Schema Object of `{type: string, const: foo}` for JSON validates the JSON value `"foo"`, for plain text it validates `foo`, without quotes.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
