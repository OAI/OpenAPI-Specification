# URIs for Tags


## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2025-03-20-URIs-for-Tags](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2025-03-20-URIs-for-Tags.md})|
|Authors|[Henry Andrews](https://github.com/handrews)|
|Review Manager | [Lorna Mitchell](https://github.com/lornajane) |
|Status | rejected |
|Implementations | n/a |
|Issues |[#2905 Allow the use of $ref and json pointer in tags](https://github.com/OAI/OpenAPI-Specification/issues/2905), consolidated into [#3853 Consolidated $ref-to-Some Object feature request](https://github.com/OAI/OpenAPI-Specification/issues/3853)|
|Previous Revisions |n/a|

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
|2025-03-20 | @handrews | Initial publication |
|2025-03-26 | @handrews | Document rejection |

## Introduction

Tags are the last remaining [implicit connection](https://spec.openapis.org/oas/v3.1.1#resolving-implicit-connections) that do not have a URI-based alternative for deterministic, universal referencing (Security Requirement Objects are fixed in [PR #4388](https://github.com/OAI/OpenAPI-Specification/pull/4388), currently awaiting re-approval after review feedback changes).
This proposal adds such an alternative, giving tags the same capabilities as all other similar mechanisms within the OAS.

## Motivation

### A user request and proposal

From @SandroG in issue #2905 (which is only closed because it was consolidated into #3853), which got two further thumbs-ups:

_**[NOTE:** The mechanism proposed here is **not** the one favored by this proposal, which is explained further down]_

> I have a large specification, which I need to break down in different files. I use an approach where each file is like a sub-specification that lists all endpoints regarding the same subject and then I include these endpoints in the main openapi file.
> The documentation of a tag is in the same file as the endpoint that uses it.
> 
> I'm not able to reuse that tag declaration in the main file, so I'm not able to include the description of the tag.
> 
> For example, I have a separate file for customer's endpoints

`customers.yaml`
```YAML
info:
...
tags:
  - name: Customer
    description: APIs to manage customers. A customer is a representation of ...
  
paths:
  /customers/{id}/:
    parameters:
      - name: id
        . . .
    get:
      . . .
  /customers/:
    . . .
```
> I need to do this:

`openapi.yaml`
```YAML
info:
...
tags:
  - $ref: "./customers.yaml#/tags/0"
  
paths:
  /customers/{id}/:
    $ref: "./customers.yaml#/paths/~customers~1{id}~1"
  /customers/:
    $ref: "./customers.yaml#/paths/~customers~1"
```

### Proof of confusion over tag to Tag Object resolution

In the above example, @SandroG proposes using `$ref` for Tag Objects to pull Tag Objects from one [OpenAPI Document](https://spec.openapis.org/oas/v3.1.1#openapi-document) into another, where they can be used by the `tags` field in Operation Objects.
This makes clear that they expect tags to be resolved from the _current document_, which may be a [referenced document rather than the entry document](https://spec.openapis.org/oas/v3.1.1#openapi-description).

However, in [3.0.4](https://spec.openapis.org/oas/v3.0.4#resolving-implicit-connections) and [3.1.1](https://spec.openapis.org/oas/v3.1.1#resolving-implicit-connections) we RECOMMEND (== SHOULD) that tag names are resolved to Tag Objects in the _entry document_.
This means that there is no way to resolve them from the current document, which is the mirror image of the problem as that encountered by @SandroG.

In today's TDC call, @lornajane stated that she expects tag names to be resolved from the entry document, and @kevinswiber expressed doubt that anyone implements anything else (sadly @SandroG does not mention their tool, which presumably resolves from the current document or else they would not have explained the issue in this way).

### Fragility of JSON Pointers with arrays

Tag Objects are ordered, and tools MAY treat the ordering as significant for presentation purposes.  JSON Pointers include the array index, which will change whenever someone decides to re-order the tag display, breaking any URI references that include a JSON Pointer.
However, the use of the `name` field and the requirement that all Tag Objects in a list have a unique name mean that it is only necessary to identify the OpenAPI Object (or as a simpler proxy, the OpenAPI Document) in which to find the list of Tag Objects.
Once the correct OpenAPI Document is identified, the list can be searched by name as it is now.

### Additional scenarios

Another scenario to consider is a standards group that is publishing OpenAPI Documents that are intended to be used by multiple API providers.
Such standards groups have no control over the entry documents used, so if they wish to provide Tag Objects, they MUST place them in the shared, referenced document.
If the API provider wishes to use those Tag Objects in their entry document, or in their own referenced documents, then they currently cannot do.

## Proposed solution

A new field or fields would be added to identify, with a URI, the OpenAPI Document from which a tag MUST be resolved.
This would bring tags into alignment with other implicitly resolved names (e.g. Schema names in the Discriminator Object and Security Scheme names in the Security Requirement Object), with the variation that only the Document rather than the exact Object is identified.

## Detailed design

In the Tag Object, a `parentDocument` field would be an optional URI qualifier to the `parent` field, and only allowed if `parent` is present.

In the Operation Object, a `tagRefs` field would be added alongside the `tags` field.
This new field would be a map with a Document URI as the keys, and an array of tags (as in the `tags` field) as the values.
Tags under `tagRefs` would be resolved within the document identified by the key, while tags within `tags` would continue to be RECOMMENDED to resolve from the entry document.

## Backwards compatibility

The proposal is fully backwards compatible.

## Alternatives considered

The option proposed by @SandroG would require the Operation Object's `tags` field to resolve from the current document, which would be a breaking change and therefore not possible in 3.2.

@baywet proposed a top-level (per-document) association of URIs and tags, to reduce the number of places where it is necessary to look for URIs.
However, this requires duplicating tags that would otherwise only appear in Operation Objects in the top-level field, and does not fully solve the namespacing issue as each tag could only resolve from one place, rather than allowing the same tag name to have different meanings by resolving it to a different Tag Object in a different document.

@karenetheridge proposed treating tags like `operationId` and resolving within the entire description (a PR to this proposal with more details of this alternative would be welcome).
To me, `operationId` is not a good precedent to follow, as we already have to provide numerous disclaimers regarding collisions in the specification text, and the results are not well-defined.
While we could make collisions an error for this new mechanism, @baywet noted that trying to prevent such collisions is highly burdensome in large organizations (although @karenetheridge similarly pointed to experience of it working).
The fact that `operationRef` had to be included to provide a URI-based alternative to using `operationId` in the Link Object is a strong piece of evidence in favor of a URI-based solution for tags.

## Outcome

Rejected per @lornajane, with concurrence by @ralfhandl:

> I am not in favour of these additions for the 3.x branch. I wish that we'd implemented tags differently in the first place, and I'm sure that all the constructive discussion around the tags feature will help us a lot in future major releases.
> 
> I believe that the limitations of the current tag situation can be overcome with helper tooling and that this change (while solving a narrow but valid use case) adds complexity to the specification that is unnecessary and does not benefit the majority of users. As custodians of a widely-used standard, we have a responsibility to maintain something that is appropriate for its audience, and we should be "reluctant" in all our changes unless we see that they are really needed.
> 
> I propose that users would be equally well served by leaving the requirement to resolve tags from the entry document. Organisations can either maintain an extensive list of tags in all OpenAPI documents, and then remove any that aren't used before publishing (tooling exists for this use case), or alternatively if a tool wants to include tags found in the wider context of referenced OpenAPI documents by adding them to the top-level tags array during processing, that would work well too.
> 
> The tags array is a list of strings. It isn't an ID like the Operation uses, and it's not a named entry like the security schemes, so it is appropriate to approach the limitations of it differently. My proposal is to offer some advice or documentation on approaching this problem, but not to bring it in scope of the specification for 3.x since other options are available.
