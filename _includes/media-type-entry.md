# <a href=".">Media Type Registry</a>

## {{ page.name }}: {{ page.description }}

**Media Type(s):**

{% for media_type in page.media_types %}• <tt>{{ media_type.name }}</tt> <small>({% if media_type.iana %}[IANA]({{ media_type.iana }}){% else %}not IANA-registered{% endif %})</small> – {% for spec in media_type.specifications %}[{{ spec.name }}]({{ spec.url }}){% if spec.note %} <small>({{ spec.note }})</small>{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}{% unless forloop.last %}<br />{% endunless %}{% endfor %}
{% if page.default_for %}

This page also applies to any unrecognized {{ page.default_for }} media type.
{% endif %}

{% if page.references %}
**OAS References:**

{% for ref in page.references %}• [{{ ref.section }}](https://spec.openapis.org/oas/latest.html#{{ ref.anchor }}){% if ref.parent %} ([{{ ref.parent }}](https://spec.openapis.org/oas/latest.html#{{ ref.parentAnchor }})){% endif %}{% unless forloop.last %}<br />{% endunless %}{% endfor %}
{% endif %}

## Summary

{{ include.summary }}

{% if include.remarks %}
## Remarks

{{ include.remarks }}
{% endif %}

