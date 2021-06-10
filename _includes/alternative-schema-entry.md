# <a href="..">{{ page.collection }}</a>

## {{ page.schemaTypeID }} - {{ page.schemaTypeName }}

The `{{ page.schemaTypeID }}` `alternativeSchema` `type` refers to [{{ page.schemaTypeName }}]({{ page.specificationURL }}) in any version.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}