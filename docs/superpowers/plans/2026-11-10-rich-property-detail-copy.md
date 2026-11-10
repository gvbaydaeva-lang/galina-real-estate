# Rich Property Detail Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every individual ЖК page its own rich, neutral sales-oriented description without changing catalogue-card preview length.

**Architecture:** Extend the verified property content model with detail-only copy. The property-detail route renders the new content while catalogue cards continue using `description` and `highlights`.

**Tech Stack:** Next.js, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-10-rich-property-detail-copy-design.md`

## Global Constraints

- Do not change the catalogue-card preview rendering or its short content.
- Do not use the word `застройщик` in published catalogue content.
- Use only neutral claims already supported by the existing property source-backed content.

## Review Focus

- Every published property has detail-only copy.
- Detail pages do not fall back to short catalogue copy.
- Catalogue card markup remains unchanged by the new detail-only fields.
- Published text has no `застройщик` word form.
- Static pages still render for all published routes.

### Task 1: Detail-only property copy

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Produces: `VerifiedProperty.detailDescription` and `VerifiedProperty.detailHighlights` for the detail route.

- [ ] Write a failing test requiring four long detail paragraphs and five detail highlights for all 18 properties, with no `застройщик` in property copy.
- [ ] Run `./node_modules/.bin/vitest run content/catalog-cities.test.ts` and verify the new assertion fails.
- [ ] Add the detail-only fields and factual neutral copy to each property.
- [ ] Run `./node_modules/.bin/vitest run content/catalog-cities.test.ts` and verify it passes.

### Task 2: Render detail-only content

**Files:**
- Modify: `app/catalog/[city]/[property]/page.tsx`
- Modify: `app/catalog/[city]/[property]/page.test.tsx`

**Interfaces:**
- Consumes: `property.detailDescription`, `property.detailHighlights`.

- [ ] Write a failing route test proving that an individual ЖК page renders detail-only text and does not render the short catalogue-only text.
- [ ] Run `./node_modules/.bin/vitest run 'app/catalog/[city]/[property]/page.test.tsx'` and verify the assertion fails.
- [ ] Render the detail-only fields beneath the project facts using the existing semantic structure.
- [ ] Run the focused route test and the full test suite.
