# Компактный футер сайта Галины Санджиевой Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить общий футер на всех страницах сайта единым компактным блоком с копирайтом, утверждённой подписью Центра «Мой бизнес» Республики Калмыкия и оригинальным логотипом из ТЗ.

**Architecture:** Общий `SiteFooter` уже подключён в `app/layout.tsx`, поэтому меняются только его JSX, локальный asset логотипа и существующие CSS-правила футера. Логотип будет извлечён из 6-й страницы PDF ТЗ как локальное изображение, без перерисовки и внешней зависимости.

**Tech Stack:** Next.js/Vinext, React, TypeScript, глобальный CSS, Vitest, локальный PNG asset, Playwright/CUA для визуальной проверки.

**Spec:** `docs/superpowers/specs/2026-11-11-site-footer-design.md`

## Global Constraints

- Изменять только футер и добавленный оригинальный asset.
- Оставить только `© 2026 Галина Санджиева` и подпись Центра с логотипом.
- Не добавлять навигацию, телефон, мессенджеры, описание услуг или дополнительные блоки.
- Использовать оригинальный логотип с 6-й страницы `/Users/gilyana08/Downloads/ТЗ_ИП Санджиева.pdf`.
- Не выполнять push, merge, публикацию или изменение `main`.
- Сохранить существующие незакоммиченные изменения пользователя.

## Review Focus

- Главная и внутренние страницы должны использовать одну и ту же футерную разметку без старой навигации — тест `SiteFooter` проверяет точный текст и отсутствие ссылок.
- На мобильной ширине две группы должны складываться вертикально и не создавать горизонтальный скролл — responsive CSS и browser check.
- Логотип должен быть локальным и визуально соответствовать последней странице ТЗ — проверка asset и визуальный просмотр.
- Длинная подпись не должна ломать футер на узкой ширине — browser check на mobile viewport.
- Текущие незакоммиченные изменения вне футера не должны попасть в diff этой задачи — `git diff --` по целевым файлам и общий diff review.

### Task 1: Добавить оригинальный логотип из утверждённого ТЗ

**Files:**
- Create: `public/images/partners/my-business-kalmykia.png`
- Source: `/Users/gilyana08/Downloads/ТЗ_ИП Санджиева.pdf`, страница 6

**Interfaces:**
- Produces: локальный PNG с прозрачным/белым фоном, содержащий только официальный логотип «мой бизнес Республика Калмыкия».

- [ ] Извлечь нижний правый логотип из отрендеренной 6-й страницы PDF, не перерисовывая его.
- [ ] Проверить изображение визуально и убедиться, что в asset не попали текст ТЗ, номер страницы или лишняя рамка.

### Task 2: Обновить общий футер и его responsive-стили

**Files:**
- Modify: `components/site-footer.tsx`
- Modify: `app/globals.css` в правилах `.site-footer`
- Test: `components/site-footer.test.tsx`

**Interfaces:**
- Consumes: `sitePath` only if needed for asset URL; no navigation component.
- Produces: `<footer className="site-footer">` with two groups: copyright and partner credit; partner group contains exact text and local `<img>` with meaningful alt text.

- [ ] Добавить тест, который рендерит `SiteFooter` и проверяет `© 2026 Галина Санджиева`, точную подпись, наличие `/images/partners/my-business-kalmykia.png` и отсутствие `<nav>`/старых ссылок.
- [ ] Запустить тест футера и зафиксировать ожидаемый RED до реализации.
- [ ] Удалить ветвление по главной странице и заменить JSX на единую разметку из двух групп.
- [ ] Убрать импорты `Link` и `usePathname`, если после изменения они больше не используются.
- [ ] Сохранить фирменные переменные цветов; сделать desktop-компоновку горизонтальной, а при `max-width: 760px` — вертикальной.
- [ ] Запустить тест футера и убедиться в GREEN.

### Task 3: Провести полную проверку до публикации

**Files:**
- No additional product files; inspect only the scoped diff.

- [ ] Запустить `./node_modules/.bin/vitest run`.
- [ ] Запустить `npm run lint`.
- [ ] Запустить `NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`.
- [ ] Запустить `git diff --check`.
- [ ] Запустить локальный preview и визуально проверить футер на главной, сервисах, FAQ, контактах, каталогах, карточке объекта, калькуляторе, списке ипотечных программ, статье ипотеки и 404.
- [ ] Проверить desktop и mobile viewport, включая отсутствие горизонтального скролла и корректное отображение логотипа.
- [ ] Проверить, что итоговый diff содержит только `components/site-footer.tsx`, футерные строки `app/globals.css`, тест футера, оригинальный asset и документацию этой задачи; не затрагивать чужие текущие изменения.
