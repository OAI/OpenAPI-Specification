---
owner: MikeRalphson
description: HTML-formatted text
base_type: string
issue:
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type}}`.

The `{{page.slug}}` format represents HTML-formatted text.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
