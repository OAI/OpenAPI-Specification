## Change: Add the Alternative Schema Object

The following text is to be inserted after the XML Object section

### Alternative Schema Object

This object makes it possible to reference an external file that contains a schema that does not follow the OAS specification. If tooling does not support the _type_, tooling MUST consider the content valid but SHOULD provide a warning that the alternative schema was not processed.

==== Fixed Fields

|Field Name | Type | Description |
|---|:---:|---|
|type | string | **REQUIRED**. The value MUST match one of the values identified in the alternative Schema Registry. |
|location | url | **REQUIRED**.  This is a absolute or relative reference to an external resource containing a schema of a known type.  This reference may contain a fragment identifier to reference only a subset of an external document. |

This object MAY be extended with Specification Extensions.
