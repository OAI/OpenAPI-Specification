# Self-Identification

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2024-08-01 Self-Identification](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2024-08-01-Self-Identification-and-Bundling.md})|
|Relevant Specification(s)|OpenAPI Specification (OAS), Arazzo Specification|
|Authors|[Henry Andrews](https://github.com/handrews)|
|Review Manager | TBD |
|Status |Proposal|
|Implementations |n/a|
|Issues | |
|Previous Revisions | |

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
|2024-08-01 | @handrews | Initial submission

## Introduction

OpenAPI 3.1 references are treated as identifiers rather than locators.  This behavior is inherited from JSON Schema 2020-12, and is made more explicit in the forthcoming OAS 3.1.1 patch release.  This separation can support stable, self-assigned identifiers which allow certain sorts of OpenAPI Description refactoring _without_ having to re-write the values of `"$ref"` and similar keywords.  However, OAS lacks a mechanism to fully define such identifiers within each document, which substantially limits the benefits of this separation.

## Motivation

One of the main motivations for separating identity (URIs/IRIs) and location (URLs) is to have stable, persistent identifiers regardless of the resource's location.  Such identifiers are typically assigned within the resource.  There are two varieties:

* Setting the complete resource's absolute URI, which is also used as the resource's base URI per [RFC3986 §5.1.1](https://www.rfc-editor.org/rfc/rfc3986.html#section-5.1.1) (example: [the Schema Object's `$id`](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-the-id-keyword))
* Setting a ["plain name" URI fragment](https://www.w3.org/TR/2012/WD-fragid-best-practices-20121025/#dfn-plain-name-fragid) that does not rely on the JSON/YAML structure of the document (example: [the Schema Object's `$anchor`](https://www.ietf.org/archive/id/draft-bhutton-json-schema-01.html#name-defining-location-independe), and technically also `$dynamicAnchor` although this proposal will not mention `$dynamicAnchor` further as its additional complexities are not relevant here).

As suggested by the above examples, in OAS 3.1 only the Schema Object can set stable, location-independent identifiers.  OpenAPI Description documents as a whole cannot do so, nor can other Objects within the document.

Note also that due to the recursive structure of schemas, resolving the Schema Object's `$id` keyword can be complex, as each can itself be a relative URI-reference that is resolved against the `$id` in parent schemas.  There is no clear use case for such complexity within other parts of an OpenAPI Description.

### Use Cases

There are several use cases for separating identity and location, including:

* Working around network challenges:
    * Restrictive network security policies
    * Intermittent connectivity
    * High latency / low bandwidth
    * Document hosts that [require authentication](https://github.com/OAI/OpenAPI-Specification/issues/3270)
* Abstracting development vs testing vs deployment details
    * Allowing `.json` and `.yaml` file extensions during development, as is preferred by most IDEs
    * Using extensions in development and HTTP content negotiation in production
    * Differing source control repository structure (particularly of shared documents) vs deployment directory and server layouts
* This separation is necessary (although not, on its own, sufficient) to implement [bundling](https://www.openapis.org/blog/2021/08/23/json-schema-bundling-finally-formalised).

For a more detailed real-world example, see the [OGC example](https://github.com/OAI/sig-moonwalk/discussions/72#user-content-ogc) in the Moonwalk discussion on imports.

Many of these use cases can be worked around, but only by restricting deployment options or performing error-prone reference target rewriting.  Many tools that perform reference rewriting do not take into account the added complexities of referencing in OAS 3.1 compared to 3.0 and earlier.

### Prior Art

Self-identification of resources with identity independent of location is common in the JSON Schema world.  This demonstrates that implementation is not just feasible but well-proven, particularly given that JSON Schema's `$id` is more complex to support than this proposal.

The JSON Schema package used by the [OASComply](https://github.com/OAI/oascomply) project includes a [schema catalog](https://jschon.readthedocs.io/en/latest/tutorial/catalog.html) with [configurable file and network sources](https://jschon.readthedocs.io/en/latest/examples/file_based_schemas.html) to manage the URI-to-URL mapping (local files can be considered `file:` URLs).

Self-identification is common in other formats as well.  Notably, the Atom format pioneered the use of [web links with `rel="self"`](https://www.rfc-editor.org/rfc/rfc4287.html#section-4.2.7.2) for this purpose.

## Proposed solution

The proposal is a simplified analog of JSON Schema's `$id` that appears in exactly one place: a new `self` field in the root OpenAPI Object (OAS) and Arazzo Object (Arazzo).  When referencing a document that has a `self` field, the `self` field SHOULD be used in reference values so that reference values remain the same even if the document is moved.

Placing the `self` field only in the OpenAPI Object or Arazzo Object makes it align with the existing bootstrapping process for parsing:

1.  Check the `openapi` or `arazzo` field in the root OpenAPI or Arazzo Object to determine the specification version
1.  Check the `jsonSchemaDialect` field for the default Schema Object dialect
1.  Determine the base URI per RFC3986 §5.1.2-5.1.4 (in most cases, use the retrieval URL per §5.1.3)
1.  ***NEW*** Check the `self` field for a base URI per RFC3986 §5.1.1; if it exists, resolve it against the base URI from the previous step and use the result as the document's actual base URI
1.  Continue parsing the remainder of the document as usual

As [OAS 3.1.1 clarifies](https://github.com/OAI/OpenAPI-Specification/pull/3758), it is already mandatory to separate location and identity for Schema Object support.

Currently, associating a URI other than the current URL with a document to meet this requirement has to be done externally.  Many tools effectively support this by allowing the retrieval URL to be set manually, without verifying that the document actually lives at the given URL.  However, this relies on users to make use of a non-standard implementation feature rather than offering well-defined behavior based on the document author's intent.

With the new `self` field, tools need to be configured to know how to locate documents whose `self` values do not match their locations.  The JSON Schema implementation linked under [Prior Art](#prior-art) above demonstrates several ways to accomplish this.

## Detailed design

This is written for the structure of the OAS, but it should be clear how it would be adapted for Arazzo.  Some amount of guidance around how to configure tools to resolve `self`-references that do not match locations probably also needs to be added in the sections on reference resolution and base URIs.

```MARKDOWN
## OpenAPI Object

### Fixed Fields

Field Name | Type | Description
---|:---|:---
self | `URI-reference` (without a fragment) | Sets the URI of this document, which also serves as its base URI in accordance with [RFC 3986 §5.1.1](https://www.rfc-editor.org/rfc/rfc3986#section-5.1.1); the value MUST NOT be the empty string and MUST NOT contain a fragment
```

## Backwards compatibility

OAS 3.2 and Arazzo 1.1 documents that do not use the `self` field will behave exactly the same as OAS 3.1 and Arazzo 1.0 documents.  The change in minor version is sufficient to manage the compatibility issues, as no software that only supports up to 3.1/1.0 should attempt to parse 3.2/1.1 documents.

## Alternatives considered

### Plain name fragments in every Object

While including `self` in every Object would produce the same complexity as JSON Schema's nested `$id`, we could just adopt an equivalent of JSON Schema's `$anchor` keyword, which (like HTML/XML's `id` attribute) creates a plain name fragment that is not tied to the location of the Object in the JSON/YAML structure.

Handling a fragment declaration keyword would require scanning all Objects for the keyword prior to declaring that a reference target with a plain name fragment cannot be resolved.  This would likely be done on document load, but could be deferred and done incrementally as-needed when unknown fragments are encountered.

Support for `$anchor` in JSON Schema demonstrates that this is feasible, and the mental model is familiar to most from HTML.  But it would be a bit more work to support.

While it would be a significant advantage to have completely location-independent referencing support, this is given as an alternative because the `self` field is a pre-requisite, and can be added whether we later support plain name fragments or not.
