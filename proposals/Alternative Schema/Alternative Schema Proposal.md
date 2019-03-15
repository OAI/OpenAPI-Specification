# OpenAPI Proposal - Alternative Schema

## Status: Draft Feature

## Version: March 15, 2019

## Related Issues [1532](https://github.com/OAI/OpenAPI-Specification/issues/1532)

.Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
|3/15/19 |C. Heazel|Initial Markup Draft |

## Introduction
This a proposal to add a new field called ``alternativeSchema`` to the OAS https://github.com/OAI/OpenAPI-Specification/issues/1532#schemaObject[Schema Object]. While still in draft, the field name will be prefixed with ``x-oas-draft-``.

This draft feature makes the following changes to the OAS 3.0 specification:

1. Extend the Schema Object by the addition of the x-oas-draft-alternativeSchema field.
1. Addition of the Alternative Schema Object.
1. Addition of Alternative Schema examples.
1. Addition of a preliminary discussion of the Alternative Schema registry.

## Content Changes

### 1) Extend the Schema Object

#### Schema Object

##### Fixed Fields

|Field Name | Type | Description |
|---|:---:|--- |
|x-oas-draft-alternativeSchema  |alternative Schema Object  |An external schema that participates in the validation of content along with other schema keywords. |  

### 2) Add Alternative Schema Object 

#### Alternative Schema Object

This object makes it possible to reference an external file that 
contains a schema that does not follow the OAS specification. If tooling does not support the _type_, tooling MUST consider the content valid but SHOULD provide a warning that the alternative schema was not processed.

===== Fixed Fields

|Field Name | Type | Description |
|---|:---:|--- |
|type | string | **REQUIRED**. The value MUST match one of the values identified in the alternative Schema Registry. |
|location | url | **REQUIRED**.  This is a absolute or relative reference to an external resource containing a schema of a known type.  This reference may contain a fragment identifier to reference only a subset of an external document. |

This object MAY be extended with Specification Extensions.

### 3) Add Alternative Schema Examples

#### Examples

Minimalist usage of alternative schema:

    schema:
        x-oas-draft-alternativeSchema:
          type: jsonSchema
          location: ./real-jsonschema.json

Combination of OAS schema and alternative:

    schema:
        type: object
        nullable: true
        x-oas-draft-alternativeSchema:
            type: jsonSchema
            location: ./real-jsonschema.json

Multiple different versions of alternative schema:

    schema:
        anyOf:
            - x-oas-draft-alternativeSchema:
                type: jsonSchema
                location: ./real-jsonschema-08.json
            - x-oas-draft-alternativeSchema:
                type: jsonSchema
                location: ./real-jsonschema-07.json

Combined alternative schemas:

    schema:
        allOf:
            - x-oas-draft-alternativeSchema:
                type: xmlSchema
                location: ./xmlSchema.xsd
            - x-oas-draft-alternativeSchema:
                type: schematron
                location: ./schema.sch

Mixed OAS schema and alternative schema:

    schema:
        type: array
        items:
            x-oas-draft-alternativeSchema:
                type: jsonSchema
                location: ./real-jsonschema.json

### 4) Alternative Schema Registry

#### Alternative Schema Registry

*** Note this is a placeholder registry. Don't take the values seriously. ***  

The Alternative Schema Registry is located at https://spec.openapis.org/registries/alternative-schema[https://spec.openapis.org/registries/alternative-schema]. Inital contents of the registry include:

|Name  |Link  |Description | 
|--- | --- | --- |
|jsonSchema |TBD  |JSON Schema | |xsdSchema |TBD  |XML Schema |
