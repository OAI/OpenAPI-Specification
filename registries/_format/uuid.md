---
owner: MikeRalphson
description: UUID v4 (RFC4122)
issue: 845
base_type: string
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents a UUID v4 value, as defined by [RFC4122](https://tools.ietf.org/html/rfc4122)

### Example

```yaml
ItemUUID:
  type: string
  description: the UUID v4 value relating to the item.
  format: uuid
  example: f81d4fae-7dec-11d0-a765-00a0c91e6bf6
```

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
