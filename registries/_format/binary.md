---
owner: DarrelMiller
issue: 
description: any sequence of octets
base_type: string
layout: default
oas_version: < 3.1
remarks: "In OpenAPI 3.1, instead set the media type appropriately and do not use a schema property. Note that only complete HTTP message bodies or complete parts in a multipart media type can accommodate binary data. JSON strings and URL path components cannot."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents any sequence of octets. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

### Upgrading from < 3.1 to >= 3.1

#### Entire response body

```yaml
#OAS 3.0
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            image/png:
              schema:
                type: string
                format: binary

#OAS 3.1
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            image/png:
              schema: true #optional, some linters require a schema property
```

#### Encoded property as part of a structured response

Using the binary format as part of a structured response for a property or an array is invalid. Use `multipart/form-data` content instead.

#### Query or Path parameters

Using the binary format for query or path parameters is invalid.

#### Multipart/form-data

```yaml
#OAS 3.0
content:
  multipart/form-data:
    schema:
      type: object
        properties:
          anImage:
            type: string
            format: binary
    encoding:
      anImage:
        contentType: image/png

# OAS 3.1
content:
  multipart/form-data:
    schema:
      type: object
        properties:
          anImage: {}
    encoding:
      anImage:
        contentType: image/png
```

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

{{ page.remarks }}
{% endif %}
