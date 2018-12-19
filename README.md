![Open RPC Logo](https://github.com/open-rpc/design/blob/master/png/open-rpc-logo-320x320.png?raw=true "Open RPC Logo")

Sponsored by ![Ethereum Classic Labs](https://github.com/open-rpc/design/blob/master/png/etc-labs-logo-32x32.png?raw=true "ETCLabs Logo") [Ethereum Classic Labs](https://etclabs.org).

# OpenRPC Specification

#### Version 1.0.0

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [BCP 14](https://tools.ietf.org/html/bcp14) [RFC2119](https://tools.ietf.org/html/rfc2119) [RFC8174](https://tools.ietf.org/html/rfc8174) when, and only when, they appear in all capitals, as shown here.

In the following description, if a field is not explicitly **REQUIRED** or described with a MUST or SHALL, it can be considered OPTIONAL.

This document is licensed under [The Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0.html).

### Table of Contents
<!-- TOC depthFrom:1 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Introduction](#introduction)
- [Definitions](#definitions)
	- [OpenRPC Document](#openrpcDocument)
- [Specification](#specification)
	- [Versions](#versions)
	- [Format](#format)
	- [Document Structure](#documentStructure)
	- [Data Types](#dataTypes)
	- [Rich Text Formatting](#richText)
	- [Relative References In URLs](#relativeReferences)
	- [OpenRPC Schema Object](#openrpcSchemaObject)
		- [Info Object](#infoObject)
		    - [Contact Object](#contactObject)
		    - [License Object](#licenseObject)
		- [Server Object](#serverObject)
		    - [Server Variable Object](#serverVariableObject)
		- [Method Object](#methodObject)
		    - [Content Descriptor Object](#contentDescriptorObject)
		        - [Schema Object](#schemaObject)
            	- [Example Object](#exampleObject)
		    - [Link Object](#linkObject)
            	- [Runtime Expression](#runtimeExpression)
		    - [Error Object](#errorObject)
		- [Components Object](#componentsObject)
		- [Tag Object](#tagObject)
		- [External Documentation Object](#externalDocumentationObject)
		- [Reference Object](#referenceObject)
	- [Specification Extensions](#specificationExtensions)


<!-- /TOC -->

## Introduction

The OpenRPC Specification defines a standard, programming language-agnostic interface description for [JSON-RPC 2.0 api's](https://www.jsonrpc.org/specification), which allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenRPC, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenRPC Specification removes guesswork in calling a service.

Use cases for machine-readable RPC API definition documents include, but are not limited to:
 - interactive documentation
 - code generation for documentation
 - clients
 - servers
 - automation of test cases.
 OpenRPC documents describe a JSON-RPC API's services and are represented in YAML or JSON formats. These documents may either be produced and served statically or be generated dynamically from an application.

The OpenRPC Specification does not require rewriting existing APIs. It does not require binding any software to a service — the service being described may not even be owned by the creator of its description. It does, however, require the capabilities of the service be described in the structure of the OpenRPC Specification. Not all services can be described by OpenRPC — this specification is not intended to cover REST APIs - It is exclusively for api's which adhere to the JSON-RPC 2.0 spec. The OpenRPC Specification does not mandate a specific development process such as design-first or code-first. It does facilitate either technique by establishing clear interactions with a JSON-RPC api.

## Definitions
##### <a name="openrpcDocument"></a>OpenRPC Document
A document (or set of documents) that defines or describes an API. An OpenRPC definition uses and conforms to the OpenRPC Specification.

## Specification
### Versions

The OpenRPC Specification is versioned using [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html) (semver) and follows the semver specification.

The `major`.`minor` portion of the semver (for example `1.0.x`) SHALL designate the OPENRPC feature set. Typically, *`.patch`* versions address errors in this document, not the feature set. Tooling which supports OPENRPC 1.0.0 SHOULD be compatible with all OPENRPC 1.0.\* versions. The patch version SHOULD NOT be considered by tooling, making no distinction between `1.0.0` and `1.0.1` for example.

Subsequent minor version releases of the OpenRPC Specification (incrementing the `minor` version number) SHOULD NOT interfere with tooling developed to a lower minor version and same major version.  Thus a hypothetical `1.1.0` specification SHOULD be usable with tooling designed for `1.0.0`.

An OpenRPC document compatible with OPENRPC 1.0.0 contains a required [`openrpc`](#openrpcVersion) field which designates the semantic version of the OPENRPC that it uses.

### Format

An OpenRPC document that conforms to the OpenRPC Specification is itself a JSON object, which must be represented in JSON format.

All field names in the specification are **case sensitive**.
This includes all fields that are used as keys in a map, except where explicitly noted that keys are **case insensitive**.

The schema exposes two types of fields: Fixed fields, which have a declared name, and Patterned fields, which declare a regex pattern for the field name.

Patterned fields MUST have unique names within the containing object.

Due to the nature of JSON RPC apis using JSON formats, strictly use JSON only [as described here](https://tools.ietf.org/html/rfc7159).

- Tags MUST be limited to those allowed by the [JSON Schema ruleset](http://www.yaml.org/spec/1.2/spec.html#id2803231).

### <a name="documentStructure"></a>Document Structure

An OpenRPC document MAY be made up of a single document or be divided into multiple, connected parts at the discretion of the user. In the latter case, `$ref` fields MUST be used in the specification to reference those parts as follows from the [JSON Schema](http://json-schema.org) definitions.

It is RECOMMENDED that the root OpenRPC document be named: `openrpc.json`.

### <a name="dataTypes"></a>Data Types

***FIXXXX MEEEEEEEEEEE***

Primitive data types in the OPENRPC are based on the types supported by the [JSON Schema Specification Wright Draft 00](https://tools.ietf.org/html/draft-wright-json-schema-00#section-4.2).
Note that `integer` as a type is also supported and is defined as a JSON number without a fraction or exponent part.
`null` is not supported as a type (see [`nullable`](#schemaNullable) for an alternative solution).
Models are defined using the [Schema Object](#schemaObject), which is an extended subset of JSON Schema Specification Wright Draft 00.

<a name="dataTypeFormat"></a>Primitives have an optional modifier property: `format`.
OPENRPC uses several known formats to define in fine detail the data type being used.
However, to support documentation needs, the `format` property is an open `string`-valued property, and can have any value.
Formats such as `"email"`, `"uuid"`, and so on, MAY be used even though undefined by this specification.
Types that are not accompanied by a `format` property follow the type definition in the JSON Schema. Tools that do not recognize a specific `format` MAY default back to the `type` alone, as if the `format` is not specified.

The formats defined by the OPENRPC are:

[`type`](#dataTypes) | [`format`](#dataTypeFormat) | Comments
------ | -------- | --------
`integer` | `int32` | signed 32 bits
`integer` | `int64` | signed 64 bits (a.k.a long)
`number` | `float` | |
`number` | `double` | |
`string` | | |
`string` | `byte` | base64 encoded characters
`string` | `binary` | any sequence of octets
`boolean` | | |
`string` | `date` | As defined by `full-date` - [RFC3339](https://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
`string` | `date-time` | As defined by `date-time` - [RFC3339](https://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
`string` | `password` | A hint to UIs to obscure input.


### <a name="richText"></a>Rich Text Formatting
Throughout the specification `description` fields are noted as supporting CommonMark markdown formatting.
Where OpenRPC tooling renders rich text it MUST support, at a minimum, markdown syntax as described by [CommonMark 0.27](http://spec.commonmark.org/0.27/). Tooling MAY choose to ignore some CommonMark features to address security concerns.

### <a name="relativeReferences"></a>Relative References in URLs

Unless specified otherwise, all properties that are URLs MAY be relative references as defined by [RFC3986](https://tools.ietf.org/html/rfc3986#section-4.2).
Relative references are resolved using the URLs defined in the [`Server Object`](#serverObject) as a Base URI.

Relative references used in `$ref` are processed as per [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03), using the URL of the current document as the base URI. See also the [Reference Object](#referenceObject).

### <a name="openrpcSchemaObject">OpenRPC Schema Object
This is the root document object of the [OpenRPC document](#openrpcDocument).

Field Name | Type | Description
---|:---:|---
<a name="openrpcVersion"></a>openrpc | `string` | **REQUIRED**. This string MUST be the [semantic version number](https://semver.org/spec/v2.0.0.html) of the [OpenRPC Specification version](#versions) that the OpenRPC document uses. The `openrpc` field SHOULD be used by tooling specifications and clients to interpret the OpenRPC document. This is *not* related to the API [`info.version`](#infoVersion) string.
<a name="openrpcInfo"></a>info | [Info Object](#infoObject) | **REQUIRED**. Provides metadata about the API. The metadata MAY be used by tooling as required.
<a name="openrpcServers"></a>servers | [[Server Object](#serverObject)] | An array of Server Objects, which provide connectivity information to a target server. If the `servers` property is not provided, or is an empty array, the default value would be a [Server Object](#serverObject) with a [url](#serverUrl) value of `/`.
<a name="openrpcMethods"></a>methods | [[Method Object](#methodsObject) | [Reference Object](#referenceObject)] | **REQUIRED**. The available methods and operations for the API. While it is required, the array may be empty (to handle security filtering, for example).
<a name="openrpcComponents"></a>components | [Components Object](#componentsObject) | An element to hold various schemas for the specification.
<a name="openrpcTags"></a>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
<a name="openrpcExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

#### <a name="infoObject"></a>Info Object
The object provides metadata about the API.
The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"></a>title | `string` | **REQUIRED**. The title of the application.
<a name="infoDescription"></a>description | `string` | A short description of the application. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="infoTermsOfService"></a>termsOfService | `string` | A URL to the Terms of Service for the API. MUST be in the format of a URL.
<a name="infoContact"></a>contact | [Contact Object](#contactObject) | The contact information for the exposed API.
<a name="infoLicense"></a>license | [License Object](#licenseObject) | The license information for the exposed API.
<a name="infoVersion"></a>version | `string` | **REQUIRED**. The version of the OpenRPC document (which is distinct from the [OpenRPC Specification version](#openrpcVersion) or the API implementation version).


This object MAY be extended with [Specification Extensions](#specificationExtensions).

Info Object Example:

```json
{
  "title": "Sample Pet Store App",
  "description": "This is a sample server for a pet store.",
  "termsOfService": "http://example.com/terms/",
  "contact": {
    "name": "API Support",
    "url": "http://www.example.com/support",
    "email": "support@example.com"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}
```

##### <a name="contactObject"></a>Contact Object

Contact information for the exposed API.

Field Name | Type | Description
---|:---:|---
<a name="contactName"></a>name | `string` | The identifying name of the contact person/organization.
<a name="contactUrl"></a>url | `string` | The URL pointing to the contact information. MUST be in the format of a URL.
<a name="contactEmail"></a>email | `string` | The email address of the contact person/organization. MUST be in the format of an email address.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

Contact Object Example:
```json
{
  "name": "API Support",
  "url": "http://www.example.com/support",
  "email": "support@example.com"
}
```

##### <a name="licenseObject"></a>License Object

License information for the exposed API.

Field Name | Type | Description
---|:---:|---
<a name="licenseName"></a>name | `string` | **REQUIRED**. The license name used for the API.
<a name="licenseUrl"></a>url | `string` | A URL to the license used for the API. MUST be in the format of a URL.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

License Object Example:
```json
{
  "name": "Apache 2.0",
  "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
}
```


#### <a name="serverObject"></a>Server Object

An object representing a Server.

Field Name | Type | Description
---|:---:|---
<a name="serverUrl"></a>url | `string` | **REQUIRED**. A URL to the target host.  This URL supports Server Variables and MAY be relative, to indicate that the host location is relative to the location where the OpenRPC document is being served. Variable substitutions will be made when a variable is named in `{`brackets`}`.
<a name="serverDescription"></a>description | `string` | An optional string describing the host designated by the URL. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="serverVariables"></a>variables | Map[`string`, [Server Variable Object](#serverVariableObject)] | A map between a variable name and its value.  The value is used for substitution in the server's URL template.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

Server Object Example:

A single server would be described as:

```json
{
  "url": "https://development.gigantic-server.com/v1",
  "description": "Development server"
}
```

The following shows how multiple servers can be described, for example, at the OpenRPC Object's [`servers`](#openrpcServers):

```json
{
  "servers": [
    {
      "url": "https://development.gigantic-server.com/v1",
      "description": "Development server"
    },
    {
      "url": "https://staging.gigantic-server.com/v1",
      "description": "Staging server"
    },
    {
      "url": "https://api.gigantic-server.com/v1",
      "description": "Production server"
    }
  ]
}
```

The following shows how variables can be used for a server configuration:

```json
{
  "servers": [
    {
      "url": "https://{username}.gigantic-server.com:{port}/{basePath}",
      "description": "The production API server",
      "variables": {
        "username": {
          "default": "demo",
          "description": "this value is assigned by the service provider, in this example `gigantic-server.com`"
        },
        "port": {
          "enum": [
            "8443",
            "443"
          ],
          "default": "8443"
        },
        "basePath": {
          "default": "v2"
        }
      }
    }
  ]
}
```

##### <a name="serverVariableObject"></a>Server Variable Object

An object representing a Server Variable for server URL template substitution.

Field Name | Type | Description
---|:---:|---
<a name="serverVariableEnum"></a>enum | [`string`] | An enumeration of string values to be used if the substitution options are from a limited set.
<a name="serverVariableDefault"></a>default | `string` |  **REQUIRED**. The default value to use for substitution, which SHALL be sent if an alternate value is _not_ supplied. Note this behavior is different than the [Schema Object's](#schemaObject) treatment of default values, because in those cases parameter values are optional.
<a name="serverVariableDescription"></a>description | `string` | An optional description for the server variable. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

#### <a name="methodObject"></a>Method Object

Describes the operation for the given method name. The method name is used as the `method` field of the JSON RPC body. It therefor MUST be unique.

Field Name | Type | Description
---|:---:|---
<a name="methodTags"></a>tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
<a name="methodSummary"></a>summary | `string` | A short summary of what the method does.
<a name="methodDescription"></a>description | `string` | A verbose explanation of the method behavior. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="methodExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this method.
<a name="methodParameters"></a>parameters | [[Parameter Object](#parameterObject) \| [Reference Object](#referenceObject)] | A list of parameters that are applicable for this operation. The list MUST NOT include duplicated parameters and therefore require [name](#parameterName) to be unique. The list can use the [Reference Object](#referenceObject) to link to parameters that are defined at the [OpenRPC Object's components/parameters](#componentsParameters).
<a name="methodResults"></a>results | [Results Object](#resultsObject) | **REQUIRED**. The description of the results returned by the method.
<a name="methodDeprecated"></a>deprecated | `boolean` | Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is `false`.
<a name="methodServers"></a>servers | [[Server Object](#serverObject)] | An alternative `server` array to service this operation. If an alternative `server` object is specified at the Root level, it will be overridden by this value.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

Method Object Example:
```json
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "description": "#Big Ol long Doc Filled WIth Markdown!",
  "parameters": [
    {
      "name": "petId",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "schema": {
        "type": "string"
      }
    },
    {
      "name": "name",
      "description": "Updated name of the pet",
      "schema": {
        "type": "string"
      }
    },
    {
      "name": "status",
      "description": "Updated status of the pet",
      "required": "true",
      "schema": {
        "type": "string",
      }
    }
  ],
  "results": {
    "description": "Pet updated.",
    "content": {
      "schema": {
        "$ref": "#/components/schemas/Pet"
      }
    }
  }
}
```

##### <a name="contentDescriptorObject"></a>Content Descriptor Object
TODO DESCRIPTION

Field Name | Type | Description
---|:---:|---
<a name="name"></a>name | `string` | name of the content that is being described.
<a name="required"></a>required | `boolean` | Determines if the content is a required field.
<a name="schema"></a>schema | [Schema Object](#schemaObject) | Schema that describes the content.
<a name="examples"></a>examples | [Example Object](#exampleObject) | Example of the parameter. The example MUST match the specified schema. If referencing a `schema` which contains an example, the `example` value SHALL _override_ the example provided by the schema. To represent examples of media types that cannot naturally be represented in JSON, a string value can contain the example with escaping where necessary.
<a name="deprecated"></a>deprecated | `boolean` | Specifies that the content is deprecated and SHOULD be transitioned out of usage. Default value is `false`.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

When `example` is provided in conjunction with the `schema` object, the example MUST follow the prescribed serialization strategy for the parameter.

Content Descriptor Object Examples:

1. A parameter with an array of 64 bit integer numbers:
```json
{
  "name": "token",
  "description": "token to be passed as a header",
  "required": true,
  "schema": {
    "type": "array",
    "items": {
      "type": "integer",
      "format": "int64"
    }
  }
}
```

2. A parameter of a string value:
```json
{
  "name": "username",
  "description": "username to fetch",
  "required": true,
  "schema": {
    "type": "string"
  }
}
```

3. An optional parameter of an array of string values
```json
{
  "name": "id",
  "description": "ID of the object to fetch",
  "required": false,
  "schema": {
    "type": "array",
    "items": {
      "type": "string"
    }
  }
}
```

4. A parameter, allowing undefined parameters of a specific type:
```json
{
  "name": "freeForm",
  "schema": {
    "type": "object",
    "additionalProperties": {
      "type": "integer"
    }
  }
}
```

5. A complex parameter

```json
{
  "name": "coordinates",
  "schema": {
    "type": "object",
    "required": [
      "lat",
      "long"
    ],
    "properties": {
      "lat": {
        "type": "number"
      },
      "long": {
        "type": "number"
      }
    }
  }
}
```


###### <a name="schemaObject"></a>Schema Object

The Schema Object allows the definition of input and output data types.
These types can be objects, but also primitives and arrays.
This object is an extended subset of the [JSON Schema Specification Wright Draft 00](http://json-schema.org/).

For more information about the properties, see [JSON Schema Core](https://tools.ietf.org/html/draft-wright-json-schema-00) and [JSON Schema Validation](https://tools.ietf.org/html/draft-wright-json-schema-validation-00).
Unless stated otherwise, the property definitions follow the JSON Schema.

Properties:

The following properties are taken directly from the JSON Schema definition and follow the same specifications:

- title
- multipleOf
- maximum
- exclusiveMaximum
- minimum
- exclusiveMinimum
- maxLength
- minLength
- pattern (This string SHOULD be a valid regular expression, according to the [ECMA 262 regular expression](https://www.ecma-international.org/ecma-262/5.1/#sec-7.8.5) dialect)
- maxItems
- minItems
- uniqueItems
- maxProperties
- minProperties
- required
- enum

The following properties are taken from the JSON Schema definition but their definitions were adjusted to the OpenRPC Specification.
- type - Value MUST be a string. Multiple types via an array are not supported.
- allOf - Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema.
- oneOf - Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema.
- anyOf - Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema.
- not - Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema.
- items - Value MUST be an object and not an array. Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema. `items` MUST be present if the `type` is `array`.
- properties - Property definitions MUST be a [Schema Object](#schemaObject) and not a standard JSON Schema (inline or referenced).
- additionalProperties - Value can be boolean or object. Inline or referenced schema MUST be of a [Schema Object](#schemaObject) and not a standard JSON Schema. Consistent with JSON Schema, `additionalProperties` defaults to `true`.
- description - [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
- format - See [Data Type Formats](#dataTypeFormat) for further details. While relying on JSON Schema's defined formats, the OPENRPC offers a few additional predefined formats.
- default - The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided. Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level. For example, if `type` is `string`, then `default` can be `"foo"` but cannot be `1`.

Alternatively, any time a Schema Object can be used, a [Reference Object](#referenceObject) can be used in its place. This allows referencing definitions instead of defining them inline.

Additional properties defined by the JSON Schema specification that are not mentioned here are strictly unsupported.

Other than the JSON Schema subset fields, the following fields MAY be used for further schema documentation:

Field Name | Type | Description
---|:---:|---
<a name="schemaNullable"></a>nullable | `boolean` | Allows sending a `null` value for the defined schema. Default value is `false`.
<a name="schemaReadOnly"></a>readOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as `readOnly` being `true` and is in the `required` list, the `required` will take effect on the response only. A property MUST NOT be marked as both `readOnly` and `writeOnly` being `true`. Default value is `false`.
<a name="schemaWriteOnly"></a>writeOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "write only". Therefore, it MAY be sent as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as `writeOnly` being `true` and is in the `required` list, the `required` will take effect on the request only. A property MUST NOT be marked as both `readOnly` and `writeOnly` being `true`. Default value is `false`.
<a name="schemaExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this schema.
<a name="schemaExample"></a>example | Any | A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.
<a name="schemaDeprecated"></a> deprecated | `boolean` | Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is `false`.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

Schema Object Examples:

1. Primitive Sample

```json
{
  "type": "string",
  "format": "email"
}
```

2. Simple Model

```json
{
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "name": {
      "type": "string"
    },
    "address": {
      "$ref": "#/components/schemas/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}
```

3. Model with Map/Dictionary Properties

For a simple string to string mapping:

```json
{
  "type": "object",
  "additionalProperties": {
    "type": "string"
  }
}
```

For a string to model mapping:

```json
{
  "type": "object",
  "additionalProperties": {
    "$ref": "#/components/schemas/ComplexModel"
  }
}
```

4. Model with Example

```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "name": {
      "type": "string"
    }
  },
  "required": [
    "name"
  ],
  "example": {
    "name": "Puma",
    "id": 1
  }
}
```

5. Models with Composition

```json
{
  "components": {
    "schemas": {
      "ErrorModel": {
        "type": "object",
        "required": [
          "message",
          "code"
        ],
        "properties": {
          "message": {
            "type": "string"
          },
          "code": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600
          }
        }
      },
      "ExtendedErrorModel": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ErrorModel"
          },
          {
            "type": "object",
            "required": [
              "rootCause"
            ],
            "properties": {
              "rootCause": {
                "type": "string"
              }
            }
          }
        ]
      }
    }
  }
}
```


###### <a name="exampleObject"></a>Example Object

Field Name | Type | Description
---|:---:|---
<a name="exampleName"></a>name | `string` | cannonical name of the example.
<a name="exampleSummary"></a>summary | `string` | Short description for the example.
<a name="exampleDescription"></a>description | `string` | Long description for the example. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="exampleValue"></a>value | Any | Embedded literal example. The `value` field and `externalValue` field are mutually exclusive. To represent examples of media types that cannot naturally represented in JSON, use a string value to contain the example, escaping where necessary.
<a name="exampleExternalValue"></a>externalValue | `string` | A URL that points to the literal example. This provides the capability to reference examples that cannot easily be included in JSON documents.  The `value` field and `externalValue` field are mutually exclusive.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

In all cases, the example value is expected to be compatible with the type schema
of its associated value.  Tooling implementations MAY choose to
validate compatibility automatically, and reject the example value(s) if incompatible.

Example Object Examples:

```json
{
  "contentDescriptors": {
    "properties": {
      "name": {
        "type": "string",
        "examples": [
          { "$ref": "http://example.org/petapi-examples/openapi.json#/components/examples/name-example" },
          {
            "name": "Chinese",
            "summary": "using non-english characters",
            "description": "an example of how the rpc api can handle non english characters",
            "value": "你好世界"
          }
        ]
      }
    }
  }
}
```

##### <a name="linkObject"></a>Link Object

The `Link object` represents a possible design-time link for a response.
The presence of a link does not guarantee the caller's ability to successfully invoke it, rather it provides a known relationship and traversal mechanism between responses and other methods.

Unlike _dynamic_ links (i.e. links provided **in** the response payload), the OPENRPC linking mechanism does not require link information in the runtime response.

For computing links, and providing instructions to execute them, a [runtime expression](#runtimeExpression) is used for accessing values in an method and using them as parameters while invoking the linked method.

Field Name  |  Type  | Description
---|:---:|---
<a name="linkMethod"></a>method | `string` | The name of an _existing_, resolvable OPENRPC method, as defined with a unique `method`. This field MUST resolve to a unique [Method Object](#methodObject). As opposed to Open Api, Relative `method` values  ARE NOT permitted.
<a name="linkParameters"></a>parameters   | Map[`string`, Any \| [{expression}](#runtimeExpression)] | A map representing parameters to pass to a method as specified with `method`. The key is the parameter name to be used, whereas the value can be a constant or an expression to be evaluated and passed to the linked method.
<a name="linkRequest"></a>request | Any \| [{expression}](#runtimeExpression) | A literal value or [{expression}](#runtimeExpression) to use as a request body when calling the target method.
<a name="linkDescription"></a>description  | `string` | A description of the link. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="linkServer"></a>server       | [Server Object](#serverObject) | A server object to be used by the target operation.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

A linked method must be identified directly, and must exist in the list of methods defined by the [Methods Object](#methodsObject).

Examples:

Computing a link from a request operation where the `$parameters.id` is used to pass a request parameter to the linked operation.

```json
{
  "methods": {
    "get_user": {
      "parameters": [
        {
          "name": "id",
          "required": true,
          "description": "the user identifier, as userId",
          "schema": {
            "type": "string"
          }
        }
      ],
      "results": {
        "description": "the user being returned",
        "schema": {
          "type": "object",
          "properties": {
            "uuid": {
              "type": "string",
              "format": "uuid"
            }
          }
        }
      },
      "links": {
        "address": {
          "method": "get_user_address",
          "parameters": {
            "userId": "$parameters.id"
          }
        }
      }
    },
    "get_user_address": {
      "parameters": [
        {
          "name": "userid",
          "required": true,
          "description": "the user identifier, as userId",
          "schema": {
            "type": "string"
          }
        }
      ],
      "results": {
        "description": "the user's address"
      }
    }
  }
}
```

When a runtime expression fails to evaluate, no parameter value is passed to the target operation.

Values from the response can be used to drive a linked operation.

```json
{
  "links": {
    "address": {
      "method": "get_user_address",
      "parameters": {
        "userid": "$response.uuid"
      }
    }
  }
}
```

Clients follow all links at their discretion.
Neither permissions, nor the capability to make a successful call to that link, is guaranteed
solely by the existence of a relationship.

###### <a name="runtimeExpression"></a>Runtime Expressions

Runtime expressions allow defining values based on information that will only be available within the HTTP message in an actual API call.
This mechanism is used by [Link Objects](#linkObject) and [Callback Objects](#callbackObject).

The runtime expression is based on the runtime expression defined by the following [ABNF](https://tools.ietf.org/html/rfc5234) syntax.
Since JSON RPC does not make extensive use of status codes, query params or paths, many of the fields do not apply and have been omited.

```
      expression = ( "$request." source | "$response." source )
      fragment = a JSON Pointer [RFC 6901](https://tools.ietf.org/html/rfc6901)
      name = *( char )
      char = as per RFC [7159](https://tools.ietf.org/html/rfc7159#section-7)
      token = as per RFC [7230](https://tools.ietf.org/html/rfc7230#section-3.2.6)
```

The `name` identifier is case-sensitive, whereas `token` is not.

The table below provides examples of runtime expressions and examples of their use in a value:

Examples:

Source Location | example expression  | notes
---|:---|:---|
Request parameter      | `$request.id`        | Request parameters MUST be declared in the `parameters` section of the parent operation or they cannot be evaluated.
Deep Request parameter | `$request.user.uuid`   | In methods which accept nested object payloads, `.` may be used to denote traversal of an object.
Response value         | `$response.uuid`       |  In methods which return payloads, references may be made to portions of the response body or the entire body.

Runtime expressions preserve the type of the referenced value.
Expressions can be embedded into string values by surrounding the expression with `{}` curly braces.

##### <a name="errorObject"></a>Error Object
Defines an application level error.

Field Name | Type | Description
---|:---:|---
<a name="errorCode"></a>[Application Defined Error Code](https://www.jsonrpc.org/specification#response_object) | `number` | A Number that indicates the error type that occurred. This MUST be an integer. The error codes from and including -32768 to -32000 are reserved for pre-defined errors. These pre-defined errors SHOULD be assumed to be returned from any JSON RPC api.
<a name="errorMessage"></a>Message | `string` | A String providing a short description of the error. The message SHOULD be limited to a concise single sentence.
<a name="errorMeaning"></a>Meaning | `string` | A Primitive or Structured value that contains additional information about the error. This may be omitted. The value of this member is defined by the Server (e.g. detailed error information, nested errors etc.).

#### <a name="componentsObject"></a>Components Object

Holds a set of reusable objects for different aspects of the OPENRPC.
All objects defined within the components object will have no effect on the API unless they are explicitly referenced from properties outside the components object.

<a name="componentsContentDescriptors"></a> contentDescriptors | Map[`string`, [Content Descriptor Object](#contentDescriptorObject)] | An object to hold reusable [Content Descriptor Objects](#contentDescriptorObject).
<a name="componentsExamples"></a> examples | Map[`string`, [Example Object](#exampleObject)] | An object to hold reusable [Example Objects](#exampleObject).
<a name="componentsLinks"></a> links | Map[`string`, [Link Object](#linkObject)] | An object to hold reusable [Link Objects](#linkObject).

Field Name | Type | Description
---|:---|---
<a name="componentsContentDescriptors"></a>contentDescriptors | Map[`string`, [Content Descriptor Object](#contentDescriptorObject)] | An object to hold reusable [Content Descriptor Objects](#contentDescriptorObject).
<a name="componentsSchemas"></a>schemas | Map[`string`, [Schema Object](#schemaObject)] | An object to hold reusable [Schema Objects](#schemaObject).
<a name="componentsExamples"></a>examples | Map[`string`, [Example Object](#exampleObject) \| [Reference Object](#referenceObject)] | An object to hold reusable [Example Objects](#exampleObject).
<a name="componentsLinks"></a> links | Map[`string`, [Link Object](#linkObject) \| [Reference Object](#referenceObject)] | An object to hold reusable [Link Objects](#linkObject).
<a name="componentsErrors"></a>errors | Map[`string`, [Error Object](#errorObject)] | An object to hold reusable [Error Objects](#errorObject).

This object MAY be extended with [Specification Extensions](#specificationExtensions).

All the fixed fields declared above are objects that MUST use keys that match the regular expression: `^[a-zA-Z0-9\.\-_]+$`.

Field Name Examples:

```
User
User_1
User_Name
user-name
my.org.User
```

Components Object Example:

```json
"components": {
  "schemas": {
    "GeneralError": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "message": {
          "type": "string"
        }
      }
    },
    "Category": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    },
    "Tag": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "name": {
          "type": "string"
        }
      }
    }
  },
  "contentDescriptors": {
    "skipParam": {
      "name": "skip",
      "in": "query",
      "description": "number of items to skip",
      "required": true,
      "schema": {
        "type": "integer",
        "format": "int32"
      }
    },
    "limitParam": {
      "name": "limit",
      "in": "query",
      "description": "max records to return",
      "required": true,
      "schema" : {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "errors": {
    "CustomNotFound": {
      "code": "1",
      "message": "super duper not found doe",
      "meaning": "absolute pandemonium"
    }
  }
}
```

#### <a name="tagObject"></a>Tag Object

Adds metadata to a single tag that is used by the [Method Object](#methodObject).
It is not mandatory to have a Tag Object per tag defined in the Method Object instances.

Field Name | Type | Description
---|:---:|---
<a name="tagName"></a>name | `string` | **REQUIRED**. The name of the tag.
<a name="tagDescription"></a>description | `string` | A short description for the tag. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="tagExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this tag.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

Tag Object Example:

```json
{
	"name": "pet",
	"description": "Pets operations"
}
```

#### <a name="externalDocumentationObject"></a>External Documentation Object

***Prolly doesnt belong at this depth level of the spec***

Allows referencing an external resource for extended documentation.

Field Name | Type | Description
---|:---:|---
<a name="externalDocDescription"></a>description | `string` | A short description of the target documentation. [CommonMark syntax](http://spec.commonmark.org/) MAY be used for rich text representation.
<a name="externalDocUrl"></a>url | `string` | **REQUIRED**. The URL for the target documentation. Value MUST be in the format of a URL.

This object MAY be extended with [Specification Extensions](#specificationExtensions).

External Documentation Object Example:

```json
{
  "description": "Find more info here",
  "url": "https://example.com"
}
```

#### <a name="referenceObject"></a>Reference Object

A simple object to allow referencing other components in the specification, internally and externally.

The Reference Object is defined by [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) and follows the same structure, behavior and rules.

For this specification, reference resolution is accomplished as defined by the JSON Reference specification and not by the JSON Schema specification.

Field Name | Type | Description
---|:---:|---
<a name="referenceRef"></a>$ref | `string` | **REQUIRED**. The reference string.

This object cannot be extended with additional properties and any properties added SHALL be ignored.

Reference Object Example:

```json
{
	"$ref": "#/components/schemas/Pet"
}
```

Relative Schema Document Example:
```json
{
  "$ref": "Pet.json"
}
```

Relative Documents With Embedded Schema Example:
```json
{
  "$ref": "definitions.json#/Pet"
}
```

### <a name="specificationExtensions"></a>Specification Extensions

While the OpenRPC Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.

The extensions properties are implemented as patterned fields that are always prefixed by `"x-"`.

Field Pattern | Type | Description
---|:---:|---
<a name="infoExtensions"></a>^x- | Any | Allows extensions to the OpenRPC Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. Can have any valid JSON format value.

The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).
