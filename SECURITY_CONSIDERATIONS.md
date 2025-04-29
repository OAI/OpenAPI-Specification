# Security Considerations

## OpenAPI Document Formats

OpenAPI documents use JSON, YAML, and JSON Schema, and therefore share their security considerations:

- [JSON](https://www.iana.org/assignments/media-types/application/json)
- [YAML](https://www.iana.org/assignments/media-types/application/yaml)
- [JSON Schema Core](https://json-schema.org/draft/2020-12/json-schema-core#section-13)
- [JSON Schema Validation](https://json-schema.org/draft/2020-12/json-schema-validation#name-security-considerations)

## Tooling and Usage Scenarios

In addition, OpenAPI documents are processed by a wide variety of tooling for numerous different purposes, such as client code generation, documentation generation, server side routing, and API testing. OpenAPI document authors must consider the risks of the scenarios where the OpenAPI document may be used.

## Security Schemes

An OpenAPI document describes the security schemes used to protect the resources it defines. The security schemes available offer varying degrees of protection. Factors such as the sensitivity of the data and the potential impact of a security breach should guide the selection of security schemes for the API resources. Some security schemes, such as basic auth and OAuth Implicit flow, are supported for compatibility with existing APIs. However, their inclusion in OpenAPI does not constitute an endorsement of their use, particularly for highly sensitive data or operations.

## Handling External Resources

OpenAPI documents may contain references to external resources that may be dereferenced automatically by consuming tools. External resources may be hosted on different domains that may be untrusted. References in an OpenAPI document, or across OpenAPI documents may cause a cycle. Tooling must detect and handle cycles to prevent resource exhaustion.

## Markdown and HTML Sanitization

Certain properties allow the use of Markdown which can contain HTML including script. It is the responsibility of tooling to appropriately sanitize the Markdown.
