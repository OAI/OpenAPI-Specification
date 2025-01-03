---
title: Tag Kinds Registry
layout: default
permalink: /registry/tag-kind/index.html
parent: Registry
---

# Tag Kinds Registry

## Unreleased feature

The `kind` addition to OpenAPI tags is planned for release in OpenAPI 3.2, so support for the values here should not be expected until tools officially support the 3.2 version.

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description
|---|---|---|
{% for value in site.tag-kind %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} |
{% endfor %}

