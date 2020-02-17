# Beta/Experimental marker

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[005_Beta](https://github.com/OAI/OpenAPI-Specification/tree/master/proposals/005_Beta.md)|
|Authors|[David Goss](https://github.com/davidjgoss)|
|Review Manager |TBD |
|Status |Proposal|
|Implementations ||
|Issues ||
|Previous Revisions ||

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |

## Introduction

A way to mark an aspect of the API as "beta" or "experimental", indicating that it is not yet a fully stable and supported part of the API.

## Motivation

Consider an API with two categories of thing in it:

- Core, stable things, where we are committed to the ongoing stability and have no intention of making breaking changes
- New, experimental things, where we are getting them out there for feedback and early adopters, but they may change before we consider them to be in the first category

These sit together fine in principle, but cause friction when trying to apply something like semver to the API as a whole. How do we make changes to the beta stuff - without bumping the major version several times a year and scaring consumers - while also ensuring we can't make breaking changes to the core stuff we never want to break.

## Proposed solution

Add a "beta" or "experimental" field which specifies that an items in the API is not yet fully stable and supported, may change without a major version bump, and as such should be used with caution.

_(I don't have a strong opinion about the naming - "beta" and "experimental" are two ideas - perhaps there is another word that conveys it better? For the rest of the proposal I'll refer to it as "beta" for brevity.)_

Downstream tools could then make use of this metadata:

- Tools like swagger-ui could surface this in the documentation they generate so consumers are made aware. Beta items could also be filtered out of the documentation if desired.
- Tools for detecting and preventing breaking changes could take this into consideration when deciding whether a change is breaking.

## Detailed design

A new boolean field named `beta`, defaulting to `false`, is added to:

- Operation
- Schema

This specifies that the operation or schema is not yet stable and SHOULD be used with caution.

### Operation Object

...

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
... | ... | ...
<a name="operationBeta"></a>beta | `boolean` | Specifies that an operation is in beta status, meaning it may change outside of the normal breaking change process. Consumers SHOULD use with caution. Default value is `false`.

### Schema Object

...

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
... | ... | ...
<a name="schemaBeta"></a>beta | `boolean` | Specifies that a schema is in beta status, meaning it may change outside of the normal breaking change process. Consumers SHOULD use with caution. Default value is `false`.

### Example Spec

```yaml
  /asset/constraints:
    get:
      tags:
        - Asset
        - Constraints
      summary: Get a set of asset constraints
      operationId: constraints
      parameters:
        - name: siteToken
          in: query
          description: Site token obtained from Site API
          required: true
          schema:
            type: string
      beta: true
```
### Prior Art

This kind of requirement is handled for TypeScript libraries by [api-extractor](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/#release-tags) - they have both "alpha" and "beta" markers with a somewhat opinionated flow attached - I'm not sure that level of granularity is necessary.

### Unanswered Questions

- If an operation is not marked as beta, but it is using a schema which is (i.e. as its request object), then it is implicitly also beta. Would this usage be considered invalid?
- Should `beta` and `deprecated` be mutually exclusive?

## Backwards compatibility

The `beta` field would default to false, meaning existing behaviour is preserved, and the new field is only used on an opt-in basis.

## Alternatives considered

- _Specification extensions_ - publishers could add an extension in their own domain, but the benefit of the metadata being available to downstream tools (including those used by consumers, not just publishers) would be lost.
- _Tags_ - as above, but this also gets to mixing other kinds of metadata in with resource taxonomy, which seems ill-advised.
- _Different API_ - this would be the least messy from a technical perspective - maintain a completely separate API for beta items, and then "promote" them to the main API once they are considered stable. This has increased overhead for publishers and consumers, and could also reduce the likelihood of getting feedback on, and early uptake of, beta items if they are segregated in a different place altogether.

