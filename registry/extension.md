---
layout: default
permalink: /registry/extension/index.html
---

# Extensions Registry

## Master Issue

* [#1351](https://github.com/OAI/OpenAPI-Specification/issues/1351)

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Issue|
|---|---|---|
{% for value in site.extension %}| <a href="/registry/extension/{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {% if value.issue %}<a href="https://github.com/OAI/OpenAPI-Specification/issues/{{ value.issue }}">#{{ value.issue }}</a>{% endif %} |
{% endfor %}

