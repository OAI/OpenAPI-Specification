# WebSockets

## Metadata

| Tag                | Value                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Proposal           | [2022-02-08-Websockets](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/2022-02-08-Websockets.md) |
| Authors            | [Balazs Edes](https://github.com/bali182)                                                                            |
| Review Manager     | TBD                                                                                                                  |
| Status             | Proposal                                                                                                             |
| Implementations    | -                                                                                                                    |
| Issues             | [#55](https://github.com/OAI/OpenAPI-Specification/issues/55)                                                        |
| Previous Revisions | -                                                                                                                    |

## Change Log

| Date       | Responsible Party | Description         |
| ---------- | ----------------- | ------------------- |
| 2022-02-08 | Balazs Edes       | First draft created |

## Introduction

This proposal aims to make [WebSocket](https://hu.wikipedia.org/wiki/WebSocket) api descriptions part of OpenAPI.

## Motivation

Currently the OpenAPI standard is limited to describing what the http standard allows. More and more applications make use of WebSockets, which is a simple and standard way to build event driven systems, and runs in the most important platform end users see: the browser. Since there is demand for it, I propose to add the ability to describe WebSockets in OpenAPI schemas, as HTTP/WebSocket apis often complement each other.

There are other initiatives to describe event driven messaging (eg.: [AsyncAPI](https://www.asyncapi.com)), but in terms of maturity I haven't seen anything close to OpenAPI. AsyncAPI is also trying to acomplish a wide array of other goals which delay it's maturity further. Looking at the traction that #55 gained over the years, I think it would be a reasonable goal to add the ability to describe WebSockets in OpenAPI.

## Proposed solution

This proposal aims to add a new `WebSocket Payload Object` type to the spec, and 2 additional fields to the [Operation Object](https://swagger.io/specification/#operation-object), `publish` and `subscribe` (better name suggestions are wellcome), that would allow us describing how to connect to a ws server, and what messages can we expect to receive or send.

**Example**

```yaml
openapi: "3.3.0"
paths:
  /sample-socket:
    get:
      operationId: "sampleSocket"
      publish:
        description: "Short description about the messages you can push towards the server"
        content:
          application/json:
            schema:
              oneOf:
                - $ref: "#/components/schemas/CreateUserSchema"
                - $ref: "#/components/schemas/DeleteUserSchema"
                - $ref: "#/components/schemas/LikePostSchema"
      subscribe:
        description: "Short description about the messages you can receive from the server"
        content:
          application/json:
            schema:
              oneOf:
                - $ref: "#/components/schemas/UserCreatedSchema"
                - $ref: "#/components/schemas/UserDeletedSchema"
                - $ref: "#/components/schemas/PostLikedSchema"
```

## Detailed design

The [WebSocket spec](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is currently very simple. From our point of view it allows:

1. Connecting to an endpoint using a URL
2. Sending messages in either binary or text format
3. Receiving messages in either binary or text format

This proposal aims to allow OpenAPI users to describe exactly the above mentioned points:

1. What URL can I connect to, to talk to this WebSocket?
2. What's the format and shape of data I'm allowed to send
3. What's the format and shape of data I can expect to receive

**Important**: This OpenAPI spec proposal doesn't concern itself with any frameworks, or any higher level abstractions people usually build on top of event driven messaging protocols, like topics/subjects/channels, implied message serialization, etc. It simply describes the above mentioned 3 points, and any further abstractions can be built on top of this, but not part of the core schema.

### Extension of the current OpenAPI spec

- Add a `WebSocket Payload Object` type (very similar to [Request Body Object](https://swagger.io/specification/#request-body-object), except the `required` field - which makes no sense here). It has the following fields:
  - `description`: `string` - A brief description of the payload.
  - `content`: `Map[string, `[Media Type Object](https://swagger.io/specification/#media-type-object)`]` The content of the payload.
- Add an optional field in the [Components Object](https://swagger.io/specification/#components-object) type, so payloads can be reused:
  - `webSocketPayloads`: `Map[string, WebSocket Payload Object]` - Reuseable payloads
- Add 2 optional fields on the [Operation Object](https://swagger.io/specification/#operation-object) type:
  - `publish`: [Reference Object](https://swagger.io/specification/#reference-object) | `WebSocket Payload Object` - describes the message(s) the client can publish/push to the server.
  - `subscribe`: [Reference Object](https://swagger.io/specification/#reference-object) | `WebSocket Payload Object` - describes the message(s) the client can receive from the server.

### Simple chat example

```yaml
openapi: "3.3.0"
components:
  schemas:
    ChatMessage:
      type: "object"
      required:
        - "from"
        - "to"
        - "message"
      properties:
        from:
          type: "string"
        to:
          type: "string"
        message:
          type: "string"
paths:
  /chat-using-socket:
    get:
      operationId: "chatSocket"
      publish:
        description: "You can publish chat messages to this server"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ChatMessage"
      subscribe:
        description: "You can expect chat messages from the server"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UserCreatedSchema"
```

### Simple chat, but reusing payloads

```yaml
openapi: "3.3.0"
components:
  schemas:
    ChatMessage:
      type: "object"
      required:
        - "from"
        - "to"
        - "message"
      properties:
        from:
          type: "string"
        to:
          type: "string"
        message:
          type: "string"
  webSocketPayloads:
    ChatMessagePayload:
      description: "A chat message payload"
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ChatMessage"
paths:
  /chat-using-socket:
    get:
      operationId: "chatSocket"
      publish:
        $ref: "#/components/webSocketPayloads/ChatMessagePayload"
      subscribe:
        $ref: "#/components/webSocketPayloads/ChatMessagePayload"
```

### Multiple message types

Note since channels/topics/subjects cannot be expressed we can use a union type with a discriminator to mimic this.

```yaml
openapi: '3.3.0'
components:
  schemas:
    CreateUserSchema: '...'
    DeleteUserSchema: '...'
    LikePostSchema: '...'
    PublishMessageSchema:
      discriminator:
        propertyName: 'action'
        mapping:
          CreateUser: '#/components/schemas/CreateUserSchema'
          CreateUser: '#/components/schemas/CreateUserSchema'
          LikePost: '#/components/schemas/LikePostSchema'
      oneOf:
        - $ref: '#/components/schemas/CreateUserSchema'
        - $ref: '#/components/schemas/DeleteUserSchema'
        - $ref: '#/components/schemas/LikePostSchema'
    UserCreatedSchema: '...'
    UserDeletedSchema: '...'
    PostLikedSchema: '...'
    SubscribeMessageSchema:
      discriminator:
        propertyName: 'type'
        mapping:
          UserCreated: '#/components/schemas/UserCreatedSchema'
          UserDeleted: '#/components/schemas/UserDeletedSchema'
          PostLiked: '#/components/schemas/PostLikedSchema'
      oneOf:
        - $ref: '#/components/schemas/UserCreatedSchema'
        - $ref: '#/components/schemas/UserDeletedSchema'
        - $ref: '#/components/schemas/PostLikedSchema'
paths:
  /sample-socket:
    get:
      operationId: 'sampleSocket'
      publish:
        description: 'Short description about the messages you can push towards the server'
        content:
          application/json:
            schema:
              - $ref: '#/components/schemas/PublishMessageSchema'
      subscribe:
        description: 'Short description about the messages you can receive from the server'
        content:
          application/json:
            schema:
              - $ref: '#/components/schemas/SubscribeMessageSchema'

```

## Backwards compatibility

As this change is additive (nothing is removed or modified in a non-backward compatible way) I don't see any backward compatibilty issues.

## Alternatives considered

There can be many alternatives, my motivation was to add support for WebSocket api descriptions, while

- Adding as few new concepts as possible
- Allowing reuse the same way as with all other parts of the schema, through `$ref`s
- Just describing what the standard allows (no frameworks)
- Not causing any breaking changes or backward compatibility issues
- I'm happy to take onboard any suggestions, alternatives, modifications to this! I'm sure there are many things I haven't thought of.
