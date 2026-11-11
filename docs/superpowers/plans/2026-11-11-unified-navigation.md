# Unified Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Сделать единое главное меню из шести пунктов на всех страницах и исправить переходы к каталогам, FAQ и блокам главной.

**Architecture:** Оставить один клиентский `SiteHeader` с обычными браузерными ссылками через `sitePath`, добавить в него данные меню и доступное раскрытие каталога городов. Сохранить существующий `SiteFooter`, добавив недостающие ссылки без изменения его текстового содержания. Исправить только целевые CTA в главной и услугах.

**Tech Stack:** React 19, Next/Vinext static export, TypeScript, Vitest, Testing Library, CSS в `app/globals.css`.

**Spec:** `docs/superpowers/specs/2026-11-11-unified-navigation-design.md`

## Global Constraints

- На всех страницах ровно шесть пунктов главного меню в порядке: «Главная», «Услуги», «Недвижимость», «Ипотека», «Обо мне», «Контакты».
- «Недвижимость» не открывает Москву автоматически; города ведут на существующие каталоги `/catalog/moscow`, `/catalog/spb`, `/catalog/krasnodar`, `/catalog/elista`.
- FAQ не удаляется и остаётся доступным в подвале.
- Не менять тексты, фотографии, цветовую палитру, шрифты, калькулятор, формы, FAQ и Telegram-интеграцию.
- Внутренние ссылки должны проходить через текущий `sitePath`, чтобы GitHub Pages получал правильный project prefix.

## Review Focus

- Рендер на главной и внутренней странице не должен создавать разные меню — тест порядка и количества пунктов в `site-header.test.tsx`.
- Родитель «Недвижимость» не должен иметь городскую ссылку и не должен вести в Москву — тест кнопки раскрытия и отсутствие `/catalog/moscow` у родителя.
- Мобильное меню и подменю должны закрываться кликом по ссылке и Escape — тест обработчиков через Testing Library.
- Фокус клавиатуры и `aria-expanded` должны отражать состояние раскрытия — тест доступных атрибутов.
- CTA «Посмотреть новостройки» и «Перейти к новостройкам» должны вести на `/#catalog`, а FAQ должен быть в подвале на внутренних страницах — тесты страниц/header/footer.

### Task 1: Navigation regression tests

**Files:**
- Modify: `components/site-header.test.tsx`
- Modify: `components/home-page.test.tsx`
- Modify: `components/services-page.test.tsx`
- Create: `components/site-footer.test.tsx`

**Interfaces:**
- Consumes: текущий `SiteHeader`, `SiteFooter`, главную и страницу услуг.
- Produces: красные тесты, фиксирующие единый порядок, четыре каталога, accessible toggle и целевые CTA.

- [ ] **Step 1: Add a failing header test** asserting the six visible labels in order on both mocked home and internal paths, the city groups/links, and that the parent control has no `/catalog/moscow` href.
- [ ] **Step 2: Add failing interaction assertions** for opening the real-estate menu, `aria-expanded`, Escape closing, and mobile menu link closing.
- [ ] **Step 3: Add failing page/footer assertions** for `/#catalog` on both CTAs and FAQ in the footer navigation.
- [ ] **Step 4: Run the focused tests** with `npx vitest run components/site-header.test.tsx components/site-footer.test.tsx components/home-page.test.tsx components/services-page.test.tsx` and confirm failures are caused by the missing behavior.

### Task 2: Implement shared six-item navigation

**Files:**
- Modify: `components/site-header.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `sitePath`, `usePathname`, failing tests from Task 1.
- Produces: one `SiteHeader` with `Недвижимость` button, grouped city links, current-page state, mobile toggle, and Escape/focus behavior.

- [ ] **Step 1: Replace separate home/internal navigation arrays** with one ordered navigation model containing the six exact labels and city groups.
- [ ] **Step 2: Implement the real-estate disclosure** as a button with `aria-expanded`, `aria-controls`, no destination href, nested links for Moscow/SPB/Krasnodar/Elista, and click handlers that close menus.
- [ ] **Step 3: Add Escape handling and focus return** for the real-estate disclosure and retain the existing mobile menu toggle behavior.
- [ ] **Step 4: Extend existing header CSS** for desktop dropdown, visible focus states, mobile grouped list, and non-overlapping layout while preserving current colors, type and spacing language.
- [ ] **Step 5: Run focused header tests** and confirm they pass.

### Task 3: Repair footer and content links

**Files:**
- Modify: `components/site-footer.tsx`
- Modify: `app/page.tsx`
- Modify: `app/services/page.tsx`

**Interfaces:**
- Consumes: existing `SiteLink`, catalog anchors and page CTA markup.
- Produces: FAQ retained in footer on every page, homepage/service catalog CTAs pointing to `/#catalog`, and no accidental direct Moscow link for those CTAs.

- [ ] **Step 1: Update footer navigation** so both home and internal variants retain FAQ and use consistent valid destinations without changing footer copy.
- [ ] **Step 2: Change only the requested homepage and services CTA hrefs** to `/#catalog`; leave city cards and Elista action on their specific catalogs.
- [ ] **Step 3: Run page/footer/service tests** and confirm the target links pass without affecting calculator or forms.

### Task 4: Full verification and publication

**Files:**
- Verify: all changed files and generated output only.

**Interfaces:**
- Consumes: completed Tasks 1–3.
- Produces: verified branch and published GitHub Pages result.

- [ ] **Step 1: Run full Vitest suite, ESLint, `git diff --check`, and production build.**
- [ ] **Step 2: Start the local static preview and manually check home, services, all four catalogs, mortgage, FAQ and contacts on desktop and widths 320/375/430.
- [ ] **Step 3: Check keyboard flow: Tab to menu, Enter/Space on «Недвижимость», Tab through city links, Escape, and Enter on each top-level link.
- [ ] **Step 4: Push the feature branch and use the existing GitHub Pages workflow; inspect public HTML/assets, click the published navigation, and check browser console.
- [ ] **Step 5: Commit the verified changes with a focused message and report changed files, fixed links, checks and any remaining risk.
