# Webhooks


## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[002_Webhooks](https://github.com/OAI/OpenAPI-Specification/tree/master/proposals/002_webhooks.md)|
|Authors|[Lorna Mitchell](https://github.com/lornajane)|
|Review Manager |TBD |
|Status |Proposal|
|Issues |[#1968](https://github.com/OAI/OpenAPI-Specification/issues/1968)|

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
| 17th July 2019 | Lorna Mitchell | Initial draft |

## Introduction

Modern APIs often consist of two-way API traffic, but OpenAPI currently only supports some types of requests. Standard client-to-server API calls are well supported. Server-to-client callbacks are only supported if they are the result of an earlier API call and are documented by nesting under the path of that earlier call. Incoming HTTP reqests ("webhooks") cannot be described in the current version of OpenAPI if they are the result of subscription arranged outside of the scope of the API (e.g. by setting a callback URL in a web interface).

## Motivation

OpenAPI supports a `callback` element, where the result of an API call is delivered at some later time as an incoming HTTP request to a nominated URL. However it does not support webhooks, where events arrive as an incoming HTTP request but the configuration of these requests was arranged outside of the scope of the API, e.g. on a website.

For example: at Nexmo we have an SMS API (the docs are here: <https://developer.nexmo.com/api/sms> and the source spec here: <https://github.com/Nexmo/api-specification/blob/master/definitions/sms.yml>). It supports:

* sending an SMS (an outgoing API call, currently supported)
* receiving a delivery receipt when you just sent an SMS (callback, currently supported)
* receiving an incoming SMS (webhook, not currently supported)

The docs have an `x-webhooks` top-level element (we use [our own docs renderer](https://github.com/Nexmo/nexmo-oas-renderer)) and then a meaningless URL fieldname before the path item object that descrives the webhook.

On one of the other Nexmo APIs, we simply documented our webhooks in a markdown file separate from our API even though the two directions are very closely linked (see [Voice API webhook reference](https://developer.nexmo.com/voice/voice-api/webhook-reference) ).

Neither solution is great. I'm aware of other organisations (Ebay, GitHub) who also offer webhooks as part of their API platform who have run into the same problems when looking to adopt OpenAPI. The existing approach for callbacks, which allow a Path Item Object to be described in another location, could be adapted to also describe webhooks.

## Proposed solution

Allow a top-level `webhooks` element, with named entries inside it, each containing a Path Item Object. No other new fields or changes would be needed, since this already works brilliantly for `callbacks` within a path item. The only difference here is that there's no existing path item for the callback/webhook to belong to, and the URL is usually set somewhere else by the user (and there's no request context for an expression to be evaluated).

This solution builds on the existing proven approach for callbacks, but detaches them from the following-a-previous-API-call constraint.

To borrow the Nexmo SMS API example from above (because it's simple, I can add more examples as needed), the spec for the incoming webhook that occurs because a message has arrived might look like this:

```
webhooks:
  inbound-sms:
    post:
      summary: Inbound SMS to your Nexmo number
      operationId: inbound-sms
      description: |
        If you rent one or more virtual numbers from Nexmo, inbound messages to that number are sent to your [webhook endpoint](https://developer.nexmo.com/concepts/guides/webhooks).
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - msisdn
                - to
                - messageid
                - text
                - type
                - keyword
                - message-timestamp
              properties:
                msisdn:
                  type: string
                  description: the phone number that this inbound message was sent from. numbers are specified in e.164 format.
                  example: '447700900001'
                to:
                  type: string
                  description: the phone number the message was sent to. **this is your virtual number**. numbers are specified in e.164 format.
                  example: '447700900000'
                messageid:
                  type: string
                  description: the id of the message
                  example: 0a0000000123abcd1
                text:
                  type: string
                  description: The message body for this inbound message.
                  example: Hello world
                type:
                  type: string
                  description: |
                    Possible values are:

                      - `text` - standard text.
                      - `unicode` - URLencoded   unicode  . This is valid for standard GSM, Arabic, Chinese, double-encoded characters and so on.
                      - `binary` - a binary message.
                  example: 'text'
                keyword:
                  type: string
                  description: The first word in the message body. This is typically used with short codes.
                  example: Hello
                message-timestamp:
                  description: The time when Nexmo started to push this Delivery Receipt to your webhook endpoint.
                  type: string
                  example: 2020-01-01 12:00:00
      responses:
        '200':
          description: |
            Your server returns this code if it accepts the callback. Note that
            Nexmo will retry messages that are not successfully acknowledged.
```

## Detailed design

### Add the `webhooks` top-level element to the list

**Existing Spec:**

```
#### <a name="oasObject"></a>OpenAPI Object

This is the root document object of the [OpenAPI document](#oasDocument).

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="oasVersion"></a>openapi | `string` | **REQUIRED**. This string MUST be the [semantic version number](https://semver.org/spec/v2.0.0.html) of the [OpenAPI Specification version](#versions) that the OpenAPI document uses. The `openapi` field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document. This is *not* related to the API [`info.version`](#infoVersion) string.
<a name="oasInfo"></a>info | [Info Object](#infoObject) | **REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.
<a name="oasServers"></a>servers | [[Server Object](#serverObject)] | An array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](#serverObject) with a [url](#serverUrl) value of `/`.
<a name="oasPaths"></a>paths | [Paths Object](#pathsObject) | **REQUIRED**. The available paths and operations for the API.
<a name="oasComponents"></a>components | [Components Object](#componentsObject) | An element to hold various schemas for the specification.
<a name="oasSecurity"></a>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition.
<a name="oasTags"></a>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
<a name="oasExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation.

This object MAY be extended with [Specification Extensions](#specificationExtensions).
```

**Change: Add to the end of the table**

```
<a name="oasWebhooks"></a>webhooks | [[Webhooks Object](#webhooksObject)] | The incoming webhooks that may be received as part of this API.
```

### Describe a new Webhook Object

(new spec section)

```
#### <a name="webhooksObject"></a>Webhooks Object

A map of webhooks that may be received as incoming HTTP requests as part of the API. The key of the map is a unique short name for the webhook e.g. `messageEvent`. Each value in the map is a [Path Item Object](#pathItemObject) that describes a set of requests that may be initiated by the API provider and the expected responses.

Webhook Objects differ from [Callback Objects](#callbackObject) in that the webhooks are the result of some external event, not an earlier API call to subscribe or cause some other effect.

##### Webhook Object Example

The following example shows an incoming webhook delivering a status update for a particular item ID:

````yaml
webhooks:
  statusUpdate:
    requestBody:
      description: Status updates on an item. You can set the URL for these updates in your example.com dashboard.
      content: 
        'application/json':
          schema:
              type: object
              required:
                - item_id
                - status
              properties:
                item_id:
                  type: string
                  description: The ID of the item
                  example: 0a000000012345678
                status:
                  type: integer
                  description: The status of this message, zero for success
                  example: 14
    responses:
      '200':
        description: webhook successfully processed and no retries will be performed

```

## Backwards compatibility

Adding a new top-level entry is not something to take lightly, however hopefully most tools will simply ignore what they weren't expecting and continue to operate on the parts of the spec they do understand until their functionality catches up with the spec change.

## Alternatives considered

Another option is to add a special `path` that could contain the various webhooks using the exisiting `callback` syntax but existing tools which aren't expecting this special value may not handle it well, so this option was discounted.
