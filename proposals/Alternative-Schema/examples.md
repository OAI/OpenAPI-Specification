## Change: Add Alternative Schema Examples

The following text is to be inserted after the Alternative Schema Object section.

### Alternative Schema Examples

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

