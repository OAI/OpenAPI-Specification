---
title: Overlay Specification
description: Overlay Specification
layout: default
---

# Overlay Specification

## Specification Versions

{% include specification-version-list.md specification="overlay" %}

## Schema Iterations

_Note that while schemas can catch many errors, they are not guaranteed to catch all specification violations.  In the event of a disagreement between the schemas and the corresponding specification text, the specification text is presumed to be correct._

A minor release (e.g. v1.0) has one or more published schemas, identified with the release 1.0 and a revision date like 2024-10-22.  All schemas for a given minor release apply to all patch releases within that minor release (e.g. 1.0.1, 1.0.0, etc.).  The dates are purely a way to uniquely identify the revision, and are not intended to be correlated with patch release publication dates.  The latest date within a minor release is always the most correct schema for all patch releases, and previous revisions are obsolete.

{% include schema-iteration-list.md specification="overlay" %}
