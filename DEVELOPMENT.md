## Development Guidelines

This document intends to establish guidelines which build a transparent, open mechanism for deciding how to evolve the OpenAPI Specification. The Open API Technical Steering Committee (TSC) will initially follow these processes when merging changes from external contributors or from the TSC itself. This guideline document will be adjusted as practicality dictates.

## OAI Specification Driving factors

The OpenAPI Specification should be use-case driven.  We can specify support for hypothetical use cases as we see fit, but specifications should be backed by realistic scenarios.

## Specification Change Criteria

The specification _will change_ from the original 2.0 version.  We should typically make changes when any of the following criteria are met:

 - Clarity.  The current "way" something is done doesn't make sense, is complicated, or not clear.
 - Consistency.  A portion of the specification is not consistent with the rest, or with the industry standard terminology.
 - Necessary functionality.  We are missing functionality because of a certain design of the specification.
 - Forward-looking designs.  As usage of APIs evolves to new protocols, formats, and patterns, we should always consider what the next important functionality should be.
 - Impact.  A change will provide impact on a large number of use cases.  We should not be forced to accommodate every use case.  We should strive to make the _common_ and _important_ use cases both well supported and common in the definition of the OAI Spec.  We cannot be edge-case driven.


## Tracking Process

 - Use GitHub for all spec designs, use cases, and so on.
 - As with 2.0, the **human readable** document is the source of truth.  If using a JSON Schema again to document the spec, it is secondary to the human documentation.  The documentation should live in a *.md file, in parallel to the 2.0 document (versions/3.0.0.md for example).
 - At any given time, there would be _at most_ 4 work branches. The branches would exist if work has started on them. Assuming a current version of 3.0.0:
   - `master` - Current stable version. No PRs would be accepted directly to modify the specification. PRs against supporting files can be accepted.
   - `v3.0.1` - The next PATCH version of the specification. This would include non-breaking changes such as typo fixes, document fixes, wording clarifications.
   - `v3.1.0` - The next MINOR version.
   - `v4.0.0` - The next MAJOR version.
 - The `master` branch shall remain the current, released OpenAPI Specification.  We will describe and link the work branch(es) on the **default** README.md on master.
 - Examples of how something is described _currently_ vs. the proposed solution should accompany any change proposal.
 - New features should be done in feature branches/forks which, upon approval, are merged into the proper work branch.
 - Use labels for the workflow of specification changes.  Examples of labels are `proposed`, `needs migration review`, `needs tooling review`, `needs documentation`, `rejected`, and `needs approval`.  These labels must be assigned by project committers.
 - An issue will be opened for each feature change.  Embedded in the issue, or ideally linked in a file via pull-request (PR), a document about use cases should be supplied with the change.
 - A PR will be used to describe the _proposed_ solution, and linked to the original issue.
 - Not all committers will contribute to every single proposed change.  There may be many open proposals at once, and multiple efforts may happen in parallel.
 - When the a work branch is ready and approved, the branch will be merged to master.

## Approving Changes

For each change in the specification we should _always_ consider the following:

 - Migration.  Is this a construct that has a path from the existing 2.0 specification?  If so, how complicated is it to migrate to the proposed change?
 - Tooling.  Strive to support code generation, software interfaces, and spec generation techniques.  Some features may be impossible to support in different frameworks/languages.  These should be documented and considered during the change approval process.
 - Visualization.  Can the specification change be graphically visualized somehow in a UI or other interface?

Spec changes should be approved by a majority of the committers.  Approval can be given by commenting on the issue itself, for example, "Approved by @webron".  After voting criteria is met, any committer can merge the PR. (**TODO**: we will want to formalize what voting criteria actually is).

No change should be approved until there is documentation for it, supplied in an accompanying PR.

## Transparency

We should always be as transparent as possible.  Sometimes there will be discussions that use customer names, sensitive use cases, and so on.  These must be anonymized, discussed in a private repository, or conducted offline.

 - Asynchronous discussions should live in the GitHub issues for this project.
 - Realtime discussions should be in a public chat such as IRC or Slack.

