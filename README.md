# The OpenAPI Specification

[![Build Status](https://travis-ci.org/OAI/OpenAPI-Specification.svg?branch=master)](https://travis-ci.org/OAI/OpenAPI-Specification)

![](https://avatars3.githubusercontent.com/u/16343502?v=3&s=200)

The OpenAPI Specification is a community driven, open specification within the [Open API Initiative](https://www.openapis.org/), a Linux Foundation Collaborative Project.

The OpenAPI Specification defines a standard, language-agnostic interface description for REST APIs which allows both humans and computers to discover and understand the capabilities of the service without access to source code, additional documentation, or through network traffic inspection.  When properly defined via OpenAPI, a consumer can understand and interact with the remote service with a minimal amount of implementation logic.  Similar to what interface descriptions have done for lower-level programming, the OpenAPI Specification removes the guesswork in calling the service.

Use cases for machine-readable API interfaces include interactive documentation; code generation for documentation, client, and server; and automated test cases. OpenAPI descriptions describe APIs via YAML or JSON documents that adhere to the OpenAPI Specification.  These documents can either be produced and served statically, or be generated dynamically from your application.

The OpenAPI Specification does not require you to rewrite your existing API.  It does not require binding any software to a service--the service being described may not even be yours.  It does, however, require the capabilities of the service be described in the structure of the OpenAPI Specification.  Not all services can be described by OpenAPI--this specification is not intended to cover every possible use-case of a REST API. The OpenAPI Specification does not define a specific development process such as design-first or code-first.  It does facilitate either technique by establishing clear interactions with a REST API.

This GitHub project is the starting point for OpenAPI.
Here you will find the information you need about the OpenAPI Specification, simple examples of what it looks like,
and some general information regarding the project.

## Current Version - 3.0

The current version of the OpenAPI specification is [OpenAPI Specification 3.0](versions/3.0.md).

### Previous Versions

This repository also contains the [OpenAPI Specification 2.0](versions/2.0), which is identical to the Swagger 2.0 specification, 
as well as the Swagger 1.2 and Swagger 2.0 specifications.

Each folder in this repository, such as [examples](examples) and [schemas](schemas), should contain folders pertaining to the current and previous versions of the specification.

## See it in Action

If you just want to see it work, check out the [list of current examples](examples/v3.0).

## Tools and Libraries

Looking to see how you can create your own OpenAPI definition, present it or otherwise use it? Check out the growing
[list of 3.0 Implementations](IMPLEMENTATIONS.md).

## Participation

The current process for development of the OpenAPI Specification is described in 
[Development Guidelines](DEVELOPMENT.md).
Development of the next version of the OpenAPI Specification is guided by the [Technical Developer Community](https://www.openapis.org/participate/how-to-contribute/governance#TDC) and governed by the [TDC Contributors](CONTRIBUTORS.md).  This group of committers bring their API expertise, incorporate feedback from the community, and expand the group of committers as appropriate.  All development activity on the future specification will be performed as features and merged into this branch.  Upon release of the future specification, this branch will be merged to master.

The Open API Initiative encourages participation from individuals and companies alike. 
If you want to participate in the evolution of the OpenAPI Specification, consider taking the following actions:

* Review the [current specification](versions/3.0.md). The human-readable markdown file _is the source of truth_ for the specification.
* Review the [development](DEVELOPMENT.md) process so you understand how the spec is evolving.
* Check the [issues](https://github.com/OAI/OpenAPI-Specification/issues) and [pull requests](https://github.com/OAI/OpenAPI-Specification/pulls) to see if someone has already documented your idea or feedback on the specification. You can follow an existing conversation by adding a comment to the existing issue or PR.
* Create an issue to describe a new concern. If possible, propose a solution.

Not all feedback can be accommodated and there may be solid arguments for or against a change being appropriate for the specification.

## License

Copyright 2016, 2017 The Linux Foundation

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
