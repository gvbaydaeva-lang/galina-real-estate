# Verified City Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add district-filtered, source-linked sample project cards for Moscow, Saint Petersburg, and Krasnodar while keeping Elista and lead collection honest.

**Architecture:** `content/catalog-cities.ts` is the single source for city filters and reviewed project snapshots. A client `CityCatalog` owns one page's filter state, and `PropertyCard` renders only factual fields with an external official-source link.

**Tech Stack:** Next.js, React, TypeScript, Vitest, existing CSS.

**Spec:** `docs/superpowers/specs/2026-11-05-verified-city-catalog-design.md`

## Global Constraints

- Price is an orienting `от` value with a verification date, not an offer or availability promise.
- Every non-empty project card must have a direct official source URL and a review date.
- Do not copy or hotlink photographs, renderings, plans, or promotional text.
- Do not collect or send personal data until a verified receiving channel exists.

## Review Focus

- Elista must stay empty rather than inherit projects from another city.
- An unknown district must show an honest no-results message.
- Every card must display its official source and date of review.
- A price must never be rendered as a guaranteed final price.
- Switching city must reset the district selection.

### Task 1: Typed source-linked catalog data

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

- [ ] Write failing tests for four cities, six source-linked cards in Moscow/SPB/Krasnodar, no Elista cards, and exact district filtering.
- [ ] Run `npx vitest run content/catalog-cities.test.ts` and observe the expected failure.
- [ ] Add typed city/project data, `filterProperties`, and a source-checkable review date.
- [ ] Re-run the focused test and confirm it passes.

### Task 2: Reusable filtered catalog view

**Files:**
- Create: `components/city-catalog.tsx`
- Create: `components/property-card.tsx`
- Create: `components/city-catalog.test.tsx`
- Modify: `vitest.config.ts`
- Modify: `app/catalog/[city]/page.tsx`
- Modify: `app/globals.css`

- [ ] Write failing component tests for the source notice, cards, external links and empty Elista state.
- [ ] Run `npx vitest run components/city-catalog.test.tsx` and observe the expected failure.
- [ ] Implement only the tested filter, card and source-notice behaviour; preserve the mortgage calculator.
- [ ] Run the focused component test and confirm it passes.

### Task 3: Full verification

**Files:**
- Modify: only files from Tasks 1 and 2 if required by tests.

- [ ] Run `npx vitest run`, `npx tsc --noEmit --incremental false`, `npm run lint`, `NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`, and `git diff --check`.
- [ ] Manually inspect all four city routes at a narrow width; do not submit any form.
- [ ] Commit only these catalog files and request independent review before creating a pull request.
