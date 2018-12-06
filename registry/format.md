---
layout: default
permalink: /registry/format/index.html
---

# Formats Registry

## Master Issue

* [#845](https://github.com/OAI/OpenAPI-Specification/issues/845)

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Issue|
|---|---|---|
{% for value in site.format %}| <a href="/registry/format/{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {% if value.issue %}<a href="https://github.com/OAI/OpenAPI-Specification/issues/{{ value.issue }}">#{{ value.issue }}</a>{% endif %} |
{% endfor %}

