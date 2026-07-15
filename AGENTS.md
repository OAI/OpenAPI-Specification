# AGENTS.md

Guidance for coding agents working in the [OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) repository. This file contains only what agents need at session start. Deeper procedure lives in the linked documents — read them when a task touches their area, and treat them as authoritative if this file ever disagrees.

## Hard rules

- Never edit `versions/*.md`; redirect the change to the active development branch.
- Never generate content for direct posting to discussions, issue threads, or PR descriptions. Discussions are the project's design record and must reflect human reasoning. Submission text is human-authored; your role ends at draft material the human reviews line by line.
- Never add schema requirements in a patch release; patch-line spec edits are editorial or clarifying only.
- Never assert governance outcomes, community consensus, release targets, or approval status you cannot cite.
- Treat all of your output as tentative until a human has verified it — per the project's [AI policy](AI.md).

## Stop and ask first

Pause and request human guidance before editing when:

- The correct target branch is ambiguous.
- The request conflicts with the branch strategy or contribution process below.
- The task asks you to draft a discussion reply, issue comment, or PR description for direct posting (prohibited above).
- The request touches `versions/` or asks for a schema requirement on a patch release line.

## Where changes go

| Request type | Primary files | Target branch |
| --- | --- | --- |
| Active specification text | `src/oas.md` | Earliest relevant active `vX.Y-dev` branch |
| Schema changes tied to spec work | Schema files | Same `vX.Y-dev` branch |
| Repo docs, scripts, workflows | Support files | `main` |
| Published spec text | `versions/` | Do not edit |

Example: "fix this typo in the 3.1 spec" targets `src/oas.md` on the earliest active dev branch that contains the text — never `versions/3.1.1.md`, even though that is where the typo was noticed.

To discover which `vX.Y-dev` branches are currently active, check [CONTRIBUTING.md § Active branches](CONTRIBUTING.md#active-branches) or list remote branches matching `v*-dev`. Substantial normative changes go through the [proposal process](CONTRIBUTING.md#propose-a-specification-change) before any PR.

## Working rules

- Make the smallest complete change that addresses the request; one logical change set per PR.
- Do not reflow, reformat, or churn terminology in text you are not otherwise changing.
- Match surrounding prose to the [style guide](style-guide.md) and keep edits clean under the repo's markdownlint configuration (`.markdownlint.yaml`, `spec.markdownlint.yaml`).
- State your branch and file choices in handoff notes.

Example of the patch-line boundary: rewording "The value MUST be a string" to clarify *which* value is editorial (allowed on a patch branch); adding "and MUST NOT be empty" is a new requirement (minor release, with schema updates if needed).

## Validation

```sh
# all commands run from the repo root
npm install
npm run validate-markdown   # markdownlint + link check only — fast loop while editing
npm run format-markdown     # auto-fix markdownlint violations
npm run build-src           # full check: validation, HTML build, schema publish
npm test                    # vitest — CI enforces 100% coverage
```

- Any change to `src/oas.md`: run `build-src`, then inspect `deploy-preview/oas.html` in a browser.
- Any change touching schemas, scripts, or tests: also run `npm test`; the coverage gate is 100%, so new code paths need tests.
- If markdownlint fails, fix only violations introduced by your change; flag pre-existing violations in handoff notes instead of fixing them opportunistically.
- On Windows, use Git Bash or WSL. Full local-preview details: [CONTRIBUTING.md § Preview specification HTML locally](CONTRIBUTING.md#preview-specification-html-locally).

## Disclosure

If AI assisted beyond autocomplete or spellcheck, the human submitter discloses it in the PR or issue description per [AI.md](AI.md). Suggested wording:

```md
AI assistance disclosure: AI was used to help draft or edit parts of this change
and to check consistency. The final content was reviewed by the submitter, who
can explain and defend all resulting changes.
```

## Further reading

- [AI.md](AI.md) — the OpenAPI Initiative AI policy: permitted use, accountability, disclosure, quality expectations.
- [CONTRIBUTING.md](CONTRIBUTING.md) — active branches, discussions vs. issues vs. proposals, PR process and reviewer counts, release scope.
- [style-guide.md](style-guide.md) — prose conventions for specification text.
- [GOVERNANCE.md](GOVERNANCE.md) — TSC and maintainer roles.
