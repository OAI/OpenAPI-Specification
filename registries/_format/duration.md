---
owner: baywet
issue: 
description: duration as defined by duration - RFC3339
base_type: string
layout: default
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-dates-times-and-duration
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a duration as defined by duration - [RFC3339](https://www.rfc-editor.org/rfc/rfc3339.html#appendix-A).

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
