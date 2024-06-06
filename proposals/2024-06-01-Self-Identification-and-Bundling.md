# Self-Identification and Bundling

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2024-06-01 Self-Identification-and-Bundling](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2024-06-01-Self-Identification-and-Bundling.md})|
|Relevant Specification(s)|OAS, Arazzo|
|Authors|[Henry Andrews](https://github.com/handrews)|
|Review Manager | TBD |
|Status |Proposal|
|Implementations |n/a|
|Issues |[{issueid}](https://github.com/OAI/OpenAPI-Specification/issues/{IssueId})|
|Previous Revisions |[{revid}](https://github.com/OAI/OpenAPI-Specification/pull/{revid}) |

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
|2024-06-01 | @handrews | Initial submission

## Introduction

Poor support for external references has fractured the OAS tooling landscape, with many tools requiring multi-document OpenAPI Descriptions (OADs) to be combined into a single document.  Arazzo requires resolving sources and runtime expressions from multiple OADs, each of which might consist of multiple documents.  There is no way to combine all of the OAD and Arazzo documents involved into a single document, but an alternate solution would be a bundle similar to [what we recommend on our blog for bundling Schema Objects](https://www.openapis.org/blog/2021/08/23/json-schema-bundling-finally-formalised).  This would require a similar mechanism to JSON Schema's `$id` for OAS and Arazzo documents and the components within them.  It would also provide an alternative to current multi-to-single-document OAD tools, most (possibly all) of which do not fully support OAS 3.1, and allow for _lossless bundling of identifiable components_, which is increasingly needed by industry standards groups publishing API "building blocks" for use across many APIs by many different providers.

## Motivation

This proposal is motivated by the shortcomings of the current ecosystem regarding referencing, particularly its gaps regarding OAS 3.1 and Arazzo support.

Conflicting requirements from different tools regarding referencing, and regarding how to work around their lack of support, is one of the most fundamental interoperability problems facing the OpenAPI ecosystem.  While manageable within a single API owned by a single provider, it becomes a much bigger problem when working across multiple APIs by multiple providers.

### Current tools lose necessary identifying information

The current lack of consistent referencing support has resulted in many tools requiring preprocessing by a tool that combines documents through some combination of inlining reference targets (which is not always possible) and/or moving reference targets and rewriting the references to point to the external location.  This is a _lossy_ operation in terms of recognizing shared components: tools that work by [recognizing a specific shared component by URI](https://github.com/OAI/sig-moonwalk/discussions/72#ogc) cannot reliably recognize inlined components or rewritten references.

### Most tools do not fully support OAS 3.1

Many referencing preprocessors only work in OAS 3.0 or earlier, because they violate the [full-document, JSON Schema keyword-aware parsing requirement](https://github.com/OAI/OpenAPI-Specification/pull/3758).  Supporting referencing as a preprocessor requires handling not only the [many different `$ref` variations](https://github.com/OAI/Arazzo-Specification/issues/181#issuecomment-2085586524), but also the `$id`, `$anchor`, `$dynamicAnchor`, and `$dynamicRef` keywords.  While it is theoretically possible to preprocess `$dynamicRef` (aside from circular references), it can cause an [exponential growth in document size](https://arxiv.org/pdf/2307.10034).  Dynamic referencing is an important technique for [modeling generic data types](https://github.com/OAI/OpenAPI-Specification/pull/3714).

The author of this proposal is not aware of any reference preprocessing tool that fully supports OAS 3.1, although the last comprehensive survey on this was done in 2022.

### Arazzo not supported

All current tools depend on it being possible to structure OADs as single JSON or YAML documents.  This is not possible with Arazzo, as it coordinates multiple OADs without being part of any of them.  We do not yet know how much of a challenge this will be for Arazzo, but history suggests that the ecosystem will be healthier if a clear solution is endorsed early on.

### JSON Schema bundling is lossless and well-received

JSON Schema bundling, which we have officially endorsed on our blog as linked in the introduction above, is a _lossless_ operation that does _not_ require rewriting or inlining any references.  Schema documents with an `$id` at the root are incorporated as-is, while documents referenced by location have an `$id` with that URL added.  This makes it possible to reproduce the original multi-document form from the bundle, and continue to recognize components based on their reference URIs.

Building on the JSON Schema bundling model will ensure that, as much as possible:

* New behavior will be identical or at least analogous to behavior that is already required, making it easier to support
* The mental model will parallel one that is already successful

## Proposed solution

These challenges can be solved by combining two already-existing concepts:

1. A simplified analog of JSON Schema's `$id` that appears in exactly one place: the `self` field in root OpenAPI Objects / Arazzo Objects
2. Existing YAML and JSON streaming formats:
    * YAML native streams [RFC 9512 §3.2](https://www.rfc-editor.org/rfc/rfc9512.html#name-yaml-streams) `application/yaml`
    * JSON Text Sequences [RFC 7464](https://www.rfc-editor.org/rfc/rfc7464) `application/json-seq`
    * [JSON Lines](https://jsonlines.org/) _[proposed](https://github.com/wardi/jsonlines/issues/19):_ `application/jsonl` or `application/jsonlines`
    * [NDJSON](https://github.com/ndjson/ndjson-spec) `application/x-ndjson`)

Placing the `self` field only in the OpenAPI Object or Arazzo Object makes it align with the existing bootstrapping process for parsing:  Parsers MUST already check the `openapi` or `arazzo` field first, and in OAS 3.1+ MUST also check `jsonSchemaDialect` to know how to interpret Schema Objects.  With `self` providing the base URI when present, it would also impact how relative `$id` values in Schema Objects are handled, just as `jsonSchemaDialect` impacts Schema Objects that do _not_ include `$schema`.

As [OAS 3.1.1 clarifies](https://github.com/OAI/OpenAPI-Specification/pull/3758), it is already mandatory to separate location and identity for Schema Object support.  Currently, associating a URI other than the current URL with a document to meet this requirement has to be done externally.  Many tools effectively support this in the form of allowing the retrieval URL to be set manually, without verifying that the document actually lives at the given URL.

The various streaming formats do not state how to resolve links among the parts, as noted in [RFC 9512 YAML Media Type §3.2](https://www.rfc-editor.org/rfc/rfc9512.html#name-yaml-streams), which makes an explicit analogy to `application/json-seq` for this behavior.  

A `self` field that is a relative URI-reference would be resolved against the document location just as all Reference Object and similar URIs are resolved in OAS 3.1.  A relative reference within a stream would resolve against the URL of the entire stream; however it is probably better to either RECOMMEND or require (MUST) resolving `self` to an absolute-URI when bundling into a stream for maximum predictability.

## Detailed design

This is written for the structure of the OAS, but it should be clear how it would be adapted for Arazzo.

\# Specification

...

\#\# OpenAPI Description Structure

...

\#\#\# Bundling Documents as YAML or JSON Streams

Multiple OpenAPI Description documents MAY be bundled in a YAML stream ([RFC 9512 §3.2](https://www.rfc-editor.org/rfc/rfc9512.html#name-yaml-streams)) or a JSON streaming format such as JSON Text Sequences [RFC 7464](https://www.rfc-editor.org/rfc/rfc7464), [JSON Lines](https://jsonlines.org/), or [NDJSON](https://github.com/ndjson/ndjson-spec).  Documents bundled in this way MUST set their own URI using the `self` field in the [OpenAPI Object](#oasObject).  If a document in the stream has `self` set to a relative URI-reference, it MUST be resolved relative to the location of the entire stream.  However, it is strongly RECOMMENDED to set `self` to an absolute-URI for use within multi-document streams.

The first document in the stream MUST be treated as the entry document.

\# Schema

...

\#\# OpenAPI Object

\#\#\# Fixed Fields

Field Name | Type | Description
---|:---|:---
self | `URI-reference` (without a fragment) | Sets the URI of this document, which also serves as its base URI in accordance with [RFC 3986 §5.1.1](https://www.rfc-editor.org/rfc/rfc3986#section-5.1.1); the value MUST NOT be the empty string and MUST NOT contain a fragment

## Backwards compatibility

OAS 3.2 and Arazzo 1.1 documents that do not use the `self` field will be have exactly the same as OAS 3.1 and Arazzo 1.0 documents.  The change in minor version is sufficient to manage the compatibility issues, as no software that only supports up to 3.1/1.0 should attempt to parse 3.2/1.1 documents.

## Alternatives considered

### `$id` and `$anchor` everywhere

We could adopt JSON Schema's `$id` and `$anchor` keywords for all OpenAPI Components.  This would allow self-identification on the component level, but would introduce a great deal of complexity for tooling vendors.  (Note that `$dynamicAnchor` and `$dynamicRef` would never be relevant because they depend on instance evaluation, which is Schema Object-specific).

Having hierarchical `$id`s makes managing base URIs substantially more complex, without a clear benefit at this time.
Using `$anchor` for plain name fragments might preclude other approaches being discussed for Moonwalk, such as using names from the Components Object or its Moonwalk analogue.

### Bundling using `multipart/related` or similar

Bundling could be implemented with a `multipart` media type along the lines of [RFC 2557: MIME Encapsulation of Aggregate Documents](https://www.rfc-editor.org/rfc/rfc2557).  This could extend support to prior OAS versions and external documents and resources, since the parts need not be limited to JSON or YAML, and the URI can be captured in the per-part `Content-Location` header, removing the need to add a `self` field.

While worth considering separately due to the substantial additional benefits it would bring, it would also be more costly to implement given the relatively obscure nature of `multipart` processing.  There are also other benefits to the `self` field as noted in this proposal, specifically around recognizing shared components across multiple APIs from multiple providers.

Most importantly, a `multipart` solution and this solution could co-exist, so each can be evaluated on its own merits as separate proposals.
