#### Swagger Object <a name="swaggerObject"/>

This is the root document for the API specification. It combines what previously was the Resource Listing and API Declaration together into one document.

Field Name | Type | Description
---|:---:|---
<a name="swaggerSwagger"/>swagger | `string` | **Required.** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be `"2.0"`.
<a name="swaggerInfo"/>info | [Info Object](#infoObject) | Provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.
<a name="swaggerHost"/>host | `string` | The host serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the `host` is not included, the host serving the documentation is to be used. The `host` does not support [path templating](#pathTemplating).
<a name="swaggerBasePath"/>basePath | `string` | The base path on which the API is served, which is relative to the [`host`](#swaggerHost). If it is not included, the API is served directly under the `host`. The value MUST start with a `/`. The `basePath` does not support [path templating](#pathTemplating). 
<a name="swaggerSchemes"/>schemes | [`string`] | The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`.
<a name="swaggerConsumes"/>consumes | [`string`] | A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerProduces"/>produces | [`string`] | A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](#mimeTypes).
<a name="swaggerPaths"/>paths | [Paths Object](#pathsObject) | The available opereations for the API. **NB: the description will be expanded once the Paths Object is described.**
<a name="swaggerDefinitions"/>definitions | [Definitions Object](#definitionsObject) | The schema definitions of the models as used throughout the specification.
<a name="swaggerSecurity"/>security | ??? | **NB: To be completed once the schema is available**

<a name="rlApis"/>apis | [ [Resource Object](#512-resource-object) ] | **Required.** Lists the resources to be described by this specification implementation. The array can have 0 or more elements.
<a name="rlApiVersion"/>apiVersion| `string` | Provides the version of the application API (not to be confused by the [specification version](#rlSwaggerVersion)).

<a name="rlAuthorizations"/>authorizations | [Authorizations Object](#514-authorizations-object) | Provides information about the authorization schemes allowed on this API.


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

### Glossary

#### Path Templating <a name="pathTemplating"/>
Path templating refers to the usage of curly braces to mark a section of a URL path as replacable using path parameters. **NB: Need to add a more elaborate explanation (limitations, rules and so on)**.

#### Mime Types <a name="mimeTypes"/>
**NB: Need to add information about valid mime type structures.** **