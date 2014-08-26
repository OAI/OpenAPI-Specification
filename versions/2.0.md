#### Swagger Object <a name="swaggerObject"/>

This is the root document for the API specification. It combines what previously was the Resource Listing and API Declaration together into one document.

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"/>swagger | `string` | **Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.
<a name="swaggerInfo"/>info | [Info Object](#infoObject) | **Required.** Provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.
<a name="swaggerHost"/>host | `string` | The host serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used. The `host` does not support [path templating](#pathTemplating).
<a name="swaggerBasePath"/>basePath | `string` | The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a leading slash (`/`). The `basePath` does not support [path templating](#pathTemplating). 
<a name="swaggerSchemes"/>schemes | [`string`] | The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the specification.
<a name="swaggerConsumes"/>consumes | [`string`] | A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerProduces"/>produces | [`string`] | A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerPaths"/>paths | [Paths Object](#pathsObject) | **Required.** The available opereations for the API. **NB: the description will be expanded once the Paths Object is described.** It is valid to have an empty Paths Object if no APIs are exposed (for security reasons).
<a name="swaggerDefinitions"/>definitions | [Definitions Object](#definitionsObject) | The schema definitions of the models as used throughout the specification.
<a name="swaggerSecurity"/>security | ??? | **NB: To be completed once the schema is available**

##### Object Example:
**TODO: add sample** **


#### Info Object <a name="infoObject"/>

The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

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

Field Pattern | Type | Description
---|:---:|---
<a name="pathsPath"/>^/.*[^\/]$ | [Path Item Object](#pathItemObject) | A relative path to an individual endpoint. The field name MUST begin with a slash and MUST NOT end with a slash. [Path templating](#pathTemplating) is allowed.
<a name="pathsExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

##### Object Example

#### Path Item Object <a name="pathItemObject"/>

Describes the operations available on a single path.
A Path Item may be empty, due to [ACL constraints](#securityFiltering). The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.

Field Name | Type | Description
---|:---:|---
<a name="pathItemRef"/>$ref | `string` | Allows for an external definiton of this path item. **NB: expands on external definitions.**
<a name="pathItemGet"/>get | [Operation Object](#operationObject) | A definition of a GET operation on this path.
<a name="pathItemPut"/>put | [Operation Object](#operationObject) | A definition of a PUT operation on this path.
<a name="pathItemPost"/>post | [Operation Object](#operationObject) | A definition of a POST operation on this path.
<a name="pathItemDelete"/>delete | [Operation Object](#operationObject) | A definition of a DELETE operation on this path.
<a name="pathItemOptions"/>options | [Operation Object](#operationObject) | A definition of a OPTIONS operation on this path.
<a name="pathItemHead"/>head | [Operation Object](#operationObject) | A definition of a HEAD operation on this path.
<a name="pathItemPatch"/>patch | [Operation Object](#operationObject) | A definition of a PATCH operation on this path.
<a name="pathItemParameters"/>parameters | [[Parameter Object](#parameterObject)] | A list of parameters that are applicable for all the operations described under this path. These parameters can be overriden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

Field Pattern | Type | Description
---|:---:|---
<a name="pathItemExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 


#### Operation Object <a name="operationObject"/>

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
<a name="operationSecurity"/>security | ??? | ???

Field Pattern | Type | Description
---|:---:|---
<a name="operationExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 

#### External Documentation Object <a name="externalDocumentationObject"/>

Field Name | Type | Description
---|:---:|---
<a name="externalDocDescription"/>description | `string` | A short description of the target documentation.
<a name="externalDocUrl"/>url | `string` | **Required.** The URL for the target documentation. Value MUST be in the format of a URL.

#### Parameter Object <a name="parameterObject"/>

Describes a single operation parameter.

 A unique parameter is defined by a combination of a [name](#parameterName) and [location](#parameterIn).

##### Fixed Fields
Field Name | Type | Description
---|:---:|---
<a name="parameterName"/>name | `string` | **Required.** The name of the parameter. **TODO: Add name restrictions.**
<a name="parameterIn"/>in | `string` | **Required.** The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".
<a name="parameterDescription"/>description | `string` | A brief description of the parameter. This could contain examples of use.  Github-flavored markdown is allowed.
<a name="parameterRequired"/>required | `boolean` | Determines whether this parameter is mandatory. If the parameter is `in` "path", this property is **required** and its value MUST be `true`. Otherwise, the property MAY be included and its default value is `false`. 

If `[in](#parameterIn)` is `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterSchema"/>schema | [Schema Object](#schemaObject) | **Required.** The schema defining the type used for the body parameter.

If `[in](#parameterIn)` is any value other than `"body"`:

Field Name | Type | Description
---|:---:|---
<a name="parameterType"/>type | `string` | **Required.** The type of the parameter. Since the parameter is not located at the body, it is limited to simple types (that is, not an object). The value MUST be one of `"string"`, `"number"`, `"integer"`, `"boolean"`, `"array"` or `"file"`. **TODO: add restrictions to the file type, arrays.** **
<a name="parameterFormat"/>format | `string` | The extending format for the previously mentioned `[type](#parameterType)`. **TODO: list legal values**
<a name="parameterItems"/>items | ??? | **TODO: Complete the description for this.**
<a neme="parameterCollectionFormat"/>collectionFormat | `string` | Determines the format of the array if type array is used. **TODO: complete the list of possible values.**


##### Patterned Fields
Field Pattern | Type | Description
---|:---:|---
<a name="parameterExtensions"/>^x- | Any | Allows extensions to the Swagger Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. See [Vendor Extensions](#vendorExtensions) for further details. 


### Format definitions and extensions

#### Path Templating <a name="pathTemplating"/>
Path templating refers to the usage of curly braces to mark a section of a URL path as replacable using path parameters. **NB: Need to add a more elaborate explanation (limitations, rules and so on)**.

#### Mime Types <a name="mimeTypes"/>
**NB: Need to add information about valid mime type structures.** **

#### Path

#### Vendor Extensions

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