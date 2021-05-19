# New Security Definitions

## Metadata

| Tag | Value |
| ---- | ---------------- |
| Proposal | [2021-05-19-New-Security-Definitions](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals/2021-05-19-New-Security-Definitions.md) |
| Authors | [Jeremy Whitlock](https://github.com/whitlockjc) |
| Review Manager | TBD |
| Status | Proposal |
| Implementations | N/A |
| Issues | [{issueid}](https://github.com/OAI/OpenAPI-Specification/issues/{Issueid}) |
| Previous Revisions | N/A |

## Change Log

| Date | Responsible Party | Description |
| 2021/05/13 | Jeremy Whitlock | Initial proposal |

## Introduction

This purpose of this proposal is to rethink how
[Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#security-scheme-object) are
defined in OpenAPI.  This proposal would separate the credential location(s) from the Security Scheme _type_ and would
allow for complete control over dictating where the credential(s) are provided for a Security Scheme.  This proposal
will add a generic way to retrieve a credential from anywhere in a request, and allow any Security Scheme to dictate
where its supported credential(s) are instead of relying on OpenAPI-supported conventions/opinions.  This proposal also
separates the credential location(s) details from the other configurations associated with the Security Scheme
_(like JWKS details for JWT)_.

**Note:** The proposal isn't to remove `type` from the Security Scheme object but to allow for more control over where
the credential(s) are provided for a Security Scheme.  This proposal would still have reasonable defaults for the
already-supported `type` values and will be documented as such.

## Motivation

[Security Schemes](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#security-scheme-object)
_(formerly known as "Security Definitions")_ provide a way to describe the security scheme(s) used by your API.
Unfortunately, the _types_ supported by OpenAPI are not only limited but they often tie the credential location to the
Security Scheme type.  This proposal will add a generic way to define where a credential is and its format so that the
consumer can have complete control over where credentials are used in their API.  Not only would this allow consumers to
specify their own Security Schemes without OpenAPI having to be the gatekeeper, but it also allows a level of
flexibility not available now.  There have also been extra Security Scheme properties that have been _tacked on_ to
support the growing needs of consumers, which would be alleviated _(or moved in this case)_.

For example, if a consumer wants to use a JSON Web Key _(JWT)_ in their API, OpenAPI will allow this but only under
certain circumstances:

* `type: apiKey`: This will allow you to provide your JWT anywhere you would like, but it could be confusing to overload
  `type: apiKey` since you are describing a Security Scheme using a JWT and not an API Key
* `type: http`: This will only work if your JWT is in a header and in a supported
  [HTTP Auth](https://datatracker.ietf.org/doc/html/rfc7235#section-5.1) format

OpenAPI being so opinionated about these kinds things does not serve any real benefit to anyone involved, and this
proposal would make things much more flexible.

## Proposed solution

This proposal suggests the following changes to the Security Scheme object:

* Add a new `config` property that is type specific to contain the scheme-specific configuration not related to
  credential configuration
* Add a new `credentials` property that is an array of [Credential Objects](#credential-object) that describe a
  credential _(where it is located, what its format is, etc.)_
* Remove the credential-specific properties _(`bearerFormat`, `flows`, `in`, `openIdConnectUrl` and `scheme`)_ and move
  them into a type-specific `config` property
* Update `type` to allow for any value instead of the hard-coded list of supported types

## Detailed design

The bulk of this proposal is defining a way to separate the properties used to describe the credential(s) for a Security
Scheme from the root properties of the Security Scheme.  This proposal will also allow you to define multiple
credentials _(multiple locations, formats, ...)_ for the same Security Scheme for cases where you might support
multiple formats/locations for effectively the same credential.  The new objects being suggested as part of this
proposal are defined below.

**Note:** While not specifically mentioned below for brevity, JSON References and Extensions should be allowed within
every complex type documented below.

### Value Getter Object

The _Value Getter Object_ describes a place in the request where something exists that you want to retrieve.  The name
and purpose of this object is generic, as in I could see other places in OpenAPI where you could point to a value in the
request.  The _Value Getter Object_ is the base object to be _extended_ by **all**
[Credential Object](#credential-object)s.  Below is its schema:

| Field Name | Type | Applies To | Description |
| ---------- | ---- | ---------- | ----------- |
| in | `string` | Any | **REQUIRED.** Specifies where in the request the credential is provided.  Valid values are: `body`, `cookie`, `header`, `path` and `query` |
| format | `regex` | Any | Specifies the format of the credential.  Since in many cases, the credential is a subset of the raw value, `format` must be a regular expression that matches the complete value, and contains a single capturing group to match the actual value within the raw value. |
| name | `string` | Any | **REQUIRED.** Specifies the name used to resolve the credential in the location provided by `in`. |

**Note:** For `body`, `name` should be a JSON Pointer _(or something similar)_ that lets you define what part of the
body you are interested in.  For example, you could use `#` to dictate that body in its entirety is the credential or
you could use something like `#/some/path` to dictate that a portion of the body is the credential.  I understand that
JSON Pointer usage implies that the body is JSON but that doesn't have to be the case and could be used to address any
structured data.

**Note:** For `format`, I realize that it being a regular expression might seem a bit off-putting but there is no way to
reasonably support raw values _(as-is)_ and taking a raw value and only grabbing the important part
_(like when using HTTP Auth where you don't want the scheme details)_.  We could also have _named formats_ that would
alleviate the need for consumers to author regular expressions themselves for things like HTTP Auth, Bearer Tokens, etc.

**Note:** I could see a case for a `description` field.

#### Example

##### Bearer Token (Header)

```yaml
in: header
name: authorization
format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
```

##### Query Parameter (Simple)

```yaml
in: query
name: accessToken
```

#### Schema

```yaml
# /types/ValueGetter
type: object
properties:
  in:
    type: string
    enum: ['body', 'cookie', 'header', 'path', 'query']
  format:
    type: string
  name:
    type: string
required: ['in', 'name']
```

### Credential Object

The _Credential Object_ describes a credential, as in where it is in the request and the details that define the
credential.  As mentioned above, the _Credential Object_ extends the [Value Getter Object](#value-getter-object)
described above.

**Note:** As of right now, the _Credential Object_ is the only object that extends the _Value Getter Object_ and it
could be simpler to just make the _Value Getter Object_ the _Credential Object_ in the short term.

#### Schema <a name="credential_schema"></a>

```yaml
# /types/Credential
$ref: #/types/ValueGetter
```

### New Security Scheme Object

The _New Security Scheme Object_ describes the proposed approach to Security Schemes.  Below is the schema for the
_New Security Scheme Object_:

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| config | object | An object representing one of the supported [New Security Scheme Objects](#new-security-scheme-object) |
| credentials | [[Credential Object](#credential-object)] | An array of credential locations |

#### Schema <a name="new_security_scheme_object_schema"></a>

```yaml
# /types/NewSecurityScheme
type: object
oneOf:
- $ref: '#/types/GenericSecurityScheme'
- $ref: '#/types/JWTSecurityScheme'
- $ref: '#/types/OAuthSecurityScheme'
- $ref: '#/types/OIDCSecurityScheme'
```

#### API Key or Generic

The purpose of the Generic Security Scheme is that it supports an opaque credential or credentials in the request, as in
there are no scheme-specific configuration beyond where the credential(s) are located.  Below is its schema:

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| type | string | **REQUIRED.** Either `apiKey` _(for backward compatibility)_ or `generic` |
| config | object | This security scheme **does not** explicitly have any configuration properties but the consumer could potentially throw anything in here that they wanted |
| credentials | **REQUIRED.** [[Credential Object](#credential-object)] | An array of credential locations |

##### Example <a name="api_key_or_generic_example"></a>

```yaml
# ...
components:
  securitySchemes:
    apiKey:
      type: apiKey
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
    generic:
      type: generic
      credentials:
      - in: query
        name: apiKey
    genericWithConfig:
      type: generic
      credentials:
      - in: query
        name: apiKey
      config:
        # ...
# ...
```

##### Schema <a name="api_key_or_generic_schema"></a>

```yaml
# /types/GenericSecurityScheme
type: object
properties:
  type:
    type: string
    enum: ['apiKey', 'generic']
  config:
    type: object
  credentials:
    type: array
    items:
      $ref: '#/types/CredentialObject'
required: ['credentials', 'type']
```

#### JSON Web Keys (JWT)

The JWT Security Scheme is to support JWT credentials and the configuration required by clients to sign JWTs for use by
the API described in the OpenAPI Document.  Below is its schema:

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| type | string | **REQUIRED.** Must be `jwt` |
| config | object | **REQUIRED.** The JWT configuration details |
| config.audiences | [string] | When set, specifies the allowed audiences _(used to verify the `aud` claim)_ |
| config.issuer | string | **REQUIRED.** Specifies the issuer of the JWT _(used to verify the `issuer` claim)_ |
| config.jwks | object | **REQUIRED.** Specifies the JWKS details |
| config.jwks.uri | string | The URI to the JWKS |
| config.jwks.keyIds | [string] | The JWKS key ids that this Security Scheme uses |
| credentials | **REQUIRED.** [[Credential Object](#credential-object)] | An array of credential locations |

**Note:** In theory, one could use a JSON Reference for `config.jwks` to point to an inline JWKS.

##### Example <a name="jwt_example"></a>

```yaml
# ...
components:
  securitySchemes:
    # External JWKS
    googleJWKS:
      type: jwt
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      config:
        audiences:
        - 32555940559.apps.googleusercontent.com
        issuer: https://accounts.google.com
        jwks:
          uri: https://www.googleapis.com/oauth2/v3/certs
    # External JWKS (with specific keys)
    googleJWKSWithKeys:
      type: jwt
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      config:
        audiences:
        - 32555940559.apps.googleusercontent.com
        issuer: https://accounts.google.com
        jwks:
          uri: https://www.googleapis.com/oauth2/v3/certs
          keyIds:
          - afde80eb1edf9f3bf4486dd877c34ba46afbba1f
# ...
```

##### Schema <a name="jwt_schema"></a>

```yaml
# /types/JWTSecurityScheme
type: object
properties:
  type:
    type: string
    enum: ['jwt']
  config:
    type: object
    properties:
      audiences:
        type: array
        items:
          type: string
      issuer:
        type: string
      jwks:
        type: object
        properties:
          keyIds:
            type: array
            items:
              type: string
          uri:
            type: string
        required: ['uri']
    required: ['issuer', 'jwks']
  credentials:
    type: array
    items:
      $ref: '#/types/CredentialObject'
required: ['config', 'credentials', 'type']
```

#### OAuth

The OAuth Security Scheme is used to support OAUth.  This Security Scheme is almost identical to the pre-proposal
OAuth Security Scheme but with support for `credentials`.  Below is its schema:

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| type | string | **REQUIRED.** Must be `oauth` |
| config | object | **REQUIRED.** The JWT configuration details |
| config.flows | [Flows Object](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#oauthFlowsObject) | **REQUIRED.** An object containing configuration information for the flow types supported. |
| credentials | **REQUIRED.** [[Credential Object](#credential-object)] | An array of credential locations |

**Note:** OAuth's access tokens are basically defined as being a
[Bearer Token](https://datatracker.ietf.org/doc/html/rfc6750).  And since a Bearer Token can be specified in a few
different places, pre-defined by the specification mind you, one could potentially expect OpenAPI to have a Bearer
Token credential type and it would pre-populate `credentials` with all of the locations allowed in RFC 6570.  But since
the API producer likely will dictate _where_ its Bearer Token is expected to be, for consistency it makes sense to treat
OAuth credentials no differently than other credentials.

##### Example <a name="oauth_example"></a>

```yaml
# ...
components:
  securitySchemes:

# ...
```

##### Schema <a name="oauth_schema"></a>

```yaml
# /types/JWTSecurityScheme
type: object
properties:
  type:
    type: string
    enum: ['oauth']
  config:
    type: object
    properties:
      flows:
        $ref: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/schemas/v3.1/schema.json#/$defs/oauth-flows'
    required: ['flows']
  credentials:
    type: array
    items:
      $ref: '#/types/CredentialObject'
required: ['config', 'credentials', 'type']
```

#### OpenID Connect (OIDC)

The OIDC Security Scheme is to support JWT credentials provided by an OpenID Connect identity provider, and the
configuration required by clients to sign JWTs for use by the API described in the OpenAPI Document.  Below is its
schema:

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| type | string | **REQUIRED.** Must be `oidc` |
| config | object | **REQUIRED.** The JWT configuration details |
| config.audiences | [string] | When set, specifies the allowed audiences _(used to verify the `aud` claim)_ |
| config.discoveryDocument | object | **REQUIRED.** Specifies the Discovery Document details |
| config.discoveryDocument.uri | string | The URI to the Discovery Document |
| config.discoveryDocument.keyIds | [string] | The JWKS key ids that this Security Scheme uses |
| credentials | **REQUIRED.** [[Credential Object](#credential-object)] | An array of credential locations |

**Note:** In theory, one could use a JSON Reference for `config.discoveryDocument` to point to an inline Discovery
Document.

##### Example <a name="oidc_example"></a>

```yaml
# ...
components:
  securitySchemes:
    # External JWKS
    googleOIDC:
      type: oidc
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      config:
        audiences:
        - 32555940559.apps.googleusercontent.com
        discoveryDocument:
          uri: https://accounts.google.com/.well-known/openid-configuration
    # External JWKS (with specific keys)
    googleOIDCWithKeys:
      type: oidc
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      config:
        audiences:
        - 32555940559.apps.googleusercontent.com
        discoveryDocument:
          uri: https://accounts.google.com/.well-known/openid-configuration
          keyIds:
          - afde80eb1edf9f3bf4486dd877c34ba46afbba1f
# ...
```

##### Schema <a name="oidc_schema"></a>

```yaml
# /types/OIDCSecurityScheme
type: object
properties:
  type:
    type: string
    enum: ['oidc']
  config:
    type: object
    properties:
      audiences:
        type: array
        items:
          type: string
      issuer:
        type: string
      discoveryDocument:
        type: object
        properties:
          keyIds:
            type: array
            items:
              type: string
          uri:
            type: string
        required: ['uri']
    required: ['issuer', 'discoveryDocument']
  credentials:
    type: array
    items:
      $ref: '#/types/CredentialObject'
required: ['credentials', 'type']
```

## Backwards compatibility

To support backward compatibility, the existing `#/components/securitySchemes` object should use `oneOf` to match the
existing Security Scheme Objects or the New Security Scheme Objects.  The old-style approach could/should be treated as
deprecated and tooling could/should warn of such things.

## Alternatives considered

### Allowing Credential Location(s) for all Security Schemes

While the main point of this proposal was to give complete control over where the credential(s) are for a Security
Scheme, another minor goal was to provide consistency and separation of control.  One alternative considered was to
instead of adding `credentials` and `config`, just making `in/name/scheme/bearerFormat` available for all Security
Schemes.  I'm not a fan of that as it quickly becomes confusing and I'd much rather see a separation of configuring the
credential location(s) from the other configurations related to the Security Scheme.

**Note:** As I was writing this, the more I realize I like this approach.

### Allowing type to be specified by the top-level configuration key

Another option that was considered was to instead of using `type` in each of the _New Security Scheme Objects_, we would
use a named property that itself indicates the _New Security Scheme_ type.  Here is an example:

#### As Proposed

```yaml
# ...
components:
  securitySchemes:
    # External JWKS
    googleJWKS:
      type: jwt
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      config:
        audiences:
        - 32555940559.apps.googleusercontent.com
        issuer: https://accounts.google.com
        jwks:
          uri: https://www.googleapis.com/oauth2/v3/certs
# ...
```

#### Considered

```yaml
# ...
components:
  securitySchemes:
    # External JWKS
    googleJWKS:
      credentials:
      - in: header
        name: authorization
        format: ^[B|b][E|e][A|a][R|r][E|e][R|r] (.*)$
      jwt:
        audiences:
        - 32555940559.apps.googleusercontent.com
        issuer: https://accounts.google.com
        jwks:
          uri: https://www.googleapis.com/oauth2/v3/certs
# ...
```
