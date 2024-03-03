# Security Considerations

OpenAPI documents use JSON, YAML, and JSON Schema, and therefore share their security considerations:
- [JSON](https://datatracker.ietf.org/doc/html/rfc8259)
- [YAML](https://datatracker.ietf.org/doc/html/rfc9512)
- [JSON Schema Core](https://json-schema.org/draft/2020-12/json-schema-core#section-13)
- [JSON Schema Validation](https://json-schema.org/draft/2020-12/json-schema-validation#name-security-considerations)

In additional, OpenAPI documents are processed by a wide variety of tooling for numerous different purposes, such as client code generation, documentation generation, server side routing, and API testing. OpenAPI document authors must consider the risks of the scenarios where the OpenAPI document may be used.
OpenAPI document describes security schemes that are used to protect the described resources. The available types of security schemes have widely varying degrees of protection and care must be taken to use an appropriate level of security schemes for the API resources being protected.  Some security scheme types are supported for compatibility with existing APIs (e.g. basic auth, OAuth Implicit flow) and OpenAPI support should not be considered as an endorsement for their usage.
OpenAPI documents may contain references to external resources that may be dereferenced automatically by consuming tools. External resources may be hosted on different domains that may be untrusted. References in an OpenAPI document, or across OpenAPI documents may cause a cycle. Tooling must detect and handle cycles to prevent resource exhaustion.
Certain properties allow the use of Markdown which can contain HTML including script. It is the responsibility of tooling to appropriately sanitize the Markdown.