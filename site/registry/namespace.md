---
title: Namespace Registry
layout: default
permalink: /registry/namespace/index.html
parent: Registry
---

# Namespace Registry

To allow for creators of OpenAPI descriptions to define new extensions without the risk of name collisions, a namespace registry is maintained by OAI. The namespace registry is a simple list of unique identifiers that are used as part of a prefix for extensions to ensure uniqueness. A prefix has the format `x-{namespace}-` where `{namespace}` is a unique string associated to the creator of the extensions within the namespace. Namespace identifiers MUST be registered as lowercase identifiers.

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Prefix|Description|Issue|
|---|---|---|---|
{% for value in site.namespace %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | x-{{ value.slug }}-|{{ value.description }} | {% if value.issue %}<a href="https://github.com/OAI/OpenAPI-Specification/issues/{{ value.issue }}">#{{ value.issue }}</a>{% endif %} |
{% endfor %}
