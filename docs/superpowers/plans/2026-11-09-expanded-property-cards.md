# Expanded Property Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-backed, reader-friendly descriptions and highlights to every existing ЖК card while hiding the visible verification date.

**Architecture:** `content/catalog-cities.ts` remains the single content source. It gains structured text fields per project; `PropertyCard` renders those fields and no longer renders `verifiedAt`. Existing catalog filtering remains untouched, while CSS switches the dense long-form card layout to one column.

**Tech Stack:** Next.js/Vinext, React, TypeScript, Vitest, CSS.

**Spec:** `docs/superpowers/specs/2026-11-09-expanded-property-cards-design.md`

## Global Constraints

- Use only paraphrased facts directly supported by each entry in `catalogPropertySources`.
- Do not publish prices, payment terms, contacts, promises of investment return, or unverified details.
- Keep official source URLs out of browser-rendered content.
- Preserve district filtering, existing project images and their honest fallbacks.
- Keep `verifiedAt` internal but render no verification-date text.

## Review Focus

- A card with a source-backed description and highlights must not display its internal date; Task 2 test.
- Every one of the 18 populated cards must have two or three non-empty paragraphs and three to five highlights; Task 1 test.
- Source URLs must not appear as anchors or visible text; existing `CityCatalog` test remains green in Task 2.
- Narrow screens must retain a single readable card column; Task 3 CSS review during build.
- Existing district selection must still return its exact matching card; existing content test remains green in Task 1.

---

### Task 1: Add structured source-backed content

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Produces: `VerifiedProperty.description: readonly string[]` and `VerifiedProperty.highlights: readonly string[]` for `PropertyCard`.

- [ ] **Step 1: Write the failing content-shape test**

Assert that all non-Elista properties have 2–3 non-empty `description` paragraphs, 3–5 non-empty `highlights`, and retain an HTTPS source in `catalogPropertySources`.

- [ ] **Step 2: Run the focused content test to verify it fails**

Run: `./node_modules/.bin/vitest run content/catalog-cities.test.ts`

Expected: FAIL because the content fields are absent.

- [ ] **Step 3: Extend `VerifiedProperty` and populate all projects**

Research every direct official project page from `catalogPropertySources`, then add paraphrased two–three paragraph descriptions and three–five factual highlights in `content/catalog-cities.ts`.

- [ ] **Step 4: Run the focused content test to verify it passes**

Run: `./node_modules/.bin/vitest run content/catalog-cities.test.ts`

Expected: PASS.

### Task 2: Render expanded card content without a visible date

**Files:**
- Modify: `components/property-card.tsx`
- Modify: `components/city-catalog.test.tsx`

**Interfaces:**
- Consumes: `VerifiedProperty.description` and `VerifiedProperty.highlights` from Task 1.
- Produces: card HTML with `.property-card-description` and `.property-card-highlights` but no `verifiedAt` output.

- [ ] **Step 1: Write the failing rendering test**

Pass a card with two description paragraphs, three highlights and `verifiedAt: "2026-11-08"`; assert the text appears, the list has three items, and the date does not appear.

- [ ] **Step 2: Run the focused component test to verify it fails**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`

Expected: FAIL because descriptions and highlights are not rendered and the date is still rendered.

- [ ] **Step 3: Update `PropertyCard`**

Render descriptions and highlights after the heading and remove `.property-card-verified` entirely. Keep image/fallback and optional legacy price/characteristics behavior unchanged.

- [ ] **Step 4: Run the focused component test to verify it passes**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`

Expected: PASS.

### Task 3: Make expanded cards readable

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `.property-card-description` and `.property-card-highlights` from Task 2.
- Produces: readable one-column card list on desktop and mobile without changes to filter controls.

- [ ] **Step 1: Add minimal styles for paragraphs and highlights**

Set an appropriate text rhythm, visual separation and list treatment using existing colour tokens; change `.property-grid` to one column.

- [ ] **Step 2: Run complete verification**

Run: `./node_modules/.bin/vitest run && npm run lint && NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build && git diff --check`

Expected: all commands exit with code 0.
