---
owner: DarrelMiller
issue: 
description: any sequence of octets
base_type: string
layout: default
oas_version: < 3.1
remarks: "When using OpenAPI 3.1 or above it's recommended not to use this format and instead set the `contentMediaType` property of the response to `application/octet-stream` without a `schema` property."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents any sequence of octets. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

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
