# Heading 1

Text for first chapter

## Version 30.0.1

This is the conformance section

## Heading 2

Text for <a name="first-anchor"></a>first section

## Definitions

### Foo

Definition of Foo.

## Another Heading 2

Text for second section

[Relative link to example](../examples/foo.yaml)

[Relative link to something else](../something/else)

### Heading 3

Text for first subsection

[RFC3986](https://datatracker.ietf.org/doc/html/rfc3986)

[RFC9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-4)

```json
{
  "foo": true
}
```

```yaml
foo: true
```

```text
text/plain
```

```
no language
```

```unknown
unknown language
```

```uri
https://foo.com/bar?baz=qux&fred=waldo#fragment
```

```uritemplate
https://foo.com/bar{?baz*,qux}
```

```multipart
--boundary-example
Content-Type: application/openapi+yaml
Content-Location: https://inaccessible-domain.com/api/openapi.yaml

openapi: 3.2.0
info:
  title: Example API
  version: 1.0
  externalDocs:
    url: docs.html

--boundary-example
Content-Type: text/html
Content-Location: https://example.com/api/docs.html

<html>
  <head>
    <title>API Documentation</title>
  </head>
  <body>
    <p>Awesome documentation goes here</p>
  </body>
</html>
```

```eventstream
event: addString
data: This data is formatted
data: across two lines
retry: 5

event: addNumber
data: 1234.5678
unknownField: this is ignored

: This is a comment
event: addJSON
data: {"foo": 42}
```

```jsonl
{"event": "addString", "data": "This data is formatted\nacross two lines", "retry": 5}
{"event": "addNumber", "data": "1234.5678"}
{"event": "addJSON", "data": "{\"foo\": 42}"}
```

```ndjson
{"event": "addString", "data": "This data is formatted\nacross two lines", "retry": 5}
{"event": "addNumber", "data": "1234.5678"}
{"event": "addJSON", "data": "{\"foo\": 42}"}
```

```jsonseq
0x1E{
  "timestamp": "1985-04-12T23:20:50.52Z",
  "level": 1,
  "message": "Hi!"
}
0x1E{
  "timestamp": "1985-04-12T23:20:51.37Z",
  "level": 1,
  "message": "Bye!"
}
```

## Appendix A: Revision History

Version | Date
--------|-----------
30.0.1  | 3001-04-01
