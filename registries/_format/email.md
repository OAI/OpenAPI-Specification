---
owner: baywet
issue:
description: An email address as defined as Mailbox in RFC5321
base_type: string
layout: default
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-email-addresses
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is an email address as defined as Mailbox in RFC5351.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}