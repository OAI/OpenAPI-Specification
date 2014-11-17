# Swagger RESTful API Documentation Specification

#### Version 2.0

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).

The Swagger specification is licensed under [The Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).

## Introduction

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

##### <a name="pathTemplating"/>Path Templating
Path templating refers to the usage of curly braces ({}) to mark a section of a URL path as replaceable using path parameters.

##### <a name="mimeTypes"/>Mime Types
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
##### <a name="httpCodes"/>HTTP Status Codes
The HTTP Status Codes are used to indicate the status of the executed operation. The available status codes are described by [RFC 7231](http://tools.ietf.org/html/rfc7231#section-6) and in the [IANA Status Code Registry](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Specification

### Format

The files describing the RESTful API in accordance with the Swagger specification are represented as JSON objects and conform to the JSON standards.

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

Primitive data types in the Swagger Specification are based on the types supported by the [JSON-Schema Draft 4](http://json-schema.org/latest/json-schema-core.html#anchor8). Models are described using the [Schema Object](#schemaObject) which is a subset of JSON Schema Draft 4.

An additional primitive data type `"file"` is used by the [Parameter Object](#parameterObject) and the [Response Object](#responseObject) to set the parameter type or the response as being a file.

<a name="dataTypeFormat"/>Primitives have an optional modifier property `format`. Swagger uses several known formats to more finely define the data type being used. However, the `format` property is an open `string`-valued property, and can have any value to support documentation needs. Formats such as `"email"`, `"uuid"`, etc., can be used even though they are not defined by this specification. The formats defined by the Swagger Specification are:


Common Name | [`type`](#dataTypeType) | [`format`](#dataTypeFormat) | Comments
----------- | ------ | -------- | --------
integer | `integer` | `int32` | signed 32 bits
long | `integer` | `int64` | signed 64 bits
float | `number` | `float` | 
double | `number` | `double` |
string | `string` | |
byte | `string` | `byte` |
boolean | `boolean` | |
date | `string` | `date` | As defined by `full-date` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)
dateTime | `string` | `date-time` | As defined by `date-time` - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14)

### Schema

#### Swagger Object <a name="swaggerObject"/>

This is the root document object for the API specification. It combines what previously was the Resource Listing and API Declaration (version 1.2 and earlier) together into one document.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"/>swagger | `string` | **Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.
<a name="swaggerInfo"/>info | [Info Object](#infoObject) | **Required.** Provides metadata about the API. The metadata can be used by the clients if needed.
<a name="swaggerHost"/>host | `string` | The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used (including the port). The `host` does not support [path templating](#pathTemplating).
<a name="swaggerBasePath"/>basePath | `string` | The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](#pathTemplating). 
<a name="swaggerSchemes"/>schemes | [`string`] | The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the specification.
<a name="swaggerConsumes"/>consumes | [`string`] | A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerProduces"/>produces | [`string`] | A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerPaths"/>paths | [Paths Object](#pathsObject) | **Required.** The available paths and operations for the API.
<a name="swaggerDefinitions"/>definitions | [Definitions Object](#definitionsObject) | An object to hold data types produced and consumed by operations.
<a name="swaggerParameters"/>parameters | [Parameters Definitions Object](#parametersDefinitionsObject) | An object to hold parameters that can be used across operations. This property *does not* define global parameters for all operations.
<a name="swaggerResponses"/>responses | [Responses Definitions Object](#responsesDefinitionsObject) | An object to hold responses that can be used across operations. This property *does not* define global responses for all operations.
<a name="swaggerSecurityDefinitions"/>securityDefinitions | [Security Definitions Object](#securityDefinitionsObject) | Security scheme definitions that can be used across the specification.
<a name="swaggerSecurity"/>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition.
<a name="swaggerTags"/>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
<a name="swaggerExternalDocs"/>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation.

##### Object Example:
**TODO: add sample**


#### Info Object <a name="infoObject"/>

The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"/>title | `string` | **Required.** The title of the application.
<a name="infoDescription"/>description | `string` | A short description of the application. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="infoTermsOfService"/>termsOfService | `string` | The Terms of Service for the API.
<a name="infoContact"/>contact | [Contact Object](#contactObject) | The contact information for the exposed API.
<a name="infoLicense"/>license | [License Object](#licenseObject) | The license information for the exposed API.
<a name="infoVersion"/>version | `string` | **Required** Provides the version of the application API (not to be confused by the specification version).

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="operationExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example:

```js
{
  "title": "Swagger Sample App",
  "description": "This is a sample server Petstore server.",
  "termsOfService": "http://swagger.io/terms/",
  "contact": {
    "name": "API Support",
    "url": "http://www.swagger.io/support",
    "email": "support@swagger.io",
  },
  "license": {
    "name": "Apache 2.0",
    "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
  },
  "version": "1.0.1"
 }
```

#### Contact Object <a name="contactObject"/>

Contact information for the exposed API.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="contactName"/>name | `string` | The identifying name of the contact person/organization.
<a name="contactUrl"/>url | `string` | The URL pointing to the contact information. MUST be in the format of a URL.
<a name="contactEmail"/>email | `string` | The email address of the contact person/organization. MUST be in the format of an email address.

##### Object Example:

```js
{
  "name": "API Support",
  "url": "http://www.swagger.io/support",
  "email": "support@swagger.io",
}
```

#### License Object <a name="licenseObject"/>

License information for the exposed API.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="licenseName"/>name | `string` | **Required.** The license name used for the API.
<a name="licenseUrl"/>url | `string` | A URL to the license used for the API. MUST be in the format of a URL.

##### Object Example:

```js
{
  "name": "Apache 2.0",
  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
}
```

#### Paths Object <a name="pathsObject"/>

Holds the relative paths to the individual endpoints. The path is appended to the [`basePath`](#swaggerBasePath) in order to construct the full URL.
The Paths may be empty, due to [ACL constraints](#securityFiltering).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathsPath"/>/{path} | [Path Item Object](#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the [`basePath`](#swaggerBasePath) in order to construct the full URL. [Path templating](#pathTemplating) is allowed.
<a name="pathsExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Object Example

**TODO: add example.**

#### Path Item Object <a name="pathItemObject"/>

Describes the operations available on a single path.
A Path Item may be empty, due to [ACL constraints](#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="pathItemRef"/>$ref | `string` | Allows for an external definition of this path item. The referenced structure MUST be in the format of a [Path Item Object](#pathItemObject). If there are conflicts between the referenced definition and this Path Item's definition, the behavior is *undefined*.
<a name="pathItemGet"/>get | [Operation Object](#operationObject) | A definition of a GET operation on this path.
<a name="pathItemPut"/>put | [Operation Object](#operationObject) | A definition of a PUT operation on this path.
<a name="pathItemPost"/>post | [Operation Object](#operationObject) | A definition of a POST operation on this path.
<a name="pathItemDelete"/>delete | [Operation Object](#operationObject) | A definition of a DELETE operation on this path.
<a name="pathItemOptions"/>options | [Operation Object](#operationObject) | A definition of a OPTIONS operation on this path.
<a name="pathItemHead"/>head | [Operation Object](#operationObject) | A definition of a HEAD operation on this path.
<a name="pathItemPatch"/>patch | [Operation Object](#operationObject) | A definition of a PATCH operation on this path.
<a name="pathItemParameters"/>parameters | [[Parameter Object](#parameterObject) <span>&#124;</span> [Reference Object](#referenceObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#referenceObject) to link to parameters that are defined at the [Swagger Object's parameters](#swaggerParameters). There can be one "body" parameter at most.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathItemExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Object Example

**TODO: add example.**

#### Operation Object <a name="operationObject"/>

Describes a single API operation on a path.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="operationTags"/>tags | [`string`] | A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
<a name="operationSummary"/>summary | `string` | A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters.
<a name="operationDescription"/>description | `string` | A verbose explanation of the operation behavior. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="operationExternalDocs"/>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this operation.
<a name="operationId"/>operationId | `string` | A friendly name for the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operation id to uniquely identify an operation.
<a name="operationConsumes"/>consumes | [`string`] | A list of MIME types the operation can consume. This overrides the `[consumes](#swaggerConsumes)` definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationProduces"/>produces | [`string`] | A list of MIME types the operation can produce. This overrides the `[produces](#swaggerProduces)` definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationParameters"/>parameters | [[Parameter Object](#parameterObject) <span>&#124;</span> [Reference Object](#referenceObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](#pathItemParameters), the new definition will override it, but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn). The list can use the [Reference Object](#referenceObject) to link to parameters that are defined at the [Swagger Object's parameters](#swaggerParameters). There can be one "body" parameter at most.
<a name="operationResponses"/>responses | [Responses Object](#responsesObject) | **Required.** The list of possible responses as they are returned from executing this operation.
<a name="operationSchemes"/>schemes | [`string`] | The transfer protocol for the operation. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. The value overrides the Swagger Object [`schemes`](#swaggerSchemes) definition. 
<a name="operationDeprecated"/>deprecated | `boolean` | Declares this operation to be deprecated. Usage of the declared operation should be refrained. Default value is `false`.
<a name="operationSecurity"/>security | [[Security Requirement Object](#securityRequirementObject)] | A declaration of which security schemes are applied for this operation. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). This definition overrides any declared top-level [`security`](#swaggerSecurity). To remove a top-level security declaration, an empty array can be used.

##### Patterned Objects 

Field Pattern | Type | Description
---|:---:|---
<a name="operationExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example

**TODO: add example.**


#### External Documentation Object <a name="externalDocumentationObject"/>

Allows referencing an external resource for extended documentation.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="externalDocDescription"/>description | `string` | A short description of the target documentation. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="externalDocUrl"/>url | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.

##### Object Example

**TODO: add example.**


#### Parameter Object <a name="parameterObject"/>

Describes a single operation parameter.

A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

There are five possible parameter types.
* Path - Used together with [Path Templating](#pathTemplating), where the parameter value is actually part of the operation's URL. This does not include the host or base path of the API. For example, in `/items/{itemId}`, the path parameter is `itemId`.
* Query - Parameters that are appended to the URL. For example, in `/items?id=###`, the query parameter is `id`.
* Header - Custom headers that are expected as part of the request.
* Body - The payload that's appended to the HTTP request. Since there can only be one payload, there can only be *one* body parameter. The name of the body parameter has no effect on the parameter itself and is used for documentation purposes only. Since Form parameters are also in the payload, body and form parameters cannot exist together for the same operation.
* Form - Used to describe the payload of an HTTP request when either `application/x-www-form-urlencoded` or `multipart/form-data` are used as the content type of the request (in Swagger's definition, the [`consumes`](#operationConsumes) property of an operation). This is the only parameter type that can be used to send files, thus supporting the `file` type. Since form parameters are sent in the payload, they cannot be declared together with a body parameter for the same operation. Form parameters have a different format based on the content-type used (for further details, consult http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4):
  * `application/x-www-form-urlencoded` - Similar to the format of Query parameters but as a payload. For example, `foo=1&bar=swagger` - both `foo` and `bar` are form parameters. This is normally used for simple parameters that are being transferred.
  * `multipart/form-data` - each parameter takes a section in the payload with an internal header. For example, for the header `Content-Disposition: form-data; name="submit-name"` the name of the parameter is `submit-name`. This type of form parameters is more commonly used for file transfers.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="parameterName"/>name | `string` | **Required.** The name of the parameter. Parameter names are *case sensitive*. <ul><li>If [`in`](#parameterIn) is `"path"`, the `name` field MUST correspond to the associated path segment from the [path](#pathsPath) field in the [Paths Object](#pathsObject). See [Path Templating](#pathTemplating) for further information.<li>For all other cases, the `name` corresponds to the parameter name used based on the [`in`](#parameterIn) property.</ul>
<a name="parameterIn"/>in | `string` | **Required.** The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".
<a name="parameterDescription"/>description | `string` | A brief description of the parameter. This could contain examples of use.  [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="parameterRequired"/>required | `boolean` | Determines whether this parameter is mandatory. If the parameter is [`in`](#parameterIn) "path", this property is **required** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`. 

If [`in`](#parameterIn) is `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterSchema"/>schema | [Schema Object](#schemaObject) | **Required.** The schema defining the type used for the body parameter.

If [`in`](#parameterIn) is any value other than `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterType"/>type | `string` | **Required.** The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` or `"file"`. If `type` is `"file"`, the [`consumes`](#operationConsumes) MUST be either `"multipart/form-data"` or `" application/x-www-form-urlencoded"` and the parameter MUST be [`in`](#parameterIn) `"formData"`.
<a name="parameterFormat"/>format | `string` | The extending format for the previously mentioned [`type`](#parameterType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="parameterItems"/>items | [Items Object](#itemsObject) | **Required if [`type`](#parameterType) is "array".** Describes the type of items in the array.
<a name="parameterCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. <li>`multi` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters [`in`](#parameterIn) "query" or "formData". </ul> Default value is `csv`.
<a name="parameterDefault"/>default | * | Sets a default value to the parameter. The type of the value depends on the defined [`type`](#parameterType). See http://json-schema.org/latest/json-schema-validation.html#anchor101.
<a name="parameterMaximum"/>maximum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="parameterExclusiveMaximum"/>exclusiveMaximum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="parameterMinimum"/>minimum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="parameterExclusiveMinimum"/>exclusiveMinimum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="parameterMaxLength"/>maxLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="parameterMinLength"/>minLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="parameterPattern"/>pattern | `string` | See http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="parameterMaxItems"/>maxItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="parameterMinItems"/>minItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="parameterUniqueItems"/>uniqueItems | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="parameterEnum"/>enum | [*] | See http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="parameterMultipleOf"/>multipleOf | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor14.


##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="parameterExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Object Example

**TODO: add example.**

#### Items Object <a name="itemsObject"/>

An limited subset of JSON-Schema's items object. It is used by parameter definitions that are not located [`in`](#parameterIn) `"body"`.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="itemsType"/>type | `string` | **Required.** The internal type of the array. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`. Files and models are not allowed.
<a name="itemsFormat"/>format | `string` | The extending format for the previously mentioned [`type`](#parameterType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="itemsItems"/>items | [Items Object](#itemsObject) | **Required if [`type`](#itemsType) is "array".** Describes the type of items in the array.
<a name="itemsCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. </ul> Default value is `csv`.
<a name="itemsDefault"/>default | * | Sets a default value to the data type. The type of the value depends on the defined [`type`](#itemsType). See http://json-schema.org/latest/json-schema-validation.html#anchor101.
<a name="itemsMaximum"/>maximum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="itemsMaximum"/>exclusiveMaximum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="itemsMinimum"/>minimum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="itemsExclusiveMinimum"/>exclusiveMinimum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="itemsMaxLength"/>maxLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="itemsMinLength"/>minLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="itemsPattern"/>pattern | `string` | See http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="itemsMaxItems"/>maxItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="itemsMinItems"/>minItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="itemsUniqueItems"/>uniqueItems | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="itemsEnum"/>enum | [*] | See http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="itemsMultipleOf"/>multipleOf | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor14.

##### Object Example

**TODO: add example.**

#### Responses Object <a name="responsesObject"/>

A container for the expected responses of an operation. The container maps a HTTP response code to the expected response. It is not expected from the documentation to necessarily cover all possible HTTP response codes, since they may not be known in advance. However, it is expected from the documentation to cover a successful operation response and any known errors.

The `default` can be used a default response object for all HTTP codes that are not covered individually by the specification.

The `Responses Object` MUST contain at least one response code, and it SHOULD be the response for a successful operation call.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responsesDefault"/>default | [Response Object](#responseObject) <span>&#124;</span> [Reference Object](#referenceObject) | The documentation of responses other than the ones declared for specific HTTP response codes. It can be used to cover undeclared responses. [Reference Object](#referenceObject) can be used to link to a response that is defined at the [Swagger Object's responses](#swaggerResponses) section.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="responsesCode"/>{[HTTP Status Code](#httpCodes)} | [Response Object](#responseObject) <span>&#124;</span> [Reference Object](#referenceObject) | Any [HTTP status code](#httpCodes) can be used as the property name (one property per HTTP status code). Describes the expected response for that HTTP status code.  [Reference Object](#referenceObject) can be used to link to a response that is defined at the [Swagger Object's responses](#swaggerResponses) section.
<a name="parameterExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.


##### Object Example

**TODO: add example.**

#### Response Object <a name="responseObject"/>
Describes a single response from an API Operation.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responseDescription"/>description | `string` | **Required.** A short description of the response. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="responseSchema"/>schema | [Schema Object](#schemaObject) | A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response. As an extension to the [Schema Object](#schemaObject), its root `type` value may also be `"file"`. This SHOULD be accompanied by a relevant `produces` mime-type.
<a name="responseHeaders"/>headers | [Headers Object](#headersObject) | A list of headers that are sent with the response.
<a name="responseExamples"/> examples | [Example Object](#exampleObject) | An example of the response message.

##### Object Example

**TODO: add example.**

#### Headers Object <a name="headersObject"/>
Lists the headers that can be sent as part of a response.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="headersName"/>{name} | [Header Object](#headerObject) | The name of the property corresponds to the name of the header. The value describes the type of the header.

##### Object Example

**TODO: add example.**


#### Example Object <a name="exampleObject"/>

Allows sharing examples for operation responses.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="exampleMimeType"/>{[mime type](#mimeTypes)} | Any | The name of the property MUST be one of the Operation `produces` values (either implicit or inherited). The value SHOULD be an example of what such a response would look like. 

##### Object Example

**TODO: add example.**

#### Header Object <a name="headerObject"/>

Field Name | Type | Description
---|:---:|---
<a name="headerDescription"/>description | `string` | A short description of the header.
<a name="headerType"/>type | `string` | **Required.** The type of the object. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.
<a name="headerFormat"/>format | `string` | The extending format for the previously mentioned [`type`](#stType). See [Data Type Formats](#dataTypeFormat) for further details.
<a name="headerItems"/>items | [Items Object](#itemsObject) | **Required if [`type`](#stType) is "array".** Describes the type of items in the array.
<a name="headerCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. </ul> Default value is `csv`.
<a name="headerDefault"/>default | * | Sets a default value to the data type. The type of the value depends on the defined [`type`](#stType). See http://json-schema.org/latest/json-schema-validation.html#anchor101.
<a name="headerMaximum"/>maximum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="headerMaximum"/>exclusiveMaximum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor17.
<a name="headerMinimum"/>minimum | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="headerExclusiveMinimum"/>exclusiveMinimum | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor21.
<a name="headerMaxLength"/>maxLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor26.
<a name="headerMinLength"/>minLength | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor29.
<a name="headerPattern"/>pattern | `string` | See http://json-schema.org/latest/json-schema-validation.html#anchor33.
<a name="headerMaxItems"/>maxItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor42.
<a name="headerMinItems"/>minItems | `integer` | See http://json-schema.org/latest/json-schema-validation.html#anchor45.
<a name="headerUniqueItems"/>uniqueItems | `boolean` | See http://json-schema.org/latest/json-schema-validation.html#anchor49.
<a name="headerEnum"/>enum | [*] | See http://json-schema.org/latest/json-schema-validation.html#anchor76.
<a name="headerMultipleOf"/>multipleOf | `number` | See http://json-schema.org/latest/json-schema-validation.html#anchor14.

##### Object Example

**TODO: add example.**

#### Tag Object <a name="tagObject"/>

Allows adding meta data to a single tag that is used by the [Operation Object](#operationObject). It is not mandatory to have a Tag Object per tag used there.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="tagName"/>name | `string` | **Required.** The name of the tag.
<a name="tagDescription"/>description | `string` | A short description for the tag. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
<a name="tagExternalDocs"/>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this tag.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="tagExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example

**TODO: add example.**

#### Reference Object <a name="referenceObject"/>

A simple object to allow referencing other definitions in the specification. It can be used to reference parameters and responses that are defined at the top level for reuse.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="referenceRef"/>$ref | `string` | **Required.** The reference string. 

##### Object Example

**TODO: add example.**

#### Schema Object <a name="schemaObject"/>

The Schema Object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. This object is based on the [JSON Schema Specification Draft 4](http://json-schema.org/) and uses a predefined subset of it. On top of this subset, there are extensions provided by this specification to allow for more complete documentation.

The following properties are taken directly from the JSON Schema definition and follow the same specifications:
- $ref
- format (See [Data Type Formats](#dataTypeFormat) for further details)
- title
- description ([GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation)
- default
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

Other than the JSON Schema subset fields, the following fields may be used for further schema documentation.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="schemaDiscriminator"/>discriminator | `string` | Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schemas that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the `required` property list. When used, the value MUST be the name of this schema or any schema that inherits it.
<a name="schemaReadOnly"/>readOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request. Properties marked as `readOnly` being `true` SHOULD NOT be in the `required` list of the defined schema. Default value is `false`.
<a name="schemaXml"/>xml | [XML Object](#xmlObject) | This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
<a name="schemaExternalDocs"/>externalDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this schema.
<a name="schemaExample"/>example | Object | A free-form property to include a an example of an instance for this schema.

**TODO: Add explanation about composition and inheritance in the new spec.**

##### Object Example

**TODO: add example.**

#### XML Object <a name="xmlObject"/>

A metadata object that allows for more fine-tuned XML model definitions.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="xmlName"/>name | `string` | Replaces the name of the element/attribute used for the described schema property.
<a name="xmlNamespace"/>namespace | `string` | The URL of the namespace definition. Value SHOULD be in the form of a URL.
<a name="xmlPrefix"/>prefix | `string` | The prefix to be used for the [name](#xmlName).
<a name="xmlAttribute"/>attribute | `boolean` | Declares whether the property definition translates to an attribute instead of an element. Default value is `false`.
<a name="xmlWrapped"/>wrapped | `boolean` | MAY be used only for an array definition. Signifies whether the array is wrapped (for example, `<books><book/><book/></books>`) or unwrapped (`<book/><book/>`). Default value is `false`.

##### Object Example

**TODO: add example.**

#### Definitions Object <a name="definitionsObject"/>

An object to hold data types that can be consumed and produced by operations. These data types can be primitives, arrays or models.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="definitionsName"/>{name} | [Schema Object](#schemaObject) | A single definition, mapping a "name" to the schema it defines.

##### Object Example

**TODO: add example.**

#### Parameters Definitions Object <a name="parametersDefinitionsObject"/>

An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here.

This does *not* define global operation parameters.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pdName"/>{name} | [Parameter Object](#parameterObject) | A single parameter definition, mapping a "name" to the parameter it defines.

##### Object Example

**TODO: add example.**

#### Responses Definitions Object <a name="responsesDefinitionsObject"/>

An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.

This does *not* define global operation responses.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="rdName"/>{name} | [Response Object](#responseObject) | A single response definition, mapping a "name" to the response it defines.

##### Object Example

**TODO: add example.**

#### Security Definitions Object <a name="securityDefinitionsObject"/>

A declaration of the security schemes available to be used in the specification. This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="sdName"/>{name} | [Security Scheme Object](#securitySchemeObject) | A single security scheme definition, mapping a "name" to the scheme it defines.

##### Object Example

**TODO: add example.**


#### Security Scheme Object <a name="securitySchemeObject"/>

Allows the definition of a security scheme that can be used by the operations. Supported schemes are basic authentication, an API key (either as a header or as a query parameter) and OAuth2's common flows (implicit, password, application and access code).

##### Fixed Fields
Field Name | Type | Validity | Description
---|:---:|---|---
<a name="securitySchemeType"/>type | `string` | Any | **Required.** The type of the security scheme. Valid values are `"basic"`, `"apiKey"` or `"oauth2"`.
<a name="securitySchemeDescription"/>description | `string` | Any | A short description for security scheme.
<a name="securitySchemeName"/>name | `string` | `apiKey` | **Required.** The name of the header or query parameter to be used.
<a name="securitySchemeIn"/>in | `string` | `apiKey` | **Required** The location of the API key. Valid values are `"query"` or `"header"`.
<a name="securitySchemeFlow"/>flow | `string` | `oauth2` | **Required.** The flow used by the OAuth2 security scheme. Valid values are `"implicit"`, `"password"`, `"application"` or `"accessCode"`.
<a name="securitySchemeAuthorizationUrl"/>authorizationUrl | `string` | `oauth2` (`"implicit"`, `"accessCode"`) | **Required.** The authorization URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeTokenUrl"/>tokenUrl | `string` | `oauth2` (`"password"`, `"application"`, `"accessCode"`) | **Required.** The token URL to be used for this flow. This SHOULD be in the form of a URL.
<a name="securitySchemeScopes"/>scopes | [Scopes Object](#scopesObject) | `oauth2` | **Required.** The available scopes for the OAuth2 security scheme.

##### Patterned Fields

Field Name | Type | Description 
---|:---:|---
<a name="securitySchemeExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example

**TODO: add example.**


#### Scopes Object <a name="scopesObject"/>

Lists the available scopes for an OAuth2 security scheme.

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="scopesName"/>{name} | `string` | Maps between a name of a scope to a short description of it (as the value of the property).

##### Object Example

**TODO: add example.**


#### Security Requirement Object <a name="securityRequirementObject"/>

Lists the required security schemes to execute this operation. The object can have multiple security schemes declared in it which are all required (that is, there is a logical AND between the schemes).

The name used for each property MUST correspond to a security scheme declared in the [Security Definitions](#securityDefinitionsObject).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="securityRequirementsName"/>{name} | [`string`] | Each name must correspond to a security scheme which is declared in the [Security Definitions](#securityDefinitions). If the security scheme is of type `"oauth2"`, then the value is a list of scope names required for the execution. For other security scheme types, the array MUST be empty.

##### Object Example

**TODO: add example.**


### Specification Extensions <a name="vendorExtensions"/>

While the Swagger Specification tries to accommodate most use cases, additional data can be added to extend the specification at certain points.

The extensions properties are always prefixed by `"x-"` and can have any valid JSON format value.

The extensions may or may not be supported by the available tooling, but those may be extended as well to add requested support (if tools are internal or open-sourced).

### Security Filtering

Some objects in the Swagger specification may be declared and remain empty, or completely be removed, even though they are inherently the core of the API documentation. 

The reasoning behind it is to allow an additional layer of access control over the documentation itself. While not part of the specification itself, certain libraries may choose to allow access to parts of the documentation based on some form of authentication/authorization.

Two examples for this:
1. The [Paths Object](#pathsObject) may be empty. It may be counterintuitive, but this may tell the viewer that they got to the right place, but can't access any documentation. They'd still have access to the [Info Object](#infoObject) which may contain additional information regarding authentication.
2. The [Path Item Object](#pathItemObject) may be empty. In this case, the viewer will be aware that the path exists, but will not be able to see any of its operations or parameters. This is different than hiding the path itself from the [Paths Object](#pathsObject) so the user will not be aware of its existence. This allows the documentation provider a finer control over what the viewer can see.
