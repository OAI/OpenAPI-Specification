# Release Notes

This release makes no changes to the OpenAPI standard, however the formal specification document had multiple improvements, including:
- clarity and expanded explanations including several new appendices with supplementary details
- examples and additional documentation moved to https://learn.openapis.org
- the HTML rendering of the specification at https://spec.openapis.org is now considered the authoritative version (formerly it was the Markdown source on GitHub)

OpenAPI description writers should mark their OpenAPI descriptions with the version of OpenAPI specification they used to write their specification, updating where possible.

Tool creators should also not expect changes, but it is recommended to check the list of changes below.

## Clearer Definitions

Introduce consistent language around OpenAPI Document/Description/Definition:
- OpenAPI Description means the OpenAPI description of an API, whether it is in one or many files.
- a document means a single file.
- an "entry document" is where the OpenAPI description for an API starts; it may reference other documents.

Improved language regarding schemas, explaining the difference between the OpenAPI schema, the schemas used within the OpenAPI schema, and the use of a non-authoritative JSON Schema to supplement the written spec.

[3.1.1]Added guidance around use of schema dialects.

## References

Additional guidance for resolving references and parsing documents was added.
Resolving component names, tags, and operationIds are clarified.
[3.1.1]The adoption of JSON Schema in 3.1.x changed the parsing and referencing, and a new section was added to cover the changes in more depth than in 3.1.0.

[3.1.1]Improved explanation of URLs and URIs, and made clear which to use for each URL/URI field.
Clarified that Markdown links are resolved in relation to their rendered context.

## Data Types

Extensive clarifications on data types and encoding.
Added a section on handling binary data.

## Security

Added a note that the `security` array that is empty or missing values does not indicate that no security arrangements exist for this API.
Updated references to other standards where newer versions are available, and added more explanation for OpenIDConnect.
Added a "Security Concerns" section containing advice for implementers and users of OpenAPI.

## Request Data

The parameters section was extensively refactored.
Examples were updated, improved and explanations added.
Headers have their own section with examples and specific information.

Explanation of OpenAPI `example` and `examples` was expanded and the "Working with Examples" section added with clearer description and examples included.

Information regarding file uploads, form-urlencoded request bodies and multipart content were expanded and moved to the refactored Encoding Object section to provide better coverage of edge cases and more examples.


