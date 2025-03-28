# <a href=".">{{ page.collection }}</a>

## {{ page.description }}

**Media Type(s):**

{% for media_type in page.media_types %}• <tt>{{ media_type.name }}</tt>{% unless media_type.registered %} _<small>(not IANA-registered)</small>_{% endunless %}{% unless forloop.last %}<br />{% endunless %}{% endfor %}
{% if page.default_for %}

This page also applies to any unknown {{ page.default_for }} media type.
{% endif %}

{% if page.references %}
**OAS References:**

{% for ref in page.references %}• [{{ ref.section }}](https://spec.openapis.org/oas/latest.html#{{ ref.anchor }})<br />{% endfor %}
{% endif %}

## Summary

{{ include.summary }}

{% if include.remarks %}
## Remarks

{{ include.remarks }}
{% endif %}

