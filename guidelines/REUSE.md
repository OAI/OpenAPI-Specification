# Reuse Philosophy

We encourage reuse and patterns through references.

## What is reusable

The following types are reusable, as defined by the spec:

* Parameters
* Models (or Schema Objects in general)
* Responses
* Operations (_Operations can only be referenced externally_)

## Reuse strategy

When reusing components in an API design, a pointer is created from the definition to target design.  The references are maintained in the structure, and can be updated by modifying the source definitions.  This is different from a "copy on design" approach where references are injected into the design itself.

The reuse technique is transparent between JSON or YAML and is lossless when converting between the two.

YAML anchors are technically allowed but break the general reuse strategy in OpenAPI Specification, since anchors are "injected" into a single document.  They are not recommended.

Referenes can be made either internal to the OpenApi Specification file or to external files. 

## Techniques

### Guidelines for Referencing

Whether you reference definitions internally or externally, you can never override or change their definitions from the referring location. The definitions can only be used as-is.

#### Internal references

When referencing internally, the target references have designated locations:

* Parameters -> `#/parameters`
* Responses -> `#/responses`
* Models (and general Schema Objects) -> `#/definitions`

All references are canonical and must be a qualified [JSON Pointer, per RFC6901](http://tools.ietf.org/html/rfc6901). For example, simply referencing a model `Pet` is not allowed, even if there are no other definitions of it in the file.

_Example from https://github.com/OAI/OpenAPI-Specification/blob/master/examples/v2.0/json/petstore.json_
``` json
          "200": {
            "description": "pet response",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Pet"
              }
            }
```

#### External references

If your referenced file contains only one root-level definition, you can refer to the file directly.

To reference the example below: 

`"$ref": "definitions/Model.json""`

or

`"$ref": "https://my.company.com/definitions/Model.json"`.

_Assuming file https://my.company.com/definitions/Model.json_
```json
{
  "description": "A simple model",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer"
    }
  }
}
```

To reference `Model` in the example below:

_Note this approach potentially combines URL, JSON Reference, and JSON Pointer_

`"$ref": "definitions/models.json#/models/Model"`

 or 
 
`"$ref": "https://my.company.com/definitions/models.json#/models/Model"`


_Assuming file https://my.company.com/definitions/models.json_
```json
{
  "models": {
    "Model": {
      "description": "A simple model",
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
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

#### External by relative reference

All external relative references should follow the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) specification.

Per the JSON Reference spec:

> If the URI contained in the JSON Reference value is a relative URI,
then the base URI resolution MUST be calculated according to
[RFC3986], section 5.2. Resolution is performed relative to the
referring document.

_Example from https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/json/petstore-separate/spec/swagger.json_

``` json
"responses": {
	"default": {
		"description": "unexpected error",
		"schema": {
			"$ref": "../common/Error.json"
		}
	}
}
```

External references may also utilize [JSON Pointer](http://tools.ietf.org/html/rfc6901) to reference properties within the relative external file.

_Example from https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/json/petstore-separate/spec/swagger.json_
``` json
"parameters": [
	{
		"$ref": "parameters.json#/tagsParam"
	},
	{
		"$ref": "parameters.json#/limitsParam"
	}
]
```


#### External by URL

External files can be hosted on an HTTP server (rather than the local file system). 

One risk of this approach is that environment specific issues could arise if DNS is not taken into account (as the reference can only contain one hostname).

Resolution of URLs should follow [RFC3986](https://tools.ietf.org/html/rfc3986).

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

External references may also utilize a URL + JSON Pointer to reference properties within the external file.

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


### Definitions

Reuse schema definitions by creating a repository of definitions.  This is done by simply hosting a file or set of files for commonly used definitions across a company or organization.

Refer to [External references](#external-references) for referencing strategies.


### Parameters

Similar to model schemas, you can create a repository of `parameters` to describe the common entities that appear throughout a set of systems.  

Refer to [External references](#external-references) for referencing strategies.

Using the same technique as above, you can host on either a single or multiple files.  For simplicity, the example below assumes a single file.

_Assuming file https://my.company.com/parameters/parameters.json_

```json
{
  "query" : {
    "skip": {
      "name": "skip",
      "in": "query",
      "description": "Results to skip when paginating through a result set",
      "required": false,
      "minimum": 0,
      "type": "integer",
      "format": "int32"
    },
    "limit": {
      "name": "limit",
      "in": "query",
      "description": "Maximum number of results to return",
      "required": false,
      "minimum": 0,
      "type": "integer",
      "format": "int32"
    }
  }
}
```

To include these parameters, you would need to add them individually as such:

```json
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
          "parameters" : [
            {
              "$ref": "https://my.company.com/parameters/parameters.json#/query/skip"
            },
            {
              "$ref": "https://my.company.com/parameters/parameters.json#/query/limit"
            },
            {
              "in": "query",
              "name": "type",
              "description": "the types of pet to return",
              "required": false,
              "type": "string"
            }
          ],
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

### Operations

Again, Operations can be shared across files.  Although the reusability of operations will be less than with Parameters and models. For this example, we will share a common `health` resource so that all APIs can reference it:

Refer to [External references](#external-references) for additional referencing strategies.

```json
{
  "/health": {
    "$ref": "http://localhost:8000/operations.json#/health"
  }
}
```

Which points to the reference in the `operations.json` file:

```json
{
  "health": {
    "get": {
      "tags": [
        "admin"
      ],
      "summary": "Returns server health information",
      "operationId": "getHealth",
      "produces": [
        "application/json"
      ],
      "parameters": [],
      "responses": {
        "200": {
          "description": "Health information from the server",
          "schema": {
            "$ref": "http://localhost:8000/models.json#/Health"
          }
        }
      }
    }
  }
}
```

Remember, you cannot override the definitions, but in this case, you can add additional operations on the same path level.

### Responses

Refer to [External references](#external-references) for additional referencing strategies.

Assume the file `responses.json`:

```json
{
  "NotFoundError": {
    "description": "Entity not found",
    "schema": {
      "$ref": "#/definitions/ErrorModel"
    }
  }
}
```

You can refer to it from a response definition:
```json
{
  "/pets/{petId}": {
    "get": {
      "tags": [
        "pet"
      ],
      "summary": "Returns server health information",
      "operationId": "getHealth",
      "produces": [
        "application/json"
      ],
      "parameters": [
        {
          "name": "petId",
          "in": "path",
          "description": "ID of pet to return",
          "required": true,
          "type": "integer",
          "format": "int64"
        }
      ],
      "responses": {
        "200": {
          "description": "The pet",
          "schema": {
            "$ref": "#/definitions/Pet"
          }
        },
        "400": {
          "$ref": "http://localhost:8000/responses.json#/NotFoundError"
        }
      }
    }
  }
}
```
