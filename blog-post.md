The OpenAPI Initiative is pleased to announce a patch release of the 3.0 and 3.1 OpenAPI specifications.
In patch releases, no changes are made to the way that APIs are described, but the specification wording itself contains many updates, expansions, and clarifications where previously the points may have been unclear or not covered.
Tooling that supports 3.1.0 is expected to work without problems on 3.1.1 since the patch releases don't contain structure changes.

Think of this release as the "Words Mean Things" edition.

## Released versions

3.1.1 is the newest and recommended version of the OpenAPI Specification.
If you are starting a new project today, or have the option to upgrade, this is your target version.

3.0.4 is an additional release on the 3.0 branch to incorporate the improved wording to the 3.0 branch of the specification where the changes applied there.
It is expected that 3.0.4 will be the final release in the 3.0.x line.

## Summary of changes

The releases include as many explanations, clarifications and expanded sections as we could manage, driven mostly by the questions and comments we get from the users and tools creators of the OpenAPI Specification.
The highlights include a lot of new content to expand on existing content and reduce ambiguity.
The sections regarding parameters, encoding and schemas have had significant updates and expansion to cover more cases.
You will also find some security clarifications and a whole new "Security Considerations" section has been added.

Look out for additional appendices with some great explanations that support the additions to the main body of the specification.
We added a great collection of new content sections and appendix entries about handling data including data types, serialization and encoding.
In 3.1, there is more information about parsing documents and resolving references since the adoption of full JSON Schema compatibility.

The updates also strayed into distinctly "meta" areas, so we've also got:

- examples of using the `example(s)` fields
- reference to a JSON Schema to represent the OpenAPI Specification schema
- we have clearly defined when something was undefined or implementation dependent

## Beyond the specification

In addition to the main specifications that you can always find at https://spec.openapis.org, there are a number of other resources that you may find helpful:

- OpenAPI's documentation and examples is available at https://learn.openapis.org.
  This site holds all the examples used in the main OpenAPI specification, and much more additional information besides.
- A [non-authoritative JSON Schema representation of the OpenAPI specification](https://spec.openapis.org/#non-normative-json-schemas) is available.
  This representation should not require changes between 3.1.0 and 3.1.1 since patch releases don't change the structure.
- The [formats registry](https://spec.openapis.org/registry/format/index.html) and the [extensions registry](https://spec.openapis.org/registry/extension/index.html) list some common patterns in specification use.

All of these resources are now linked from the relevant parts of the OpenAPI Specification.

We also updated the tooling that publishes the specification, changed the GitHub repository structure, cleaned up and reformatted all the Markdown content, and improved our workflow automation.
Which doesn't affect the specification but does make it a nicer place to be and hopefully makes the next release easier too.

## Upgrade process

Most users and tool vendors should have no action to take, since the patch releases contain only wording changes or clarifications and no structure changes.
That said, especially if you publish OpenAPI tools, take a look at the release notes on GitHub to check that there are no surprises!

## Acknowledgements

So many contributors have contributed to this release, it's not possible to name them all.
If you suggested an idea, joined our regular calls to discuss the changes, opened or reviewed a pull request, or participated in any of the discussions about the changes, then we thank you!
We had a LOT of help, and the new releases are very much improved for it (also the previous release was quite some time ago, a lot of people added to the project in the meantime).

Particular thanks goes to the Technical Steering Committee members who teamed up and shepherded the whole thing through, and to Henry Andrews whose counsel and hands-on help were a very welcome addition to the process.

## Get involved

There are lots of ways to get involved with OpenAPI, and we like to hear from everyone who uses OpenAPI (or wants to)!

- Start with [the OpenAPI Initiative website](https://openapis.org) to find out more about all our activities.
- Your organization can [become an OpenAPI Initiative member](https://www.openapis.org/membership/join).
- All the standards and resources are developed in the open on GitHub.
  Try one of these projects [OpenAPI specification](https://github.com/OAI/OpenAPI-Specification), the new [Arazzo specification](https://github.com/OAI/Arazzo-Specification), the upcoming [Overlay specification](https://github.com/OAI/Overlay-Specification), or the [learn.openapis.org site](https://github.com/OAI/learn.openapis.org).
  All the projects have open issues/discussions and welcome new contributors.
- Join one of our [regular open meetings](https://www.openapis.org/calendar) to find out what's coming up and to get involved.
- We have a Slack group that you can also [get an invitation to join](https://communityinviter.com/apps/open-api/openapi).

