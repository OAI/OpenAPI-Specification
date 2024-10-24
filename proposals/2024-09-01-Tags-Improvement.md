# Tags Improvement


## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2024-09-01-Tags-Improvement](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2024-09-01-Tags-Improvement.md})|
|Authors|[Lorna Mitchell](https://github.com/lornajane)|
|Review Manager | TBD |
|Status |Proposal|
|Implementations | |
|Issues | [1367](https://github.com/OAI/OpenAPI-Specification/issues/1367), [2843](https://github.com/OAI/OpenAPI-Specification/issues/2843), |
|Previous Revisions | None, but see [Moonwalk discussion](https://github.com/OAI/sig-moonwalk/discussions/67)

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
| 2024-09-01 | @lornajane | Initial draft |

## Introduction

Evolve the existing `tags` implementation to (optionally) support more use cases, such as giving the tags some grouping/relationships and adding more metadata.

## Motivation

The tags feature hasn't changed since the spec was still called Swagger, but it's one of the most-extended aspects of OpenAPI with most tools supporting some sort of grouping or additional metadata. One motivation for this proposal is to "pave the cowpath" and formalise some of the patterns from those extensions as part of the specification.

The existing tags implementation is also quite limiting, so users/tools feel they "cannot" use tags, because they are so widely implemented for documentation navigation and required exactly one tag per operation, to be used only for this single purpose or to be opted out using extensions such as `x-traitTag`. The result is that we see lots of extensions that add arbitrary metadata to operations, some of them even become part of the specification officially (looking at you, `deprecated: true`) or being so widely used that we should probably adopt them (`x-internal`, `x-experimental`). The specification does have a way of tagging operations, but it's too limited and the result is that everything has to be added as an extension field.

On a personal note, I work for a tool vendor and was proposing these changes internally; but the problems affect all OpenAPI users so I brought it to the main project.

### Supporting evidence

There are several examples "in the wild" of where a better tags implementation would have helped. Here is a selection of publicly-accessible examples to illustrate some of the problems this proposal could help with:

- Grouping of tags is a very common use case, almost everyone uses some sort of extra hierarchy to group the tags themselves, which makes sense as our APIs are only getting more complex, something like [`x-tagGroups`](https://redocly.com/docs/api-reference-docs/specification-extensions/x-tag-groups/) is a good example - and there's a [very active open issue on OpenAPI specification itself](https://github.com/OAI/OpenAPI-Specification/issues/1367)
- Various tag-alike additions exist, sometimes called "badges" or similar; I'd include extensions such as [`x-internal`](https://redocly.com/docs/cli/guides/hide-apis/#step-1-add-x-internal-to-the-api-description) as a tag-alike since they could be tags if more than one tag (or tag type) could be applied.
- Additional display metadata is also in active use in the wild, see [`x-displayName`](https://redocly.com/docs/api-reference-docs/specification-extensions/x-display-name) and this [OpenAPI specification issue](https://github.com/OAI/OpenAPI-Specification/issues/2843)

## Proposed solution

Originally proposed in a [Moonwalk discussion](https://github.com/OAI/sig-moonwalk/discussions/67), I am proposing three backwards-compatible additions to the existing tags feature:

* Tags get a `summary` alongside `name` and `description`. In keeping with our existing practices: name is the identifier, summary is the short display content, and description is available in contexts where more information is appropriate.
* A `parent` field is added to support a hierarchy without adding either separators or a new data type. Your tag can belong to another tag.
* A `kind` field to explain which family of tags this tag belongs to (previously proposed as `type`). We'd expecting these to be `nav`, `badge`, `internal` and probably some other things that other tooling types would find useful.

An example could look something like this:

```yaml
tags:
- name: deprecated
  kind: internal
  summary: Deprecated
  description: This operation has been deprecated and will be removed in the future. Avoid using items with this tag.
- name: shop
  kind: nav
  summary: Order Online
  description: Operations relating to the retail operations behind the [online shopping site](https://example.com/shopping).
- name: products
  kind: nav
  parent: shop
  summary: Products
  description: View and manage the product catalog.
- name: orders
  kind: nav
  parent: shop
  summary: Online Orders
  description: Place, fulfil and invoice orders for the online shop.

```

Rather than making an allowed list of kinds, we will instead leave that open for user extension and keep a list of the recommended/expected types in a registry and evolve that as conventions emerge.

## Detailed design

The following section is an updated specification section, for the top-level tags object only (no other changes are needed):

---

#### Tag Object

Adds metadata to a single tag that is used by the [Operation Object](#operation-object).
Each tag used in the Operation Object instances MAY have a Tag Object defined.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="tagName"></a>name | `string` | **REQUIRED**. The name of the tag. Use this value in the `tags` array of an Operation.
<a name="tagSummary"></a>summary | `string` | A short summary of the tag, used for display purposes.
<a name="tagDescription"></a>description | `string` | A description for the tag. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation.
<a name="tagExternalDocs"></a>externalDocs | [External Documentation Object](#external-documentation-object) | Additional external documentation for this tag.
<a name="tagParent"></a>parent | `string` | The `name` of a tag that this tags is nested under. The named tag MUST exist in the API description, and circular references between parent and child tags MUST NOT be used.
<a name="tagKind"></a>kind | `string` | A machine-readable string to categorize what sort of tag it is. Common uses are `nav` for Navigation, `badge` for badges, `internal` for internal APIs, but any string value can be used. A registry of known values is available.

This object MAY be extended with [Specification Extensions](#specification-extensions).

##### Tag Object Example

```json
{
  "name": "account-updates",
  "summary": "Account Updates",
  "description": "Account update operations",
  "kind": "nav"
},
{
  "name": "partner",
  "summary": "Partner",
  "description": "Operations available to the partners network",
  "parent": "external",
  "kind": "audience"
},
{
  "name": "external",
  "summary": "External",
  "description": "Operations available to external consumers",
  "kind": "audience"
}
```

```yaml
- name: account-updates
  summary: Account Updates
  description: Account update operations
  kind: nav

- name: partner
  summary: Partner
  description: Operations available to the partners network
  parent: external
  kind: audience

- name: external
  summary: External
  description: Operations available to external consumers
  kind: audience
```

---

## Backwards compatibility

All new fields are optional, so existing API descriptions will remain valid and useful.
Some users may wish to adopt some of the following steps on upgrade:

- Set `kind: nav` if their existing tags are currently used for navigation entries in documentation tooling.
- Change `x-displayName` in `tag` objects to `summary` instead.
- Add a tag to replace each `x-tagGroups` entry, and set the `parent` field for each of the tags in the groups.
- Change `x-badges` extensions to instead be a tag with `kind: badge`.
- Change features like `x-internal` to be a tag with a specific `kind` set. Similarly some lifecycle use cases such as `x-beta` could be replaced with tags.

## Alternatives considered

- Continue to use tags as-is, and extend the spec for each use case that users need rather than providing an open metadata implementation.
  We've been slow to iterate and I would rather "open" the options than try to control them.
  The API space evolves quite quickly.

- Set `children` rather than `parent` on the tags and operate a top-down relationship.
  The suggestion of allowing multiple links or a graph approach was also mentioned.
  In both cases, there are good ideas in every direction, but our responsibility is to implement a structure that users can easily understand and maintain.

