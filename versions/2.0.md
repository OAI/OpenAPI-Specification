# OpenAPI Specification
## (fka Swagger RESTful API Documentation Specification)

#### Version 2.0

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

The Swagger specification is licensed under [The Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## Introductions

Swagger™  is a project used to describe and document RESTful APIs.

The Swagger specification defines a set of files required to describe such an API. These files can then be used by the Swagger-UI project to display the API and Swagger-Codegen to generate clients in various languages. Additional utilities can also take advantage of the resulting files, such as testing tools.

## Revision History

Version | Date | Notes
--- | --- | ---
2.0 | 2014-09-08 | Release of Swagger 2.0
1.2 | 2014-03-14 | Initial release of the formal document.
1.1 | 2012-08-22 | Release of Swagger 1.1
1.0 | 2011-08-10 | First release of the Swagger Specification

## Definitions

##### <a name="pathTemplating"></a>Path Templating
Path templating refers to the usage of curly braces ({}) to mark a section of a URL path as replaceable using path parameters.

##### <a name="mimeTypes"></a>Mime Types
Mime type definitions are spread across several resources. The mime type definitions should be in compliance with [RFC 6838](http://tools.ietf.org/html/rfc6838).

Some examples of possible mime type definitions:
```
  text/plain; charset=utf-8
  application/json
  application/vnd.github+json
  application/vnd.github.v3+json
  application/vnd.github.v3.raw+json
  application/vnd.github.v3.text+json
  application/vnd.github.v3.html+json
  application/vnd.github.v3.full+json
  application/vnd.github.v3.diff
  application/vnd.github.v3.patch
```
##### <a name="httpCodes"></a>HTTP Status Codes
The HTTP Status Codes are used to indicate the status of the executed operation. The available status codes are described by [RFC 7231](http://tools.ietf.org/html/rfc7231#section-6) and in the [IANA Status Code Registry](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Specification

### Format

The files describing the RESTful API in accordance with the Swagger specification are represented as JSON objects and conform to the JSON standards. YAML, being a superset of JSON, can be used as well to 
represent a Swagger specification file.

For example, if a field is said to have an array value, the JSON array representation will be used:

```js
{
   "field" : [...]
}
```

While the API is described using JSON it does not impose a JSON input/output to the API itself.

All field names in the specification are **case sensitive**.

The schema exposes two types of fields. Fixed fields, which have a declared name, and Patterned fields, which declare a regex pattern for the field name. Patterned fields can have multiple occurrences as long as each has a unique name. 

### File Structure

The Swagger representation of the API is made of a single file. However, parts of the definitions can be split into separate files, at the discretion of the user. This is applicable for `$ref` fields in the specification as follows from the [JSON Schema](http://json-schema.org) definitions.

By convention, the Swagger specification file is named `swagger.json`.

### Data Types

Primitive data types in the Swagger Specification are based on the types supported by the [JSON-Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-3.5). Models are described using the [Schema Object](#schemaObject) which is a subset of JSON Schema Draft 4.

An additional primitive data type `"file"` is used by the [Parameter Object](#parameterObject) and the [Response Object](#responseObject) to set the parameter type or the response as being a file.

<a name="dataTypeFormat"></a>Primitives have an optional modifier property `format`. Swagger uses several known formats to more finely define the data type being used. However, the `format` property is an open `string`-valued property, and can have any value to support documentation needs. Formats such as `"email"`, `"uuid"`, etc., can be used even though they are not defined by this specification. Types that are not accompanied by a `format` property follow their definition from the JSON Schema (except for `file` type which is defined above). The formats defined by the Swagger Specification are:


Common Name | [`type`](#dataTypeType) | [`format`](#dataTypeFormat) | Comments
----------- | ------ | -------- | --------
integer | `integer` | `int32` | signed 32 bits
long | `integer` | `int64` | signed 64 bits
float | `number` | `float` | |
double | `number` | `double` | |
string | `string` | | |
byte | `string` | `byte` | base64 encoded characters
binary | `string` | `binary` | any sequence of octets
boolean | `boolean` | | |
date | `string` | `date` | As defined by `full-date` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
dateTime | `string` | `date-time` | As defined by `date-time` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
password | `string` | `password` | Used to hint UIs the input needs to be obscured.

### Schema

#### <a name="swaggerObject"></a>Swagger Object

This is the root document object for the API specification. It combines what previously was the Resource Listing and API Declaration (version 1.2 and earlier) together into one document.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"></a>swagger | `string` | **Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.
<a name="swaggerInfo"></a>info | [Info Object](#infoObject) | **Required.** Provides metadata about the API. The metadata can be used by the clients if needed.
<a name="swaggerHost"></a>host | `string` | The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used (including the port). The `host` does not support [path templating](#pathTemplating).
<a name="swaggerBasePath"></a>basePath | `string` | The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](#pathTemplating). 
<a name="swaggerSchemes"></a>schemes | [`string`] | The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the Swagger definition itself.
<a name="swaggerConsumes"></a>consumes | [`string`] | A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerProduces"></a>produces | [`string`] | A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerPaths"></a>paths | [Paths Object](#pathsObject) | **Required.** The available paths and operations for the API.
<a name="swaggerDefinitions"></a>definitions | [Definitions Object](#definitionsObject) | An object to hold data types produced and consumed by operations.
<a name="swaggerParameters"></a>parameters | [Parameters Definitions Object](#parametersDefinitionsObject) | An object to hold parameters that can be used across operations. This property *does not* define global parameters for all operations.
<a name="swaggerResponses"></a>responses | [Responses Definitions Object](#responsesDefinitionsObject) | An object to hold responses that can be used across operations. This property *does not* define global responses for all operations.
<a name="swaggerSecurityDefinitions"></a>securityDefinitions | [Security Definitions Object](#securityDefinitionsObject) | Security scheme definitions that can be used across the specification.
<a name="swaggerSecurity"></a>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition.
<a name="swaggerTags"></a>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
<a name="swaggerExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="swaggerExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

#### <a name="infoObject"></a>Info Object

The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"></a>title | `string` | **Required.** The title of the application.
<a name="infoDescription"></a>description | `string` | A short description of the application. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="infoTermsOfService"></a>termsOfService | `string` | The Terms of Service for the API.
<a name="infoContact"></a>contact | [Contact Object](#contactObject) | The contact information for the exposed API.
<a name="infoLicense"></a>license | [License Object](#licenseObject) | The license information for the exposed API.
<a name="infoVersion"></a>version | `string` | **Required** Provides the version of the application API (not to be confused with the specification version).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="infoExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Info Object Example:

```js
{
  "title": "Swagger Sample App",
  "description": "This is a sample server Petstore server.",
  "termsOfService": "http://swagger.io/terms/",
  "contact": {
    "name": "API Support",
    "url": "http://www.swagger.io/support",
    "email": "support@swagger.io"
  },
  "license": {
    "name": "Apache 2.0",
    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
}
```

```yaml
title: Swagger Sample App
description: This is a sample server Petstore server.
termsOfService: http://swagger.io/terms/
contact:
  name: API Support
  url: http://www.swagger.io/support
  email: support@swagger.io
license:
  name: Apache 2.0
  url: http://www.apache.org/licenses/LICENSE-2.0.html
version: 1.0.1
```

#### <a name="contactObject"></a>Contact Object

Contact information for the exposed API.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="contactName"></a>name | `string` | The identifying name of the contact person/organization.
<a name="contactUrl"></a>url | `string` | The URL pointing to the contact information. MUST be in the format of a URL.
<a name="contactEmail"></a>email | `string` | The email address of the contact person/organization. MUST be in the format of an email address.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="contactExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Contact Object Example:

```js
{
  "name": "API Support",
  "url": "http://www.swagger.io/support",
  "email": "support@swagger.io"
}
```

```yaml
name: API Support
url: http://www.swagger.io/support
email: support@swagger.io
```

#### <a name="licenseObject"></a>License Object

License information for the exposed API.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="licenseName"></a>name | `string` | **Required.** The license name used for the API.
<a name="licenseUrl"></a>url | `string` | A URL to the license used for the API. MUST be in the format of a URL.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="licenseExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### License Object Example:

```js
{
  "name": "Apache 2.0",
  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
}
```

```yaml
name: Apache 2.0
url: http://www.apache.org/licenses/LICENSE-2.0.html
```

#### <a name="pathsObject"></a>Paths Object

Holds the relative paths to the individual endpoints. The path is appended to the [`basePath`](#swaggerBasePath) in order to construct the full URL.
The Paths may be empty, due to [ACL constraints](#securityFiltering).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathsPath"></a>/{path} | [Path Item Object](#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the [`basePath`](#swaggerBasePath) in order to construct the full URL. [Path templating](#pathTemplating) is allowed.
<a name="pathsExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Paths Object Example

```js
{
  "/pets": {
    "get": {
      "description": "Returns all pets from the system that the user has access to",
      "produces": [
        "application/json"
      ],
      "responses": {
        "200": {
          "description": "A list of pets.",
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/pet"
            }
          }
        }
      }
    }
  }
}
```

```yaml
/pets:
  get:
    description: Returns all pets from the system that the user has access to
    produces:
    - application/json
    responses:
      '200':
        description: A list of pets.
        schema:
          type: array
          items:
            $ref: '#/definitions/pet'
```

#### <a name="pathItemObject"></a>Path Item Object

Describes the operations available on a single path.
A Path Item may be empty, due to [ACL constraints](#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="pathItemRef"></a>$ref | `string` | Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](#pathItemObject). If there are conflicts between the referenced definition and this Path Item's definition, the behavior is *undefined*.
<a name="pathItemGet"></a>get | [Operation Object](#operationObject) | A definition of a GET operation on this path.
<a name="pathItemPut"></a>put | [Operation Object](#operationObject) | A definition of a PUT operation on this path.
<a name="pathItemPost"></a>post | [Operation Object](#operationObject) | A definition of a POST operation on this path.
<a name="pathItemDelete"></a>delete | [Operation Object](#operationObject) | A definition of a DELETE operation on this path.
<a name="pathItemOptions"></a>options | [Operation Object](#operationObject) | A definition of a OPTIONS operation on this path.
<a name="pathItemHead"></a>head | [Operation Object](#operationObject) | A definition of a HEAD operation on this path.
<a name="pathItemPatch"></a>patch | [Operation Object](#operationObject) | A definition of a PATCH operation on this path.
<a name="pathItemParameters"></a>parameters | [[Parameter Object](#parameterObject) \| [Reference Object](#referenceObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#referenceObject) to link to parameters that are defined at the [Swagger Object's parameters](#swaggerParameters). There can be one "body" parameter at most.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathItemExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Path Item Object Example

```js
{
  "get": {
    "description": "Returns pets based on ID",
    "summary": "Find pets by ID",
    "operationId": "getPetsById",
    "produces": [
      "application/json",
      "text/html"
    ],
    "responses": {
      "200": {
        "description": "pet response",
        "schema": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Pet"
          }
        }
      },
      "default": {
        "description": "error payload",
        "schema": {
          "$ref": "#/definitions/ErrorModel"
        }
      }
    }
  },
  "parameters": [
    {
      "name": "id",
      "in": "path",
      "description": "ID of pet to use",
      "required": true,
      "type": "array",
      "items": {
        "type": "string"
      },
      "collectionFormat": "csv"
    }
  ]
}
```

```yaml
get:
  description: Returns pets based on ID
  summary: Find pets by ID
  operationId: getPetsById
  produces:
  - application/json
  - text/html
  responses:
    '200':
      description: pet response
      schema:
        type: array
        items:
          $ref: '#/definitions/Pet'
    default:
      description: error payload
      schema:
        $ref: '#/definitions/ErrorModel'
parameters:
- name: id
  in: path
  description: ID of pet to use
  required: true
  type: array
  items:
    type: string
  collectionFormat: csv
```

#### <a name="operationObject"></a>Operation Object

Describes a single API operation on a path.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="operationTags"></a>tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
<a name="operationSummary"></a>summary | `string` | A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters.
<a name="operationDescription"></a>description | `string` | A verbose explanation of the operation behavior. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="operationExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this operation.
<a name="operationId"></a>operationId | `string` | Unique string used to identify the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is recommended to follow common programming naming conventions.
<a name="operationConsumes"></a>consumes | [`string`] | A list of MIME types the operation can consume. This overrides the [`consumes`](#swaggerConsumes) definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationProduces"></a>produces | [`string`] | A list of MIME types the operation can produce. This overrides the [`produces`](#swaggerProduces) definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationParameters"></a>parameters | [[Parameter Object](#parameterObject) \| [Reference Object](#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](#pathItemParameters), the new definition will override it, but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#referenceObject) to link to parameters that are defined at the [Swagger Object's parameters](#swaggerParameters). There can be one "body" parameter at most.
<a name="operationResponses"></a>responses | [Responses Object](#responsesObject) | **Required.** The list of possible responses as they are returned from executing this operation.
<a name="operationSchemes"></a>schemes | [`string`] | The transfer protocol for the operation. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. The value overrides the Swagger Object [`schemes`](#swaggerSchemes) definition. 
<a name="operationDeprecated"></a>deprecated | `boolean` | Declares this operation to be deprecated. Usage of the declared operation should be refrained. Default value is `false`.
<a name="operationSecurity"></a>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security schemes are applied for this operation. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). This definition overrides any declared top-level [`security`](#swaggerSecurity). To remove a top-level security declaration, an empty array can be used.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="operationExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Operation Object Example

```js
{
  "tags": [
    "pet"
  ],
  "summary": "Updates a pet in the store with form data",
  "description": "",
  "operationId": "updatePetWithForm",
  "consumes": [
    "application/x-www-form-urlencoded"
  ],
  "produces": [
    "application/json",
    "application/xml"
  ],
  "parameters": [
    {
      "name": "petId",
      "in": "path",
      "description": "ID of pet that needs to be updated",
      "required": true,
      "type": "string"
    },
    {
      "name": "name",
      "in": "formData",
      "description": "Updated name of the pet",
      "required": false,
      "type": "string"
    },
    {
      "name": "status",
      "in": "formData",
      "description": "Updated status of the pet",
      "required": false,
      "type": "string"
    }
  ],
  "responses": {
    "200": {
      "description": "Pet updated."
    },
    "405": {
      "description": "Invalid input"
    }
  },
  "security": [
    {
      "petstore_auth": [
        "write:pets",
        "read:pets"
      ]
    }
  ]
}
```

```yaml
tags:
- pet
summary: Updates a pet in the store with form data
description: ""
operationId: updatePetWithForm
consumes:
- application/x-www-form-urlencoded
produces:
- application/json
- application/xml
parameters:
- name: petId
  in: path
  description: ID of pet that needs to be updated
  required: true
  type: string
- name: name
  in: formData
  description: Updated name of the pet
  required: false
  type: string
- name: status
  in: formData
  description: Updated status of the pet
  required: false
  type: string
responses:
  '200':
    description: Pet updated.
  '405':
    description: Invalid input
security:
- petstore_auth:
  - write:pets
  - read:pets
```


#### <a name="externalDocumentationObject"></a>External Documentation Object

Allows referencing an external resource for extended documentation.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="externalDocDescription"></a>description | `string` | A short description of the target documentation. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="externalDocUrl"></a>url | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="externalDocExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### External Documentation Object Example

```js
{
  "description": "Find more info here",
  "url": "https://swagger.io"
}
```

```yaml
description: Find more info here
url: https://swagger.io
```

#### <a name="parameterObject"></a>Parameter Object

Describes a single operation parameter.

A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

There are five possible parameter types.
* Path - Used together with [Path Templating](#pathTemplating), where the parameter value is actually part of the operation's URL. This does not include the host or base path of the API. For example, in `/items/{itemId}`, the path parameter is `itemId`.
* Query - Parameters that are appended to the URL. For example, in `/items?id=###`, the query parameter is `id`.
* Header - Custom headers that are expected as part of the request.
* Body - The payload that's appended to the HTTP request. Since there can only be one payload, there can only be *one* body parameter. The name of the body parameter has no effect on the parameter itself and is used for documentation purposes only. Since Form parameters are also in the payload, body and form parameters cannot exist together for the same operation.
* Form - Used to describe the payload of an HTTP request when either `application/x-www-form-urlencoded`, `multipart/form-data` or both are used as the content type of the request (in Swagger's definition, the [`consumes`](#operationConsumes) property of an operation). This is the only parameter type that can be used to send files, thus supporting the `file` type. Since form parameters are sent in the payload, they cannot be declared together with a body parameter for the same operation. Form parameters have a different format based on the content-type used (for further details, consult http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4):
  * `application/x-www-form-urlencoded` - Similar to the format of Query parameters but as a payload. For example, `foo=1&bar=swagger` - both `foo` and `bar` are form parameters. This is normally used for simple parameters that are being transferred.
  * `multipart/form-data` - each parameter takes a section in the payload with an internal header. For example, for the header `Content-Disposition: form-data; name="submit-name"` the name of the parameter is `submit-name`. This type of form parameters is more commonly used for file transfers.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="parameterName"></a>name | `string` | **Required.** The name of the parameter. Parameter names are *case sensitive*. <ul><li>If [`in`](#parameterIn) is `"path"`, the `name` field MUST correspond to the associated path segment from the [path](#pathsPath) field in the [Paths Object](#pathsObject). See [Path Templating](#pathTemplating) for further information.<li>For all other cases, the `name` corresponds to the parameter name used based on the [`in`](#parameterIn) property.</ul>
<a name="parameterIn"></a>in | `string` | **Required.** The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".
<a name="parameterDescription"></a>description | `string` | A brief description of the parameter. This could contain examples of use.  [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="parameterRequired"></a>required | `boolean` | Determines whether this parameter is mandatory. If the parameter is [`in`](#parameterIn) "path", this property is **required** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`. 

If [`in`](#parameterIn) is `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterSchema"></a>schema | [Schema Object](#schemaObject) | **Required.** The schema defining the type used for the body parameter.

If [`in`](#parameterIn) is any value other than `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterType"></a>type | `string` | **Required.** The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` or `"file"`. If `type` is `"file"`, the [`consumes`](#operationConsumes) MUST be either `"multipart/form-data"`, `" application/x-www-form-urlencoded"` or both and the parameter MUST be [`in`](#parameterIn) `"formData"`.
<a name="parameterFormat"></a>format | `string` | The extending format for the previously mentioned [`type`](#parameterType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="parameterAllowEmptyValue"/>allowEmptyValue | `boolean` | Sets the ability to pass empty-valued parameters. This is valid only for either `query` or `formData` parameters and allows you to send a parameter with a name only or  an empty value. Default value is `false`.
<a name="parameterItems"></a>items | [Items Object](#itemsObject) | **Required if [`type`](#parameterType) is "array".** Describes the type of items in the array.
<a name="parameterCollectionFormat"></a>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. <li>`multi` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters [`in`](#parameterIn) "query" or "formData". </ul> Default value is `csv`.
<a name="parameterDefault"></a>default | * | Declares the value of the parameter that the server will use if none is provided, for example a "count" to control the number of results per page might default to 100 if not supplied by the client in the request. (Note: "default" has no meaning for required parameters.)  See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](#parameterType) for this parameter.
<a name="parameterMaximum"></a>maximum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="parameterExclusiveMaximum"></a>exclusiveMaximum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="parameterMinimum"></a>minimum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="parameterExclusiveMinimum"></a>exclusiveMinimum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="parameterMaxLength"></a>maxLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.
<a name="parameterMinLength"></a>minLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.
<a name="parameterPattern"></a>pattern | `string` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.
<a name="parameterMaxItems"></a>maxItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.
<a name="parameterMinItems"></a>minItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.
<a name="parameterUniqueItems"></a>uniqueItems | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.
<a name="parameterEnum"></a>enum | [*] | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.
<a name="parameterMultipleOf"></a>multipleOf | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.


##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="parameterExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Parameter Object Examples

###### Body Parameters

A body parameter with a referenced schema definition (normally for a model definition):
```js
{
  "name": "user",
  "in": "body",
  "description": "user to add to the system",
  "required": true,
  "schema": {
    "$ref": "#/definitions/User"
  }
}
```

```yaml
name: user
in: body
description: user to add to the system
required: true
schema:
  $ref: '#/definitions/User'
```

A body parameter that is an array of string values:
```js
{
  "name": "user",
  "in": "body",
  "description": "user to add to the system",
  "required": true,
  "schema": {
    "type": "array",
    "items": {
      "type": "string"
    }
  }
}
```

```yaml
name: user
in: body
description: user to add to the system
required: true
schema:
  type: array
  items:
    type: string
```

###### Other Parameters

A header parameter with an array of 64 bit integer numbers:

```js
{
  "name": "token",
  "in": "header",
  "description": "token to be passed as a header",
  "required": true,
  "type": "array",
  "items": {
    "type": "integer",
    "format": "int64"
  },
  "collectionFormat": "csv"
}
```

```yaml
name: token
in: header
description: token to be passed as a header
required: true
type: array
items:
  type: integer
  format: int64
collectionFormat: csv
```

A path parameter of a string value:
```js
{
  "name": "username",
  "in": "path",
  "description": "username to fetch",
  "required": true,
  "type": "string"
}
```

```yaml
name: username
in: path
description: username to fetch
required: true
type: string
```

An optional query parameter of a string value, allowing multiple values by repeating the query parameter:
```js
{
  "name": "id",
  "in": "query",
  "description": "ID of the object to fetch",
  "required": false,
  "type": "array",
  "items": {
    "type": "string"
  },
  "collectionFormat": "multi"
}
```

```yaml
name: id
in: query
description: ID of the object to fetch
required: false
type: array
items:
  type: string
collectionFormat: multi
```

A form data with file type for a file upload:
```js
{
  "name": "avatar",
  "in": "formData",
  "description": "The avatar of the user",
  "required": true,
  "type": "file"
}
```

```yaml
name: avatar
in: formData
description: The avatar of the user
required: true
type: file
```

#### <a name="itemsObject"></a>Items Object

A limited subset of JSON-Schema's items object. It is used by parameter definitions that are not located [`in`](#parameterIn) `"body"`.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="itemsType"></a>type | `string` | **Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`. Files and models are not allowed.
<a name="itemsFormat"></a>format | `string` | The extending format for the previously mentioned [`type`](#parameterType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="itemsItems"></a>items | [Items Object](#itemsObject) | **Required if [`type`](#itemsType) is "array".** Describes the type of items in the array.
<a name="itemsCollectionFormat"></a>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. </ul> Default value is `csv`.
<a name="itemsDefault"></a>default | * | Declares the value of the item that the server will use if none is provided. (Note: "default" has no meaning for required items.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](#itemsType) for the data type.
<a name="itemsMaximum"></a>maximum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="itemsMaximum"></a>exclusiveMaximum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="itemsMinimum"></a>minimum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="itemsExclusiveMinimum"></a>exclusiveMinimum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="itemsMaxLength"></a>maxLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.
<a name="itemsMinLength"></a>minLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.
<a name="itemsPattern"></a>pattern | `string` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.
<a name="itemsMaxItems"></a>maxItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.
<a name="itemsMinItems"></a>minItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.
<a name="itemsUniqueItems"></a>uniqueItems | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.
<a name="itemsEnum"></a>enum | [*] | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.
<a name="itemsMultipleOf"></a>multipleOf | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="itemsExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Items Object Examples

Items must be of type  string and have the minimum length of  2 characters:

```js
{
    "type": "string",
    "minLength": 2
}
```

```yaml
type: string
minLength: 2
```

An array of arrays, the internal array being of type integer, numbers must be between 0 and 63 (inclusive):

```js
{
    "type": "array",
    "items": {
        "type": "integer",
        "minimum": 0,
        "maximum": 63
    }
}
```

```yaml
type: array
items:
  type: integer
  minimum: 0
  maximum: 63
```

#### <a name="responsesObject"></a>Responses Object

A container for the expected responses of an operation. The container maps a HTTP response code to the expected response. It is not expected from the documentation to necessarily cover all possible HTTP response codes, since they may not be known in advance. However, it is expected from the documentation to cover a successful operation response and any known errors.

The `default` can be used as the default response object for all HTTP codes that are not covered individually by the specification.

The `Responses Object` MUST contain at least one response code, and it SHOULD be the response for a successful operation call.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responsesDefault"></a>default | [Response Object](#responseObject) \| [Reference Object](#referenceObject) | The documentation of responses other than the ones declared for specific HTTP response codes. It can be used to cover undeclared responses. [Reference Object](#referenceObject) can be used to link to a response that is defined at the [Swagger Object's responses](#swaggerResponses) section.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="responsesCode"></a>{[HTTP Status Code](#httpCodes)} | [Response Object](#responseObject) \| [Reference Object](#referenceObject) | Any [HTTP status code](#httpCodes) can be used as the property name (one property per HTTP status code). Describes the expected response for that HTTP status code.  [Reference Object](#referenceObject) can be used to link to a response that is defined at the [Swagger Object's responses](#swaggerResponses) section.
<a name="responsesExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Responses Object Example

A 200 response for successful operation and a default response for others (implying an error):

```js
{
  "200": {
    "description": "a pet to be returned",
    "schema": {
      "$ref": "#/definitions/Pet"
    }
  },
  "default": {
    "description": "Unexpected error",
    "schema": {
      "$ref": "#/definitions/ErrorModel"
    }
  }
}
```

```yaml
'200':
  description: a pet to be returned
  schema:
    $ref: '#/definitions/Pet'
default:
  description: Unexpected error
  schema:
    $ref: '#/definitions/ErrorModel'
```

#### <a name="responseObject"></a>Response Object
Describes a single response from an API Operation.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responseDescription"></a>description | `string` | **Required.** A short description of the response. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="responseSchema"></a>schema | [Schema Object](#schemaObject) | A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response. As an extension to the [Schema Object](#schemaObject), its root `type` value may also be `"file"`. This SHOULD be accompanied by a relevant `produces` mime-type.
<a name="responseHeaders"></a>headers | [Headers Object](#headersObject) | A list of headers that are sent with the response.
<a name="responseExamples"></a>examples | [Example Object](#exampleObject) | An example of the response message.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="responseExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Response Object Examples

Response of an array of a complex type:

```js
{
  "description": "A complex object array response",
  "schema": {
    "type": "array",
    "items": {
      "$ref": "#/definitions/VeryComplexType"
    }
  }
}
```

```yaml
description: A complex object array response
schema:
  type: array
  items:
    $ref: '#/definitions/VeryComplexType'
```

Response with a string type:

```js
{
  "description": "A simple string response",
  "schema": {
    "type": "string"
  }
}
```

```yaml
description: A simple string response
schema:
  type: string
```

Response with headers:

```js
{
  "description": "A simple string response",
  "schema": {
    "type": "string"
  },
  "headers": {
    "X-Rate-Limit-Limit": {
      "description": "The number of allowed requests in the current period",
      "type": "integer"
    },
    "X-Rate-Limit-Remaining": {
      "description": "The number of remaining requests in the current period",
      "type": "integer"
    },
    "X-Rate-Limit-Reset": {
      "description": "The number of seconds left in the current period",
      "type": "integer"
    }
  }
}
```

```yaml
description: A simple string response
schema:
  type: string
headers:
  X-Rate-Limit-Limit:
    description: The number of allowed requests in the current period
    type: integer
  X-Rate-Limit-Remaining:
    description: The number of remaining requests in the current period
    type: integer
  X-Rate-Limit-Reset:
    description: The number of seconds left in the current period
    type: integer
```

Response with no return value:

```js
{
  "description": "object created"
}
```

```yaml
description: object created
```

#### <a name="headersObject"></a>Headers Object
Lists the headers that can be sent as part of a response.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="headersName"></a>{name} | [Header Object](#headerObject) | The name of the property corresponds to the name of the header. The value describes the type of the header.

##### Headers Object Example

Rate-limit headers:

```js
{
    "X-Rate-Limit-Limit": {
        "description": "The number of allowed requests in the current period",
        "type": "integer"
    },
    "X-Rate-Limit-Remaining": {
        "description": "The number of remaining requests in the current period",
        "type": "integer"
    },
    "X-Rate-Limit-Reset": {
        "description": "The number of seconds left in the current period",
        "type": "integer"
    }
}
```

```yaml
X-Rate-Limit-Limit:
  description: The number of allowed requests in the current period
  type: integer
X-Rate-Limit-Remaining:
  description: The number of remaining requests in the current period
  type: integer
X-Rate-Limit-Reset:
  description: The number of seconds left in the current period
  type: integer
```

#### <a name="exampleObject"></a>Example Object

Allows sharing examples for operation responses.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="exampleMimeType"></a>{[mime type](#mimeTypes)} | Any | The name of the property MUST be one of the Operation `produces` values (either implicit or inherited). The value SHOULD be an example of what such a response would look like. 

##### Example Object Example

Example response for application/json mimetype of a Pet data type:

```js
{
  "application/json": {
    "name": "Puma",
    "type": "Dog",
    "color": "Black",
    "gender": "Female",
    "breed": "Mixed"
  }
}
```

```yaml
application/json:
  name: Puma
  type: Dog
  color: Black
  gender: Female
  breed: Mixed
```

#### <a name="headerObject"></a>Header Object

Field Name | Type | Description
---|:---:|---
<a name="headerDescription"></a>description | `string` | A short description of the header.
<a name="headerType"></a>type | `string` | **Required.** The type of the object. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.
<a name="headerFormat"></a>format | `string` | The extending format for the previously mentioned [`type`](#stType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="headerItems"></a>items | [Items Object](#itemsObject) | **Required if [`type`](#stType) is "array".** Describes the type of items in the array.
<a name="headerCollectionFormat"></a>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. </ul> Default value is `csv`.
<a name="headerDefault"></a>default | * | Declares the value of the header that the server will use if none is provided. (Note: "default" has no meaning for required headers.) See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-6.2. Unlike JSON Schema this value MUST conform to the defined [`type`](#headerDefault) for the header.
<a name="headerMaximum"></a>maximum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="headerMaximum"></a>exclusiveMaximum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2.
<a name="headerMinimum"></a>minimum | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="headerExclusiveMinimum"></a>exclusiveMinimum | `boolean` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3.
<a name="headerMaxLength"></a>maxLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1.
<a name="headerMinLength"></a>minLength | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2.
<a name="headerPattern"></a>pattern | `string` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3.
<a name="headerMaxItems"></a>maxItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2.
<a name="headerMinItems"></a>minItems | `integer` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3.
<a name="headerUniqueItems"></a>uniqueItems | `boolean` | https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4.
<a name="headerEnum"></a>enum | [*] | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1.
<a name="headerMultipleOf"></a>multipleOf | `number` | See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="headerExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Header Object Example

A simple header with of an integer type:

```js
{
  "description": "The number of allowed requests in the current period",
  "type": "integer"
}
```

```yaml
description: The number of allowed requests in the current period
type: integer
```

#### <a name="tagObject"></a>Tag Object

Allows adding meta data to a single tag that is used by the [Operation Object](#operationObject). It is not mandatory to have a Tag Object per tag used there.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="tagName"></a>name | `string` | **Required.** The name of the tag.
<a name="tagDescription"></a>description | `string` | A short description for the tag. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation.
<a name="tagExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this tag.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="tagExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Tag Object Example

```js
{
	"name": "pet",
	"description": "Pets operations"
}
```

```yaml
name: pet
description: Pets operations
```

#### <a name="referenceObject"></a>Reference Object

A simple object to allow referencing other definitions in the specification. It can be used to reference parameters and responses that are defined at the top level for reuse.

The Reference Object is a [JSON Reference](http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-02) that uses a [JSON Pointer](http://tools.ietf.org/html/rfc6901) as its value. For this specification, only [canonical dereferencing](https://tools.ietf.org/html/draft-zyp-json-schema-04#section-7.2.3) is supported.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="referenceRef"></a>$ref | `string` | **Required.** The reference string. 

##### Reference Object Example

```js
{
	"$ref": "#/definitions/Pet"
}
```

```yaml
$ref: '#/definitions/Pet'
```

##### Relative Schema File Example
```js
{
  "$ref": "Pet.json"
}
```

```yaml
$ref: 'Pet.yaml'
```

##### Relative Files With Embedded Schema Example
```js
{
  "$ref": "definitions.json#/Pet"
}
```

```yaml
$ref: 'definitions.yaml#/Pet'
```

#### <a name="schemaObject"></a>Schema Object

The Schema Object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. This object is based on the [JSON Schema Specification Draft 4](http://json-schema.org/) and uses a predefined subset of it. On top of this subset, there are extensions provided by this specification to allow for more complete documentation.

Further information about the properties can be found in [JSON Schema Core](https://tools.ietf.org/html/draft-zyp-json-schema-04) and [JSON Schema Validation](https://tools.ietf.org/html/draft-fge-json-schema-validation-00). Unless stated otherwise, the property definitions follow the JSON Schema specification as referenced here.

The following properties are taken directly from the JSON Schema definition and follow the same specifications:
- $ref - As a [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03)
- format (See [Data Type Formats](#dataTypeFormat) for further details)
- title
- description ([GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation)
- default (Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object)
- multipleOf
- maximum
- exclusiveMaximum
- minimum
- exclusiveMinimum
- maxLength
- minLength
- pattern
- maxItems
- minItems
- uniqueItems
- maxProperties
- minProperties
- required
- enum
- type

The following properties are taken from the JSON Schema definition but their definitions were adjusted to the Swagger Specification. Their definition is the same as the one from JSON Schema, only where the original definition references the JSON Schema definition, the [Schema Object](#schemaObject) definition is used instead.
- items
- allOf
- properties
- additionalProperties

Other than the JSON Schema subset fields, the following fields may be used for further schema documentation.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="schemaDiscriminator"></a>discriminator | `string` | Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the `required` property list. When used, the value MUST be the name of this schema or any schema that inherits it.
<a name="schemaReadOnly"></a>readOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request. Properties marked as `readOnly` being `true` SHOULD NOT be in the `required` list of the defined schema. Default value is `false`.
<a name="schemaXml"></a>xml | [XML Object](#xmlObject) | This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
<a name="schemaExternalDocs"></a>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this schema. 
<a name="schemaExample"></a>example | Any | A free-form property to include an example of an instance for this schema.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="schemaExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

###### Composition and Inheritance (Polymorphism)

Swagger allows combining and extending model definitions using the `allOf` property of JSON Schema, in effect offering model composition. `allOf` takes in an array of object definitions that are validated *independently* but together compose a single object. 

While composition offers model extensibility, it does not imply a hierarchy between the models. To support polymorphism, Swagger adds the support of the `discriminator` field. When used, the `discriminator` will be the name of the property used to decide which schema definition is used to validate the structure of the model. As such, the `discriminator` field MUST be a required field. The value of the chosen property has to be the friendly name given to the model under the `definitions` property. As such, inline schema definitions, which do not have a given id, *cannot* be used in polymorphism.

###### XML Modeling

The [xml](#schemaXml) property allows extra definitions when translating the JSON definition to XML. The [XML Object](#xmlObject) contains additional information about the available options.

##### Schema Object Examples

###### Primitive Sample

Unlike previous versions of Swagger, Schema definitions can be used to describe primitive and arrays as well.

```js
{
    "type": "string",
    "format": "email"
}
```

```yaml
type: string
format: email
```

###### Simple Model

```js
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
      "$ref": "#/definitions/Address"
    },
    "age": {
      "type": "integer",
      "format": "int32",
      "minimum": 0
    }
  }
}
```

```yaml
type: object
required:
- name
properties:
  name:
    type: string
  address:
    $ref: '#/definitions/Address'
  age:
    type: integer
    format: int32
    minimum: 0
```

###### Model with Map/Dictionary Properties

For a simple string to string mapping:

```js
{
  "type": "object",
  "additionalProperties": {
    "type": "string"
  }
}
```

```yaml
type: object
additionalProperties:
  type: string
```

For a string to model mapping:

```js
{
  "type": "object",
  "additionalProperties": {
    "$ref": "#/definitions/ComplexModel"
  }
}
```

```yaml
type: object
additionalProperties:
  $ref: '#/definitions/ComplexModel'
```

###### Model with Example

```js
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

```yaml
type: object
properties:
  id:
    type: integer
    format: int64
  name:
    type: string
required:
- name
example:
  name: Puma
  id: 1
```

###### Models with Composition

```js
{
  "definitions": {
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
          "$ref": "#/definitions/ErrorModel"
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
```

```yaml
definitions:
  ErrorModel:
    type: object
    required:
    - message
    - code
    properties:
      message:
        type: string
      code:
        type: integer
        minimum: 100
        maximum: 600
  ExtendedErrorModel:
    allOf:
    - $ref: '#/definitions/ErrorModel'
    - type: object
      required:
      - rootCause
      properties:
        rootCause:
          type: string
```

###### Models with Polymorphism Support

```js
{
  "definitions": {
    "Pet": {
      "type": "object",
      "discriminator": "petType",
      "properties": {
        "name": {
          "type": "string"
        },
        "petType": {
          "type": "string"
        }
      },
      "required": [
        "name",
        "petType"
      ]
    },
    "Cat": {
      "description": "A representation of a cat",
      "allOf": [
        {
          "$ref": "#/definitions/Pet"
        },
        {
          "type": "object",
          "properties": {
            "huntingSkill": {
              "type": "string",
              "description": "The measured skill for hunting",
              "default": "lazy",
              "enum": [
                "clueless",
                "lazy",
                "adventurous",
                "aggressive"
              ]
            }
          },
          "required": [
            "huntingSkill"
          ]
        }
      ]
    },
    "Dog": {
      "description": "A representation of a dog",
      "allOf": [
        {
          "$ref": "#/definitions/Pet"
        },
        {
          "type": "object",
          "properties": {
            "packSize": {
              "type": "integer",
              "format": "int32",
              "description": "the size of the pack the dog is from",
              "default": 0,
              "minimum": 0
            }
          },
          "required": [
            "packSize"
          ]
        }
      ]
    }
  }
}
```

```yaml
definitions:
  Pet:
    type: object
    discriminator: petType
    properties:
      name:
        type: string
      petType:
        type: string
    required:
    - name
    - petType
  Cat:
    description: A representation of a cat
    allOf:
    - $ref: '#/definitions/Pet'
    - type: object
      properties:
        huntingSkill:
          type: string
          description: The measured skill for hunting
          default: lazy
          enum:
          - clueless
          - lazy
          - adventurous
          - aggressive
      required:
      - huntingSkill
  Dog:
    description: A representation of a dog
    allOf:
    - $ref: '#/definitions/Pet'
    - type: object
      properties:
        packSize:
          type: integer
          format: int32
          description: the size of the pack the dog is from
          default: 0
          minimum: 0
      required:
      - packSize
```

#### <a name="xmlObject"></a>XML Object

A metadata object that allows for more fine-tuned XML model definitions.

When using arrays, XML element names are *not* inferred (for singular/plural forms) and the `name` property should be used to add that information. See examples for expected behavior.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="xmlName"></a>name | `string` | Replaces the name of the element/attribute used for the described schema property. When defined within the Items Object (`items`), it will affect the name of the individual XML elements within the list. When defined alongside `type` being `array` (outside the `items`), it will affect the wrapping element and only if `wrapped` is `true`. If `wrapped` is `false`, it will be ignored.
<a name="xmlNamespace"></a>namespace | `string` | The URL of the namespace definition. Value SHOULD be in the form of a URL.
<a name="xmlPrefix"></a>prefix | `string` | The prefix to be used for the [name](#xmlName).
<a name="xmlAttribute"></a>attribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.
<a name="xmlWrapped"></a>wrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`. The definition takes effect only when defined alongside `type` being `array` (outside the `items`).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="xmlExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### XML Object Examples

The examples of the XML object definitions are included inside a property definition of a [Schema Object](#schemaObject) with a sample of the XML representation of it.

###### No XML Element

Basic string property:

```js
{
    "animals": {
        "type": "string"
    }
}
```

```yaml
animals:
  type: string
```

```xml
<animals>...</animals>
```

Basic string array property ([`wrapped`](#xmlWrapped) is `false` by default):

```js
{
    "animals": {
        "type": "array",
        "items": {
            "type": "string"
        }
    }
}
```

```yaml
animals:
  type: array
  items:
    type: string
```

```xml
<animals>...</animals>
<animals>...</animals>
<animals>...</animals>
```

###### XML Name Replacement

```js
{
  "animals": {
    "type": "string",
    "xml": {
      "name": "animal"
    }
  }
}
```

```yaml
animals:
  type: string
  xml:
    name: animal
```

```xml
<animal>...</animal>
```


###### XML Attribute, Prefix and Namespace

In this example, a full model definition is shown.

```js
{
  "Person": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32",
        "xml": {
          "attribute": true
        }
      },
      "name": {
        "type": "string",
        "xml": {
          "namespace": "http://swagger.io/schema/sample",
          "prefix": "sample"
        }
      }
    }
  }
}
```

```yaml
Person:
  type: object
  properties:
    id:
      type: integer
      format: int32
      xml:
        attribute: true
    name:
      type: string
      xml:
        namespace: http://swagger.io/schema/sample
        prefix: sample
```

```xml
<Person id="123">
    <sample:name xmlns:sample="http://swagger.io/schema/sample">example</sample:name>
</Person>
```

###### XML Arrays

Changing the element names:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
```

```xml
<animal>value</animal>
<animal>value</animal>
```

The external `name` property has no effect on the XML:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens"
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
```

```xml
<animal>value</animal>
<animal>value</animal>
```

Even when the array is wrapped, if no name is explicitly defined, the same name will be used both internally and externally:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
  xml:
    wrapped: true
```

```xml
<animals>
  <animals>value</animals>
  <animals>value</animals>
</animals>
```

To overcome the above example, the following definition can be used:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    wrapped: true
```

```xml
<animals>
  <animal>value</animal>
  <animal>value</animal>
</animals>
```

Affecting both internal and external names:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string",
      "xml": {
        "name": "animal"
      }
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
    xml:
      name: animal
  xml:
    name: aliens
    wrapped: true
```

```xml
<aliens>
  <animal>value</animal>
  <animal>value</animal>
</aliens>
```

If we change the external element but not the internal ones:

```js
{
  "animals": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "xml": {
      "name": "aliens",
      "wrapped": true
    }
  }
}
```

```yaml
animals:
  type: array
  items:
    type: string
  xml:
    name: aliens
    wrapped: true
```

```xml
<aliens>
  <aliens>value</aliens>
  <aliens>value</aliens>
</aliens>
```

#### <a name="definitionsObject"></a>Definitions Object

An object to hold data types that can be consumed and produced by operations. These data types can be primitives, arrays or models.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="definitionsName"></a>{name} | [Schema Object](#schemaObject) | A single definition, mapping a "name" to the schema it defines.

##### Definitions Object Example

```js
{
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
}
```

```yaml
Category:
  type: object
  properties:
    id:
      type: integer
      format: int64
    name:
      type: string
Tag:
  type: object
  properties:
    id:
      type: integer
      format: int64
    name:
      type: string
```

#### <a name="parametersDefinitionsObject"></a>Parameters Definitions Object

An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.

This does *not* define global operation parameters.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pdName"></a>{name} | [Parameter Object](#parameterObject) | A single parameter definition, mapping a "name" to the parameter it defines.

##### Parameters Definition Object Example

```js
{
  "skipParam": {
    "name": "skip",
    "in": "query",
    "description": "number of items to skip",
    "required": true,
    "type": "integer",
    "format": "int32"
  },
  "limitParam": {
    "name": "limit",
    "in": "query",
    "description": "max records to return",
    "required": true,
    "type": "integer",
    "format": "int32"
  }
}
```

```yaml
skipParam:
  name: skip
  in: query
  description: number of items to skip
  required: true
  type: integer
  format: int32
limitParam:
  name: limit
  in: query
  description: max records to return
  required: true
  type: integer
  format: int32
```


#### <a name="responsesDefinitionsObject"></a>Responses Definitions Object

An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.

This does *not* define global operation responses.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="rdName"></a>{name} | [Response Object](#responseObject) | A single response definition, mapping a "name" to the response it defines.

##### Responses Definitions Object Example

```js
{
  "NotFound": {
    "description": "Entity not found."
  },
  "IllegalInput": {
  	"description": "Illegal input for operation."
  },
  "GeneralError": {
  	"description": "General Error",
  	"schema": {
  		"$ref": "#/definitions/GeneralError"
  	}
  }
}
```

```yaml
NotFound:
  description: Entity not found.
IllegalInput:
  description: Illegal input for operation.
GeneralError:
  description: General Error
  schema:
    $ref: '#/definitions/GeneralError'
```

#### <a name="securityDefinitionsObject"></a>Security Definitions Object

A declaration of the security schemes available to be used in the specification. This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="sdName"></a>{name} | [Security Scheme Object](#securitySchemeObject) | A single security scheme definition, mapping a "name" to the scheme it defines.

##### Security Definitions Object Example

```js
{
  "api_key": {
    "type": "apiKey",
    "name": "api_key",
    "in": "header"
  },
  "petstore_auth": {
    "type": "oauth2",
    "authorizationUrl": "http://swagger.io/api/oauth/dialog",
    "flow": "implicit",
    "scopes": {
      "write:pets": "modify pets in your account",
      "read:pets": "read your pets"
    }
  }
}
```

```yaml
api_key:
  type: apiKey
  name: api_key
  in: header
petstore_auth:
  type: oauth2
  authorizationUrl: http://swagger.io/api/oauth/dialog
  flow: implicit
  scopes:
    write:pets: modify pets in your account
    read:pets: read your pets
```

#### <a name="securitySchemeObject"></a>Security Scheme Object

Allows the definition of a security scheme that can be used by the operations. Supported schemes are basic authentication, an API key (either as a header or as a query parameter) and OAuth2's common flows (implicit, password, application and access code).

##### Fixed Fields
Field Name | Type | Validity | Description
---|:---:|---|---
<a name="securitySchemeType"></a>type | `string` | Any | **Required.** The type of the security scheme. Valid values are `"basic"`, `"apiKey"` or `"oauth2"`.
<a name="securitySchemeDescription"></a>description | `string` | Any | A short description for security scheme.
<a name="securitySchemeName"></a>name | `string` | `apiKey` | **Required.** The name of the header or query parameter to be used.
<a name="securitySchemeIn"></a>in | `string` | `apiKey` | **Required** The location of the API key. Valid values are `"query"` or `"header"`.
<a name="securitySchemeFlow"></a>flow | `string` | `oauth2` | **Required.** The flow used by the OAuth2 security scheme. Valid values are `"implicit"`, `"password"`, `"application"` or `"accessCode"`.
<a name="securitySchemeAuthorizationUrl"></a>authorizationUrl | `string` | `oauth2` (`"implicit"`, `"accessCode"`) | **Required.** The authorization URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeTokenUrl"></a>tokenUrl | `string` | `oauth2` (`"password"`, `"application"`, `"accessCode"`) | **Required.** The token URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeScopes"></a>scopes | [Scopes Object](#scopesObject) | `oauth2` | **Required.** The available scopes for the OAuth2 security scheme.

##### Patterned Fields

Field Name | Type | Description 
---|:---:|---
<a name="securitySchemeExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Security Scheme Object Example

###### Basic Authentication Sample

```js
{
  "type": "basic"
}
```

```yaml
type: basic
```

###### API Key Sample

```js
{
  "type": "apiKey",
  "name": "api_key",
  "in": "header"
}
```

```yaml
type: apiKey
name: api_key
in: header
```

###### Implicit OAuth2 Sample

```js
{
  "type": "oauth2",
  "authorizationUrl": "http://swagger.io/api/oauth/dialog",
  "flow": "implicit",
  "scopes": {
    "write:pets": "modify pets in your account",
    "read:pets": "read your pets"
  }
}
```

```yaml
type: oauth2
authorizationUrl: http://swagger.io/api/oauth/dialog
flow: implicit
scopes:
  write:pets: modify pets in your account
  read:pets: read your pets
```

#### <a name="scopesObject"></a>Scopes Object

Lists the available scopes for an OAuth2 security scheme.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="scopesName"></a>{name} | `string` | Maps between a name of a scope to a short description of it (as the value of the property).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="scopesExtensions"></a>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Scopes Object Example

```js
{
  "write:pets": "modify pets in your account",
  "read:pets": "read your pets"
}
```

```yaml
write:pets: modify pets in your account
read:pets: read your pets
```

#### <a name="securityRequirementObject"></a>Security Requirement Object

Lists the required security schemes to execute this operation. The object can have multiple security schemes declared in it which are all required (that is, there is a logical AND between the schemes).

The name used for each property MUST correspond to a security scheme declared in the [Security Definitions](#securityDefinitionsObject).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="securityRequirementsName"></a>{name} | [`string`] | Each name must correspond to a security scheme which is declared in the [Security Definitions](#securityDefinitions). If the security scheme is of type `"oauth2"`, then the value is a list of scope names required for the execution. For other security scheme types, the array MUST be empty.

##### Security Requirement Object Examples

###### Non-OAuth2 Security Requirement

```js
{
  "api_key": []
}
```

```yaml
api_key: []
```

###### OAuth2 Security Requirement

```js
{
  "petstore_auth": [
    "write:pets",
    "read:pets"
  ]
}
```

```yaml
petstore_auth:
- write:pets
- read:pets
```

### <a name="vendorExtensions"></a>Specification Extensions

While the Swagger Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.

The extensions properties are always prefixed by `"x-"` and can have any valid JSON format value.

The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).

### <a name="securityFiltering"></a>Security Filtering

Some objects in the Swagger specification may be declared and remain empty, or completely be removed, even though they are inherently the core of the API documentation. 

The reasoning behind it is to allow an additional layer of access control over the documentation itself. While not part of the specification itself, certain libraries may choose to allow access to parts of the documentation based on some form of authentication/authorization.

Two examples for this:

1. The [Paths Object](#pathsObject) may be empty. It may be counterintuitive, but this may tell the viewer that they got to the right place, but can't access any documentation. They'd still have access to the [Info Object](#infoObject) which may contain additional information regarding authentication.
2. The [Path Item Object](#pathItemObject) may be empty. In this case, the viewer will be aware that the path exists, but will not be able to see any of its operations or parameters. This is different than hiding the path itself from the [Paths Object](#pathsObject) so the user will not be aware of its existence. This allows the documentation provider a finer control over what the viewer can see.
