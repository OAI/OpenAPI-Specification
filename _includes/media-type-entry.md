# <a href=".">{{ page.collection | replace 'media-type', 'Media Type' | replace '-', ' ' }}</a>

## {{ page.description }}

**[Media Type](https://spec.openapis.org/oas/latest.html#media-types):** `{{ page.media_type }}` {% if value.unregistered %}_unregistered_ {% endif %} ([{{ page.specification.name }}]({{ page.specification.url }}))

**OAS Reference:** [{{ page.reference.section }}](https://spec.openapis.org/oas/latest.html#{{ page.reference.anchor }})

{{ include.summary }}

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}

