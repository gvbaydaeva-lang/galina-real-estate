# Official Property Images Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add verified official project imagery and an honest visual fallback to city catalog cards.

**Architecture:** Catalog data owns optional image URLs and descriptive alternative text. `PropertyCard` renders either the verified external image or a non-photographic fallback; CSS preserves one card layout at desktop and mobile widths.

**Tech Stack:** React, TypeScript, Vitest, CSS.

**Spec:** `docs/superpowers/specs/2026-11-08-official-property-images-design.md`

## Global Constraints

- Use images only from the official pages verified for the named ЖК.
- Do not show developer names, source links, prices, conditions, contacts, forms, or generated images.
- Do not store third-party image files in the repository.
- Preserve a usable card if an image has no verified source.

## Review Focus

- Every displayed external URL is HTTPS and matches a verified project image.
- A card with no `image` has a labelled visual fallback rather than a blank media area.
- Image alternative text identifies the ЖК without a developer name.
- The Moscow, Saint Petersburg, Krasnodar and Elista catalogue states remain correct.
- The single-column mobile rule continues to apply to image cards.

### Task 1: Add verified media data

**Files:**
- Modify: `content/catalog-cities.ts`
- Modify: `content/catalog-cities.test.ts`

**Interfaces:**
- Produces: `VerifiedProperty.image` values with `src` and `alt` for verified project media.

- [ ] Write a failing test that requires image URLs to be HTTPS for each image-bearing property and confirms unverified properties have no image.
- [ ] Run `./node_modules/.bin/vitest run content/catalog-cities.test.ts` and confirm the new assertion fails.
- [ ] Add only verified official image URLs and descriptive Russian alternative text to matching properties.
- [ ] Re-run the focused test and confirm it passes.

### Task 2: Render the visual fallback

**Files:**
- Modify: `components/property-card.tsx`
- Modify: `components/city-catalog.test.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: optional `VerifiedProperty.image`.
- Produces: an image or a labelled `.property-card-media-fallback` in every card.

- [ ] Write a failing rendered-markup test for an image card and a card without an image.
- [ ] Run `./node_modules/.bin/vitest run components/city-catalog.test.tsx` and confirm it fails.
- [ ] Render the image when present and a non-photographic labelled fallback otherwise; add responsive media styles.
- [ ] Re-run the focused test and confirm it passes.

### Task 3: Validate and deliver

**Files:**
- Verify: `content/catalog-cities.ts`, `components/property-card.tsx`, `app/globals.css`

- [ ] Run `./node_modules/.bin/vitest run`, `npm run lint`, `NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`, and `git diff --check`.
- [ ] Verify catalog markup contains images only for configured image properties and preserves the Elista empty state.
- [ ] Review desktop and mobile previews; commit, push the dedicated branch, open a PR, and wait for approval before merging.
