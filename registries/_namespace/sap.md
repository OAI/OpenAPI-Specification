---
owner: ralfhandl, pavelkornev
issue: 
description: Extensions created and used by SAP
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}


The `x-{{page.slug}}-` prefix is reserved for extensions created by SAP. These extensions are available for use by anyone.

The official list of supported SAP extensions can be found in [SAP/openapi-specification](https://github.com/SAP/openapi-specification) repository.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
