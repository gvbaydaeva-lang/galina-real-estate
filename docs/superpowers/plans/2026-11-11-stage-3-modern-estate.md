# Stage 3 Modern Estate Rollout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply the approved Modern Estate visual system to every non-homepage section while preserving routes, copy, images, SEO metadata, data, and interaction behavior.

**Architecture:** Keep page markup and component logic unchanged wherever possible. Wire the existing global tokens into shared layouts, then tune the existing CSS-module surfaces for services, FAQ, mortgage content, catalog/detail pages, calculator, and contacts. Use only CSS and tests for the redesign; do not publish.

**Tech Stack:** Next.js static site, React, TypeScript, global CSS, CSS Modules, Vitest.

**Spec:** `docs/design-system-modern-estate.md` and the Stage 3 request in the conversation.

## Global Constraints

- Preserve existing texts, headings, photographs, links, URLs, SEO metadata, property data, forms, calculator, FAQ behavior, and Telegram/WhatsApp links.
- Use `#F8F7F3`, `#EDE8DE`, `#1D3933`, `#242C2A`, and `#A88665` as the Modern Estate palette.
- Use Cormorant Garamond for display headings and Manrope for body/UI text.
- Keep content width at 1200px, card radius 12–16px, thin borders, minimal shadows, responsive layouts, and reduced-motion support.
- Do not modify GitHub Pages, `main`, or any external deployment.

## Review Focus

- Homepage isolation: global rollout must not regress the already-approved homepage layer; verify homepage and a non-home route render.
- Mobile overflow: long catalog, article, FAQ, calculator, and form content must remain within the viewport.
- Interaction preservation: calculator, FAQ, form controls, and navigation must retain their existing accessible semantics and tests.
- Media preservation: existing source paths and alt text must remain unchanged.
- Route coverage: all requested route families must still build as static pages.

### Task 1: Shared Modern Estate foundation

**Files:**
- Modify: `app/globals.css`
- Test: `components/responsive-layout.test.tsx` and existing content tests

- [ ] Verify the current branch and baseline tests.
- [ ] Update shared non-home selectors to use the approved tokens, typography, spacing, focus states, and responsive container width while leaving homepage-specific selectors scoped.
- [ ] Run focused tests and diff checks.

### Task 2: Services, FAQ, mortgage index, and articles

**Files:**
- Modify: `app/services/services.module.css`
- Modify: `app/faq/faq.module.css`
- Modify: `app/mortgage-programs/mortgage-index.module.css`
- Modify: `app/mortgage-programs/mortgage-article.module.css`

- [ ] Preserve all module class names and markup contracts.
- [ ] Restyle cards, section rhythm, article notices, category controls, and CTA surfaces with the shared tokens.
- [ ] Verify services, FAQ, mortgage index, and article tests.

### Task 3: Catalogs, property details, calculator, contacts, and forms

**Files:**
- Modify: `components/mortgage-calculator.module.css`
- Modify: `app/globals.css`

- [ ] Restyle catalog filters/cards, property detail panels, calculator fields/results, inquiry form, and contact media without changing data or behavior.
- [ ] Keep all inputs, buttons, links, image sources, alt text, and form state intact.
- [ ] Verify calculator, form, catalog, and property-detail tests.

### Task 4: Full verification and local visual review

**Files:**
- No additional source files unless verification exposes a scoped visual defect.

- [ ] Run lint, all Vitest tests, `git diff --check`, and production build.
- [ ] Check desktop and smartphone previews for representative services, catalog, mortgage article, calculator, FAQ, and contacts routes.
- [ ] Confirm working tree, branch, and no publication side effects; commit the stage only after all checks pass.
