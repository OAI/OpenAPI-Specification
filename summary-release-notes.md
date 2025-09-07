# [DRAFT]: Release Notes

What's coming up? Look at `src/oas.md` on the relevant development branch for full details.

## 3.2 Updates

### Headline features

- Multipurpose tags, with nesting

    - `summary` field to allow short descriptions, used when displaying lists of tags.
    - `parent` field to point to the tag that this tag is nested under.
    - `kind` field to allow a tag to be classified into a category such as navigation, or audience.
       The `kind` field is free-form text, however there are some expected/conventional values such as `nav` (in line with the most common current usage as grouping for documentation output).
    - A [registry](https://spec.openapis.org/registry/tag-kind/index.html) to establish conventions for values used in `kind`.

- Support for additional HTTP methods

    - Support the new `query` method alongside the existing `get`/`post`/`put`/`delete`/`options`/`head`/`patch`/`trace`.
    - Under an `additionalOperations` entry in a Path, use any other methods not listed as keys using the correct capitalization, e.g. `LINK`. Do NOT add `HEAD` under this, use the existing sibling `head`.

- Document identity and URL resolution

    - Additional top-level field `$self` is added to allow users to define the base URI of the document, used to resolve relative references.
    - More explanation and examples regarding URL resolution.

### Data modeling and representation

- Streaming support: sequential media types including SSE

    - Support for sequential media types such as `text/event-stream` for server-sent events (SSE) and `multipart/mixed`, `application/jsonl`, `application/json-seq` and others for sequential data.
    - Responses can be a repeating data structure, and are treated as if they are an array of Schema Objects.
    - Use `itemSchema` in a mediatype entry to describe each item.
    - A media types registry is published to give more context for each of the media types.

- Parameter and header changes

    - Additional parameter location `querystring`, to allow parsing the entire query string as a single field similar to the way a request body is handled, using the `content` field.
    - Parameters can therefore be `in` the `querystring` as an alternative to the existing `header`, `cookie`, `query` and `path` values.
    - `allowReserved` field is now permitted on headers and on parameters with any value of `in`, and applies where the combination of `in` and `style` automatically percent-encode the value.

- New `style` option for cookies

    - Additional `style` option `cookie` for content in a cookie, which uses semicolon as a separator and does not encode data values.

- Additions to support multipart media types

    - New `itemSchema` field, for the schema that describes each of the items in a sequential media type.
    - New fields `prefixEncoding` and `itemEncoding` can be used instead of `encoding` for multipart media types.
    - The specification also contains examples of sequential JSON and Server-Sent events that show these fields in use.

- Improvements for APIs using XML as a content format

    - New `nodeType` field allows mapping schemas to common XML node types: `element`, `attribute`, `text`, `cdata`, or `none`.
    - `attribute: true` is now deprecated in favor of `nodeType: attribute`.
    - `wrapped: true` is now deprecated in favor of `nodeType: element` (as `nodeType` defaults to `none` for arrays to preserve compatibility).
    - The `xml` keyword can be used in any Schema Object.
    - XML namespaces can be IRIs (rather than URIs).
    - Explanation and examples for many use cases including handling `null`, handling arrays, replacing the name, and handling ordered elements.
    - Clarify that the root schema of an XML Object should use the component name.

- Examples as either structured or serialized values

    - The Example Object (used in `examples` fields) gets two new fields: `dataValue` and `serializedValue`.
    - `dataValue` describes the example in structured format.
    - `serializedValue` shows how the example will be formatted when it is sent/received by the API.
    - The existing `externalValue` field can still be used to give a reference to an example, but this is now clearly documented as being a serialized value.

### Additional features

- Updated security schemes

    - Support for [OAuth2 Device Authorization flow](https://datatracker.ietf.org/doc/html/rfc8628) with additional `deviceAuthorization` field in the `flows` object and for the individual flow, a new field `deviceAuthorizationUrl` alongside `tokenUrl`.
    - Additional security scheme field: `oauth2MetadataUrl` URL for auth server metadata, as described by the [OAuth2 Server Metadata Standard](https://datatracker.ietf.org/doc/html/rfc8414).
    - Additional `deprecated` field for security schemes (indicating that the scheme may still be supported, but that it should not be used).
    - Ability to reference a security scheme by URI rather than declaring it in components.

- Improvements to the Server Object

    - Clarify that server URLs should not include fragment or query.
    - Support new `name` field alongside `description`, `url` and `variables`.
    - Formal ABNF syntax for the allowed variable substitution in server urls, alongside guidance that each variable can only be used once in a URL.

- Better polymorphic support

    - The discriminator `propertyName` can now be an optional field.
    - New field `defaultMapping` to indicate which schema to use if the `propertyName` is not set, or if the value is unrecognized.

- Templates with formal syntax

    - The specification now includes **ABNF** (Augmented Backus–Naur Form) for path templating, server variables, and runtime expressions in the Link Object.

- Flexible metadata fields in the Response Object

    - `description` field for responses is now optional.
    - Additional `summary` field for responses.

- Additional updates

    - Non-Schema examples no longer "override" Schema examples; tools are free to use the most appropriate example for any given use case.
    - A new key `mediaTypes` is supported under `components` to support re-use of Media Type Objects.

- Updates to referenced standards

    - Update to <https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html> of JSON Schema Specification.
    - Update to <https://www.ietf.org/archive/id/draft-bhutton-json-schema-validation-01.html> of JSON Schema Validation Specification.
    - Use [RFC8529](https://tools.ietf.org/html/rfc8259) for JSON.
    - Use [RFC9110](https://tools.ietf.org/html/rfc9110) for HTTP.

- Editorial changes

    - Extensive additions around media types, encoding, sequential media types, SSE examples, working with binary data.
    - Streamlined to YAML examples (unless something specific to another format) to try to make it easier to follow.
    - Better explanation and examples for using Encoding and Serialization, and a note not to apply percent-encoding to headers.
    - Clarify that Request Body Objects need to specify at least one media type to be meaningful.
    - How to more clearly indicate that responses will not have a body.
    - Explanation and examples of headers including `Link` and `Set-Cookie`.
    - Detailed explanation of percent-encoding and -decoding, updated examples and references to match, including the Style Examples table.
    - Extensive additional notes on parsing and serializing JSON and non-JSON data formats.

## 3.1 Updates

Version 3.1.2 has no material changes but does contain editorial fixes, additional examples, and clarifications.

- Clarify that `$ref` in a Schema Object is a JSON Schema `$ref` keyword.
- Detailed explanation of percent-encoding and -decoding, updated examples and references to match, including the Style Examples table.
- Better explanation and examples for using Encoding and Serialization, and a note not to apply percent-encoding to headers.
- Clarify that Request Body Objects need to specify at least one media type to be meaningful.
- How to more clearly indicate that no response will have a body.
- How to handle `null` in XML as an advisory note; since the functionality cannot be changed it is implementation-defined for 3.1 tooling.
- Clarify that the root schema of an XML object should use the component name.

<!-- vim: set ft=markdown tw=2 foldmethod=indent -->
