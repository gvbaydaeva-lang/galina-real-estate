# Zero-rate mortgage rounding design

## Intent

Prevent a preliminary mortgage calculation with a 0% annual rate from showing a false negative or positive overpayment caused only by rounding the displayed monthly payment.

## Goals

- Keep the monthly payment rounded to whole rubles for readable display.
- Return `totalPayment` equal to `loanAmount` and `overpayment` equal to `0` whenever `annualRate` is `0`.
- Preserve the current annuity calculation and validation for positive rates.

## Non-goals

- No changes to rates, listings, forms, integrations, or page layout.
- No claims about real bank products or loan approval.

## Approaches considered

1. Calculate totals from the rounded monthly payment in every case. Rejected because it creates an artificial overpayment at 0%.
2. Calculate every total from an unrounded monthly payment. Rejected for this small correction because it can change established positive-rate results.
3. Keep established positive-rate behaviour and make the mathematically exact 0% case explicit. Chosen because it removes the false value without changing existing non-zero-rate results.

## Constraints

- The calculator remains preliminary and local-only.
- A regression test must reproduce the rounding discrepancy before the implementation change.
