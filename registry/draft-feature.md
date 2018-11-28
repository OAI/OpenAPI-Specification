---
layout: default
permalink: /registry/draft-feature/index.html
---

# Draft Features Registry

## Master Issue

* [#1531](https://github.com/OAI/OpenAPI-Specification/pull/1531)

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Issue|
|---|---|---|
{% for value in site.draft-feature %}| <a href="/registry/draft-feature/{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {% if value.issue %}<a href="https://github.com/OAI/OpenAPI-Specification/issues/{{ value.issue }}">#{{ value.issue }}</a>{% endif %} |
{% endfor %}

