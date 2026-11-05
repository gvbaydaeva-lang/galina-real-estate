# Mortgage Calculator UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the preliminary calculator's example inputs, clearing action, money formatting, and derived shares clear and safe.

**Architecture:** Extend the existing client component only. Keep arithmetic in `lib/mortgage.ts`; add a small pure helper for derived shares so it has direct unit coverage. UI state owns display formatting and reset behavior.

**Tech Stack:** Next.js, React, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-05-mortgage-calculator-ux-design.md`

## Global Constraints

- Do not add bank programs, rates, approval predictions, external requests, storage, analytics, or third-party services.
- Keep all existing calculation validation and the local-only request-form behaviour.
- Keep the preliminary-calculation notice visible.

## Review Focus

- A 0 ₽ down payment must show 0% rather than an invalid value; cover in Task 1.
- A fully paid price must show 100% initial payment and 0% overpayment; cover in Task 1.
- An empty input must not be converted to a misleading 0 ₽ while editing; cover in Task 2.
- Clearing must remove all four calculation inputs and results; cover in Task 2.
- Changing rubles to percent must preserve the existing conversion behaviour; cover in Task 2.

### Task 1: Derived-share calculation

**Files:**
- Modify: `lib/mortgage.ts`
- Test: `lib/mortgage.test.ts`

**Interfaces:**
- Produces: `calculateMortgageShares(propertyPrice: number, downPayment: number, result: MortgageResult): { downPaymentPercent: number; overpaymentPercent: number }`.

- [x] **Step 1: Write failing unit tests**

Add tests for a 20% down payment with the existing 10,000,000 ₽ fixture, a 0 ₽ down payment, and a full down payment. Assert integer-rounded shares of price and loan amount.

- [x] **Step 2: Run the focused test to verify it fails**

Run: `npx vitest run lib/mortgage.test.ts`
Expected: FAIL because `calculateMortgageShares` is not exported.

- [x] **Step 3: Implement `calculateMortgageShares`**

Return a whole-number initial-payment share of property price and overpayment share of loan amount. Avoid division by zero when no loan remains.

- [x] **Step 4: Run focused tests to verify they pass**

Run: `npx vitest run lib/mortgage.test.ts`
Expected: PASS.

### Task 2: Calculator input and result presentation

**Files:**
- Modify: `components/mortgage-calculator.tsx`
- Create: `components/mortgage-calculator.test.tsx`

**Interfaces:**
- Consumes: `calculateMortgageShares` from Task 1 and the existing mortgage helpers.
- Produces: labelled example notice, clear action, formatted ruble inputs, and two derived-share rows.

- [x] **Step 1: Write failing component tests**

Render the calculator server-side and assert the visible example label, reset button, two share labels, preliminary notice, and unchanged local-only form copy.

- [x] **Step 2: Run the focused test to verify it fails**

Run: `npx vitest run components/mortgage-calculator.test.tsx`
Expected: FAIL because the new labels and button do not exist.

- [x] **Step 3: Implement the minimal UI changes**

Use the existing numeric input state. On focus, display raw ruble values; on blur, display the same values with Russian thousands separators and the ₽ suffix. The clear button sets all calculation fields to empty values and hides the result until valid values are supplied. Add share rows only when a valid calculation result exists.

- [x] **Step 4: Run focused component tests to verify they pass**

Run: `npx vitest run components/mortgage-calculator.test.tsx`
Expected: PASS.

### Task 3: Verify the complete change

**Files:**
- Modify: `docs/superpowers/plans/2026-11-05-mortgage-calculator-ux.md`

- [x] **Step 1: Run the complete checks**

Run: `npx vitest run && npx tsc --noEmit --incremental false && npm run lint && NEXT_PUBLIC_BASE_PATH=/galina-real-estate npm run build`
Expected: all commands exit 0.

- [x] **Step 2: Check whitespace and the scoped diff**

Run: `git diff --check && git diff --stat b491ffd...HEAD`
Expected: no whitespace errors; only calculator, tests, and this documentation change.
