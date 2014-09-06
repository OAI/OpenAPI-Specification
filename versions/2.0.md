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

- <a name="pathTemplating"/>Path Templating
Path templating refers to the usage of curly braces to mark a section of a URL path as replacable using path parameters. **NB: Need to add a more elaborate explanation (limitations, rules and so on)**.

- <a name="mimeTypes"/>Mime Types 
**NB: Need to add information about valid mime type structures.** **

- Path

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

**Not sure if this should be kept.**

### Schema

#### Swagger Object <a name="swaggerObject"/>

This is the root document object for the API specification. It combines what previously was the Resource Listing and API Declaration (version 1.2 and earlier) together into one document.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"/>swagger | `string` | **Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.
<a name="swaggerInfo"/>info | [Info Object](#infoObject) | **Required.** Provides metadata about the API. The metadata can be used by the clients if needed.
<a name="swaggerHost"/>host | `string` | The host serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used. The `host` does not support [path templating](#pathTemplating).
<a name="swaggerBasePath"/>basePath | `string` | The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](#pathTemplating). 
<a name="swaggerSchemes"/>schemes | [`string`] | The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the specification.
<a name="swaggerConsumes"/>consumes | [`string`] | A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerProduces"/>produces | [`string`] | A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerPaths"/>paths | [Paths Object](#pathsObject) | **Required.** The available paths and operations for the API.
<a name="swaggerDefinitions"/>definitions | [Definitions Object](#definitionsObject) | The schema (model) definitions of the models as used throughout the specification.
<a name="swaggerSecurity"/>security | ??? | **NB: To be completed once the schema is available**
<a name="swaggerTags"/>tags | [[Tag Object](#tagObject)] | A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic.

##### Object Example:
**TODO: add sample**


#### Info Object <a name="infoObject"/>

The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"/>title | `string` | **Required.** The title of the application.
<a name="infoDescription"/>description | `string` | A short description of the application.
<a name="infoTermsOfService"/>termsOfService | `string` | The Terms of Service for the API.
<a name="infoContact"/>contact | [Contact Object](#contactObject) | The contact information for the exposed API.
<a name="infoLicense"/>license | [License Object](#licenseObject) | The license information for the exposed API.
<a name="infoVersion"/>version | `string` | **Required** Provides the version of the application API (not to be confused by the specification version).

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
<a name="licenseName"/>name | `string` | ** Required.** The license name used for the API.
<a name="licenseUrl"/>url | `string` | A URL to the license used for the API. MUST be in the format of a URL.

##### Object Example:

```js
{
  "name": "Apache 2.0",
  "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
}
```

#### Paths Object <a name="pathsObject"/>

Holds the relative paths to the individual endpoints. They should be relative to the 'basePath'.
The Paths may be empty, due to [ACL constraints](#securityFiltering).

##### Patterned Fields

Field Pattern | Type | Description
---|:---:|---
<a name="pathsPath"/>^/.*[^\/]$ | [Path Item Object](#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a slash and MUST NOT end with a slash. [Path templating](#pathTemplating) is allowed.
<a name="pathsExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Object Example

**TODO: add example.**

#### Path Item Object <a name="pathItemObject"/>

Describes the operations available on a single path.
A Path Item may be empty, due to [ACL constraints](#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="pathItemRef"/>$ref | `string` | Allows for an external definiton of this path item. The referenced stucture MUST be in the format of a [Path Item Object](#pathItemObject).
<a name="pathItemGet"/>get | [Operation Object](#operationObject) | A definition of a GET operation on this path.
<a name="pathItemPut"/>put | [Operation Object](#operationObject) | A definition of a PUT operation on this path.
<a name="pathItemPost"/>post | [Operation Object](#operationObject) | A definition of a POST operation on this path.
<a name="pathItemDelete"/>delete | [Operation Object](#operationObject) | A definition of a DELETE operation on this path.
<a name="pathItemOptions"/>options | [Operation Object](#operationObject) | A definition of a OPTIONS operation on this path.
<a name="pathItemHead"/>head | [Operation Object](#operationObject) | A definition of a HEAD operation on this path.
<a name="pathItemPatch"/>patch | [Operation Object](#operationObject) | A definition of a PATCH operation on this path.
<a name="pathItemParameters"/>parameters | [[Parameter Object](#parameterObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overriden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

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
<a name="operationTags"/>tags | [`string`] | A list of tags for API documentation control. See [Tags](#tags) for more information.
<a name="operationSummary"/>summary | `string` | A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters.
<a name="operationDescription"/>description | `string` | A verbose explanation of the operation behavior. GFM is allowed.
<a name="operationExternalDocs"/>extenralDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this operation.
<a name="operationId"/>operationId | `string` | A friendly name for the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operation id to uniquely identify an operation.
<a name="operationConsumes"/>consumes | [`string`] | A list of MIME types the operation can consume. This overrides the `[consumes](#swaggerConsumes)` definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationProduces"/>produces | [`string`] | A list of MIME types the operation can produce. This overrides the `[produces](#swaggerProduces)` definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="operationParameters"/>parameters | [[Parameter Object](#parameterObject)] | A list of parameters that are applicable for this operation. If a parameter is already defined at the [Path Item](#pathItemParameters), the new definition will override it, but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).
<a name="operationResponses"/>responses | [Responses Object](#responsesObject) | **Required.** The list of possible responses as they are returned from executing this operation.
<a name="operationSchemes"/>schemes | [`string`] | The transfer protocol for the operation. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. The value overrides the Swagger Object `[schemes](#swaggerSchemes)` definition. 
<a name="operationDeprecated"/>deprecated | `boolean` | Declares this operation to be deprecated. Usage of the declared operation should be refrained. Default value is `false`.
<a name="operationSecurity"/>security | ??? | ???

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
<a name="externalDocDescription"/>description | `string` | A short description of the target documentation.
<a name="externalDocUrl"/>url | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.

##### Object Example

**TODO: add example.**


#### Parameter Object <a name="parameterObject"/>

Describes a single operation parameter.

A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="parameterName"/>name | `string` | **Required.** The name of the parameter. Parameter names are *case sensitive*. <ul><li>If [`in`](#parameterIn) is `"path"`, the `name` field MUST correspond to the associated path segment from the [path](#pathsPath) field in the [Paths Object](#pathsObject). See [Path Templating](#pathTemplating) for further information.<li>If [`in`](#parameterIn) is `"body"`, then the `name` MUST be `"body"`. <li>For all other cases, the `name` corresponds to the parameter name used based on the [`in`](#parameterIn) property.</ul>
<a name="parameterIn"/>in | `string` | **Required.** The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".
<a name="parameterDescription"/>description | `string` | A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed.
<a name="parameterRequired"/>required | `boolean` | Determines whether this parameter is mandatory. If the parameter is [`in`](#parameterIn) "path", this property is **required** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`. 

If `[in](#parameterIn)` is `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterSchema"/>schema | [Schema Object](#schemaObject) | **Required.** The schema defining the type used for the body parameter.

If `[in](#parameterIn)` is any value other than `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterType"/>type | `string` | **Required.** The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` or `"file"`. If `type` is `"file"`, the [`consumes`](#operationConsumes) MUST be `"multipart/form-data"` and the parameter MUST be [`in`](#paramterIn) `"formData"`. 
<a name="parameterFormat"/>format | `string` | The extending format for the previously mentioned [`type`](#parameterType).
<a name="parameterItems"/>items | [Schema Object](#schemaObject) | **Required if [`type`](#parameterType) is "array".** Describes the type of items in the array. While the [Schema Object](#schemaObject) allows for model definition, the types allowed in an array are restricted to primitives (`"string"`, `"number"`, `"integer"`, `"boolean"`). Files and models are not allowed. Nested arrays are also not allowed. Arrays MUST always be of a single type.
<a neme="parameterCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. <li>`multi` - corresponds to multiple parameter instances instead of multiple values for a single instance `foo=bar&foo=baz`. This is valid only for parameters [`in`](#parameterIn) "query" or "formData". </ul> Default value is `csv`.


##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="parameterExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example

**TODO: add example.**

#### Responses Object <a name="responsesObject"/>

A container for the expected responses of an operation. The container maps a HTTP response code to the expected response. It is not expected from the documentation to necessarily cover all possible HTTP response codes, since they may not be known in advance. However, it is expected from the documenation to cover a successful operation response and any known errors.

The `default` can be used a default response object for all HTTP codes that are not covered individually by the specification.

The `Responses Object` MUST contain at least one response code, and it SHOULD be the response for a succesful operation call.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responsesDefault"/>default | [Response Object](#responseObject) | The documentation of responses other than the ones declared for specific HTTP response codes. It can be used to cover undeclared responses.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="responsesCode"/>### [(*)](#statusCode) | [Response Object](#responseObject) | Any HTTP status code can be used as the propety name (one property per HTTP status code). Describes the expected response for that HTTP status code.
<a name="parameterExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

<a name="statusCode"/>**(*)** - Any HTTP status code as described in the [HTTP protocol specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).

##### Object Example

**TODO: add example.**

#### Response Object <a name="responseObject"/>
Describes a single response from an API Operation.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="responseDescription"/>description | `string` | **Required.** A short description of the response.
<a name="responseSchema"/>schema | [Schema Object](#schemaObject) | A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response.
<a name="responseHeaders"/>headers | [[Serializable Type Object](#serializableTypeObject)] | A list of headers that are sent with the response.
<a name="responseExamples"/> examples | [Example Object](#exampleObject) | An example of the response message.

##### Object Example

**TODO: add example.**

#### Example Object <a name="exampleObject"/>

Allows sharing examples for operation responses.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="exampleMimeType"/>{mime type} | Any | The name of the property MUST be a one of the the Operation `produces` values (either implicit or inherited). The value SHOULD be an example of what such a response would look like.

##### Object Example

**TODO: add example.**

#### Serializable Type Object <a name="serializableTypeObject"/>

Field Name | Type | Description
---|:---:|---
<a name="stType"/>type | `string` | **Required.** The type of the object. The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, or `"array"`.
<a name="stFormat"/>format | `string` | The extending format for the previously mentioned `[type](#parameterType)`.
<a name="stItems"/>items | [Schema Object](#schemaObject) | **Required if [`type`](#stType) is "array".** While the [Schema Object](#schemaObject) allows for model definition, the types allowed in an array are restricted to primitives (`"string"`, `"number"`, `"integer"`, `"boolean"`). Files and models are not allowed. Nested arrays are also not allowed. Arrays MUST always be of a single type.
<a neme="stCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. Possible values are: <ul><li>`csv` - comma separated values `foo,bar`. <li>`ssv` - space separated values `foo bar`. <li>`tsv` - tab separated values `foo\tbar`. <li>`pipes` - pipe separated values <code>foo&#124;bar</code>. </ul> Default value is `csv`.

##### Object Example

**TODO: add example.**

#### Tag Object <a name="tagObject"/>

Allows adding meta data to a single tag that is used by the [Operation Object](#operationObject). It is not mandatory to have a Tag Object per tag used there.

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="tagName"/>name | `string` | **Required.** The name of the tag.
<a name="tagDescription"/>description | `string` | A short description for the tag.
<a name="tagExternalDocs"/>extenralDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this tag.

##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="tagExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details.

##### Object Example

**TODO: add example.**

#### Schema Object <a name="schemaObject"/>

The Schema Object allows the definition of input and output data types. These types can be objects, but also primitives and arrays. This object is based on the [JSON Schema Specification Draft 4](http://json-schema.org/) and uses a predefined subset of it. On top of this subset, there are extensions provided by this specification to allow for more complete documentation.

The following properties are taken directly from the JSON Schema definition and follow the same specifications:
- $ref
- format
- title
- description
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
<a name="schemaXml"/>xml | [XML Object](#xmlObject) | This MAY be used only on properties schemas. It has no effect on root schemas. Adds Additional metadata to describe the XML representation format of this property.
<a name="schemaExternalDocs"/>extenralDocs | [External Documentation Object](#externalDocumentationObject) | Additional external documentation for this schema.
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


### Security Filtering

Some objects in the Swagger specification may be declared and remain empty, or completely be removed, even though they are inherently the core of the API documentation. 

The reasoning behind it is to allow an additional layer of access control over the documentation itself. While not part of the specification itself, certain libraries may choose to allow access to parts of the documentation based on some form of authentication/authorization.

Two examples for this:
1. The [Paths Object](#pathsObject) may be empty. It may be counterintuitive, but this may tell the viewer that they got to the right place, but can't access any documentation. They'd still have access to the [Info Object](#infoObject) which may contain additional information regarding authentication.
2. The [Path Item Object](#pathItemObject) may be empty. In this case, the viewier will be aware that the path exists, but will not be able to see any of its operations or parameters. This is different than hiding the path itself from the [Paths Object](#pathsObject) so the user will not be aware of its existence. This allows the documentation provider a finer control over what the viewer can see.

### Non-Schema Constraints

Due to various limitations in json-schema, some parts of the Swagger Specification cannot be enforced by the schema. The following is a list of such constraints.

- Parameter must be unique within their given container list level. This refers to [Path Item's parameters](#pathItemParameters) and [Operation's parameters](#operationParameters).
- The restrictions of the `[required](#parameterRequired)` field are not enforced by the schema. Check the property's description for further details.
- There must be at least one response defined in the [Responses Obejct](#responsesObject), including the `default` response. This does not include vendor extension definitions.
- In the [Example Object](#exampleObject) there's no validation in the schema that the property names (the mime types) are valid as described by the object.