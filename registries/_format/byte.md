---
owner: DarrelMiller
issue: 
description: base64 encoded data as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4)
base_type: string
layout: default
oas_version: < 3.1
remarks: "In OpenAPI 3.1, instead use [`contentEncoding: base64url`](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentencoding), optionally alongside [contentMediaType](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-contentmediatype)."
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

Base type: `{{ page.base_type }}`.

The `{{page.slug}}` format represents any sequence of octets encoded as a base64 string as defined in [RFC4648](https://www.rfc-editor.org/rfc/rfc4648#section-4). This format entry is to ensure future versions of OpenAPI maintain compatibility with [OpenAPI 3.0.x](https://spec.openapis.org/oas/v3.0.0).

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

Data encoded using byte or base64 will require URL percent-encoding before it can be used in a path or query parameter. Use base64url instead to avoid this problem.

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