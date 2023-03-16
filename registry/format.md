---
layout: default
permalink: /registry/format/index.html
---

# Formats Registry

## Considerations

The existence of a format in this registry DOES NOT require tools to implement it.

If tools choose to implement any format present in this registry, they SHOULD implement the format following the provided standard.

Each format name and behavior MUST be unique to be added to this registry except when formats are ambiguous (no standard) by nature or deprecated.

Ambiguous formats MUST contain recommendations to use more precise format definitions that exist in this registry or are part of the same submission.

## Contributing

Please raise a [Pull-Request](https://github.com/OAI/OpenAPI-Specification/pulls) or [Issue](https://github.com/OAI/OpenAPI-Specification/issues) to contribute or discuss a registry value.

## Values

|Value|Description|Type|Source|Deprecated|
|---|---|----|---|---|----|
{% for value in site.format %}| <a href="./{{ value.slug }}.html">{{ value.slug }}</a> | {{ value.description }} | {{ value.base_type }} | {% if value.source %}<a href="{{ value.source }}">{% if value.source_label %}{{value.source_label}}{% else %}Open{% endif %}</a>{% endif %} | {% if value.deprecated_note %}Yes{% else %}No{% endif %} |
{% endfor %}

