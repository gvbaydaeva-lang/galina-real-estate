# Official City Catalog Sources Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a small, source-backed selection of residential complexes for Moscow, Saint Petersburg, and Krasnodar without images or unverified claims.

**Architecture:** Keep all static, auditable listing data in `content/catalog-cities.ts`. Extend the shared `PropertyCard` to render the required provenance fields and a safe external source link. The existing `CityCatalog` retains responsibility for district filtering and displays one common advisory below the result area.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-05-official-city-catalog-sources-design.md`

## Global Constraints

- Exactly five cards for Moscow, Saint Petersburg and Krasnodar; no cards for Elista.
- Every non-Elista card has a direct official-developer URL, developer, district, class, an `от … ₽` price and the 2026-11-05 verification date.
- No images, copied marketing copy, aggregators, API calls or changes to the mortgage calculator.
- Keep filtering accessible on narrow and wide viewports.

## Review Focus

- A missing official URL must fail the data test.
- A district must only show its matching cards.
- External links must be safe and labelled as official sources.
- Elista must not show a property card.
- Price copy must make its advisory nature clear.

### Task 1: Source-backed catalog data and cards

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`
- Modify: `components/property-card.tsx`
- Modify: `components/city-catalog.tsx`
- Modify: `components/city-catalog.test.tsx`
- Modify: `app/globals.css`

- [ ] Write assertions for city counts, required provenance fields, no card images and Elista's empty state.
- [ ] Run the targeted test and observe the expected failure because source fields and cards do not yet exist.
- [ ] Add only the verified static records and minimal UI needed for their display.
- [ ] Run targeted tests, full Vitest, lint, static build and `git diff --check`.
- [ ] Use a browser at desktop and phone widths to verify filtering, cards and outgoing links.
- [ ] Commit the source-backed catalog, push the isolated branch, and create a PR without merging.
