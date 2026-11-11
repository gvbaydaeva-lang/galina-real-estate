# Elista Service Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace only the empty Elista catalog view with the approved service-focused page “Недвижимость в Элисте”, preserving the existing URL and mortgage calculator.

**Architecture:** Keep the shared city catalog unchanged for Moscow, Saint Petersburg, and Krasnodar. Add a dedicated `ElistaServicePage` component selected only by the `elista` route data, with its copy and service cards defined locally in the component/data file and scoped CSS classes in the existing global stylesheet.

**Tech Stack:** Next.js/Vinext, React, TypeScript, Vitest, existing `SiteLink`, `InquiryForm`, `MortgageCalculator`, and Modern Estate tokens in `app/globals.css`.

**Spec:** `/Users/gilyana08/Downloads/Элиста_готовые_тексты_и_ТЗ_Codex (1).pdf`

## Global Constraints

- Change only the Elista page and its route-local component/styles/tests.
- Preserve `/catalog/elista` and the existing `MortgageCalculator` computations.
- Use the PDF copy without invented objects, prices, photos, reviews, or partnerships.
- Remove the empty district filter, temporary messages, and empty ЖК list only from Elista.
- Keep Telegram and WhatsApp links from the PDF; omit MAX because no verified personal URL is supplied.
- Do not change menus, other city catalogs, shared footer, other photos, or publish/push to GitHub Pages.

## Review Focus

- Elista must not render district filters, empty-state notices, or property articles; test the route-specific branch.
- Other cities must retain the existing catalog behavior; test shared `CityCatalog` with Moscow.
- Contact links must be real and exact; test Telegram, WhatsApp, phone, and no MAX placeholder.
- The calculator must remain rendered after the service page; test route markup and run existing calculator tests.
- Desktop/mobile layout must avoid horizontal overflow; verify via local browser at both viewport sizes.

### Task 1: Route-specific Elista page content

**Files:**
- Create: `components/elista-service-page.tsx`
- Modify: `app/catalog/[city]/page.tsx`
- Modify: `content/catalog-cities.ts`
- Test: `components/city-catalog.test.tsx`

**Interfaces:**
- Consumes: `CatalogCity` route data, `sitePath`/`SiteLink`, and existing `MortgageCalculator` placement.
- Produces: `ElistaServicePage({ city }: { city: CatalogCity })` and route selection for `city.slug === "elista"`.

- [ ] Write a failing test asserting the Elista markup contains the PDF H1, four direction cards, individual-selection block, four steps, exact Telegram/WhatsApp links, and no district filter/property article/temporary empty copy.
- [ ] Run `npx vitest run components/city-catalog.test.tsx` and confirm it fails because the dedicated page does not exist.
- [ ] Implement the dedicated component with exact PDF copy, consultation links, and no MAX link; update Elista metadata source fields and route selection while leaving other city data/behavior unchanged.
- [ ] Run the focused test and confirm it passes.

### Task 2: Scoped Modern Estate styling and verification

**Files:**
- Modify: `app/globals.css`
- Modify: `components/city-catalog.test.tsx` if needed for stable assertions

**Interfaces:**
- Consumes: class names emitted by `ElistaServicePage`.
- Produces: responsive cards, process steps, contact links, and section spacing consistent with existing Modern Estate tokens.

- [ ] Add only Elista-scoped CSS, with a one-column mobile layout and no changes to existing catalog selectors.
- [ ] Run `npm run lint`, `npx vitest run`, `npm run build`, and `git diff --check`.
- [ ] Run local preview and verify `/catalog/elista` at desktop and mobile widths, all consultation/contact/calculator links, and no console errors or horizontal overflow.
- [ ] Review the diff to confirm only Elista component/data/route/styles/tests plus this plan changed; do not commit, push, or publish.
