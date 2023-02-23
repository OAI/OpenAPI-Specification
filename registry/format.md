---
layout: default
permalink: /registry/format/index.html
---

# Formats Registry

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Type|OpenAPI Version|Source|Remarks|
|---|---|----|---|---|----|
{% for value in site.format %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {{ value.base_type }} | {{ value.oas_version }} | {% if value.source %}<a href="{{ value.source }}">Open</a>{% endif %} | {{ value.remarks }} |
{% endfor %}

