---
owner: DarrelMiller
issue: 
description: date and time as defined by date-time - RFC3339
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a date and time as defined by date-time - [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339#anchor14one). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
