OpenAPI 3.1.X JSON Schema
---

Here you can find the JSON Schema for validating OpenAPI definitions of versions 3.1.X.

As a reminder, the JSON Schema is not the source of truth for the Specification. In cases of conflicts between the Specification itself and the JSON Schema, the Specification wins. Also, some Specification constraints cannot be represented with the JSON Schema so it's highly recommended to employ other methods to ensure compliance.

The iteration version of the JSON Schema can be found in the `$id` field. For example, the value of `$id: https://spec.openapis.org/oas/3.1/schema/2021-02-18` means this iteration was created on February 18th, 2021.

To submit improvements to the schema, modify the schema.yaml file only.

The TSC will then:
- Run tests on the updated schema
- Update the iteration version
- Convert the schema.yaml to schema.json
- Publish the new version
