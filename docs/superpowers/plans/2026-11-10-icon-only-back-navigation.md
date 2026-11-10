# Icon-only Back Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace visible-text return links with one accessible arrow above each internal-page heading.

**Architecture:** `BackNavigation` remains the shared component. It renders an icon-only `SiteLink` with an accessible label; route components pass only their logical parent URL.

**Tech Stack:** Next.js, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-10-icon-only-back-navigation-design.md`

## Global Constraints

- Do not use browser-history navigation.
- Show only «←» to sighted visitors; retain an accessible text label for assistive technology.
- Keep the return navigation above the eyebrow and page heading.
- Do not alter catalogue data or property content.

## Review Focus

- A direct URL to any ЖК still returns to that city’s catalog.
- The city route returns to `/#catalog`, not merely `/`.
- Visible Russian return phrases do not remain in the arrow component or property-detail page.
- Every internal arrow has an accessible name.
- The older lower return link on a ЖК page is absent.

### Task 1: Accessible shared arrow and route coverage

**Files:**
- Modify: `components/back-navigation.tsx`
- Modify: `components/page-intro.test.tsx`
- Modify: `components/city-catalog.test.tsx`
- Modify: `components/property-detail-page.test.tsx`
- Modify: `app/catalog/[city]/[property]/page.tsx`

**Interfaces:**
- Produces: `BackNavigation({ href, label })`, rendering an icon-only link with `aria-label={label}`.

- [ ] Write failing tests that require an icon-only accessible arrow above page, city-catalog, and ЖК headings, including `/catalog/moscow` as the ЖК parent route.
- [ ] Run the focused Vitest files and verify the assertions fail because visible labels and a lower ЖК link remain.
- [ ] Render only the arrow in `BackNavigation`, use it at the top of the ЖК page with its city catalog URL, and remove the lower return link.
- [ ] Run the focused tests and the full Vitest suite.

### Task 2: Styling and production checks

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `BackNavigation` icon-only link markup.

- [ ] Add a compact focus-visible style that makes the small arrow usable with a keyboard without adding visible label text.
- [ ] Run the full Vitest suite, production build, and `git diff --check`.
