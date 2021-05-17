# Server Variable types


## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[005_Server Variable Types](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/005_Server%20Variable%20types.md) |
|Authors|[Jon Ursenbach](https://github.com/erunion)|
|Review Manager |TBD |
|Status |Proposal|
|Implementations ||
|Issues ||
|Previous Revisions ||


## Changelog

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
| 17th May 2021 | Jon Ursenbach | Initial draft |

## Introduction

A way to give server variables identifiable information for how they're used within a URL.

## Motivation

With the webs adoption of the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) and the deprecation of the [`url.parse()` Node.JS API](https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost), as a tooling implementer it has become difficult to validate user input according to what constitutes a valid URL without having detailed implementation details of where a given variable falls into place.

For example:

```json
{
  "servers": [
    {
      "url": "https://{subdomain}.example.com:{port}",
      "variables": {
        "subdomain": {
          "default": "demo"
        },
        "port": {
          "default": "65536"
        }
      }
    }
  ]
}
```

The URL generated with these server defaults will be invalid because the maximum allowable `port` in a URL is 65535. And without additional regex and try-catch work to manage these URL composition quirks and failures, it's difficult to ascertain if a server variable is truly valid or not.

## Proposed solution

Add a `type` property to server variables that maps to a strict list of types that can be inferred from the [WHATWG URL standard](https://url.spec.whatwg.org).

And since this field is only going to be useful if it's present, it should be modeled directly after parameters and schemas and be required.

## Detailed design

* `type` within the [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject) **should** be required.
* Types that are present that do not exist within the below list **should** produce an invalid API definition.

### Available Types

* `scheme` &mdash; The protocol of the URL: `https`, `http` ,`ftp`, `udp`, etc.
  * This maps directly to [scheme](https://url.spec.whatwg.org/#concept-url-scheme) within the [WHATWG URL standard](https://url.spec.whatwg.org) and [protocol](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol) in the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
  * It can on contain a trailing `:` or `://`.
* `domain` &mdash; This is a full domain or host for the URL: `eu.api.example.com`, `api.example.com`, `example.com`, `127.0.0.1`.
  * This maps directly to [host](https://url.spec.whatwg.org/#host-representation) within the [WHATWG URL standard](https://url.spec.whatwg.org) and [hostname](https://developer.mozilla.org/en-US/docs/Web/API/URL/hostname) within the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
  * It can contain `subdomain` within itself.
  * It cannot contain ports.
* `subdomain` &mdash; Preceding chunks of a `domain`: `eu` in `eu.api.example.com`, or `api` in `api.example.com`.
  * This has no direct mapping to the [WHATWG URL standard](https://url.spec.whatwg.org) or [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
* `port` &mdash; The port to access on the `host`.
  * This maps directly to [port](https://url.spec.whatwg.org/#concept-url-port) within the [WHATWG URL standard](https://url.spec.whatwg.org) and [port](https://developer.mozilla.org/en-US/docs/Web/API/URL/port) within the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
  * It must be an integer between 0 and 65535.
  * Since `enum` and `default` within the [Server Variable Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#serverVariableObject) are strings, it'll be up to the implementor to convert this value to an `integer` before validating it.
* `tld` &mdash; The TLD of the `domain`.
  * This has no direct mapping to the [WHATWG URL standard](https://url.spec.whatwg.org) or [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
  * Can contain any string.
  * The implementor should worry about validating the TLD because [the list of available TLDs so extensive](https://data.iana.org/TLD/tlds-alpha-by-domain.txt).
* `path` &mdash; Anything after the `domain`.
  * This maps directly to [path](https://url.spec.whatwg.org/#concept-url-path) in the [WHATWG URL standard](https://url.spec.whatwg.org) and [pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) in the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
  * Can contain any available characters within a path according to RFC 3986.
* `query` &mdash; Any query string that should apply on the server URL.
  * Maps directly to [query](https://url.spec.whatwg.org/#concept-url-query) in the [WHATWG URL standard](https://url.spec.whatwg.org) and [search](https://developer.mozilla.org/en-US/docs/Web/API/URL/search) in the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).
* `fragment` &mdash; Any URL fragment that comes at the end of the URL.
  * Maps directly to [fragment](https://url.spec.whatwg.org/#concept-url-fragment) in the [WHATWG URL standard](https://url.spec.whatwg.org) and [hash](https://developer.mozilla.org/en-US/docs/Web/API/URL/hash) in the [URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL).

### Unsupported types

Types that should **not** be supported because they're already represented or otherwise available elsewhere within the OpenAPI Specification:

- `username`: https://url.spec.whatwg.org/#concept-url-username
- `password`: https://url.spec.whatwg.org/#concept-url-password

### Examples

With the above example using these changes would now be:

```json
{
  "servers": [
    {
      "url": "https://{subdomain}.example.com:{port}",
      "variables": {
        "subdomain": {
          "type": "subdomain",
          "default": "demo"
        },
        "port": {
          "type": "port",
          "default": "65536"
        }
      }
    }
  ]
}
```

Now when composing a URL, we can look at `variables.port.type`, see its of type `port` and reject it as being out of bounds.

```json
{
  "servers": [
    {
      "url": "https://{subdomain}.example.com/{fragment}",
      "variables": {
        "subdomain": {
          "type": "subdomain",
          "enum": [
            "eu.api",
            "us.api",
            "api"
          ],
          "default": "api"
        }
      }
    },
    {
      "url": "https://api.example.{tld}",
      "variables": {
        "tld": {
          "type": "tld",
          "enum": [
            "com",
            "net"
          ],
          "default": "com",
        }
      }
    }
  ]
}
```

## Backwards compatibility

Since requiring `type` to be present on server variable objects will be a breaking change there isn’t any backwards compatibility here.

## Alternatives considered

As a tooling maintainer here, the only real alternative I have to validate server variables is to run expensive regex if the URL API fails to parse it, and even with this its difficult to narrow down exactly *why* it failed because it simply throws a `TypeError("Failed to construct 'URL': Invalid URL")`.

Sure, the option to search for better tooling is available, but with JS being so ubiquitous, and the web having standardized upon this API, not having any avenues within the confines of the specification to infer types of data that we might need to validate is not ideal.
