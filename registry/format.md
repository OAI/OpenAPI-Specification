---
layout: default
permalink: /registry/format/index.html
---

# Formats Registry

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Type|Source|Deprecated|
|---|---|----|---|---|----|
{% for value in site.format %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {{ value.base_type }} | {% if value.source %}<a href="{{ value.source }}">{% if value.source_label %}{{value.source_label}}{% else %}Open{% endif %}</a>{% endif %} | {% if value.deprecated_note %}Yes{% else %}No{% endif %} |
{% endfor %}

