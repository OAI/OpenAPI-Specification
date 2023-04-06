---
owner: MikeRalphson
issue:
description: A templated URL
base_type: string
layout: default
source_label: OpenAPI
source: https://spec.openapis.org/oas/v3.0.3.html#paths-object
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a templated URL, as distinct from a URI Template. The string may contain unescaped `{` and `}` characters, but is not a full [RFC6570](https://www.rfc-editor.org/rfc/rfc6570) URI Template or a `uri-reference'.

Usage is as per the [`paths` Object](https://spec.openapis.org/oas/v3.0.3.html#paths-object) in OpenAPI 2.0/3.x.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
