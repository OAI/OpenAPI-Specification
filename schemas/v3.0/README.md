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

## Combine HTTP Methods in `patternProperties`

```yaml
patternProperties:
  '^(get|put|post|delete|options|head|patch|trace)$': $ref: '#/definitions/Operation'
```

## Define Parameter as a filtered superset

In order to avoid massive duplication all possible properties can be defined in a superset.
Custom rules of exclusiveness can be further defined as a list of traits in `allOf`.

For example such structure does not allow having `example` and `examples` in same object:
```yaml
not:
  required:
    - example
    - examples
```

## Combine some definitions as filtered supersets

With same pattern as for Parameter.