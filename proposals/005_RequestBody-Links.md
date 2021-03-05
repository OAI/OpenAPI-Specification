# Feature name

### Isomorphic Request Body Links

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[005](https://github.com/luckybroman5/OpenAPI-Specification/tree/master/proposals/005_RequestBody-Links.md)|
|Authors|[@luckybroman5](https://github.com/luckybroman5)|
|Review Manager |TBD |
|Status |Proposal|
|Issues |[1594](https://github.com/OAI/OpenAPI-Specification/issues/1594) [2196](https://github.com/OAI/OpenAPI-Specification/issues/2196) [1593](https://github.com/OAI/OpenAPI-Specification/issues/1593) [2122](https://github.com/OAI/OpenAPI-Specification/issues/1593)|
|Previous Revisions | N/A |

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
| 2nd March 2021 | Kade Green | Initial Draft |

## Introduction

This proposal is to support [`Link`](http://spec.openapis.org/oas/v3.1.0#link-object) objects on [`Operation`](http://spec.openapis.org/oas/v3.1.0#operationObject) objects. Simply put, if *Response A* returns a property called *Foo*, and *Foo* is intended to be used in *Request B*'s request body as property *Bar*, one would define a `Link` in *Bar*'s operation to indicate the value of *Bar* is **sourced** from *Foo*. 

## Motivation

In an ideal world, integration with Web APIs could be done entirely automatically. While the current OpenAPI Specification does have *some* support defining dependencies between requests using [links](http://spec.openapis.org/oas/v3.1.0#link-object), it is currently not possible to define relationships between response data and request data in the body for separate requests.

Perhaps the more prevalent use case for this is for **refresh tokens**. In most modern authentication mechanisms, a user is allowed the best of both words in terms of security and usability in that they are issued short lived authentication tokens along with longer lived refresh tokens for later. Although this relationship is somewhat obvious to a human, there are cases where it might be ambiguous. Further, it's impossible for a generated sdk to account for this connection.

By including a way to document these dependencies among data, generated clients could better serve their end users, there would be no ambiguity for human readers, and would open the door for richer forms of documentation like a dependency graph visualization.

## Proposed solution

Allow [Links](http://spec.openapis.org/oas/v3.1.0#link-object) to exist at the root level of an [Operation](http://spec.openapis.org/oas/v3.1.0#operationObject), rather than solely in a [Response](http://spec.openapis.org/oas/v3.1.0#responses-object) object. When defined at the `Operation` Level, each link would represent a link to a request from where to source information. The `link.operationId` would reference the "source" request. This would allow for describing from where dependent parameters get their information to make the request. In addition, a new property would be added to the `Link` object that would be called `fragments`. This new property would contain [runtime expressions](http://spec.openapis.org/oas/v3.1.0#runtime-expressions) that would evaluate which *fragments* to extract data from, and which *fragments* to populate that data with.

Some Explanations:
1. The request based `Link` object would allow for OpenAPI authors to reference response properties from OpenAPI documents they themselves do not own. For Example; A company named Foo handles billing through PayPal. This company has a billing API, and updates a plan using the PayPal [user_id](https://developer.paypal.com/docs/api/identity/v1/#userinfo-get-response). An author at company Foo could reference PayPal's OpenAPI document in theirs, opening the door for even richer sdk generation as well as many other possibilities.
2. The `Fragments` property is more discreet than having separate properties to define whether a given response fragment belongs in a subsequent request's header, body, or path. For example: `$response.header.req_id` mapping to `$request.body#requestId` or `$response.header.req_id` mapping to `$request.header.requestId`.
3. It's easier to think about dependencies of requests from within the request itself.


## Detailed design

### Amendment to `Link` Object

`Links` can now exist on `Operation` objects

#### New Fields:

**Fragments**
Key: `fragments`
type: Array of `Fragment` objects

**Fragment**
|Field Name |Type |Description |
|---- | ---------------- | ---------- |
| src | runtime expression | expresses from where in the source request to apply to `dest` |
| dest | runtime expression | expresses to where the `src` output should be applied |
| required | boolean | if not obtained, the request should fail. Default is false |

#### Examples:

```
'/user/{id}/bestfriend':
  ...
  get:
    description: Gets a user's best friend
    operationId: getUserBestFriend
    responses:
      '200': null
      description: pet response
      content:
        application/json: null
        schema:
          type: object
          properties:
            Id:
              type: integer
              format: int64

...

'/user/{id}/message':
  ...
  put:
    description: send a happy greeting to a friend
    operationId: sendMessage
    links:  # <-- Links can now exist here
      arbitraryName:
        operationId: getUserBestFriend
        fragments: # <-- New Property for links
          - src: '$response.body#/id'
            dest: '$request.body#/from'
            required: true
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              from:
                type: string
                description: another user's id from where the message originates
              message:
                type: string
                description: the message to send to the user
```

## Backwards compatibility

Since the modifications to existing Objects are purely additive and positional, there shouldn't be any issues with backwards compatibility. Should a `fragments` array be defined within a response's `Links` as the current standard supports, the effect is exactly the same.

It's acceptable for parameters to be defined in either `fragments` OR `parameters` within the `link` object, and is up to preference of the individual spec's author. Perhaps in later versions of OAS should this proposal become accepted, `parameters` might be deprecated.

## Alternatives considered

There are multiple ways to solve this problem that other people have suggested that are in fact extremely valid. Admittedly, this proposal is largely inspired from the ideas expressed by @anentropic. @anentropic's **proposal will from here on be referred to as ["apigraph"](https://apigraph.readthedocs.io/en/latest/reference/openapi-extensions.html)**, which is certainly a valid alternative. The proposal outlined here in this current markdown document, will be referred to as "this proposal".


Some differences between *this proposal* and *apigraph*, along with reasonings:
1. This proposal *reuses* the links object, allowing it be defined on the Operation level for a consuming request. Apigraph creates an entirely new object called `backLinks` that serves the same purpose.
- Most of the fields in the apigraph's `backlinks` object are repetitive, and already defined on the existing `Link` Object. **Isomorphism is probably simpler than overlapping-duplication**.
2. Apigraph includes `requestBodyParameters` that contains `map[JSONPointer]runTimeExpression`, while this proposal's equivilent contains a `src` and `dest` runtime expressions.
- The apigraph solution doesn't account for instances where a single response parameter should be fed into multiple request parameters.
- This proposal allows for parameters to be mapped to the target operation, allowing for more general usage than only pertaining to the requestBody
3. ApiGraph introduces a field called `chainId` to its `backlinks` object
- This is not a necessary change, and is proprietary to apigraph itself.
4. Apigraph introduces a field called `responseRef`
- There are now too many mutually exclusive ways to link back to the response, and this adds unnecessary bloat to the spec that tooling would need to support. (OperationId, OperationRef, ResponseRf, Response)

The general sentiment around ApiGraph and this proposal are the same in addressing these points:
1. `Inversion of Control` for the links object, or the ability for the request that requires the data to define the link, rather than the response that provides it
2. Ability to target specific request body elements from the link object.

Overall, this proposal aims to be a more concise and trimmed version of Apigraph. As previously mentioned in the TSC meeting on 4 March 2021, the adoption of links has been low perhaps due to complexity in their usage.
