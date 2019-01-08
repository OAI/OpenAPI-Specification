# Minimizing schema

## Schema or Reference

All references to `#/definitions/Schema` are happening in such form:

```yaml
oneOf:
  - $ref: '#/definitions/Reference'
  - $ref: '#/definitions/Schema'
```

Therefore `#/definitions/Reference` can be merged into `#/definitions/Schema` to simplify usages:

```yaml
$ref: '#/definitions/Schema'
```

Validation difference after this change is that additional unknown properties are no longer accepted for References.
Such data would become invalid:

```json
{"$ref": "#", "unknown":  1}
```
