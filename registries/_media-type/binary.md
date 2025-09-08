---
owner: handrews
name: Binary
description: Non-text-based media types
media_types:
  - name: application/octet-stream
    iana: https://www.iana.org/assignments/media-types/application/octet-stream
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §4.5.1
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.5.1
  - name: audio/*
    iana: https://www.iana.org/assignments/media-types/media-types.xhtml#audio
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §4.2
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.3
  - name: image/*
    iana: https://www.iana.org/assignments/media-types/media-types.xhtml#image
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §4.2
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.2
  - name: video/*
    iana: https://www.iana.org/assignments/media-types/media-types.xhtml#video
    specifications:
    - name: RFC2045
      url: https://www.rfc-editor.org/rfc/rfc2045
    - name: RFC2046 §4.4
      url: https://www.rfc-editor.org/rfc/rfc2046#section-4.4
default_for: binary
references:
  - section: Working with Binary Data
    anchor: working-with-binary-data
    parentObject: Schema Object
    parentAnchor: schema-object
  - section: Binary Streams
    anchor: binary-streams
    parentObject: Media Type Object
    parentAnchor: media-type-object
  - section: "`Content-Transfer-Encoding` and `contentEncoding`"
    anchor: content-transfer-encoding-and-contentencoding
    parentObject: Encoding Object
    parentAnchor: encoding-object
layout: default
---

{% capture summary %}
As of OAS v3.1, binary data is modeled using an empty Schema Object, in accordance with JSON Schema's guidance regarding [non-JSON instances](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-non-json-instances).
{% endcapture %}

{% capture remarks %}
As specified in [Working with Binary Data](https://spec.openapis.org/oas/latest.html#working-with-binary-data), modeling binary data that has been encoded into a string is handled differently from raw binary data, with two variations: with the [Schema Object](https://spec.openapis.org/oas/latest.html#schema-object)'s `contentMediaType` and `contentEncoding`, or with a `Content-Transfer-Encoding` header in the [Encoding Object](https://spec.openapis.org/oas/latest.html#encoding-object) (for media types that use Encoding Objects).  Consult the specification for how these two mechanisms interact when they both apply.

In OAS v3.0, raw binary content was modeled as `type: string, format: binary`, while `type: string, format: byte` was used for base64-encoded binary.  This was dropped in favor of JSON Schema draft 2020-12's support because it did not allow specifying the media type along with the binary encoding.
{% endcapture %}

{% include media-type-entry.md summary=summary remarks=remarks %}
