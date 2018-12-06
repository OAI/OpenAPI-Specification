---
owner: MikeRalphson
issue: 845
description: signed 8-bit integer
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `number`.

The `{{page.slug}}` format represents a signed 8-bit integer, with the range -128 to 127.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
