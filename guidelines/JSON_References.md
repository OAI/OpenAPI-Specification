# Guidelines for Referencing

The OpenAPI Specification relies on JSON Refereneces as the machinsm for reusability (DRY). This guide gives you a brief introduction to JSON References and its capability. It does not provide the full details which are covered in its own specification, but aims to provide you with information about the reference types.

All references should follow the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) specification.

JSON Reference provides guidance on the resolution of references, notably:

> If the URI contained in the JSON Reference value is a relative URI,
then the base URI resolution MUST be calculated according to
[RFC3986], section 5.2. Resolution is performed relative to the
referring document.

Whether you reference definitions locally or remote, you can never override or change their definitions from the referring location. The definitions can only be used as-is.

### Local references

When referencing locally (within the current document), the target references should follow the conventions, as defined by the spec:

* Parameters -> `#/parameters`
* Responses -> `#/responses`
* Definitions (Models/Schema) -> `#/definitions`

An example of a local definition reference:

_Example from https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v2.0/json/petstore.json_
``` json
          // ... 
          "200": {
            "description": "pet response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Pet"
              }
            }
```

### Remote references

#### Relative path

Files can be referred to in relative paths to the current document. 

_Example from https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/json/petstore-separate/spec/swagger.json_

``` json
// ... 
"responses": {
    "default": {
        "description": "unexpected error",
        "schema": {
            "$ref": "../common/Error.json"
        }
    }
}
```

Remote references may also reference properties within the relative remote file.

_Example from https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/json/petstore-separate/spec/swagger.json_
``` json
// ... 
"parameters": [
    {
        "$ref": "parameters.json#/tagsParam"
    },
    {
        "$ref": "parameters.json#/limitsParam"
    }
]
```


#### URL

Remote files can be hosted on an HTTP server (rather than the local file system). 

One risk of this approach is that environment specific issues could arise if DNS is not taken into account (as the reference can only contain one hostname).

_Assuming file https://my.company.com/definitions/Model.json_
```json
{
  "description": "A simple model",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "format": "int64"
    },
    "tag": {
      "description": "A complex, shared property.  Note the absolute reference",
      "$ref": "https://my.company.com/definitions/Tag.json"
    }
  }
}
```

Remote references may also reference properties within the remote file.

_Assuming file https://my.company.com/definitions/models.json_
```json
{
  "models": {
    "Model": {
      "description": "A simple model",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "tag": {
          "description": "a complex, shared property.  Note the absolute reference",
          "$ref": "https://my.company.com/definitions/models.json#/models/Tag"
        }
      }
    },
    "Tag": {
      "description": "A tag entity in the system",
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        }
      }
    }
  }
}
```