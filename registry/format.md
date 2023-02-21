---
layout: default
permalink: /registry/format/index.html
---

# Formats Registry

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Issue|Source|
|---|---|---|---|
{% for value in site.format %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {% if value.issue %}<a href="https://github.com/OAI/OpenAPI-Specification/issues/{{ value.issue }}">#{{ value.issue }}</a>{% endif %} | {% if value.source %}<a href="{{ value.link }}">Open</a>{% endif %} 
{% endfor %}

