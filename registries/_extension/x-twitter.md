---
owner: MikeRalphson
issue:
description: Used to hold a reference to the API provider's Twitter account.
schema:
  type: string
objects: [ "contactObject" ]
layout: default
---

{% capture summary %}
The `x-twitter` extension is used to hold a reference to the API provider's Twitter account. It can appear as a property in the following objects: `{{page.objects|jsonify}}`.
{% endcapture %}

{% capture example %}
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
{% endcapture %}

{% include extension-entry.md summary=summary example=example %}  
