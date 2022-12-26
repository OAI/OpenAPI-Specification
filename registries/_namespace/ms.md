---
owner: DarrelMiller
issue: 
description: Extensions created and used by Microsoft
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}


The `x-{{page.slug}}-` prefix is reserved for extensions created by Microsoft. These extensions are available for use by anyone.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
