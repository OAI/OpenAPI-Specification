# Contributing to the OpenAPI Specification

***Work in progress!**  Each section links to issues that are relevant to fill out the rest of this document.*

We are currently working on [defining and documenting our new processes](https://github.com/orgs/OAI/projects/5).  Information in this document is up-to-date.  Older _(and sometimes now inaccurate)_ documentation can be found in [DEVELOPMENT.md](DEVELOPMENT.md), which will be removed when everything is updated and documented here.

## Essential Policies

This section serves as a quick guide while we work on the full updated documentation.

If in doubt about a policy, please [ask on our Slack](https://communityinviter.com/apps/open-api/openapi) before opening a PR.

### No changes to published specifications

No changes, ***no matter how trivial***, are ever made to the contents of published specifications.  The only potential changes to those documents are updates to link URLs _if and only if_ the targeted document is moved by a 3rd party.  Other changes to link URLs are not allowed.

### Current branches and documents open to change

The first PR for a change should be against the oldest release line to which it applies.  Changes can then be forward-ported as appropriate.

The current (31 July 2024) active releases are:

| Version | Branch | File | Notes |
| ------- | ------ | ---- | ----- |
| 3.0.4 | `v3.0.4-dev` | `versions/3.0.4.md` | Soon to be published |
| 3.1.1 | `v3.1.1-dev` | `versions/3.1.1.md` | Soon to be published |
| 3.2.0 | `v3.2.0-dev` | `versions/3.2.0.md` | Planned for late 2024 |
| 4.0.0 | [OAI/sig-moonwalk](https://github.com/OAI/sig-moonwalk) | [discussions only](https://github.com/OAI/sig-moonwalk/discussions) | TBD, some proposals to be backported and published in 3.2.0 |

### Changing the schemas

Schemas are only changed _after_ the specification is changed.  Changes are made on the `main` branch, and should be made to the YAML version _only_.  The JSON version will be generated automatically.

## Authoritative source of truth

* Issue #3576: [What is our authoritative spec URL and how do people find it?](https://github.com/OAI/OpenAPI-Specification/issues/3576)

## Style Guide

Contributions to this repository should follow the style guide as described in this section.

### Markdown

Markdown files in this project should follow the style enforced by the [markdownlint tool][],
as configured by the `.markdownlint.json` file in the root of the project.

The following additional rules should be followed but currently are not enforced by tooling:

1. The first mention of a normative reference or an OAS-defined Object in a (sub)*section is a link, additional mentions are not
2. OAS-defined Foo Bar Objects are written in this style, and are not monospaced
3. "example" instead of "sample" - this spec is not about statistics
4. Use "OpenAPI Object" instead of "root"
5. Fixed fields are monospaced
6. Field values are monospaced in JSON notation: true, false, null, "header", ...
7. A combination of fixed field name with example value uses JS notation: in: "header", combining rules 5 and 6
8. An exception to 5-7 is colloquial use, for example "values of type array or object" - "type" is not monospaced, so the monospaced values aren't enclosed in double quotes.
9. "attribute" is only used in the XML context and means "XML attribute"
10. Use Oxford commas, avoid Shatner commas

## Release Process and Scope

* Issue #3528: [3.x.y patch release approach](https://github.com/OAI/OpenAPI-Specification/issues/3528)
* Issue #3529: [3.x minor release approach](https://github.com/OAI/OpenAPI-Specification/issues/3529)
* Issue #3715: [Define and document our schema publishing process](https://github.com/OAI/OpenAPI-Specification/issues/3715)
* Issue #3785: [Style guide / release checklist for the specification](https://github.com/OAI/OpenAPI-Specification/issues/3785)

## Branching and Versioning

* Issue #3677: [Define and document branch strategy for the spec, both development and publishing](https://github.com/OAI/OpenAPI-Specification/issues/3677)

## Proposals for Specification Changes

As an organisation, we're open to changes, and these can be proposed by anyone.
The specification is very widely adopted, and there is an appropriately high bar for wide appeal and due scrutiny as a result.
We do not accept changes lightly (but we will consider any that we can).

Small changes are welcome as pull requests.

Bigger changes require a more formal process.

1. Start a [discussion](https://github.com/OAI/OpenAPI-Specification/discussions) of type "Enhancements".
   The discussion entry must include some use cases, your proposed solution and the alternatives you have considered.
   If there is engagement and support for the proposal over time, then it can be considered as a candidate to move to the next stage.

2. It really helps to see the proposed change in action.
   Start using it as a `x-*` extension if that's appropriate, or try to bring other evidence of your proposed solution being adopted.

3. If you are adding support for something from another specification (such as OAuth), please point to implementations of that
   specification so that we can understand how, and to what degree, it is being used.

4. If the suggested change has good support, you will be asked to create a formal proposal.
   Use the [template in the proposals directory](https://github.com/OAI/OpenAPI-Specification/tree/main/proposals), copy it to a new file, and complete it.
   Once you the document is ready, open a pull request on the main branch.

5. The proposal will be more closely reviewed and commented on or amended until it is either rejected or accepted.
   At that point, the proposal is merged into the `main` branch and a pull request is opened to add the feature to the appropriate `dev` version of the specification.

Questions are welcome on the process at any time. Use the discussions feature or find us in Slack.

## Working in GitHub

* Issue #3847: [Document milestone usage in DEVELOPMENT.md](https://github.com/OAI/OpenAPI-Specification/issues/3847)
* Issue #3848: [Define and add new process labels and document general label usage in DEVELOPMENT.md](https://github.com/OAI/OpenAPI-Specification/issues/3848)

### Roles and Permissions

* Issue #3582: [TOB info needs to be updated](https://github.com/OAI/OpenAPI-Specification/issues/3482)
* Issue #3523: [Define triage role criteria and process](https://github.com/OAI/OpenAPI-Specification/issues/3523)
* Issue #3524: [Define the maintainer role criteria and process](https://github.com/OAI/OpenAPI-Specification/issues/3524)

### Projects

The OpenAPI Initiative uses GitHub Projects to manage work _outside_ of the specification development process.  There are currently two active projects:

* [Contributor Guidance](https://github.com/orgs/OAI/projects/5/views/1)
* [Automation & Infrastructure](https://github.com/orgs/OAI/projects/4/views/1)

### Discussions

We are beginning (as of mid-2024) to use GitHub [discussions](https://github.com/OAI/OpenAPI-Specification/discussions?discussions_q=is%3Aopen) for open-ended topics such as major enhancements.

* Issue #3518: [Define criteria for filing/closing issues vs discussions](https://github.com/OAI/OpenAPI-Specification/issues/3518)

### Issues

As of mid-2024, we prefer to use issues for topics that have a clear associated action.  However, many existing issues are more open-ended, as they predate GitHub's discussions features.

* Issue #3518: [Define criteria for filing/closing issues vs discussions](https://github.com/OAI/OpenAPI-Specification/issues/3518)

### Automated closure of issues Process

In an effort to keep the list of issues up to date and easier to navigate through, issues get closed automatically when they become inactive.

This process makes use of the following labels:

* `Needs author feedback`: the issue has been replied to by the triage team and is awaiting a follow up from the issue's author. This label needs to be added manually by people doing triage/experts whenever they reply. It's removed automatically by the workflow.
* `No recent activity`: the issue hasn't received a reply from its author within the last 10 days since `Needs author feedback` was added and will be closed within 28 days if the author doesn't follow up. This label is added/removed automatically by the workflow.
* `Needs attention`: The issue's author has replied since the `Needs author feedback` label was set and the triage team will reply as soon as possible. This label needs to be removed manually by people doing triage/experts whenever they reply. It's added automatically by the workflow.

### Automated TDC agenda issues Process

An issue is opened every week, 7 days in advance, for the Technical Developer Community (TDC), it provides the information to connect the meeting, and serves as a placeholder to build the agenda for the meeting. Anyone is welcome to attend the meeting, or to add items to the agenda as long as they plan on attending to present the item. These issues are also automatically pinned for visibility and labeled with "Housekeeping".

Ten (10) days after the meeting date is passed (date in the title of the issue), it gets closed and unpinned automatically.

## Pull Requests

* Issue #3581: [Who and how many people need to sign-off on a PR, exactly?](https://github.com/OAI/OpenAPI-Specification/issues/3581)
* Issue #3802: [Define a policy using draft PRs when waiting on specific approvals](https://github.com/OAI/OpenAPI-Specification/issues/3802)

## Updating the Registries

* Issue #3598: [Minimum criteria for Namespace Registry](https://github.com/OAI/OpenAPI-Specification/issues/3598)
* Issue #3899: [Expert review criteria for registries (How exactly does x-twitter work?)](https://github.com/OAI/OpenAPI-Specification/issues/3899)
