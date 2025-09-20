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

A minor release (e.g. OAS 3.1) has one or more published schemas, identified with the release 3.1 and a revision date like 2021-03-02.  All schemas for a given minor release apply to all patch releases within that minor release (e.g. 3.1.0, 3.1.1, 3.1.2, etc.).  The dates are purely a way to uniquely identify the revision, and are not intended to be correlated with patch release publication dates.  The latest date within a minor release is always the most correct schema for all patch releases, and previous revisions are obsolete.

Note that the OAS 3.1+ `schema/YYYY-MM-DD` schemas do _not_ validate the Schema Object, as they make no assumptions about the JSON Schema dialect in use.  The OAS 3.1+ `schema-base/YYYY-MM-DD` schemas _do_ validate the Schema Object, and require that if `jsonSchemaDialect` or `$schema` are present, that they use the appropriate `dialect/YYYY-MM-DD`.  The name `schema-base` comes from the JSON Schema dialect including the OAS extensions being referred to as the "base dialect" in the specification.

See [issue #4147](https://github.com/OAI/OpenAPI-Specification/issues/4147) for discussion of other possible JSON Schema dialect options, [issue #4152](https://github.com/OAI/OpenAPI-Specification/issues/4152) for programmatic access to the latest schemas, and [issue #4141](https://github.com/OAI/OpenAPI-Specification/issues/4141) for discussions on possibly providing linting schemas that could catch likely problems that do not directly violate the specification.

{% include schema-iteration-list.md specification="oas" %}
