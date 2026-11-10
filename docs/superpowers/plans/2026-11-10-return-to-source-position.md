# Return to Source Position Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Return from a ЖК detail page to the originating city-catalog card and preserve its district filter.

**Architecture:** `PropertyCard` will emit an anchored return URL for its city catalog. The detail route will accept only that same-city return URL and give it to `BackNavigation`. `CityCatalog` will initialize its district selection from the URL so the target card remains present when the anchor resolves.

**Tech Stack:** Next.js, React, TypeScript, Vitest, static GitHub Pages export.

**Spec:** `docs/superpowers/specs/2026-11-10-return-to-source-position-design.md`

## Global Constraints

- Change only catalog-card return navigation; do not alter texts, catalog data, visual design, or unrelated routes.
- Preserve GitHub Pages base-path handling through the existing `SiteLink` component.
- Use test-first development and keep direct detail URLs working.

## Review Focus

- A selected district must still be selected after returning and must contain the target card.
- An invalid return target must fall back to the corresponding city catalog, never an external URL.
- A direct detail-page visit must keep the current catalog-top fallback.
- The position marker must be stable and unique for every property card.

---

### Task 1: Encode the catalog source in property-card links

**Files:**
- Modify: `components/property-card.tsx`
- Modify: `components/city-catalog.tsx`
- Test: `components/city-catalog.test.tsx`

**Interfaces:**
- Produces: property links with a same-city `returnTo` value and stable `property-<id>` marker.

- [ ] **Step 1: Write failing component tests**

Assert that a card link includes the property anchor and that a catalog initialized from the return query restores its district.

- [ ] **Step 2: Run the component test to verify it fails**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`
Expected: FAIL because return location support does not exist.

- [ ] **Step 3: Implement the smallest card and catalog changes**

Add an optional district input to `PropertyCard`, a stable article id, and URL-derived initial filter state in `CityCatalog`.

- [ ] **Step 4: Run the component test to verify it passes**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`
Expected: PASS.

### Task 2: Use the requested return location on detail pages

**Files:**
- Modify: `app/catalog/[city]/[property]/page.tsx`
- Test: `components/property-detail-page.test.tsx`

**Interfaces:**
- Consumes: same-city return URL emitted by Task 1.
- Produces: arrow URL for `BackNavigation`.

- [ ] **Step 1: Write a failing detail-page test**

Assert that a valid same-city return location becomes the arrow href, and a missing or invalid value falls back to `/catalog/<city>`.

- [ ] **Step 2: Run the detail-page test to verify it fails**

Run: `./node_modules/.bin/vitest run components/property-detail-page.test.tsx`
Expected: FAIL because the page ignores its return location.

- [ ] **Step 3: Implement safe detail-page return selection**

Read the query parameters from Next.js `searchParams`, allow only the current city catalog path and its query/hash suffix, then pass the result to `BackNavigation`.

- [ ] **Step 4: Run the detail-page test to verify it passes**

Run: `./node_modules/.bin/vitest run components/property-detail-page.test.tsx`
Expected: PASS.

### Task 3: Full validation and publish-ready commit

**Files:**
- Modify: plan and spec status only if needed

- [ ] **Step 1: Run all automated checks**

Run: `./node_modules/.bin/vitest run && npm run lint && NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build && git diff --check`
Expected: all commands exit successfully.

- [ ] **Step 2: Commit the scoped change**

Run: `git add` for only the files listed above and commit with `feat: return to source catalog position`.

