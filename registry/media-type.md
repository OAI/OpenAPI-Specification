---
title: Media Type Registry
layout: default
permalink: /registry/media-type/index.html
parent: Registry
---

# Media Type Registry

This registry defines how to use the Schema Object, Media Type Object, and in some cases other Objects to model media types other than `application/json` or media types using a `+json` suffix.

## Data Modeling vs Mapping

JSON Schema operates on an in-memory [data model](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-instance-data-model) based on the [JSON RFC](https://www.rfc-editor.org/rfc/rfc8259.html#section-3), which is different from the set of types used by JSON Schema's `type` keyword.

JSON Schema's data model description includes guidance on how to _map_ JSON documents into the data model, such as noting that whitespace and different lexical representations of numbers (such as `1` vs `1.0`) are **not** significant within the data model.

All in-memory data described by the OpenAPI Specification (OAS) uses the same in-memory data model, as described under the "Data Types" section.
However, the OAS defines _mappings_ for several additional media types, where JSON Schema is used on a JSON-like in-memory representation which may have a significantly different structure from the media type's representation in [HTTP content](https://www.rfc-editor.org/rfc/rfc9110.html#name-content).
This registry documents those mappings, and in the future may document additional mappings not explicitly mentioned in the OAS.

### Setting the Media Type

JSON Schema draft 2020-12 offers [keywords for modeling embedded media types](https://www.ietf.org/archive/id/draft-bhutton-json-schema-validation-01.html#name-a-vocabulary-for-the-conten): `contentMediaType`, `contentEncoding`, and `contentSchema`, which can be used to set a media type, encoding, or schema for [certain types of data](https://spec.openapis.org/oas/latest.html#working-with-binary-data).  These keywords, most notably `contentMediaType`, can contradict media types set in the parent key of a Media Type Object, or by an Encoding Object (including by the default Encoding Object when an Encoding Object is relevant but not present).  In such cases, the Media Type Object key or the Encoding Object ***always*** take precedence over the JSON Schema keywords.

## Specification Versions

This registry is being created for the OpenAPI Specification (OAS) version 3.2, and requirements regarding its support will be included in that specification's text.

Implementations MAY support these data modeling techniques in other OAS versions or other specifications such as Arazzo, as long as the necessary Objects and fields are supported in those specification versions.

## Contributing

While most OpenAPI Initiative registries invite community contributions, this registry is somewhat experimental.
Please open a [Discussion](https://github.com/OAI/OpenAPI-Specification/discussions) explaining your use cases for any media type(s) you would like to see added, rather than proposing a solution.
Solution proposals will be invited _after_ use cases are accepted.

## Media Types

**Note:** For any media type with structured suffix usage (e.g. `application/openapi+json` uses the structured suffix associated with `application/json`), the registered techniques for the media type also apply to media types using the related structured suffix.

|Media Type|Name|Specification|OAS Reference|OAS Versions|
|---|---|---|
{% for value in site.media-type %}| <tt><a href="{{ value.slug }}">{{ value.media_type }}</a></tt> {% if value.unregistered %}_(unregistered)_ {% endif %} | {{ value.description }} | <a href="{{ value.specification.url }}">{{ value.specification.name }}</a> | <a href="https://spec.openapis.org/oas/latest.html#{{ value.reference.anchor }}">{{ value.reference.section }}</a> | {{ value.versions }} |
{% endfor %}

