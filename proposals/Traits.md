[Source](https://github.com/OAI/OpenAPI-Specification/issues/1843)


I'm opening this issue simply as a place to collect some ideas about how the concepts of [Overlays](#1722) and [Traits](#613) might be brought together.

In both proposals, I think the key notion is a "fragment", which I would describe as: a "sparse" sub-object of an OpenAPI definition.  In the Overlay proposal, a fragment is the `value` of an "Update Object" and has a type of `any`.

I think fragments -- which I would like to call "mixins" -- can have a more well-defined structure than just `any`.  If we use the `discriminator` approach already present in OpenAPI for "mixins", we can require (and validate) conformance to a particular structure.  In particular, we can require a mixin to be a "sparse" form of any well-defined OpenAPI object, e.g. Operation, Response, Parameters, or even the whole OpenAPI definition.

Mixins could be defined as just another flavor of "component".  So
```
components:
  mixins:
    pagable:
      type: operation            << so what follows should validate as a "sparse"* OpenAPI Operation object 
      < pageable parameters and response props in #613 >
```

Note *: "sparse" here means all props are optional

Mixins could then be included effectively anywhere in the API doc by reference:
```
  $mixin: "/components/mixin/pageable"
```

By virtue of the mixin type, it could be validated as allowed or not allowed at the point it is referenced.

Now Overlays can become simply a mechanism for inserting mixins and mixin references into an API document.  The JMESPath mechanism of overlays still provide the ability to apply a single update to multiple target objects using wildcards, but that update would now be expressed as simply adding a "mixin" to each of the target objects.

These are just strawman ideas and I do not claim to have thought them through any detail, but I hope they can serve as useful seeds for discussion.

### Examples

Mixins are a recasting of "Traits" as described in #613. Here's how I imagine mixins could be used to apply a "pageable" trait to operations.

The "pageable" mixin would be defined in the `components / mixins` section of the API doc:

```
components:
  mixins:
    pagable:
      type: operation
      content:
        parameters:
          - name: pageSize
            in: query
            type: number
            required: false
            default: 10
          - name: pageNumber
            in: query
            type: number
            required: false
            default: 1
        response:
          200:
            schema:
              type: object
              pagination:
                $ref: "#/definitions/PaginationFragment"
```

and an operation would "apply" the "pageable" mixin with a $mixin property, as follows:
```
paths:
  /foo:
    get:
      description: search for foo resources
      $mixin: 
        - pagable
      parameters:
        - name: q
          in: query
          type: string
          required: true
      responses:
        200:
          schema:
            type: object
            FooItems:
              array:
                items:
                  $ref: '#/definitions/FooItem'
```

The application of the mixin to the operation would yield on operation like:
```
paths:
  /foo:
    get:
      description: search for foo resources
      parameters:
        - name: q
          in: query
          type: string
          required: true
        - name: pageSize
          in: query
          type: number
          required: false
          default: 10
        - name: pageNumber
          in: query
          type: number
          required: false
          default: 1
      responses:
        200:
          schema:
            type: object
            FooItems:
              array:
                items:
                  $ref: '#/definitions/FooItem'
            pagination:
              $ref: "#/definitions/PaginationFragment"
```