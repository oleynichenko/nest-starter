---
name: plan-feature
description: >-
  Plans and implements the feature described in ASSIGNMENT.md using the Note
  module as the pattern. Use when the user mentions ASSIGNMENT.md, asks to
  plan a feature, or wants a plan before coding.
---

# Plan a feature

## Before planning

Read ASSIGNMENT.md and .cursor/rules/project.mdc. Read `src/modules/note` when that sample module is still present.

If the Feature section of ASSIGNMENT.md is empty, stop and ask the user to fill it in. Do not invent a feature.

## Plan

Write the plan. Do not edit ASSIGNMENT.md. Do not change application code yet.

The plan names:

- the module to add and, when Note is still present, the Note files it copies
- SQL changes and the migration in `db/migrations`
- endpoints, DTOs, and status codes
- tests
- assumptions for anything the feature request leaves open
- removal of the sample Note module and a migration that drops the `notes` table, when Note is still present

Ask a question only when the feature cannot be built without the answer. Otherwise choose the smaller option and list it under Assumptions.


## After the plan is accepted

Implement only that plan.

Follow `.cursor/rules/project.mdc`. When `src/modules/note` is still present, copy that sample, then remove the module and add a migration that drops the `notes` table.

Do not add dependencies or new layers unless the feature request requires them.
Do not change a test so that broken behavior passes.
Leave ASSIGNMENT.md unchanged unless the user asks to update it.
