# [DRAFT]: Release Notes

What's coming up? Look at `src/oas.md` on the relevant development branch for full details.

## 3.2 Updates

### Methods

  - support the new `query` operation alongside get/post/put/delete/options/head/patch/trace
  - under an `additionalOperations` entry, use any other methods not listed as keys using the correct capitalization. e.g. do NOT add HEAD under this, use the existing sibling `head`

### Tags

  - new `summary` field to allow short descriptions, used when displaying lists of tags. If you use the `x-displayName` extension, you can now use `summary` instead.
  - `parent` field to point to the tag that this tag is nested under. If you use `x-tagGroups`, adjust to use a tags hierarchy.
  - `kind` to allow multiple categories of tag. The `kind` field is free-form text, however there are some expected/conventional values such as `nav` (in line with the most common current usage as grouping for documentation output).
  - a [registry](https://spec.openapis.org/registry/tag-kind/index.html) to establish conventions for values used in `kind`.

### Security

  -  Support for OAuth2 Device Authorization flow with additional `deviceAuthorization` field in the `flows` object and for the individual flow, a new field `deviceAuthorizationUrl` alongside `tokenUrl`
  - additional security scheme field: `oauth2MetadataUrl` URL for auth server metadata
  - additional `deprecated` field for security schemes (indicating that the scheme may still be supported, but that it should not be used)
  - ability to reference a security scheme by URI rather than needing it declared in components.

### Servers 

  - clarify that server URLs should not include fragment or query.
  - support new `name` field alongside `description`, `url` and `variables`.
  - formal path templating support for variable substitution in server urls.

### Discriminator

  - no change from previous versions: use `discriminator` to hint which entry in `anyOf` or `oneOf` is expected.
  - no change from previous versions: use `mapping` to link the discriminator property value to the Schema name if they aren't an exact match.
  - the discriminator `propertyName` can now be an optional field.
  - additional `defaultMapping` field to indicate which schema to use if the `propertyName` is not set, or if the value is unrecognized.

### Reference resolution

  - additional top-level `$self` to be used as a base URI for resolving references in the OpenAPI description. If not present, the existing/earlier behaviour of using the retrieval URL as a base applies.

### **ABNF** (Augmented Backus–Naur Form) formalised for path templating, server variables, and runtime expressions in the Links object.

### Improvements for APIs using XML as a content format

  - XML namespaces can be IRIs (rather than URIs)
  - Explanation and example on how to handle `null` in XML
    Clarify that the root schema of an XML object should use the component name.

### Sequential media type

  - Support for sequential mediatypes such as `text/event-stream` for server-sent events (SSE) and `application/jsonl`, `application/json-seq` and others for sequential data. 
  - Responses can be a repeating data structure, and are treated as if they are an array of schema objects.
  - Use `itemSchema` in a mediatype entry to describe each item
  - Related: a new media types registry is published to give more context for each of the media types
  - Also a "Complete vs Streaming Content" section for guidance on streaming binary payloads

### Parameters

  - additional parameter location `querystring`, to allow parsing the entire query string as a single field similar to the way a request body is handled, using the `content` field. Useful for complex or unconventional query data. Mutually exclusive with the `query` field.
  - parameters can therefore be `in` the `querystring` as an alternative to the existing `header`, `cookie`, `query` and `path` values.
  - `allowReserved` field is now permitted on parameters with any value of `in` (however this many not be a Good Idea (TM) in some scenarios)
    
### Responses

  - `description` field for responses are now optional (they used to be required but they could be empty)
  - additional `summary` field for responses, useful when displaying responses in a list context

### Minor edits that are worth a mention:

  - Streamlined to YAML examples (unless something specific to another format) to try to make it easier to follow
  - `allowReserved` is now supported for any parameter or header, regardless of `in` location

### In-place updates to existing specifications and standards that we reference:

  - Update to https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html of JSON Schema Specification
  - Update to https://www.ietf.org/archive/id/draft-bhutton-json-schema-validation-01.html of JSON Schema Validation Specification
  - Use [RFC8529](https://tools.ietf.org/html/rfc8259) for JSON
  - Use [RFC9110](https://tools.ietf.org/html/rfc9110) for HTTP

### Editorial changes:

  - Extensive additions around media types, encoding, sequential media types, SSE examples, working with binary data,
  - Clarification that Example Objects can be used in Header Objects.
  - Better explanation and examples for using Encoding.
  - Clarify that Request Body Objects need to specify at least one media type to be meaningful
  - How to more clearly indicate that responses will not have a body

## 3.1 Updates

Version 3.1.2 has no material changes but does contain editorial fixes.

- Clarification that Example Objects can be used in Header Objects.
- Better explanation and examples for using Encoding.
- Clarify that Request Body Objects need to specify at least one media type to be meaningful
- How to more clearly indicate that no response will have a body
- How to handle `null` in XML as an advisory note; since the functionality cannot be changed it is implementation-defined for 3.1 tooling.
- Clarify that the root schema of an XML object should use the component name.

<!-- vim: set ft=markdown tw=2 foldmethod=indent: -->
