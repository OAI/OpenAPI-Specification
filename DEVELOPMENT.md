# CHANGES IN PROGRESS!!

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for up-to-date guidelines.  While we continue to [define and document our new processes](https://github.com/orgs/OAI/projects/5), we will keep this document as much of its contents are still relevant.  However, if in doubt about a policy, please [ask on our Slack](https://communityinviter.com/apps/open-api/openapi).

## Development Guidelines

This document intends to establish guidelines which build a transparent, open mechanism for deciding how to evolve the OpenAPI Specification. The OpenAPI Technical Steering Committee (TSC) will initially follow these processes when merging changes from external contributors or from the TSC itself. This guideline document will be adjusted as practicality dictates.

### Essential Policies

See [CONTRIBUTING.md](CONTRIBUTING.md)

## OAI Specification Driving factors

The OpenAPI Specification should be use-case driven. We can specify support for hypothetical use cases as we see fit, but specifications should be backed by realistic scenarios.

## Specification Change Criteria

The specification *will evolve over time*. Changes  may be made when any of the following criteria are met:

* Clarity. The current "way" something is done doesn't make sense, is complicated, or not clear.

* Consistency. A portion of the specification is not consistent with the rest, or with the industry standard terminology.

* Necessary functionality. We are missing functionality because of a certain design of the specification.

* Forward-looking designs. As usage of APIs evolves to new protocols, formats, and patterns, we should always consider what the next important functionality should be.

* Impact. A change will provide impact on a large number of use cases. We should not be forced to accommodate every use case. We should strive to make the *common* and *important* use cases both well supported and common in the definition of the OAI Spec. We cannot be edge-case driven.

## Specification Change Process

For each change in the specification we should *always* consider the following:

* Migration. Is this a construct that has a path from the [existing specification](https://github.com/OAI/OpenAPI-Specification/releases)? If so, how complicated is it to migrate to the proposed change?

* Tooling. Strive to support code generation, software interfaces, spec generation techniques, as well as other utilities. Some features may be impossible to support in different frameworks/languages. These should be documented and considered during the change approval process.

* Visualization. Can the specification change be graphically visualized somehow in a UI or other interface?

Spec changes should be approved by a majority of the committers. Approval can be given by commenting on the issue itself, for example, "Approved by @webron" however at least one formal GitHub-based  flow approval must be given. After voting criteria is met, any committer can merge the PR. No change should be approved until there is documentation for it, supplied in an accompanying PR. 

### Proposals for Specification Changes

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Tracking Process

* GitHub is the medium of record for all spec designs, use cases, and so on.

* The **human readable** document is the source of truth. If using a JSON Schema again to document the spec, it is secondary to the human documentation. The documentation should live in a *.md file, in parallel to the latest document (versions/3.0.0.md for example).

* At any given time, there would be *at most* 4 work branches. The branches would exist if work has started on them. Assuming a current version of 3.0.0:

    * main - Current stable version. No PRs would be accepted directly to modify the specification. PRs against supporting files can be accepted.

    * v3.0.1-dev - The next PATCH version of the specification. This would include non-breaking changes such as typo fixes, document fixes, wording clarifications.

    * v3.1.0 - The next MINOR version.

    * v4.0.0 - The next MAJOR version.

* The main branch shall remain the current, released OpenAPI Specification. We will describe and link the work branch(es) on the **default** README.md on main.

* Examples of how something is described *currently* vs. the proposed solution should accompany any change proposal.

* New features should be done in feature branches/forks which, upon approval, are merged into the proper work branch.

* Use labels for the workflow of specification changes. Examples of labels are proposed, housekeeping, migration-review, tooling-, needs documentation, review (candidate for upcoming TSC mtg), rejected, and needs approval. These labels must be assigned by project committers. Style is lowercase with dashes in place of spaces.

* An issue will be opened for each feature change. Embedded in the issue, or ideally linked in a file via pull-request (PR), a document about use cases should be supplied with the change.

* A PR will be used to describe the *proposed* solution and linked to the original issue.

* Not all committers will contribute to every single proposed change. There may be many open proposals at once, and multiple efforts may happen in parallel.

* When the work branch is ready and approved, the branch will be merged to main.

## Release Process

A release requires a vote on the release notes by TSC members within the voting period. Major or minor release voting periods will be announced in the Slack channel and noted on the calendar at least 6 days in advance. During this time, TSC members who have not yet voted must note their approval on the GitHub pull request for the release notes. TSC members are responsible for coordinating the actual merge to main with marketing support, if any.

* Patch-level releases require majority approval by TSC members. (Max voting period 3 days)

* Minor: requires approval by 66% of TSC members. (Max voting period 7 days)

* Major: requires approval by 66% of TSC members. (Max voting period 14 days)

## Transparency

The process should be as transparent as possible. Sometimes there will be discussions that use customer names, sensitive use cases, and so on. These must be anonymized, discussed in a private repository, or conducted offline. General discussions should happen on the GitHub issues for this project.

## Automated closure of issues Process

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Automated TDC agenda issues Process

See [CONTRIBUTING.md](CONTRIBUTING.md)

## Participation

While governance of the specification is the role of the TSC, the evolution of the specification happens through the participation of members of the developer community at large. Any person willing to contribute to the effort is welcome, and contributions may include filing or participating in issues, creating pull requests, or helping others with such activities.

## Community Roles

While these developer community roles are informal, there are many ways to get involved with the OpenAPI community, such as:

* Contributor: Includes but is not limited to any [contributor to the specification](https://github.com/OAI/OpenAPI-Specification/graphs/contributors) via an accepted pull request or who participates in issues or TSC calls.

* Implementer: any person involved in the creation or maintenance of tooling that leverages the current OpenAPI Specification

* Ambassador: represents the OpenAPI Specification to the developer community. This could be through talks at conferences or meetups, blog posts, or answering questions in places like Twitter, Stack Overflow, or the GitHub repo.

* Supporter: uses the specification and appreciates its value. 
