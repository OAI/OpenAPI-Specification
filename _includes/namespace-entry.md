# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

{{ include.summary }}

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}
