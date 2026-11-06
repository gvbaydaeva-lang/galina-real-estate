# Shared Inquiry Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить единую локальную форму заявки на четыре городские страницы, услуги и контакты без передачи или хранения персональных данных.

**Architecture:** Чистая функция в `lib/` проверяет введённые значения. Клиентский `InquiryForm` отображает поля, ошибки и честный статус без сетевых вызовов; серверные страницы только размещают его.

**Tech Stack:** Next.js, React, TypeScript, Vitest, CSS.

**Spec:** `docs/superpowers/specs/2026-11-06-shared-inquiry-form-design.md`

## Global Constraints

- Не добавлять API, Telegram, почту, CRM, базу, аналитику или browser storage.
- Не изменять каталог, карточки ЖК, ипотечный калькулятор либо маршруты.
- Использовать один компонент формы для всех шести назначений.

## Review Focus

- Пустые имя и телефон должны дать понятные ошибки после отправки.
- Отсутствующее согласие должно блокировать сообщение о готовой заявке.
- Успешная локальная проверка должна сообщать, что данные не отправлены и не сохранены.
- Поля должны иметь видимые подписи и связи ошибок через `aria-describedby`.
- Узкий экран должен переводить поля в одну колонку.

### Task 1: Validation contract

**Files:**
- Create: `lib/inquiry-form.ts`
- Test: `lib/inquiry-form.test.ts`

- [ ] Write failing tests for missing required fields, missing consent, and a complete local submission.
- [ ] Run `npx vitest run lib/inquiry-form.test.ts` and verify expected failure.
- [ ] Implement `validateInquiryForm(values: InquiryFormValues): InquiryFormErrors` without side effects.
- [ ] Run the focused test and verify it passes.

### Task 2: Shared client component

**Files:**
- Create: `components/inquiry-form.tsx`, `components/inquiry-form.test.tsx`
- Modify: `app/globals.css`

- [ ] Write a failing component-markup test for labels, required consent, errors, and the disconnected-channel status.
- [ ] Run focused tests and verify expected failure.
- [ ] Implement `InquiryForm({ context })`, keeping values in React state only and using validation from Task 1.
- [ ] Add responsive, focus-visible CSS and run focused tests.

### Task 3: Page placement and checks

**Files:**
- Modify: `app/catalog/[city]/page.tsx`, `app/services/page.tsx`, `app/contacts/page.tsx`
- Test: `components/inquiry-form.test.tsx`

- [ ] Add failing route-render assertions for six form placements.
- [ ] Render the same component on the six requested pages with page-specific context.
- [ ] Run `npx vitest run`, `npm run lint`, `npm run build`, `git diff --check`, and responsive browser checks.
- [ ] Commit, push `feature/shared-inquiry-form`, and open a pull request against `main`.
