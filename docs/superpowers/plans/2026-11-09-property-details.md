# Property Details Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each existing catalog card title open a static detail page with a large verified project image or an honest fallback and project information.

**Architecture:** Keep the 18 existing projects as the single source of content in `content/catalog-cities.ts`. Add route-safe lookup helpers and a static nested catalog route; `PropertyCard` links only its heading via the existing base-path-aware `SiteLink`. The detail page reuses the existing verified media and never substitutes another ЖК's photograph.

**Tech Stack:** Next.js static export, React, TypeScript, Vitest, CSS.

**Spec:** User request from 2026-11-09, constrained by the published-catalog rule that project images must match the named ЖК.

## Global Constraints

- Do not add arbitrary or cross-project photos; retain the labelled fallback for the five projects without a verified image.
- Keep data in `content/catalog-cities.ts`; do not expose prices, contacts, or unverified specifications.
- Generate every page statically and use `SiteLink` exactly once per catalog-card title.
- Do not alter city filtering, mortgage calculation, Elista's empty state, or unrelated routes.

## Review Focus

- A property id paired with the wrong city must return no page; test `getCatalogProperty` city matching.
- All 18 populated-city cards must link to a matching static detail route; test the card href.
- A project with no image must keep the explicit fallback on both card and detail view; test its accessible text.
- Static route parameters must include all 18 valid city/project pairs; test route output through rendering and build.
- Keyboard users must have a visible focus state on the title link; cover it in CSS review and browser smoke check.

### Task 1: Catalog data lookup and title links

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`
- Modify: `components/property-card.tsx`
- Modify: `components/city-catalog.test.tsx`

**Interfaces:**
- Produces: `getCatalogProperty(citySlug: string, propertyId: string): VerifiedProperty | undefined`.
- Produces: a title link to `/catalog/${property.citySlug}/${property.id}` using `SiteLink`.

- [ ] **Step 1: Write failing tests** for city-specific property lookup and a rendered catalog-card title href.
- [ ] **Step 2: Run the focused tests** and confirm they fail because the helper and link do not exist.
- [ ] **Step 3: Implement the helper and title-only link** without changing media, filtering, or optional data behaviour.
- [ ] **Step 4: Run the focused tests** and confirm they pass.

### Task 2: Static project detail route and presentation

**Files:**
- Create: `app/catalog/[city]/[property]/page.tsx`
- Create: `app/catalog/[city]/[property]/page.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `catalogCities`, `getCatalogCity`, and `getCatalogProperty`.
- Produces: static `{ city, property }` params and a detail page that uses `notFound()` for mismatched pairs.

- [ ] **Step 1: Write failing render tests** for project heading, large verified image, fallback copy, district/type information, and return link.
- [ ] **Step 2: Run the route test** and confirm it fails because the route is absent.
- [ ] **Step 3: Implement static params, metadata, and the detail page** with only data already verified in the catalog and an explanatory no-photo notice.
- [ ] **Step 4: Add focused responsive and focus-visible CSS** for the title link and detail media/content.
- [ ] **Step 5: Run the route test** and confirm it passes.

### Task 3: Verify the static site

**Files:**
- Verify: catalog tests, full Vitest suite, lint, static build, and diff whitespace.

- [ ] **Step 1: Run `./node_modules/.bin/vitest run`** and record all results.
- [ ] **Step 2: Run `npm run lint`, `NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`, and `git diff --check`.**
- [ ] **Step 3: Inspect the generated static route count and representative rendered markup** for one image and one fallback page.
