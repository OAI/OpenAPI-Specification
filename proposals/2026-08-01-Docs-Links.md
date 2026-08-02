# Link to multiple external docs resources

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2026-08-01-Docs-Links](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2026-08-01-Docs-Links.md})|
|Authors|[Lorna Mitchell](https://github.com/lornajane)|
|Review Manager |TBD |
|Status |Proposal|
|Implementations |[Click Here](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{YYYY-MM-DD-Short-Name}/implementations.md)|
|Issues |[#1034](https://github.com/OAI/OpenAPI-Specification/issues/1034)|
|Previous Revisions ||

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |

## Introduction

Describe more and different external resources by allowing more links with more metadata than is currently supported by `externalDocs`.

## Motivation

The existing `externalDocs` allows a single name/url combination to be referenced from each place that the field is supported (description root, tags, operations, and schemas). It doesn't say what sort of docs it is, and doesn't allow more than one. By supporting multiple links, we could allow an API description to provide API docs and a changelog and the list of error codes and a link to some other information.

I see a lot of links in description fields, or additions such as `x-documentation` extensions, to compensate for the limitations in `externalDocs`. This should be supported in the API description format, and **is our second most upvoted issue**.

## Proposed solution

I propose a two-part solution: 

* add a new field `externalLinks` that supports an array of External Docuemntation objects, everywhere that `externalDocs` is currently supported, and deprecate the `externalDocs` field
* improve/extend the External Documentation object to include an optional `summary` field alongside the existing `url` (required) and `description` (optional, supports CommonMark) fields

By keeping the documentation objects that we aready have and switching to an array of the instead of a single one, the upgrade path is very easy for anyone wanting to adopt the new field.
A mechanism for multiple links gives the opportunity to link to multiple different resources in support on an API, operation, tag or schema.
One array is a better place to look than a series of inconsistently named items; after externalDocs, you might see x-documentation or other extensions used for each additional reference.
Naming it without "docs" makes it more obvious that this field can also be used to link to another type of resource if that is useful for the API.

Agents can be provided more (potentially smaller) resources for context, and these can be scoped specifically to each operation, for example.

### Example

This example shows an `externalLinks` entry at the root of an OpenAPI description, with links to API docs and authentication information.

```yaml
openapi: 3.2.0
title: Very Interesting Test API
externalLinks:
  - url: https://example.com/api-docs
    summary: API Documentation
  - url: https://example.com/docs/authenticating-your-api-client
    summary: Authentication Overview
    description: Details on authentication and how to register for application keys
```

## Detailed design

The sections below describe the anticipated edits to the specification document (based on OpenAPI 3.2).

<hr>

In **OpenAPI Object -> Fixed Fields** and similarly in `tags`, `schemas`, and `operations`:

| Field Name | Type | Description |
| ---- | :----: | ---- |
| <a name="oas-external-docs"></a>externalDocs | [External Documentation Object](#external-documentation-object) | Additional external documentation. <br><br>**Deprecated:** The `externalDocs` field has been deprecated in favor of the `externalLinks` keyword that supports an array of objects. |
| <a name="oas-external-links"></a>externalLinks | [[External Documentation Object](#external-documentation-object)] | An array of additional resources such as documentation. |

<hr>

In **External Documentation Object**:

Allows referencing an external resource for external documentation or additional context.

#### Fixed Fields

| Field Name | Type | Description |
| ---- | :----: | ---- |
| <a name="external-doc-summary"></a>summary | `string` | A short summary of the linked resource, used for display purposes. |
| <a name="external-doc-description"></a>description | `string` | A description of the linked resource. [CommonMark syntax](https://spec.commonmark.org/) MAY be used for rich text representation. |
| <a name="external-doc-url"></a>url | `string` | **REQUIRED**. The URI for the linked resource. This MUST be in the form of a URI. |

This object MAY be extended with [Specification Extensions](#specification-extensions).

#### External Documentation Object Example

```yaml
name: API reference
description: Interactive API documentation
url: https://example.com/api-docs
```

<hr>

## Backwards compatibility

Since we can't just make the current `externalDocs` field into an array without breaking things, I've recommended a similar-but-looser naming of `externalLinks` to contain an array of the existing External Documentation objects. These items have `url` as the only required field, and are not restricted to documentation only.

Although the existing field is marked deprecated, tooling can continue to support it, and the similar structure makes migrating to the new approach painless.

## Alternatives considered

Considered:
 - naming it `docLinks` which is a bit catchier and not so similar to be confusing (but maybe so different that the relationship isn't obvious).
 - adding a `kind` field and going down a whole registry path of different types of docs - we could still do this, now or later, but I don't think it's essential.
 - using `name` rather than `summary` but since it's an optional field and it's going alongside description, summary is more in keeping with our existing patterns.
 - only permitting this new field at the top level; but I think it could make sense in any context so we should not be restrictive.

