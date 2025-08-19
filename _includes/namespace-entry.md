{% assign registry = site.collections | where:"label", page.collection  | first %}
# <a href=".">{{ registry.name }}</a>

## {{ page.slug }} - {{ page.description }}

{{ include.summary }}

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
