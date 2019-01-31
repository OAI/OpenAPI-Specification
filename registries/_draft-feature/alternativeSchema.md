---
owner: darrelmiller
issue: 1532
description: x-oas-draft-alternativeSchema

layout: default
---

# <a href="..">{{ page.collection }}</a>

## {{ page.slug }} - {{ page.description }}

#### <a name="mediaTypeObject"></a>Media Type Object


##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="alternativeSchemas"></a>alternativeSchemas | [[alternative Schema Object](#alternativeSchemaObject)] | List of alternative schemas.  These schemas can be used in addition to, or as an alternative to any existing `schema` property. If both OAS Schema and alternative schemas are present then both the OAS schema and one of the alternative schemas SHOULD be respected.  Alternative schemas MUST be processed in order.  It is sufficient for tooling to process just the first alternative schema they are capable of processing in order to consider the content as valid. If tooling cannot process any alternative schemas, then they MAY issue a warning, but MUST not report the OpenAPI description as invalid.

#### <a name="alternateSchemaObject"></a>Alternative Schema Object

This object makes it possible to reference an external file that contains a schema that does not follow the OAS specification. 

##### Fixed Fields

| Field Name | Type | Description |
|---|:---:|---|
<a name="alternativeSchemaType"></a>type | `string` | **REQUIRED**. The value MUST match one of the values identified in the alternative Schema Registry name of the tag.
<a name="alternativeSchemaExternalValue"></a>externalValue | `url` | **REQUIRED**.  This is a absolute or relative reference to an external file containing a schema of a known type.

This object MAY be extended with [Specification Extensions](#specificationExtensions).
