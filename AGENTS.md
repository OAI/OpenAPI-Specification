# AGENTS.md

This document guides coding agents and AI-assisted contributors working in the [OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) repository.

It combines the repository's documented contribution and validation workflow with an additional OpenAPI Initiative AI policy constraint supplied for this task.

## Purpose

Use this repository carefully. The OpenAPI Specification (OAS) is standards work, not ordinary product documentation, so contributions must be precise, context-aware, and inexpensive for volunteer maintainers to review.

## Operating principles

- Prefer narrow, well-justified edits over broad rewrites.
- Keep maintainers' review effort lower than the effort used to prepare the change.
- Do not invent standards intent, governance outcomes, consensus, or release targets.
- Treat AI output as draft material that a human must understand, verify, and take responsibility for.

## Repository layout

- Active specification development happens in `src/oas.md` on versioned development branches, not as routine edits on `main`.
- General repository documentation, scripts, and automation typically belong on `main`.
- Published specification artifacts under `versions/` are not edited directly except in rare maintainer-approved external-link repair cases.
- The repository includes markdown linting and style conventions that should be preserved when editing prose.

## Branch selection

Use this routing model before editing files.

| Request type | Primary files | Target branch |
| --- | --- | --- |
| Active specification text | `src/oas.md` | Earliest relevant active `vX.Y-dev` branch |
| Schema changes tied to active spec work | Relevant schema files | Same active `vX.Y-dev` branch |
| Repository docs, scripts, workflow files, guidance | Non-spec support files on `main` | `main` |
| Historical published specification text | `versions/` | Do not edit directly except approved link-fix exceptions |

## When to use discussion, issue, proposal, or PR

- Use a discussion for exploratory ideas, early feedback, unclear requirements, or broad design questions.
- Use an issue for a specific problem or a concrete, scoped change request.
- Use the proposal process for substantial normative changes that need structured review and wider consensus.
- Use a pull request only when the change is concrete, justified, and targeted to the correct branch.

## AI policy constraints

The following behavioral rules apply in addition to normal repository rules.

### Permitted AI use

- AI may assist with drafting, editing, consistency checking, outlining, or exploring alternatives.
- AI may help prepare candidate wording, implementation notes, or validation checklists.
- AI-assisted output must be treated as tentative until a human has reviewed it line by line.

### Required human accountability

- The human submitter is responsible for every statement, edit, and design implication in the final contribution.
- Every claim must be explainable without relying on "the AI suggested it" as justification.
- If the human operator cannot defend a generated section, remove or rewrite it before submission.

### Disclosure

- If AI was used beyond autocomplete or spellcheck, disclose that use in the pull request or issue description.
- Keep disclosure short and factual, describing how AI helped rather than delegating responsibility to the tool.

### Human-only channels

- Do not use AI to generate issue comments, discussion replies, or pull request descriptions for direct posting.
- Do not use AI to summarize discussion content and then post the summary back into the discussion.
- Discussions are part of the project's design record and should reflect genuine human reasoning.

### Quality bar

Do not submit AI-assisted work unless it is all of the following:

- accurate
- concise
- non-repetitive
- grounded in current repository context
- clearly understood by the human submitter
- cheaper for maintainers to review than it was to produce

Low-effort, inaccurate, overly verbose, or generic contributions should be discarded rather than submitted.

## Editing rules

### Spec changes

- Edit only the relevant `src/oas.md` on the appropriate active development branch for normal specification work.
- Keep patch-line changes editorial or clarifying only; do not introduce schema requirements in patch releases.
- For minor or major work, include related schema updates when the specification change requires them.
- Support changes with realistic use cases and migration awareness, not hypothetical novelty alone.

### Published versions

- Do not rewrite `versions/*.md` as part of routine work.
- If asked to modify a published version, redirect the change to the active development branch unless maintainers explicitly approve a narrow exception.

### Prose and formatting

- Follow existing repository writing patterns and the style guide when editing specification text or contributor docs.
- Preserve markdown formatting compatible with the repository's markdownlint configuration.
- Avoid unnecessary reflow, reformatting, or terminology churn.

## Validation

For changes that affect `src/oas.md`:

1. Run `npm install` from the repository root.
2. Run `npm run build-src`, which also performs markdown validation first.
3. Review the generated preview at `deploy-preview/oas.html` in a browser.
4. On Windows, prefer Git Bash or WSL for the repository scripts.

## Pull request expectations

- Work from a fork and submit changes through a pull request.
- Prefer opening an issue before substantial implementation work unless the change is obviously small.
- Use Draft PRs for incomplete or dependent work.
- Keep each PR focused on a single logical change set.
- Expect one Maintainer or Technical Steering Committee (TSC) approval for all PRs, and two TSC approvals for PRs that change `src/oas.md`.
- If AI materially assisted the contribution, ensure disclosure is present, but the final PR description itself should be authored by a human under the supplied AI policy.

## Safe agent behavior

Agents should:

- make the smallest complete change that addresses the request
- explain branch choice and file choice clearly in handoff notes
- surface uncertainty early when the correct release line or process is unclear
- produce outputs that humans can readily review, trim, and restate in their own words
- prefer concrete diffs, checklists, and validation notes over persuasive prose

Agents should not:

- generate content meant for direct posting into discussions, issue threads, or PR descriptions
- create filler text or "summary" comments that add no new information
- speculate about approval status or community consensus
- edit `versions/` during routine contribution work
- hide uncertainty behind polished wording

## Suggested workflow

1. Classify the request as spec text, schema, docs, automation, or proposal-related work.
2. Decide whether the task belongs in a discussion, issue, proposal, or PR.
3. Select the correct branch: `main` for repository-wide support files, earliest relevant active `vX.Y-dev` for specification and schema work.
4. Draft the smallest complete change.
5. Check the draft against the AI quality bar in this file.
6. Run validation for any `src/oas.md` changes and inspect the generated preview.
7. Hand off for human review, disclosure, and human-authored submission text.

## Minimal AI disclosure template

```md
AI assistance disclosure: AI was used to help draft or edit parts of this change and to check consistency. The final content was reviewed by the submitter, who can explain and defend all resulting changes.
```

## Stop

Pause and ask for human guidance when:

- the request conflicts with branch strategy or contribution process rules
- the correct target branch is ambiguous
- the task is to generate a discussion reply, issue comment, or PR description for direct posting
