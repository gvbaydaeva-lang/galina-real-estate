# City Catalog Filters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add one reusable, honest catalog interface with per-city district filters for Moscow, Saint Petersburg, Krasnodar, and Elista.

**Architecture:** `content/catalog-cities.ts` remains the sole source for city labels, selectable locations, and future verified objects. A client `CityCatalog` owns the filter state for its route, while a separate `PropertyCard` defines the strict display contract for a future verified listing. The existing route passes the city data with a city-specific React key, so changing a city cannot carry a previous selection into the next page.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, existing project CSS.

**Spec:** `docs/superpowers/specs/2026-11-04-city-catalog-filters-design.md`

## Global Constraints

- Do not publish invented objects, prices, areas, addresses, photos, ЖК names, or investment promises.
- Do not scrape or connect external real-estate catalogues, databases, lead forms, or URL-state persistence.
- A listing may render only when it has `id`, `citySlug`, `district`, `title`, `dealType`, and `verifiedAt`; optional fields must be omitted rather than fabricated.
- Keep existing city metadata, static routes, SEO metadata, and mortgage calculator intact.
- Use the exact empty-state copy: `Данные уточняются. Мы публикуем объекты, цены и фотографии только после проверки.`
- Elista's control label is `Район или микрорайон`; all other cities use `Район`.

## Review Focus

- An unknown district filter must return no records rather than all records — Task 1 test `filters only the requested district`.
- An empty verified-object array must render the honest empty state, not a sample card — Task 2 test `renders the honest empty state without a property card`.
- Optional property fields must not create placeholder values in a future card — Task 2 test `omits absent optional fields`.
- Navigation to another city must reset filter state — Task 3 manual route-switch check and city-key review.
- Mobile widths must keep the select control readable and focusable — Task 3 responsive visual check.

---

### Task 1: Typed catalog data and filtering

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Produces: `CatalogCity`, `VerifiedProperty`, `catalogCities`, `getCatalogCity(slug: string)`, and `filterProperties(properties: readonly VerifiedProperty[], district: string): VerifiedProperty[]`.
- Consumed by: `components/city-catalog.tsx`, `components/property-card.tsx`, `app/catalog/[city]/page.tsx`.

- [ ] **Step 1: Write failing data tests**

Assert the exact four slugs, six locations for each city, empty `properties` arrays, and that `filterProperties` returns only an input fixture whose `district` exactly matches `Даниловский`.

- [ ] **Step 2: Run the data test and verify it fails**

Run: `npx vitest run content/catalog-cities.test.ts`

Expected: FAIL because locations, properties, and/or `filterProperties` are not implemented.

- [ ] **Step 3: Implement typed catalog content and `filterProperties`**

Add the location lists specified in the design document, empty verified-property arrays, and a pure exact-match filtering function. Preserve existing headings and notes.

- [ ] **Step 4: Run the data test and verify it passes**

Run: `npx vitest run content/catalog-cities.test.ts`

Expected: PASS.

### Task 2: Reusable catalog and property-card components

**Files:**
- Create: `components/property-card.tsx`
- Create: `components/city-catalog.tsx`
- Create: `components/city-catalog.test.tsx`
- Modify: `vitest.config.ts`

**Interfaces:**
- Consumes: `CatalogCity`, `VerifiedProperty`, and `filterProperties` from `content/catalog-cities.ts`.
- Produces: `PropertyCard({ property: VerifiedProperty })` and `CityCatalog({ city: CatalogCity })`.

- [ ] **Step 1: Write failing component tests**

Use `renderToStaticMarkup` to assert that the Moscow catalog has a `Район` select with `Все районы`, renders the exact empty-state copy with no property-card markup, and that `PropertyCard` renders required fields while omitting missing optional fields.

- [ ] **Step 2: Run the component test and verify it fails**

Run: `npx vitest run components/city-catalog.test.tsx`

Expected: FAIL because the components and test inclusion do not exist.

- [ ] **Step 3: Implement `PropertyCard` and `CityCatalog`**

Use native accessible `<label>` and `<select>` controls. Store `selectedDistrict` with `useState`, derive visible properties through `filterProperties`, and render cards only from `city.properties`. Show the exact honest empty text; append the selected district only when one is chosen. Render optional price, image, and characteristics only when their data exists.

- [ ] **Step 4: Extend Vitest file matching and verify component tests pass**

Include `components/**/*.test.tsx` in `vitest.config.ts`, then run: `npx vitest run components/city-catalog.test.tsx`

Expected: PASS.

### Task 3: Route integration and responsive catalog styling

**Files:**
- Modify: `app/catalog/[city]/page.tsx`
- Modify: `app/globals.css`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Consumes: `CityCatalog` from `components/city-catalog.tsx` and `CatalogCity` from `content/catalog-cities.ts`.
- Produces: city route markup that mounts `CityCatalog` with `key={cityData.slug}` and preserves its existing calculator.

- [ ] **Step 1: Write a failing route-data assertion**

Add a test that every supported city has the correct `locationLabel` (`Район или микрорайон` only for Elista; `Район` otherwise).

- [ ] **Step 2: Run the data test and verify it fails**

Run: `npx vitest run content/catalog-cities.test.ts`

Expected: FAIL because `locationLabel` is absent.

- [ ] **Step 3: Add the label data, route integration, and CSS**

Replace the old placeholder block with `CityCatalog`, assigning a city-specific React key. Add focused catalog styles for the filter, empty state, future grid/card, keyboard focus, and narrow screens without changing unrelated site styles.

- [ ] **Step 4: Run targeted and complete verification**

Run: `npx vitest run && npm run lint && NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build && git diff --check`

Expected: all Vitest tests pass, lint exits 0, build exits 0, and diff check is empty.

- [ ] **Step 5: Manually check four static routes in a local browser**

Check `/catalog/moscow`, `/catalog/spb`, `/catalog/krasnodar`, and `/catalog/elista`: the correct label and locations appear; choosing a district leaves the empty state honest; changing city starts with `Все районы`; the control remains usable at a narrow viewport.

## Plan self-review

- Spec coverage: Task 1 supplies all four city location lists and a zero-listing source of truth; Task 2 supplies the reusable filter and future card contract; Task 3 supplies independent route mounting, styles, and full verification.
- Interface consistency: all consumers use `CatalogCity`, `VerifiedProperty`, and `filterProperties` from the content module; `locationLabel` is added to `CatalogCity` before the route/component use it.
- Scope: no external data is copied into listings and no external state or publication changes are planned.
