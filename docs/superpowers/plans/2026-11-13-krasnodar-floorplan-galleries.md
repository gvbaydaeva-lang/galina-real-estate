# Краснодарские галереи планировок — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Добавить на страницы всех шести ЖК Краснодара единый блок с демонстрационной таблицей квартир и локальной интерактивной галереей планировок.

**Architecture:** Данные вариантов квартир и геометрические варианты планировок хранятся в отдельном модуле. `FloorPlanGallery` отвечает за таблицу, сетку карточек и увеличенный просмотр, а динамическая страница подключает его только для `citySlug === "krasnodar"`; существующая специальная страница «Остров» остаётся без изменений.

**Tech Stack:** Next.js/React 19, TypeScript, CSS в `app/globals.css`, Vitest + server-side markup tests, inline SVG.

**Spec:** Требование пользователя от 13.11.2026 в текущем чате.

## Global Constraints

- Работать только локально, без push и публикации на GitHub Pages.
- Не менять другие разделы сайта, существующую навигацию и московскую страницу.
- Все значения для Краснодара, которых нет в проверенных источниках, маркировать как демонстрационные.
- На компьютере — две карточки в ряд, на смартфоне — одна; карточка открывается увеличенно.

## Review Focus

- Все шесть Краснодарских ЖК получают блок — тест полного набора маршрутов.
- Московский «Остров» не получает Краснодарские демо-данные — регрессионный тест.
- SVG доступны как изображения и имеют понятные подписи — тест разметки.
- Модальное окно закрывается кнопкой, Escape и кликом по фону — компонентная проверка.
- CSS не ломает мобильный layout и сохраняет видимый focus — проверка селекторов и build.

### Task 1: Data and rendering contract

**Files:**
- Create: `content/floor-plan-galleries.ts`
- Create: `components/floor-plan-gallery.tsx`
- Test: `components/property-detail-page.test.tsx`

- [ ] Write failing assertions for six Krasnodar property IDs, demo labels, gallery cards, and exclusion from Ostrov.
- [ ] Run `npx vitest run components/property-detail-page.test.tsx` and confirm the new assertions fail.
- [ ] Add typed demo data and the reusable gallery with inline SVG floor-plan drawings and accessible modal behavior.
- [ ] Run the focused test and confirm it passes.

### Task 2: Page integration and responsive styling

**Files:**
- Modify: `app/catalog/[city]/[property]/page.tsx`
- Modify: `app/globals.css`

- [ ] Render the shared gallery after project information only for Krasnodar properties.
- [ ] Add two-column desktop/one-column mobile styles, drawing details, modal, and reduced-motion rules.
- [ ] Run the focused test, full Vitest suite, lint, build, and `git diff --check`.

### Task 3: Local acceptance review

**Files:** no additional files.

- [ ] Inspect changed paths and verify no unrelated routes/data changed.
- [ ] Start local preview if build succeeds and check one desktop and one mobile route with the gallery and modal.
- [ ] Report exact files, commands, local result, and any remaining limitations.
