---
owner: baywet
issue:
description: Binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5)
base_type: string
layout: default
deprecated_version: '3.1'
remarks: "When using OpenAPI 3.1 it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.deprecated_version %}
### Deprecated Since

{{ page.deprecated_version }}
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}