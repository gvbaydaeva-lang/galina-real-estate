# City Catalog Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show six source-backed, neutral ЖК cards in each of the Moscow, Saint Petersburg and Krasnodar catalogs without exposing developer or contact information.

**Architecture:** Keep catalog content in `content/catalog-cities.ts`; the separate `catalogPropertySources` registry keeps official URLs for later audit without passing them to the browser. `CityCatalog` renders only internal information and a neutral completeness notice; `PropertyCard` remains a non-linking article.

**Tech Stack:** Next.js, React, TypeScript, Vitest, static export.

**Spec:** `docs/superpowers/specs/2026-11-08-city-catalog-cards-design.md`

## Global Constraints

- Show six cards only for Moscow, Saint Petersburg and Krasnodar; keep Elista empty.
- Never render developer names, source URLs, prices, photos, sales terms, contacts or a lead form.
- Source URLs in `catalogPropertySources` must be official HTTPS pages and remain server-only data.
- Use the verification date `2026-11-08` on every published card.
- The city filter must offer only locations represented by cards.

## Review Focus

- A rendered card must not contain an external anchor; test the static markup in Task 2.
- Every published property must have an official HTTPS source URL; test the content shape in Task 1.
- The three populated catalogs must have exactly six cards each; test the city counts in Task 1.
- Elista must retain its honest empty state; test the rendered page in Task 2.
- Published route metadata and the single-H1 rule must remain valid; test the full SEO route suite in Task 3.

---

### Task 1: Source-backed catalog data

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Produces: `catalogPropertySources: Readonly<Record<string, string>>` with 18 official source URLs that are not passed to the browser.
- Consumed by: `CityCatalog` and content tests.

- [ ] **Step 1: Write the failing data tests**

Assert that Moscow, Saint Petersburg and Krasnodar each contain six properties; every populated property has `verifiedAt === "2026-11-08"`, no `sourceUrl`, no `price` or `image`; its identifier has a HTTPS URL in `catalogPropertySources`; and each filter location occurs in a property.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `./node_modules/.bin/vitest run content/catalog-cities.test.ts`
Expected: FAIL because properties are empty and the source registry is absent.

- [ ] **Step 3: Add `catalogPropertySources` and 18 approved entries**

Use only the title, precise district or neutral location, project type, official HTTPS source, and the fixed verification date. Update location labels and lists to match represented locations. Keep Elista unchanged.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `./node_modules/.bin/vitest run content/catalog-cities.test.ts`
Expected: PASS.

### Task 2: Honest catalog presentation

**Files:**
- Modify: `components/city-catalog.tsx`
- Modify: `components/city-catalog.test.tsx`

**Interfaces:**
- Consumes: populated `CatalogCity.properties`; source URLs remain in the server-only registry.
- Produces: a catalog notice that makes clear the cards are a partial selection and contact methods are not yet published.

- [ ] **Step 1: Write failing rendering tests**

Assert that the Moscow catalog renders six articles, includes the neutral partial-selection notice, contains no external `href`, and that Elista still renders the empty-state copy.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`
Expected: FAIL because the current copy does not explain that the list is partial or that contact methods are pending.

- [ ] **Step 3: Update only the neutral catalog copy**

Add the approved non-promissory selection notice without form, contact detail, button or external link. Do not change `PropertyCard` into a link.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `./node_modules/.bin/vitest run components/city-catalog.test.tsx`
Expected: PASS.

### Task 3: Full regression, static build and visual check

**Files:**
- No production files expected.

**Interfaces:**
- Consumes: completed catalog content and rendering.
- Produces: verification evidence for the branch.

- [ ] **Step 1: Run the full test suite**

Run: `./node_modules/.bin/vitest run`
Expected: all tests PASS.

- [ ] **Step 2: Run lint and the GitHub Pages static build**

Run: `npm run lint && NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`
Expected: both commands exit 0.

- [ ] **Step 3: Inspect the generated city pages and responsive layout**

Verify desktop and mobile widths show readable two-then-one-column cards, all 18 titles appear in their correct city output, and no external source URL or developer name is rendered.

- [ ] **Step 4: Commit the isolated branch**

Run: `git add content/catalog-cities.ts content/catalog-cities.test.ts components/city-catalog.tsx components/city-catalog.test.tsx docs/superpowers && git commit -m "feat: add verified city catalog cards"`
