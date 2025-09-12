---
title: OpenAPI Specification
description: OpenAPI Specification
layout: default
---

# OpenAPI Specification

## Specification Versions

{% include specification-version-list.md specification="oas" %}

## Schema Iterations

_Note that while schemas can catch many errors, they are not guaranteed to catch all specification violations.  In the event of a disagreement between the schemas and the corresponding specification text, the specification text is presumed to be correct._

Note that the OAS 3.1 `schema/YYYY-MM-DD` schema does _not_ validate the Schema Object, as it makes no assumptions about the JSON Schema dialect in use.  The OAS 3.1 `schema-base/YYYY-MM-DD` schema _does_ validate the Schema Object, and requires that if `jsonSchemaDialect` or `$schema` are present, that they use the appropriate `dialect/YYYY-MM-DD`.  The name `schema-base` comes from the JSON Schema dialect including the OAS extensions being referred to as the "base dialect" in the specification.

See [issue #4147](https://github.com/OAI/OpenAPI-Specification/issues/4147) for discussion of other possible JSON Schema dialect options, [issue #4152](https://github.com/OAI/OpenAPI-Specification/issues/4152) for programmatic access to the latest schemas, and [issue #4141](https://github.com/OAI/OpenAPI-Specification/issues/4141) for discussions on possibly providing linting schemas that could catch likely problems that do not directly violate the specification.

{% include schema-iteration-list.md specification="oas" %}
