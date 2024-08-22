# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

JSON Data Type: `{{ page.base_type | join:', ' }}`.

{{ include.summary }}

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
