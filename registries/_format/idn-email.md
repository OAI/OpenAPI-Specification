---
owner: baywet
issue:
description: An email address as defined as Mailbox in RFC6531
base_type: string
layout: default
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-email-addresses
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is an email address as defined as Mailbox in [RFC6531](https://www.rfc-editor.org/rfc/rfc6531).

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

#{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

#{{ page.remarks }}
{% endif %}