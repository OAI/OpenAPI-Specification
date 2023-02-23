---
owner: baywet
issue:
description: A url-safe binary array as defined in RFC4648
base_type: string
layout: default
oas_version: < 3.1
remarks: "When using OpenAPI 3.1 or above it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a url-safe binary array as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

#{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

#{{ page.remarks }}
{% endif %}