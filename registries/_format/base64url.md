---
owner: baywet
issue:
description: Binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5)
base_type: string
layout: default
oas_version: < 3.1
remarks: "When using OpenAPI 3.1 it's recommended not to use this format and instead use [`contentEncoding` with a value of `base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format is binary data encoded as a url-safe string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-5).

### Upgrading from < 3.1 to >= 3.1

#### Entire response body

> Note: Encoding a binary message body to a string is not necessary in HTTP, and will increase the size by 33% to 300%.

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

Encoding a binary part to a string is not necessary for multipart/form-data, and will increase the size by 33% to 300%.

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