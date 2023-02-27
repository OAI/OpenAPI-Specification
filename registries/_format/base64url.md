---
owner: baywet
issue:
description: A url-safe binary array as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5)
base_type: string
layout: default
oas_version: < 3.1
remarks: "When using OpenAPI 3.1 or above it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is a url-safe binary array as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5).

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
                format: base64url

#OAS 3.1
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            image/png:
              type: string
              contentEncoding: base64url
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
                type: object
                properties:
                  width:
                    schema:
                      type: string
                  height:
                    schema:
                      type: string
                  image:
                    type: string
                    format: base64url

#OAS 3.1
paths:
  '/picture':
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
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
                    contentEncoding: base64url
```

#### Query or Path parameters

```yaml
#OAS 3.0
parameters:
  - name: anImage
    in: query
    content:
      image/png:
        schema:
          type: string
          format: base64url

#OAS 3.1
parameters:
  - name: anImage
    in: query
    schema:
      type: string
      contentMediaType: image/png
      contentEncoding: base64url
```

#### Multipart/form-data

Using base64url for multipart/form-data parts is not recommended since it artificially inflates the payload size with not added value.

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