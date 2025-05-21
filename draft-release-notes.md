# [DRAFT]: Release Notes

What's coming up? Look at `src/oas.md` on the relevant development branch for full details.

## 3.2 Updates

- **ABNF** (Augmented Backus–Naur Form) for path templating, server variables, and runtime expressions in links object
- Sequential media types:
  - Support for sequential mediatypes such as text/event-stream for server-sent events (SSE) and application/jsonl, application/json-seq and others for sequential data. 
  - Responses can be a repeating data structure, and are treated as if they are an array of schema objects.
  - Use itemSchema in a mediatype entry to describe each item
  - Related: a new media types registry is published to give more context for each of the media types
  - Also a "Complete vs Streaming Content" section for guidance on streaming binary payloads
- Streamlined to YAML examples (unless something specific to another format) to try to make it easier to follow
- Servers: 
  - clarify that server URLs should not include fragment or query.
  - support new`name` field alongside description, url and variables
  - formal path templating support for variable substitution in server urls
- Methods:
  - support the new `query` operation alongside get/post/put/delete/options/head/patch/trace
  - under an additionalOperations entry, use any other methods not listed as keys using the correct capitalization. e.g. do NOT add HEAD under this, use the existing sibling `head`
- Extensive additions around media types, encoding, sequential media types, SSE examples, working with binary data,
- Description field for responses are now optional (they used to be required but they could be empty)
- Tags
  - new summary field to match other things
  - parent field to allow hierarchy
  - kind to allow multiple categories of tag
  - a registry for some common categories (but any value can be used)
- Discriminator - helps with API evolution (?)
  - use discriminator to hint which anyOf or oneOf is expected
  - discriminator propertyName MUST be defined but the field it points to MAY be optional - in which case a defaultMapping MUST be defined
  - the mapping should be defined if the discriminator property value doesn't match the Schema name
  - new field: `defaultMapping` means that if the discriminator field doesn't have a value, which mapping value to use
- XML namespaces can be IRIs (rather than URIs)
- Security:
  -  Support for OAuth2 Device Authorization flow with additional `deviceAuthorization` field in the `flows` object and for the individual flow, a new field `deviceAuthorizationUrl` alongside `tokenUrl`
  - additional security scheme field: oauth2MetadataUrl URL for auth server metadata
  - additional field to mark security schemes as deprecated (so don't use it for new stuff, but maybe still supported/valid)
  - can reference a security scheme by URI rather than needing it declared in components.
- In-place updates to existing specifications and standards that we reference:
  - Update to https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html of JSON Schema Specification
  - Update to https://www.ietf.org/archive/id/draft-bhutton-json-schema-validation-01.html of JSON Schema Validation Specification
  - Use [RFC8529]((https://tools.ietf.org/html/rfc8259) for JSON
  - Use [RFC9110]((https://tools.ietf.org/html/rfc9110) for HTTP

## 3.1 Updates

Version 3.1.2 has no material changes but does contain editorial fixes.

- Clarification that Example Objects can be used in Header Objects.
- Better explanation and examples for using Encoding.

