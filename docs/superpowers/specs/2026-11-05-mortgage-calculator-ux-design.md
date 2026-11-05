# Mortgage calculator UX design

## Intent

Make the existing preliminary mortgage calculation easier to understand without presenting example values as a bank offer or collecting personal data.

## Goals

- Keep the current annuity calculation and all existing validation rules.
- Mark the preset inputs as an example and let a visitor clear them.
- Make monetary inputs readable while preserving ordinary numeric editing.
- Show the initial-payment share and the overpayment share alongside the existing totals.

## Non-goals

- No bank rates, approval predictions, or claims about loan eligibility.
- No request delivery, storage, analytics, or third-party services.
- No change to the existing local-only request form.

## Approaches considered

1. Replace examples with blank fields. This avoids ambiguity but hides the result until several values are entered.
2. Keep an explicitly labelled example with a clear button. This lets visitors understand the calculator immediately while keeping the values honest.
3. Add bank-program presets. Rejected: there are no verified current sources for them.

## Chosen approach

Use option 2. Keep the current values, label them as an example, add a reset button, format ruble fields on blur, and add two derived percentages based only on the visitor's inputs.

## Constraints

- The calculator remains preliminary and clearly states that final terms depend on a bank and the transaction.
- Existing error messages for invalid numeric values, fractional years, and excessive down payment remain intact.
- Personal data stays in the browser; the current form continues to state that it does not send or save data.
