---
title: Media Type Registry
layout: default
permalink: /registry/media-type/index.html
parent: Registry
---

# Media Type Registry

This registry lists the non-JSON media types addressed by the OpenAPI Specification (OAS), and links to the appropriate OAS sections and external specifications.
See [Working With Data](https://spec.openapis.org/oas/latest.html#working-with-data) and [Parsing and Serializing](https://spec.openapis.org/oas/latest.html#parsing-and-serializing) for a discussion of serialized, schema-ready, and application forms of data, and how to convert among the forms.

## Specification Versions

This registry is for and [linked from](https://spec.openapis.org/oas/latest.html#media-types)  version 3.2 and later of the OAS.  Earlier versions and other specifications such as Arazzo MAY support approaches added in this registry, as long as the necessary Objects and fields are available in those versions.

## Contributing

Please open a [discussion](https://github.com/OAI/OpenAPI-Specification/discussions) explaining your _**use cases**_ for any media type(s) you would like to see added.

## Media Types

**Note:** Media types with a structured suffix are handled the same way as the media type corresponding to the suffix (e.g. all `+json` media types are handled as `application/json`).

|Group|Description|Media Types|
|---|---|---|
{% for value in site.media-type %}| <a href="{{ value.slug }}">{{ value.name }}</a> | {{ value.description }} | {% for mt in value.media_types %}<tt>{{ mt.name }}</tt>{% unless forloop.last %}<br />{% endunless%}{% endfor %}{% if value.default_for %}<br />any unrecognized {{ value.default_for }} media type{% endif %}|
{% endfor %}

