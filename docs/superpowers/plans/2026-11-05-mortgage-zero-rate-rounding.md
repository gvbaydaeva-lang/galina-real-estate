# Zero-rate mortgage rounding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure a 0% mortgage calculation never reports rounding as an overpayment.

**Architecture:** Keep `calculateMortgage` as the single calculation source. Preserve the rounded monthly display, while the zero-rate branch assigns exact total and overpayment values before returning the result.

**Tech Stack:** TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-05-mortgage-zero-rate-rounding-design.md`

## Global Constraints

- Do not change positive-rate calculation results or validation messages.
- Do not add commercial rates, data collection, or external services.
- Use a regression test that fails before implementation.

## Review Focus

- A 0% calculation where the loan is not divisible by the number of months must report `0` overpayment.
- A 0% calculation with a zero loan amount must remain exact.
- Existing positive-rate fixture must retain its established values.
- Existing invalid-input errors must remain unchanged.

### Task 1: Preserve exact totals for zero-rate loans

**Files:**
- Modify: `lib/mortgage.test.ts`
- Modify: `lib/mortgage.ts`

**Interfaces:**
- Consumes: `calculateMortgage(input: MortgageInput): MortgageResult`.
- Produces: unchanged `MortgageResult` with exact zero-rate totals.

- [ ] **Step 1: Write the failing regression test**

Add a 0% input whose loan amount is not divisible by its number of months. Assert `totalPayment` equals `loanAmount` and `overpayment` equals `0`.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npx vitest run lib/mortgage.test.ts`
Expected: FAIL because the current rounded monthly amount produces a non-zero overpayment.

- [ ] **Step 3: Implement the minimal zero-rate branch in `calculateMortgage`**

Keep `monthlyPayment` rounded. When `monthlyRate === 0`, return `totalPayment: loanAmount` and `overpayment: 0`; otherwise keep existing total calculation.

- [ ] **Step 4: Run the focused test to verify it passes**

Run: `npx vitest run lib/mortgage.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/mortgage.ts lib/mortgage.test.ts docs/superpowers/specs/2026-11-05-mortgage-zero-rate-rounding-design.md docs/superpowers/plans/2026-11-05-mortgage-zero-rate-rounding.md
git commit -m "fix: keep zero-rate mortgage totals exact"
```
