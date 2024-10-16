# OpenAPI 3.0.X JSON Schema

Here you can find the JSON Schema for validating OpenAPI definitions of versions 3.0.x.

As a reminder, the JSON Schema is not the source of truth for the Specification.
In cases of conflicts between the Specification itself and the JSON Schema, the
Specification wins. Also, some Specification constraints cannot be represented
with the JSON Schema so it's highly recommended to employ other methods to
ensure compliance.

The iteration version of the JSON Schema can be found in the `id` field.
For example, the value of `id: https://spec.openapis.org/oas/3.0/schema/2019-04-02` means this iteration was created on April 2nd, 2019.

## Contributing

To submit improvements to the schema, modify the `schema.yaml` and add test cases for your changes.

The TSC will then:
- Run tests on the updated schema
- Update the iteration version
- Publish the new version

## Tests

The [test suite](../../tests/v3.0) is part of this package.

```bash
npm install
npm test
```
