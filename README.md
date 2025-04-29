# The OpenAPI Specification

![Build Status](https://github.com/OAI/OpenAPI-Specification/workflows/validate-markdown/badge.svg) [![Issue triagers](https://www.codetriage.com/oai/openapi-specification/badges/users.svg)](https://www.codetriage.com/oai/openapi-specification)

![OpenAPI logo](https://avatars3.githubusercontent.com/u/16343502?v=3&s=200)


The OpenAPI Specification is a community-driven open specification within the [OpenAPI Initiative](https://www.openapis.org/), a Linux Foundation Collaborative Project.

The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for HTTP APIs. This allows both humans and computers to discover and understand the capabilities of a service without requiring access to source code, additional documentation, or inspection of network traffic. When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic. Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes guesswork in calling a service.

Use cases for machine-readable API definition documents include, but are not limited to: interactive documentation; code generation for documentation, clients, and servers; and automation of test cases. OpenAPI documents describe API services and are represented in YAML or JSON formats. These documents may be produced and served statically or generated dynamically from an application.

The OpenAPI Specification does not require rewriting existing APIs. It does not require binding any software to a service – the described service may not even be owned by the creator of its description. It does, however, require that the service's capabilities be described in the structure of the OpenAPI Specification. Not all services can be described by OpenAPI – this specification is not intended to cover every possible style of HTTP APIs, but does include support for [REST APIs](https://en.wikipedia.org/wiki/Representational_state_transfer). The OpenAPI Specification does not mandate a specific development process such as design-first or code-first. It does facilitate either technique by establishing clear interactions with an HTTP API.

This GitHub project is the starting point for OpenAPI. Here you will find the information you need about the OpenAPI Specification, simple examples of what it looks like, and some general information regarding the project.

## Versions

This repository contains [the Markdown sources](versions) for [all published OpenAPI Specification versions](https://spec.openapis.org/). For release notes and release candidate versions, refer to the [releases page](releases).

## See It in Action

If you just want to see it work, check out the [list of current examples](https://learn.openapis.org/examples/).

## Tools and Libraries

Looking to see how you can create your own OpenAPI definition, present it, or otherwise use it? Check out the growing
[list of implementations](IMPLEMENTATIONS.md).

## Participation

The current process for developing the OpenAPI Specification is described in
the [Contributing Guidelines](CONTRIBUTING.md).

Developing the next version of the OpenAPI Specification is guided by the [Technical Steering Committee (TSC)](https://www.openapis.org/participate/how-to-contribute/governance#TDC). This group of committers bring their API expertise, incorporate feedback from the community, and expand the group of committers as appropriate. All development activity on the future specification will be performed as features and merged into this branch. Upon release of the future specification, this branch will be merged to `main`.

The TSC holds weekly web conferences to review open pull requests and discuss open issues related to the evolving OpenAPI Specification. Participation in weekly calls and scheduled working sessions is open to the community. You can view the entire OpenAPI [technical meeting calendar](https://calendar.google.com/calendar/u/0/embed?src=c_fue82vsncog6ahhjvuokjo8qsk@group.calendar.google.com) online.

The OpenAPI Initiative encourages participation from individuals and companies alike. If you want to participate in the evolution of the OpenAPI Specification, consider taking the following actions:

* Review the specification [markdown sources](versions) and [authoritative _source-of-truth_ HTML renderings](https://spec.openapis.org/), including full credits and citations.
* Review the [contributing](CONTRIBUTING.md) process so you understand how the spec is evolving.
* Check the [discussions](https://github.com/OAI/OpenAPI-Specification/discussions), [issues](https://github.com/OAI/OpenAPI-Specification/issues) and [pull requests](https://github.com/OAI/OpenAPI-Specification/pulls) to see if someone has already documented your idea or feedback on the specification. You can follow an existing conversation by subscribing to the existing issue or PR.
* Subscribe to an open issue a day (or a week) in your inbox via [CodeTriage.com](https://www.codetriage.com/oai/openapi-specification).
* Create a discussion to describe a new concern, ideally with clear explanations of related use cases.

Not all feedback can be accommodated, and there may be solid arguments for or against a change being appropriate for the specification.

## Licensing

See: [License (Apache-2.0)](https://github.com/OAI/OpenAPI-Specification/blob/main/LICENSE)


