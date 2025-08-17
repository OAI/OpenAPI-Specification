# [DRAFT]: Release Notes

What's coming up? Look at `src/oas.md` on the relevant development branch for full details.

## 3.2 Updates

All the changes in the OpenAPI 3.2 release.

### Headline features

A summary of the biggest changes.

#### Nested, multipurpose tags

Tags get an upgrade, with some new fields to make them more useful and reflect some of the features that need extensions to achieve today:

- `summary` field to allow short descriptions, used when displaying lists of tags. If you use the `x-displayName` extension, you can now use `summary` instead.
- `parent` field to point to the tag that this tag is nested under. If you use `x-tagGroups`, adjust to use a tags hierarchy.
- `kind` field to allow a tag to be classified into a category such as navigation, or audience.
   The `kind` field is free-form text, however there are some expected/conventional values such as `nav` (in line with the most common current usage as grouping for documentation output).
- A [registry](https://spec.openapis.org/registry/tag-kind/index.html) to establish conventions for values used in `kind`.

#### Support additional HTTP methods

- Support the new `query` method alongside the existing `get`/`post`/`put`/`delete`/`options`/`head`/`patch`/`trace`.
- Under an `additionalOperations` entry in a Path, use any other methods not listed as keys using the correct capitalization. e.g. do NOT add HEAD under this, use the existing sibling `head`.

#### Document identity and URL resolution

- Additional top-level field `$self` is added to allow users to define the base URI of the document, used to resolve relative references.
  If no `$self` field is defined, then the retrieval URI is used - just as it was in previous versions of OpenAPI.
- Other URL/URI handling does not change between 3.1 and 3.2 (but bears a recap in case you're wondering how it all goes together):
  - Other URLs, such as to external documentation or a license, are resolved against the base URI.
  - Relative links inside `description` fields are resolved relative to their rendered context, such as your published API documentation page.
  - API endpoints are resolved against the URL in the Server Object, which itself might be relative and resolved against the base URI.

### Data modeling and representation

OpenAPI specification v3.2 brings consistent, modular, and extensible media type and parameter support, while also expanding the set of media types supported in response to both emerging and legacy use cases. In addition, the ambiguity regarding how to present examples in a variety of complex scenarios is reduced.

There is also a new Media Types Registry, to provide further resources for working with different media types.

#### Support for sequential media types

- Support for sequential media types such as `text/event-stream` for server-sent events (SSE) and `multipart/mixed`, `application/jsonl`, `application/json-seq` and others for sequential data.
- Responses can be a repeating data structure, and are treated as if they are an array of schema objects.
- Use `itemSchema` in a mediatype entry to describe each item.
- Related: a new media types registry is published to give more context for each of the media types.
- Also a "Complete vs Streaming Content" section for guidance on streaming binary payloads.

#### Parameter and header changes

- Additional parameter location `querystring`, to allow parsing the entire query string as a single field similar to the way a request body is handled, using the `content` field. Useful for complex or unconventional query data. Mutually exclusive with the `query` field.
- Parameters can therefore be `in` the `querystring` as an alternative to the existing `header`, `cookie`, `query` and `path` values.
- `allowReserved` field is now permitted on headers and on parameters with any value of `in`.
- Remove incorrect mention of Reference Object in the header `schema` field. The JSONSchema ref would be the correct thing to use in this context.
- The `examples` (and older `example`) field is now supported with `content`.

#### Multipart media types

Multipart media types are much better supported in OpenAPI 3.2.

- New `itemSchema` field, for the schema that describes each of the items in a sequential media type.
  These sequential types may not be received or parsed in one go, so the `itemSchema` field supports ongoing parsing.
- New fields `prefixEncoding` and `itemEncoding` can be used instead of `encoding` for multipart media types.
    - Use `prefixEncoding` with an array of positional encoding information where the position of each item in the content is known.
    - The `itemEncoding` is a single encoding entry that is used for information about multiple items.
- The specification also contains examples of sequential JSON and Server-Sent events that show these fields in use.
- Nested content types are supported to at least one level of nesting.

#### Improvements for APIs using XML as a content format

- New `nodeType` field allows mapping schemas to common XML node types: `element`, `attribute`, `text`, `cdata`, or `none`.
- `attribute: true` deprecated in favor of `nodeType: attribute`.
- `wrapped: true` deprecated in favor of `nodeType: element` (as `nodeType` defaults to `none` for arrays to preserve compatibility).
- The `xml` keyword can be used in any Schema Object.
- XML namespaces can be IRIs (rather than URIs).
- Explanation and examples for many use cases including handling `null`, handling arrays, replacing the name, and handling ordered elements.
- Clarify that the root schema of an XML object should use the component name.

#### Describe examples in both structured and serialized forms

- The Example Object (used in `examples` fields) gets two new fields: `dataValue` and `serializedValue`.
- `dataValue` describes the example in structured format.
- `serializedValue` shows how the example will be formatted when it is sent/received by the API.
- The existing `value` field can still be used, which means that you can safely upgrade to 3.2 and then revisit these fields and update them to use either `dataValue` or `serializedValue` as appropriate.
  Use the new fields for examples you add after upgrading to 3.2.
- The existing `externalValue` field can still be used to give a reference to an example, but this is now clearly documented as being a serialized value.
- There are lots of examples of the examples (ha!) and clear documentation of how the fields can be combined.
- Summary of what to do: use `examples` over `example`, and use `dataValue` to show a clear, structured example of the data.
  If your use case could benefit from an example of how the data will look when it's transmitted, use `serializedValue` as well.

### Additional features

That's not all! Here are the rest of the changes for this release, each one is small but mighty!

#### Updated security schemes

Since the OpenAPI 3.1 release, there have been plenty of good innovations in API security. OpenAPI 3.2 brings support for some of the key areas so you can keep pace with best practice on security topics.

- Support for [OAuth2 Device Authorization flow](https://datatracker.ietf.org/doc/html/rfc8628) with additional `deviceAuthorization` field in the `flows` object and for the individual flow, a new field `deviceAuthorizationUrl` alongside `tokenUrl`. This flow is designed for devices that have limited inputs such as TVs, printers, and kiosks.
- Additional security scheme field: `oauth2MetadataUrl` URL for auth server metadata, as described by the [OAuth2 Server Metadata Standard](https://datatracker.ietf.org/doc/html/rfc8414).
- Additional `deprecated` field for security schemes (indicating that the scheme may still be supported, but that it should not be used).
- Ability to reference a security scheme by URI rather than needing it declared in components.

```yaml
components:
  securitySchemes:
    cakeStoreOAuth:
      type: oauth2
      description: OAuth2 security for Cake Store API
      flows:
        deviceAuthorization:
          deviceAuthorizationUrl: https://auth.cakestore.com/oauth/device/authorize
          tokenUrl: https://auth.cakestore.com/oauth/token
          scopes:
            read:cakes: Read access to cake catalog
            write:orders: Place cake orders from your device
            device:monitor: Monitor cake order status

```

#### Servers

- Clarify that server URLs should not include fragment or query.
- Support new `name` field alongside `description`, `url` and `variables`.
- Formal ABNF syntax for the allowed variable substitution in server urls, alongside guidance that each variable can only be used once in a URL.

Use the name field to refer to servers easily:

```yaml
servers:
  - name: Production
    url: https://api.cakestore.com/v1
    description: Production server for live cake orders
  - name: Staging
    url: https://staging-api.cakestore.com/v1
    description: Staging environment for testing new cake recipes and features
  - name: Local
    url: http://localhost:3000/v1
    description: Local development server running on your machine
```

#### Better polymorphic support

Discriminator is a great way to match the correct schema to a payload. This release gives more robustness by adding support for a default type so that unknown objects can be handled safely.

- The discriminator `propertyName` can now be an optional field.
- New field `defaultMapping` to indicate which schema to use if the `propertyName` is not set, or if the value is unrecognized.
- No change from previous versions: use `discriminator` to hint which entry in `anyOf` or `oneOf` is expected.
- No change from previous versions: use `mapping` to link the discriminator property value to the Schema name if they aren't an exact match.
- Implementations now SHOULD (rather than MAY) support templates/generics using `$dynamicRef`.

Define the `mapping` and `discriminator` as before. The new field `defaultMapping` will be used if either the discriminator doesn't have a `propertyName` or when there is an object that doesn't match a `mapping` entry.

```yaml
  schemas:
    Cake:
      type: object
      discriminator:
        propertyName: cakeType
        defaultMapping: sponge
        mapping:
          sponge: '#/components/schemas/SpongeCake'
          chocolate: '#/components/schemas/ChocolateCake'
          fruit: '#/components/schemas/FruitCake'
      properties:
        cakeType:
          type: string
          enum: [sponge, chocolate, fruit]
        name:
          type: string
```

#### Templates with formal syntax

The specification now includes **ABNF** (Augmented Backus–Naur Form) for path templating, server variables, and runtime expressions in the Links object.
This sounds terribly formal but it means that there is a clear syntax for what is supported in each of those locations, that existing tooling can understand.

Next time you're wondering if you can do `/api/v{version}/users/{user-id}` in a path template, it'll be easy to check (spoiler: yes you can).

#### Flexible response metadata fields

- `description` field for responses are now optional (they used to be required but they could be empty).
- Additional `summary` field for responses, useful when displaying responses in a list context.

```yaml
  /cakes:
    get:
      summary: List cakes
      responses:
        '200':
          summary: Cake list
          description: A list of cakes (this field is no longer required)
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
```

#### Minor updates that are worth a mention

- Non-Schema examples no longer "override" Schema examples; tools are free to use the most appropriate example for any given use case.
- A new key `mediaTypes` is supported under `components` to support re-use of Media Type Objects.

#### In-place updates to existing specifications and standards that we reference

- Update to <https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html> of JSON Schema Specification.
- Update to <https://www.ietf.org/archive/id/draft-bhutton-json-schema-validation-01.html> of JSON Schema Validation Specification.
- Use [RFC8529](https://tools.ietf.org/html/rfc8259) for JSON.
- Use [RFC9110](https://tools.ietf.org/html/rfc9110) for HTTP.

#### Editorial changes

- Extensive additions around media types, encoding, sequential media types, SSE examples, working with binary data.
- Streamlined to YAML examples (unless something specific to another format) to try to make it easier to follow.
- Better explanation and examples for using Encoding and Serialization, and a note not to apply percent-encoding to headers.
- Clarify that Request Body Objects need to specify at least one media type to be meaningful.
- How to more clearly indicate that responses will not have a body.
- Explanation and examples of headers including `Link` and `Set-Cookie`.
- Detailed explanation of percent-encoding and -decoding, updated examples and references to match, including the Style Examples table.
- Extensive additional notes on parsing and serializing JSON and non-JSON data formats.

Particularly if you are building OpenAPI tooling, these sections give much better guidance on some of those tricky edge cases.

## 3.1 Updates

Version 3.1.2 has no material changes but does contain editorial fixes.

- Detailed explanation of percent-encoding and -decoding, updated examples and references to match, including the Style Examples table.
- Better explanation and examples for using Encoding and Serialization, and a note not to apply percent-encoding to headers.
- Clarify that Request Body Objects need to specify at least one media type to be meaningful.
- How to more clearly indicate that no response will have a body.
- How to handle `null` in XML as an advisory note; since the functionality cannot be changed it is implementation-defined for 3.1 tooling.
- Clarify that the root schema of an XML object should use the component name.

<!-- vim: set ft=markdown tw=2 foldmethod=indent -->
