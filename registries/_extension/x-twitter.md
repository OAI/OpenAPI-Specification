---
owner: MikeRalphson
issue:
description: Used to hold a reference to the API provider's Twitter account.
schema:
  type: string
objects: [ "contactObject" ]
layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

The `x-twitter` extension is used to hold a reference to the API provider's Twitter account. It can appear as a property in the following objects: `{{page.objects|jsonify}}`.

### Schema

```yaml
{{page.schema}}
```

### Example

```yaml
openapi: 3.0.0
info:
  title: My API
  version: 1.0.0
  contact:
    x-twitter: APIs-guru
```

Used by: (informational)

* APIs.guru

