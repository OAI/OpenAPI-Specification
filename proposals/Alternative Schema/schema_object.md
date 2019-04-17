## Change: Extend the Schema Object to support Alternative Schemas

The following content shall be used to replace the Fixed Fields table in the Schema Object section

#### Fixed Fields

|Field Name | Type | Description |
|---|:---:|---|
| nullable | `boolean` | Allows sending a `null` value for the defined schema. Default value is `false`.|
| discriminator | [Discriminator Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#discriminatorObject) | Adds support for polymorphism. The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description. See [Composition and Inheritance](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#schemaComposition) for more details. |
| readOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but SHOULD NOT be sent as part of the request. If the property is marked as `readOnly` being `true` and is in the `required` list, the `required` will take effect on the response only. A property MUST NOT be marked as both `readOnly` and `writeOnly` being `true`. Default value is `false`. |
| writeOnly | `boolean` | Relevant only for Schema `"properties"` definitions. Declares the property as "write only". Therefore, it MAY be sent as part of a request but SHOULD NOT be sent as part of the response. If the property is marked as `writeOnly` being `true` and is in the `required` list, the `required` will take effect on the request only. A property MUST NOT be marked as both `readOnly` and `writeOnly` being `true`. Default value is `false`. |
| xml | [XML Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#xmlObject) | This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property. |
| externalDocs | [External Documentation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#externalDocumentationObject) | Additional external documentation for this schema.
| example | Any | A free-form property to include an example of an instance for this schema. To represent examples that cannot be naturally represented in JSON or YAML, a string value can be used to contain the example with escaping where necessary.|
| deprecated | `boolean` | Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is `false`.|
|x-oas-draft-alternativeSchema  |alternative Schema Object  |An external schema that participates in the validation of content along with other schema keywords. |  
