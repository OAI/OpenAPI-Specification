# Clarify Semantics of `nullable` in OpenAPI 3.0


## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[003](https://github.com/OAI/OpenAPI-Specification/tree/master/proposals/003_Clarify-Nullable.md)|
|Authors|[Ted Epstein](https://github.com/tedepstein)|
|Review Manager |TBD|
|Status |Proposal|
|Implementations |N/A|
|Issues | [1900](https://github.com/OAI/OpenAPI-Specification/issues/1900), [1368](https://github.com/OAI/OpenAPI-Specification/issues/1368), [1389](https://github.com/OAI/OpenAPI-Specification/issues/1389), [1957](https://github.com/OAI/OpenAPI-Specification/pull/1957), [2046](https://github.com/OAI/OpenAPI-Specification/pull/2046), [1977](https://github.com/OAI/OpenAPI-Specification/pull/1977#issuecomment-533333957) |
|Previous Revisions |N/A |

.Change Log

|Date |Responsible Party |Description |
|---- | ---------------- |------------|
|Oct 31, 2019 | Ted Epstein | Initial proposal |

## Introduction

This proposal aims to clarify the semantics of the `nullable` keyword in OpenAPI 3.0. This clarification would resolve ambiguities, reinforce the intended alignment with JSON Schema, and guidance for schema validators, translators, and other tools.

## Motivation

The documentation of the `nullable` keyword is incomplete and ambiguous, leaving many questions unanswered, and causing significant difficulty in reconciling certain assumed semantics with JSON Schema.

To summarize the problems:

* `nullable: true` is an _expanding assertion_ that doesn't fit JSON Schema's constraint-based processing model. It is not clear how it interacts with other keywords, and within what scope.
* `nullable: false`, which is the default value, is not clearly defined, and could be interpreted in a way that breaks fundamental assumptions of JSON Schema.
* Different OpenAPI schema validators and other tool implementations are likely to have different behaviors, because the semantics of `nullable` are not specified well enough.
* OpenAPI Schema Objects cannot be interpreted correctly by standard JSON Schema processors, because of the above issues.
* Depending on the interpretation, `nullable` might interact with `oneOf` and `anyOf` in problemantic and counter-intuitive ways.

The solution proposed herein should:
* Clarify the boundaries around `nullable`, so we know how it interacts with other assertions, applicators, subtypes and supertypes within its context.
* Clarify the meaning of `nullable: false`.
* Reaffirm the intended alignment of OpenAPI's Schema Object with JSON Schema, and reconcile `nullable` with JSON Schema semantics.

Further details follow.

### Expanding vs. Constraining Assertions

`nullable: true` is an _expanding assertion_, meaning it has the effect of expanding the range of acceptable values. By contrast, JSON Schema's central operating principle is constraint-based, where constraints are cumulative, immutable, and each constraint has veto power to disallow some range of values.

The semantics of constraining assertions are well defined by JSON Schema and implemented in many JSON Schema validators and other tools. But JSON Schema doesn't have expanding assertions, so those well-defined semantics don't apply to `nullable`. 

We would have to specify how `nullable` interacts with constraining assertions and boolean applicators like `allOf` and `anyOf`.

### Interpretation of `nullable: false`

The documentation specifies that `nullable: false` is the default, but doesn't clearly state what that means.

One reasonable interpretation suggests that null values are disallowed unless `nullable` is explicitly set to `true`. This breaks a fundamental rule of JSON Schema, which states that an empty object `{}` is a valid schema that permits all values, with no constraints. Breaking that rule takes OpenAPI's Schema Object even further out of alignment with JSON Schema's processing model.

However, the OpenAPI 3.0 specification doesn't explicitly say that untyped schemas disallow null values.

Here are the relevant parts:

#### Data Types
> Primitive data types in the OAS are based on the types supported by the JSON Schema Specification Wright Draft 00. Note that integer as a type is also supported and is defined as a JSON number without a fraction or exponent part. null is not supported as a type (see nullable for an alternative solution). Models are defined using the Schema Object, which is an extended subset of JSON Schema Specification Wright Draft 00.

To say that null is "not supported _as a type_" would definitely disallow `type: "null"` in a schema object. But it doesn't necessarily mean that an untyped schema disallows _null values_.

#### Definition of `nullable`
> Allows sending a null value for the defined schema. Default value is false.

This uses the word "allows," but there's no mention of "disallows." To say that `nullable: true` _allows_ null where it would otherwise be prohibited, doesn't necessarily mean that `nullable: false` _disallows_ null where it would otherwise be allowed.

`nullable: true` _modifies_ a typed schema by adding null to the allowed types. `nullable: false` could mean "no null values allowed" or it could just mean "no modification to the specified type assertion, if any."

#### Schema Object
> The following properties are taken from the JSON Schema definition but their definitions were adjusted to the OpenAPI Specification.
>
> type - Value MUST be a string. Multiple types via an array are not supported.

There is no specified adjustment to the `type` property that disallows null values. So it should defer to the JSON Schema specification, which says that, in the absence of a `type` assertion, any valid JSON value is allowed.

So the 3.0 spec is ambiguous about null values. It's not clear whether the spec intended to disallow null values by default, even in untyped schemas. This looks more like an accidental oversight, or an unfortunate choice of words, than a clear intention.

### Specific Questions

Questions that are not answered by the current specification include the following: 
* If a schema specifies `nullable: true` and `enum: [1, 2, 3]`, does that schema allow null values? (See [#1900](https://github.com/OAI/OpenAPI-Specification/issues/1900).)

* Does an untyped schema (without a `type` keyword) allow null values by default? What effect, if any,does `nullable: true` have on an untyped schema?

* Can `allOf` be used to define a nullable subtype of non-nullable base schema? (See [#1368](https://github.com/OAI/OpenAPI-Specification/issues/1368).)

* Can `allOf` be used to define a non-nullable subtype of nullable base schema?

* What is the correct translation of a nullable schema from OpenAPI into an equivalent JSON Schema?

## Proposed solution

We propose to clarify the 3.0 specification in the next patch release, to resolve these questions and align OpenAPI's Schema Object with JSON Schema's well-defined, constraint-based semantics.

In our view, and consistent with the original intent, `nullable` should have a very limited, well-defined scope, optimized to satisfy a specific use case with minimal side effects.

This is the proposed replacement for the `nullable` definition:
<hr>

Field Name | Type | Description
---|:---:|---
<a name="schemaNullable"></a>nullable | `boolean` | A `true` value expands the allowed type defined by the `type` keyword, only if `type` is explicitly defined within the same Schema Object. Other Schema Object constraints retain their defined behavior, and therefore may disallow the use of `null` as a value. A `false` value leaves the specified or default `type` unmodified. The default value is `false`.
<hr>

## Detailed design

According to the above specification, `nullable` only operates within a narrow scope, wherein its translation to JSON Schema is straightforward:

* `nullable` is only meaningful if its value is `true`.
* `nullable: true` operates within a single Schema Object; it does not "override" or otherwise compete with supertype or subtype schemas defined with `allOf` or other applicators; and it cannot be directly "inherited" through those applicators.
* `nullable: true` is only meaningful in combination with a `type` assertion specified in the same Schema Object. `nullable` acts as a `type` modifier, allowing `null` in addition to the specified type.

This also solves the issues of alignment with JSON Schema:

* Since `type` is a constraint, JSON Schema's constraint-based processing model is fully applicable. Interactions between `type` and other constraining assertions and applicators are unambiguous, with each constraint having independent veto power.
* It is now clear that `nullable: false`, whether explicit or by default, _does not_ prohibit default values. Consistent with JSON Schema, an empty object allows all values, including `null`.

## Backwards compatibility

Spec revisions through 3.0.2 are ambiguous as described above, so any possible clarification has the potential to break existing implementations. 

With the clarification of `nullable: false`, we think the risk of actual breakage is miniscule, because the current ambiguity only affects untyped Schema Objects, which by their nature leave a lot of room for unexpected values. Any implementation that relies on schema validation to prevent null values should use explicitly typed schemas, and typed schemas unambiguously disallow `null` unless `nullable` is `true`.

There might be a somewhat greater risk of breakage by specifying the effect of `nullable: true` as a `type` modifier. A more heavy-handed interpretation of `nullable: true`, [described here](https://github.com/OAI/OpenAPI-Specification/issues/1900#issuecomment-486772917), would make it equivalent to `allOf [s, type: null]` where `s` is the schema as specified (excluding `nullable`). This would allow nulls even where they would be prohibited by other schema keywords, like `enum`. But this interpretation introduces far greater complexity than the narrowly scoped `type` modifier. We are not aware of any OpenAPI schema validator that actually attempts this, and there is nothing in the OpenAPI spec that says `nullable` should override constraints.

## Alternatives considered

[Pull request #1977](https://github.com/OAI/OpenAPI-Specification/pull/1977#issuecomment-533333957) has some history of other approaches considered along the way. The first attempt assumed that `nullable: false` would prohibit null values, and attempted to work around this while maintaining backward compatibility.

On closer inspection, the specification does not say anything about `null` values being disallowed. So we believe our interpretation is correct, and highly advantageous in its alignment with JSON Schema.