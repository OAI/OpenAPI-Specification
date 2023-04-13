---
owner: jdesrosiers
issue:
description: A media type as defined by the `media-range` ABNF production in RFC9110.
base_type: string
layout: default
source_label: OpenAPI
source: https://www.rfc-editor.org/rfc/rfc9110#field.accept
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a media type as defined by the `media-range` ABNF
production in [RFC9110](https://www.rfc-editor.org/rfc/rfc9110).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
