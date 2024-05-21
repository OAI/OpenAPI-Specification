---
owner: baywet
issue:
description: An email address as defined as Mailbox in RFC5321
base_type: string
layout: default
source_label: JSON Schema
source: https://json-schema.org/draft/2020-12/json-schema-validation.html#name-email-addresses
---

{% capture summary %}
The `{{page.slug}}` format is an email address as defined as Mailbox in [RFC5321](https://www.rfc-editor.org/rfc/rfc5321).
{% endcapture %}

{% include format-entry.md summary=summary %}
