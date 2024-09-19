# Release Notes

While the 3.1.1 release makes no changes to requirements of the OpenAPI 3.1.0 specification, it does introduce a number of notable improvements, including:
- Expands and clarifies a number of explanations, including several new appendices with supplementary details
- Focuses on technical specifics by moving examples and additional documentation now published at https://learn.openapis.org
- Declares that the HTML specifications at https://spec.openapis.org are now the authoritative versions (formerly it was the Markdown source on GitHub)

OpenAPI Description writers should mark their OpenAPI Descriptions with the version of the OpenAPI specification they used to write their specification, updating where possible.

Tooling maintainers should expect minimal work to support 3.1.1/3.0.4; however, we recommend checking the list of changes below.

## Clearer Definitions

Introduce consistent language around OpenAPI Document/Description/Definition:
- OpenAPI Description means the OpenAPI description of an API, whether it is in one or many files.
- A document means a single file.
- An "entry document" is where the OpenAPI Description for an API starts; it may reference other documents.

Improved language regarding schemas, explaining the difference between the OpenAPI schema, the schemas used within the OpenAPI schema, and the use of a non-authoritative JSON Schema to supplement the written spec.

[3.1.1]Added guidance around use of schema dialects.

## References

Additional guidance for resolving references and parsing documents was added, resolving component names, tags, and operationIds are clarified.
[3.1.1]The adoption of JSON Schema in 3.1.x changed the parsing and referencing, and a new section was added to cover the changes in more depth than in 3.1.0.

[3.1.1]Improved explanation of URLs and URIs, and made clear which to use for each URL/URI field.
Clarified that Markdown links are resolved in relation to their rendered context.

## Data Types

Extensive clarifications on data types and encoding.

Added a section on handling binary data.

## Security

Added a note that a `security` array that is empty or missing does not indicate that no security arrangements exist for this API.

Updated references to other standards where newer versions are available, and added more explanation for OpenIDConnect.

Added a "Security Concerns" section containing advice for implementers and users of OpenAPI.
## Request Data

Extensive refactoring of the parameters section
Examples were updated, improved, and explanations added.

Headers have their own section with examples and specific information.

Improves and expands on OpenAPI `example` and `examples` and adds a "Working with Examples" section with a clearer description and examples.

Clarifies and expands on file uploads, form-urlencoded request bodies, and multipart content, and moves them to a refactored `Encoding Object` section to provide better coverage of edge cases and more examples.


