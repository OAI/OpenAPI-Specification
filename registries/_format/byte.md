---
owner: DarrelMiller
issue: 
description: base64 encoded characters
base_type: string
layout: default
oas_version: < 3.1
remarks: "When using OpenAPI 3.1 or above it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents any sequence of octets encoded as a base64 string. This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

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
                format: byte

#OAS 3.1
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            image/png:
              type: string
              contentEncoding: base64
```

#### Encoded property as part of a structured response

```yaml
#OAS 3.0
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                properties:
                  width:
                    schema:
                      type: string
                  height:
                    schema:
                      type: string
                  image:
                    type: string
                    format: byte

#OAS 3.1
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                properties:
                  width:
                    schema:
                      type: string
                  height:
                    schema:
                      type: string
                  image:
                    type: string
                    contentMediaType: image/png
                    contentEncoding: base64
```

#### Query or Path parameters

Using byte or base64 for path or query parameters is not recommended since this encoding makes use of characters that are not URL safe.

#### Multipart/form-data

Using byte or base64 for multipart/form-data parts is not recommended since it artificially inflates the payload size with not added value.

{% if page.issue %}
### GitHub Issue

* [#{{ page.issue }}](https://github.com/OAI/OpenAPI-Specification/issues/{{ page.issue }})
{% endif %}

{% if page.oas_version %}
### OpenAPI Specification version

#{{ page.oas_version }}
{% endif %}

{% if page.remarks %}
### Remarks

#{{ page.remarks }}
{% endif %}