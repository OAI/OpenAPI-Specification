# Overlays

## Metadata

|Tag |Value |
|---- | ---------------- |
|Proposal |[004_Overlays](https://github.com/OAI/OpenAPI-Specification/tree/master/proposals/004_overlays.md)|
|Authors|[Darrel Miller](https://github.com/darrelmiller)|
|Status |Proposal|
|Issues |[1442](https://github.com/OAI/OpenAPI-Specification/issues/1442) [1722](https://github.com/OAI/OpenAPI-Specification/issues/1722)|

## Change Log

|Date |Responsible Party |Description |
|---- | ---------------- | ---------- |
| 24th December 2019 | Darrel Miller | Initial draft |
| 2nd January 2019 | Darrel Miller | Update to wording around removing items from arrays.  Added section on backward compatibility. Clarified process around applying a set of updates. Started to add supported scenarios.|

## Introduction

In recent months we have been discussing various use cases for overlays and various solutions.  The following proposal takes a somewhat more radical approach to the problem.  It is a more ambitious proposal than the others we have seen before but the additional complexity does allow for supporting many of the scenarios that have been discussed to date.


#### <a name="overlayDocument"></a>Overlay Document

An overlay document contains a list of [Update Objects](#overlayUpdates) that are to be applied to the target document.  Each [Update Object](#updateObject) has a `target` property and a `value` property.  The `target` property is a [JMESPath](http://jmespath.org/specification.html) query that identifies what part of the target document is to be updated and the `value` property contains an object with the properties to be overlaid.


#### <a name="overlayObject"></a>Overlay Object

This is the root object of the [OpenAPI Overlay document](#oasDocument).

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="overlayVersion"></a>overlay | `string` | Version of the Overlay specification that this document conforms to. 
<a name="overlayInfo"></a>info | [[Info Object](#overlayInfoObject)] | Identifying information about the overlay.
<a name="overlayExtends"></a>extends | `url` | URL to an OpenAPI document this overlay applies to. 
<a name="overlayUpdates"></a>updates | [[Update Object](#updateObject)] | A list of update objects to be applied to the target document.

The list of update objects MUST be applied in sequential order to ensure a consistent outcome.  Updates are applied to the result of the previous updates. This enables objects to be deleted in one update and then re-created in a subsequent update.

The `extends` property can be used to indicate that the Overlay was designed to update a specific OpenAPI description.  This is an optional property.  Where no `extends` is provided it is the responsibility of tooling to apply the Overlay documents to the appropriate OpenAPI description.

#### <a name="overlayInfoObject"></a>Info Object

This object contains identifying information about the [OpenAPI Overlay document](#oasDocument).

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="overlayTitle"></a>title | `string` | A human readable description of the purpose of the overlay.
<a name="overlayVersion"></a>version | `string` | A version identifer for indicating changes to an overlay document.

#### <a name="updateObject"></a>Update Object

This object represents one or more changes to be applied to the target document at the location defined by the target JMESPath.

##### Fixed Fields

Field Name | Type | Description
---|:---:|---
<a name="updateTarget"></a>target | `string` | A JMESPath expression referencing the target objects in the target document.
<a name="updateValue"></a>value | [Any](#valueObject) | An object with the properties and values to be updated in the target document.  Property has no impact if `remove` property is `true`.
<a name="updateRemove"></a>remove | `boolean` | A boolean value that indicates that the target object is to be removed from the the map or array it is contained in. The default value is false.  

The properties of the `Value Object` MUST be compatible with the target object referenced by the JMESPath key.  When the Overlay document is applied, the properties in the `Value Object` replace properties in the target object with the same name and new properties are appended to the target object.

##### Structured Overlays Example

When updating properties throughout the target document it may be more efficient to create a single `Update Object` that mirrors the structure of the target document. e.g.

```yaml
overlay: 1.0.0
info:
  title: Structured Overlay
  version: 1.0.0
updates:
- target: "@"
  value:
    info:
      x-overlay-applied: structured-overlay
    paths:
      "/":
        summary: "The root resource"
        get:
          summary: "Retrieve the root resource"
          x-rate-limit: 100
      "/pets":
        get:
          summary: "Retrieve a list of pets"
          x-rate-limit: 100
    components:
    tags:
```

##### Targeted Overlays

Alternatively, where only a small number of updates need to be applied to a large document, each [Update Object](#updateObject) can be more targeted.

```yaml
overlay: 1.0.0
info:
  title: Structured Overlay
  version: 1.0.0
updates:
- target: paths."/foo".get
  value:
    description: This is the new description
- target: paths."/bar".get
  value:
    description: This is the updated description
- target: paths."/bar"
  value:
      post:
          description: This is an updated description of a child object
          x-safe: false
```

##### Wildcard Overlays Examples

One significant advantage of using the JMESPath syntax that it allows referencing multiple nodes in the target document.  This would allow a single update object to be applied to multiple target objects using wildcards.

```yaml
overlay: 1.0.0
info:
  title: Update many objects at once
  version: 1.0.0
updates:
- target: paths.*.get
  value:
    x-safe: true
- target: paths.*.get.parameters[?name=='filter' && in=='query']
  value:
    schema:
      $ref: "/components/schemas/filterSchema"
```

##### Array Modification Examples

Due to the fact that we can now reference specific elements of the parameter array, it allows adding parameters. Parameters can be deleted using the `remove` property.  Use of indexes to remove array items should be avoided where possible as indexes will change when items are removed.

```yaml
overlay: 1.0.0
info:
  title: Add an array element
  version: 1.0.0
updates:
- target: paths.*.get.parameters[length(@)]
  value: 
    name: newParam
    in: query
```

```yaml
overlay: 1.0.0
info:
  title: Remove a array element
  version: 1.0.0
updates:
- target: $.paths[*].get.parameters[? name == 'dummy']
  remove: true
```

## Proposal Summary

### Benefits

- This approach addresses the two distinct approaches of structured overlay vs targeted overlay which suits distinct but equally valid scenarios.
- Addresses the problem of modifying the parameters array and removes the need to replace the entire array when a small change is required.
- Allows sets of related overlays to be stored in a same file.
- Enables updating a set of objects based on a pattern. This might be an effective way of apply common behaviour across many operations in an API.

### Challenges

- Tooling will need a JMESPath implementation.
- Large overlays may be slow to process.
- Multiple complex pattern based overlays may cause overlapping updates causing confusing outcomes.

## Alternatives considered

JMESPath was chosen over JSONPath due to the fact that JMESPath has a [specification](http://jmespath.org/specification.html) and a set of test cases.  This will help to ensure compatibility between implementations.

## Backwards compatibility

Overlays will be described in a new specification that can be used alongside an OpenAPI Description, therefore there will be no compatibility issues for the initial release. Overlay documents can be used against OpenAPI v2 and v3 descriptions.

## Scenarios Considered

- Multi-language support.  An Overlay document for each language is used to target a specific OpenAPI description.  The Overlay document will likely use a duplicate structure to the original OpenAPI description and replace all `description` properties.
- Applying API wide standards.  An Overlay document contains update objects that describe standard headers, parameters, responses.  These documents would use JMESPath queries to target the appropriate objects in the OpenAPI description.  Tooling could be used to target the OpenAPI description rather than using extends.
- Add tool specific OpenAPI metadata. Overlay adds additional metadata such as SLA information, client codegen hints or middleware policies. Using Overlays to manage this data separately is valuable when there is a different audience for the data and/or there the information has different sensitivity levels.
