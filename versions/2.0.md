#### Info Object <a name="infoObject"/>

The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience.

Field Name | Type | Description
---|:---:|---
<a name="infoTitle"/>title | `string` | **Required.** The title of the application.
<a name="infoDescription"/>description | `string` | A short description of the application.
<a name="infoTermsOfService"/>termsOfService | `string` | The Terms of Service for the API.
<a name="infoContact"/>contact | [Contact Object](#contactObject) | The contact information for the exposed API.
<a name="infoLicense"/>license | [License Object](#licenseObject) | The license information for the exposed API.
<a name="infoLicenseUrl"/>licenseUrl | `string` | A URL to the license used for the API.
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
  }
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
