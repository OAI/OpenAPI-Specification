# Experimental marker

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[Experimental](https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2020-10-28-Experimental.md)|
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

A way to mark an aspect of the API as "experimental", indicating that it is not yet a fully stable and supported part of the API.

## Motivation

Consider an API with two categories of thing in it:

- Core, stable things, where we are committed to the ongoing stability and have no intention of making breaking changes.
- New, experimental things, where we are getting them out there for feedback and early adopters, but they may change before we consider them to be in the first category, or even just get removed.

These sit together fine in principle, but cause friction when trying to apply something like semver to the API as a whole. How do we make changes to the experimental stuff - without bumping the major version several times a year and scaring consumers - while also ensuring we can't make breaking changes to the core stuff we never _want_ to break.

## Proposed solution

Add an "experimental" field which specifies that an items in the API is not yet fully stable and supported, may change or be removed without a major version bump, and as such should be used with caution.

_(I don't have a strong opinion about the naming - "beta" is another idea, though I think "experimental" does the job better in terms of being the most noncommital.)_

Downstream tools could then make use of this metadata:

- Tools like swagger-ui could surface this in the documentation they generate so consumers are made aware. Experimental items could also be filtered out of the documentation and stubs if desired.
- Tools for detecting and preventing breaking changes could take this into consideration when deciding whether a change is breaking.

## Detailed design

A new boolean field named `experimental`, defaulting to `false`, is added to:

- Operation
- Parameter
- Schema

This specifies that the operation, parameter or schema is not yet stable and SHOULD be used with caution.

### Operation Object

...

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
... | ... | ...
<a name="operationExperimental"></a>experimental | `boolean` | Specifies that an operation is in experimental status, meaning it may change outside of the normal breaking change process. Consumers SHOULD use with caution. Default value is `false`.

### Parameter Object

...

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
... | ... | ...
<a name="parameterExperimental"></a>experimental | `boolean` | Specifies that a parameter is in experimental status, meaning it may change outside of the normal breaking change process. Consumers SHOULD use with caution. Default value is `false`. Cannot be `true` when the parameter is `required`.

### Schema Object

...

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
... | ... | ...
<a name="schemaExperimental"></a>experimental | `boolean` | Specifies that a schema is in experimental status, meaning it may change outside of the normal breaking change process. Consumers SHOULD use with caution. Default value is `false`.

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
      experimental: true
```
### Prior Art

This kind of requirement is handled for TypeScript libraries by [api-extractor](https://api-extractor.com/pages/tsdoc/doc_comment_syntax/#release-tags) - they have both "alpha" and "beta" markers with a somewhat opinionated flow attached - I'm not sure that level of granularity is necessary. But the "beta" and "public" ones map well to the motivations described here:

> - **beta**: Indicates that an API item has been released as a preview or for experimental purposes. Third parties are encouraged to try it and provide feedback. However, a “beta” API should NOT be used in production, because it may be changed or removed in a future version.
> - **public**: Indicates that an API item has been officially released, and is now part of the supported contract for a package. If the SemVer versioning scheme is used, then the API signature cannot be changed without a MAJOR version increment.

### Unanswered Questions

- If an operation is not marked as experimental, but it is using a schema which is (i.e. as its request object), then it is implicitly also unstable. Would this usage be considered invalid?

## Backwards compatibility

The `experimental` field would default to false, meaning existing behaviour is preserved, and the new field is only used on an opt-in basis.

`experimental` can coexist with `deprecated` - an operation, parameter or schema can be both experimental and deprecated, having never gotten to a stable point before being deprecated.

## Alternatives considered

- _Specification extensions_ - publishers could add an extension in their own domain, but the benefit of the metadata being available to downstream tools (including those used by consumers, not just publishers) would be lost.
- _Tags_ - as above, but this also gets to mixing other kinds of metadata in with resource taxonomy, which seems wrong.
- _Overlays_ - The [Overlays proposal](https://github.com/OAI/OpenAPI-Specification/blob/main/proposals/2019-12-24-Overlays.md) is sufficiently powerful to be able to implement this, with a canonical spec representing the stable API and an overlay used to apply experimental additions. Downsides: not as ergonomic for authors, the OpenAPI specification would still not have "experimental" as a first-class concept so there'd be reliance on conventions being observed across the ecosystem for how it's done with overlays.
- _Different API_ - this would be the least messy from a technical perspective - maintain a completely separate API for experimental items, and then "promote" them to the main API once they are considered stable. This has increased overhead for publishers and consumers, and could also reduce the likelihood of getting feedback on, and early uptake of, experimental items if they are segregated in a different place altogether.

