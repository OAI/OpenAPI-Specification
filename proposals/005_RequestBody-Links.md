
# Feature name


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

This proposal is to support `Link` objects on `Operation` objects. Simply put, if *Response A* returns a property called *Foo*, and *Foo* is intended to be used in *Request B*'s request body as property *Bar*, one would define a `Link` in *Bar*'s operation to indicate the value of *Bar* is **sourced** from *Foo*. 

## Motivation

In an ideal world, integration with Web API's could be done entirely automatically. While the current OAS Specification does have *some* support defining dependencies between requests using [links](https://swagger.io/docs/specification/links/), it is currently not possible to define relationships between response data and request data for separate requests. Although in practice many parameters are used this way, perhaps the more prelevant use case is for **refresh tokens**. In most modern authentication mechanisms, a user is allowed the best of both words in terms of security and usability in that they are issued short lived authentication tokens along with longer lived refresh tokens for re-authentication later. All though this relationship is somewhat obvious to a human, there are cases where it might be ambiguous. Further, it's impossible for a generated sdk to account for this connection. By including a way to document these dependencies among data, generated clients could better serve their end users, there would be no ambiguidy for human readers, and would open the door for richer forms of documentation like a dependency graph visualization.

## Proposed solution

Allow [Link](https://swagger.io/docs/specification/links/) objects to exist at the root level of an [Operation](https://swagger.io/specification/#operation-object). This would allow for describing from where dependent parameters get their information to make the request. In addition, a new poperty would be added to the `Link` object that would be called `fragments`. This new property would contain [runtime expressions](https://swagger.io/specification/#runtime-expression) that would evaluate which *fragments* to extract data from, and which *fragments* to populate that data with.

Some Explanations:
1. The request based `Link` object would allow for OpenAPI authors to reference response properties from Specifications they themselves do not own. For Example; A company named Foo handles billing through paypal. This company has a billing API, and updates a plan using the paypal [user_id](https://developer.paypal.com/docs/api/identity/v1/#userinfo-get-response). An author at company Foo could reference Paypal's swagger spec in theirs, opening the door for even richer sdk generation as well as many other possibilities.
2. The `Fragments` property is more discrete than having separate properties to define whether a given response fragment belongs in a subsequent request's header, body, or path. For example: `$response.header.req_id` mapping to `$request.body#requestId` or `$response.header.req_id` mapping to `$request.header.requestId`.
3. It's easier to think about dependencies of requests from within the request itself.


## Detailed design

### Ammendment to `Link` Object

`Links` can now exist on `Operation` objects

#### New Fields:

**Fragments**
Key: `fragments`
type: Array of `Fragment` objects

**BodyFragment**
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

Since the modifications to existing Objects is purely additive and positional, there shouldn't be any issues with backwards compatibility. Should a `fragments` array be defined within a response's `Links` as the current standard supports, the effect is exactly the same.

It's acceptable for parameters to be defined in either `fragments` OR `parameters` within the `link` object, and is up to preference of the individual spec's author. Perhaps in later versions of OAS should this proposal become accepted, `parameters` might be deprecated.

## Alternatives considered

There are multiple ways to solve this problem that other people have suggested that are in fact extremely valid. This Proposal is trying to make all parties happy by addressing each of the three major points each alternative independently address:

1 - Allow for OpenAPI authors to reference response properties from Specifications they themselves do not own. aka ["Backlinks"](https://apigraph.readthedocs.io/en/latest/reference/openapi-extensions.html#x-apigraph-backlinks-components)
2 - Set a field in the target operation's request body [Proposal](https://apigraph.readthedocs.io/en/latest/reference/openapi-extensions.html#x-apigraph-requestbodyparameters)

While this proposal is very similar to the proposal for both 1 & 2, efforts to reach out them have failed, so I have gone forward with my own more condenced and concise version. I do feel that consideration of these alternative solutions is extremely important as the larger issue is support for these points in general.