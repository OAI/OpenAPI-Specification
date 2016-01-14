# Reuse Philosophy

We encourage reuse and patterns through references.

## What is reusable

The following types are reusable, as defined by the spec:

* Parameters
* Models (_or Schema Objects in general_)
* Responses
* Operations (_Operations can only be remote references_)

## Reuse strategy

When authoring API design documents, common object definitions can be utilized to avoid duplication. For example, imagine multiple path definitions that each share a common path parameter, or a common response structure. The OpenAPI specification allows reuse of common object definitions through the use of "references".

A reference is a construct in your API design document that indicates "the content for this portion of the document is defined elsewhere". To create a reference, at the location in your document where you want to reuse some other definition, create an object that has a `$ref` property whose value is a URI pointing to where the definition is (more on this in later sections). 

OpenAPI's provides reference capabilities using the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) specification. 

### JSON Example

``` js
{
  // ... 
  definitions: {
    Person: {
      type: 'object',
      properties: {
        friends: {
          type: 'array',
          items: {
            $ref: '#/definitions/Person'
          }
        }
      }
    }
  }
}
```

### YAML Example

``` yaml
# ...
definitions:
  Person:
    type: object
    properties:
      friends:
        type: array
        items:
          $ref: '#/definitions/Person'
```

Note: YAML has a very similar feature, [YAML anchors](http://yaml.org/spec/1.2/spec.html#id2765878). Examples from this point will only be in JSON, using JSON References.

## Techniques

### Guidelines for Referencing

All references should follow the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) specification.

JSON Reference provides guidance on the resolution of references, notably:

> If the URI contained in the JSON Reference value is a relative URI,
then the base URI resolution MUST be calculated according to
[RFC3986], section 5.2. Resolution is performed relative to the
referring document.

Whether you reference definitions locally or remote, you can never override or change their definitions from the referring location. The definitions can only be used as-is.

#### Local references

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

#### Remote references

##### Relative path

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


##### URL

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


### Definitions

Reuse schema definitions by creating a repository of definitions.  This is done by simply hosting a file or set of files for commonly used definitions across a company or organization.

Refer to [Guidelines for Referencing](#guidelines-for-referencing) for referencing strategies.


### Parameters

Similar to model schemas, you can create a repository of `parameters` to describe the common entities that appear throughout a set of systems.  

Refer to [Guidelines for Referencing](#guidelines-for-referencing) for referencing strategies.

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

Again, Operations can be shared across files.  Although the reusability of operations will be less than with Parameters and Definitions. For this example, we will share a common `health` resource so that all APIs can reference it:

Refer to [Guidelines for Referencing](#guidelines-for-referencing) for referencing strategies.

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

Refer to [Guidelines for Referencing](#guidelines-for-referencing) for referencing strategies.

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
