---
owner: mikekistler
issue: 
description: date and time as defined by IMF-fixdate - [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1)
base_type: string
layout: default
remarks: This format is appropriate for HTTP date headers.
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a date and time as defined by IMF-fixdate - [RFC7231](https://datatracker.ietf.org/doc/html/rfc7231#section-7.1.1.1).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
