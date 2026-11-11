# About Me Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a responsive «Обо мне» section to the homepage with a future-photo placeholder and concise broker positioning.

**Architecture:** Keep the existing single-page composition. Add semantic JSX to `app/page.tsx` and scoped CSS to `app/globals.css`; do not add dependencies or move existing sections.

**Tech Stack:** Next/Vinext, React, TypeScript, plain CSS, Vitest/Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-10-about-me-section-design.md`

## Global Constraints

- Change only the homepage and its styles.
- Do not invent personal names, contact details, specific properties, or unsupported guarantees.
- Keep the photo area an explicit placeholder until a real portrait is supplied.
- Preserve responsive behavior and visible keyboard focus.

## Review Focus

- Homepage includes the new section in the intended order.
- Placeholder copy clearly says the photo will be added later.
- Claims remain limited to the requested 5 years, dozens of clients, and cases.
- Mobile layout does not require horizontal scrolling.

### Task 1: Add the homepage «Обо мне» module

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Test: `components/home-page.test.tsx` (create if absent)

- [ ] Add a failing render test that asserts the section label, `5 лет`, photo-placeholder copy, and contact link.
- [ ] Run the focused test and confirm it fails because the section is absent.
- [ ] Add semantic section markup and scoped styles with a two-column desktop layout and one-column mobile layout.
- [ ] Run the focused test, lint, and production build.
