---
owner: DarrelMiller
issue: 
description: base64 encoded data as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4)
base_type: string
layout: default
oas_version: < 3.1
remarks: "In OpenAPI 3.1, instead use [`contentEncoding: base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding), optionally alongside [contentMediaType](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentmediatype)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents any sequence of octets encoded as a base64 string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}