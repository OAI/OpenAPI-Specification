# Feature name
Path Archetype Property

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[2023-09-14-Path-Archetype-Property](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{2023-09-14-Path-Archetype-Property.md})|
|Authors|[Myron W. Walker](https://github.com/myronww)|
|Review Manager | TBD |
|Status |Proposal|
|Implementations |[Click Here](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/{YYYY-MM-DD-Short-Name}/implementations.md)|
|Issues |[3372](https://github.com/OAI/OpenAPI-Specification/issues/3372)|
|Previous Revisions |[{revid}](https://github.com/OAI/OpenAPI-Specification/pull/{revid}) |

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |

## Introduction

Provide a mechanism to convey path "archetype" information or information about the architectural patterns that a path implements.

## Motivation

When working with larger product API sets that span multiple features and teams, it is important to ensure that the "Paths" associated with the different features produce consistent patterns of behavior across the entire product API.  It is also equally important that API Paths communicate any patterns they are attempting to implement to the tools that will work with the API reflection document.

When API path sets are tested, the tests need to ensure that the path, properly implements all aspects of specific archetypical patterns.  For example, an api path that implements a 'editable-collection' pattern for users on '/v1/users/' might need to adhere to the following set of design rules:

* Provide a 'post' method for creating new collection items
* Provide a 'delete' method for removing items from the collection
* Provide a 'get' method for listing the items in the collection
* Provide a 'patch' method for updating an item
* Provide a 'put' method for replacing an item
* Return data in a standard collection form { items: [...], "total-count"=100, "page-count"=10, "page-num"=1, pages=10 }

Having the information about the archetype that an API is supposed to implement is critical for testing to ensure that the APIs are meeting architectural standards across the entire API.

When API path information is consumed by a code generation tool that is attempting to create an interop client, currently the tool must infer information about how to generate code for a path from different pieces of information from the URL, methods and method descriptions or possibly form method tags. This means that tools often cannot accurately distinguish implied patterns when bugs are present or missing elements of information. Tools can utilize the archetype identifier declared for a path to uniquely identify design and architectural patterns and then tune the generated code to better align with the intended behavioral patterns and functionality of an API

By providing archetype desciptions for paths, the OpenAPI document can play a vital role in ensuring that APIs are testable across larger API sets and that code generators have the informaiton they need to properly implement API interop patterns for APIs.

## Proposed solution

The proposed solution is to add an 'archetype' field that is declared for a path.  The archetype field provides a unique identifier that describes any special architectural design rules that a path should follow in its implementation and that provides detailed design information for code generation tool creators.

## Detailed design

To provide archetype information for paths, this design would add a field called 'archetype' to the 'path' specification.

The schema for a path-item would be modified to include an optional 'archetype' property.

"archetype": {
    "type": "string",
    "optional": true
},

The type of the new field is a string.  This would allow for any unique identifier to be used, but would also allow for URL based identifiers  Allowing for URL based identifiers means that the archetype field value can both serve as a unique identifier and at the same time refer an observer to a document that describes the design of the architypal pattern being declared.

The use of URLs for the archetype identifier would also allow for standard archetypes to be published for consumption and sharing across API sets.

As an example of how this might show up in an API set is in the design of APIs used to manage a collection of users.

"/v1/users": {
    "summary": "Path for working with the collection of users."
    "archetype": "http://someorg.com/api-docs/design/collection.md"
}


"/v1/users/{user-id}": {
    "summary": "Path for working with a single user."
    "archetype": "http://someorg.com/api-docs/design/collection-item.md"
}


## Backwards compatibility

The addition of a new field should not impact older code unless if the code was implemented with overly strict document processing mannerisms that will not handle the addition of a new field.

## Alternatives considered

The addition of an 'archetype' field for the path is the most flexible way to convey architectural pattern information to the API consumers in a flexible way that does not require explicit design on the part of the standards governing body.

