# Swagger Extensions

The Swagger 2.0 specification allows for custom properties to be added at several places within a Swagger definition, allowing
API providers to extend the meta-data provided for their REST APIs as needed. Extension properties are always 
prefixed by "x-" and can have any valid JSON format value. 

Currently extension properties are supported in the following definition objects:
  
* within the [info object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#info-object)
* within the [paths object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#paths-object)
* within the [path-item object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#path-item-object)
* within the [operation object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#operationObject) 
* within the [parameter object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#parameterObject)
* within the [responses object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#responses-object)
* within the [tag object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#tag-object)
* within the [security-scheme object](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md#security-scheme-object)

For example, a vendor extension that adds apis.json specific metadata a Swagger definition might look as follows:
 
```json
{
  "swagger": "2.0",
  "info": {
    "version": "1.0",
    "title": "Analysis",
    "description" : "Provides access to blog posts and analysis across the API Evangelist network.",
    "x-apis-json" : {
        "image": "https://s3.amazonaws.com/kinlane-productions/api-evangelist/t-shirts/KL_InApiWeTrust-1000.png",
        "humanURL": "http://developer.apievangelist.com",
        "baseURL": "http://api.apievangelist.com/definitions/Analysis",
        "tags": [
            "blog",
            "industry",
            "analysis",
            "new",
            "API",
            "Application Programming Interface"
        ],
        "properties": [
            {
                "type": "X-signup",
                "url": "https://apievangelist.3scale.net/"
            },
            {
                "type": "X-blog",
                "url": "http://developer.apievangelist.com/blog/"
            },
            {
                "type": "X-apicommonsmanifest",
                "url": "https://raw.githubusercontent.com/kinlane/analysis-api/master/api-commons-manifest.json"
            }
        ],
     }
  },
  "basePath": "/",
  "paths": {
     ...
  }
}
```

This could be used by corresponding tooling that builds apis.json files for swagger definitions, the advantage being that all metadata
for a Swagger API is within one definition instead of spread out amongst multiple files.

Another (simplified) example could be how to specify a [JWE encryption](http://hdknr.github.io/docs/identity/jwe.html) policy to parameters,
 for example as follows:

```json
{
  ...
    "socialSecurityNumber": {
      "name": "socialSecurityNumber",
      "in": "query",
      "description": "a social security number",
      "required": false,
      "type": "string",
      "x-jwe-encryption" : {
          "algorithm" : "RSA-OAEP",
          "encryption" : "A256GCM"
       }
    }
  }
  ...
}

```
An API consumer reading these parameter definitions could interpret this as having to encrypt the skip parameter in line
 with the JWE standard.

## Annotations

The Swagger specific annotations currently available for jax-rs APIs do not support the addition of extension data.
