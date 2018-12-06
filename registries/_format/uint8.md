---
owner: MikeRalphson
issue: 845
description: unsigned 8-bit integer
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `number`.

The `{{page.slug}}` format represents an unsigned 8-bit integer, with the range 0 to 255.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

