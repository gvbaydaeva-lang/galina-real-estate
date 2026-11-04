# Mortgage calculator implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give visitors the same clear preliminary mortgage calculation on the standalone calculator page and each city catalog page.

**Architecture:** Keep the mortgage formula in a pure `lib` function and add small pure helpers for converting the down payment between rubles and percent. Put the interactive fields and local request form in one client component; city routes only pass their city name as context.

**Tech Stack:** Next.js, React, TypeScript, Vitest.

**Spec:** User request of 2026-11-04 and existing `lib/mortgage.ts`.

## Global Constraints

- Do not add real objects, prices, photographs, Telegram delivery, or any external transfer of personal data.
- The calculation is preliminary and must remain labelled as such.
- A zero interest rate uses equal monthly payments, not the annuity formula.
- Reject a down payment above the property price and a non-positive or non-integer term.

## Review Focus

- A ruble amount and its equivalent percentage must lead to the same loan amount.
- A property price change must keep the selected down-payment representation valid.
- `0%` annual rate must not divide by zero.
- Empty or malformed numeric inputs must show a useful local error instead of a misleading result.
- The request form must not submit, store, or expose contact data before a protected delivery backend exists.

---

### Task 1: Mortgage calculation helpers and regression tests

**Files:**
- Modify: `lib/mortgage.ts`
- Modify: `lib/mortgage.test.ts`

**Interfaces:**
- Produces: `calculateMortgage(input: MortgageInput): MortgageResult` and pure down-payment conversion helpers.

- [x] Write failing tests for percent/ruble conversion, non-integer term, zero rate, and a down payment above the price.
- [x] Run `npx vitest run lib/mortgage.test.ts` and confirm the new expectations fail for missing behaviour.
- [x] Implement the smallest validation and conversion helpers in `lib/mortgage.ts`.
- [x] Re-run `npx vitest run lib/mortgage.test.ts` and confirm it passes.

### Task 2: Shared calculator and safe local request form

**Files:**
- Modify: `components/mortgage-calculator.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: calculation helpers from `lib/mortgage.ts`.
- Produces: `MortgageCalculator({ cityName? })`, with a local-only request form.

- [x] Add the rubles/percent mode selector and keep both representations synchronized.
- [x] Add a contact form whose submit action is intercepted locally and states that protected delivery is not connected.
- [x] Preserve the preliminary-calculation disclaimer and accessible error/status messages.

### Task 3: Add the shared component to city pages

**Files:**
- Modify: `app/catalog/[city]/page.tsx`

**Interfaces:**
- Consumes: `MortgageCalculator` with the selected city name.

- [x] Replace the calculator link with the shared component on all statically generated city routes.
- [x] Run `npm run lint`, `npx vitest run`, and `npm run build`.
