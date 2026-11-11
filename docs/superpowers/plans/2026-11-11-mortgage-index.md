# Mortgage Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Переработать `mortgage-programs.html` в страницу-оглавление ипотечного блога по утверждённому PDF, сохранив все существующие URL статей.

**Architecture:** Страница остаётся серверным компонентом Next/Vinext и использует существующий `SiteLink` и `mortgagePrograms` только как источник slug/маршрутов. Вся новая визуальная структура и копирайт страницы-оглавления находятся в `app/mortgage-programs/page.tsx`, а адаптивное оформление — в отдельном CSS-модуле этой страницы.

**Tech Stack:** React 19, Next/Vinext static export, TypeScript, CSS Modules, Vitest, ESLint.

**Spec:** `docs/superpowers/specs/2026-11-11-mortgage-index-design.md`

## Global Constraints

- Изменять только страницу `mortgage-programs.html` и локальный CSS этой страницы.
- Не изменять `content/mortgage-programs.ts`, внутренние статьи, калькулятор, каталоги, FAQ, контакты, шапку, меню, подвал, глобальные стили и интеграции.
- Сохранить все 8 существующих article slug и переходы.
- Использовать точные тексты intro, SEO и карточек из PDF.
- Не дублировать тексты внутренних статей на странице-оглавлении.
- Обеспечить keyboard focus, hover, мобильную одну колонку и отсутствие горизонтального переполнения.

## Review Focus

- Статический экспорт: `SiteLink` должен сохранить корректные `.html`-адреса, включая все 8 статей.
- Порядок карточек: выделенная статья выбора программы не должна дублироваться среди 7 тематических карточек.
- Мобильная ширина: длинные русские заголовки и кнопки не должны создавать горизонтальный скролл.
- SEO-семантика: ровно один H1 и отдельные H2 для материалов, калькулятора и консультации.
- Scope: diff не должен содержать изменения вне страницы, её CSS и утверждённых документов.

### Task 1: Build the page structure and copy

**Files:**
- Modify: `app/mortgage-programs/page.tsx`
- Test: existing lint/build and route checks; no new product test file needed because acceptance is structural and browser-based.

**Interfaces:**
- Consumes: `Link`/`SiteLink` from `@/components/site-link` and `mortgagePrograms` from `@/content/mortgage-programs`.
- Produces: one page with the PDF order, 1 H1, 3 H2 headings, 8 article links, calculator link, and contacts link.

- [ ] Replace the current single `PageIntro` plus uniform map with the PDF intro copy and page-local sections.
- [ ] Add a local ordered card configuration for the 7 PDF topics, retaining each existing slug and linking with `SiteLink`.
- [ ] Keep the guide card linked to `how-to-choose-a-mortgage-program` and do not render that article in the 7-card grid.
- [ ] Add calculator and consultation blocks with existing routes `/mortgage-calculator` and `/contacts`.
- [ ] Set the exact PDF title and description metadata.
- [ ] Run `npm run lint` and inspect the generated page structure after the CSS task.

### Task 2: Add isolated responsive styling

**Files:**
- Create: `app/mortgage-programs/mortgage-index.module.css`
- Modify: `app/mortgage-programs/page.tsx` to import and apply the module classes.

**Interfaces:**
- Consumes: section class names from Task 1.
- Produces: responsive 3/2/1-column topic grid, distinct guide card, two lower action panels, visible hover/focus-visible states, and reduced-motion-safe transitions.

- [ ] Define page-local layout, palette, type scale, spacing, card borders/radii, and accent treatment without changing global tokens.
- [ ] Make the intro visually expressive but compact, with readable max-widths and no large text block.
- [ ] Make the guide card the single signature element: wide, lightly tinted, and visually distinct from topic cards.
- [ ] Style topic cards as airy compact cards with full-card links and clear arrow affordances.
- [ ] Add mobile breakpoint with one column, safe text wrapping, and no horizontal overflow.
- [ ] Add `:focus-visible` states and a `prefers-reduced-motion` fallback.

### Task 3: Verify and publish

**Files:**
- Verify only; no additional product files.

- [ ] Run `npm run lint`, the full test suite, `npm run build`, and `git diff --check`.
- [ ] Confirm the diff contains only the page, its local CSS, and approved design/plan documents; confirm `content/mortgage-programs.ts` is unchanged.
- [ ] Start the local preview and check desktop/mobile screenshots, page text, no horizontal overflow, and browser console.
- [ ] Check all 8 article links, calculator link, and contacts link from the rendered page.
- [ ] Commit the scoped change and push the current feature branch; do not modify `main` directly.
- [ ] Wait for GitHub Pages deployment, then verify the public `.html` page, rendered content, links, responsive layout, and console.
- [ ] Report commit SHA, public URL, changed files, verification evidence, and any remaining limitation.
