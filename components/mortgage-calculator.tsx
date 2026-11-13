"use client";

import { useState } from "react";
import { calculateMortgage, calculateMortgageShares, downPaymentFromPercent, downPaymentToPercent } from "@/lib/mortgage";
import { BackNavigation } from "./back-navigation";
import styles from "./mortgage-calculator.module.css";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
function parseNumber(value: string): number | null {
  const normalized = value.replace(/\s/g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  if (normalized === "") return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : Number.NaN;
}

function formatMoneyInput(value: number | null, isFocused: boolean): string {
  if (value === null) return "";
  return isFocused || !Number.isFinite(value) ? String(value) : money.format(value);
}

type MortgageCalculatorProps = {
  cityName?: string;
  initialPrice?: number;
  headingLevel?: "h1" | "h2";
  showBackNavigation?: boolean;
};

export function MortgageCalculator({ cityName, initialPrice, headingLevel = "h1", showBackNavigation = true }: MortgageCalculatorProps) {
  const [price, setPrice] = useState<number | null>(initialPrice ?? null);
  const [downPayment, setDownPayment] = useState<number | null>(null);
  const [downPaymentMode, setDownPaymentMode] = useState<"rubles" | "percent">("rubles");
  const [rate, setRate] = useState<number | null>(null);
  const [years, setYears] = useState<number | null>(null);
  const [focusedMoneyInput, setFocusedMoneyInput] = useState<"price" | "downPayment" | null>(null);
  const [calculated, setCalculated] = useState<{ value: ReturnType<typeof calculateMortgage> | null; error: string | null }>({ value: null, error: null });
  const Heading = headingLevel;

  function invalidateCalculation() {
    setCalculated({ value: null, error: null });
  }

  function calculate() {
    if (price === null || downPayment === null || rate === null || years === null) {
      setCalculated({ value: null, error: "Заполните стоимость недвижимости, первоначальный взнос, ставку и срок" });
      return;
    }
    try {
      setCalculated({ value: calculateMortgage({ propertyPrice: price, downPayment, annualRate: rate, years }), error: null });
    } catch (error) {
      setCalculated({ value: null, error: error instanceof Error ? error.message : "Проверьте параметры" });
    }
  }

  const shares = calculated.value && price !== null && downPayment !== null ? calculateMortgageShares(price, downPayment, calculated.value) : null;

  return <section className="calculator" aria-labelledby="calculator-title">
    <div className="calculator-intro">
      {showBackNavigation ? <BackNavigation href="/" label="На главную" /> : null}
      <p className="eyebrow">Предварительный расчёт{cityName ? ` · ${cityName}` : ""}</p>
      <Heading id="calculator-title">Проверьте ипотеку<br />до разговора с банком.</Heading>
      <p>Расчёт ориентировочный: итоговые условия зависят от программы банка и параметров сделки.</p>
    </div>
    <div className="calculator-panel">
      <p className={styles.example}>Введите свои данные для предварительного расчёта. Сайт не подставляет цены, ставку или срок.</p>
      <div className="calculator-fields">
        <label>Стоимость недвижимости, ₽
          <input aria-label="Стоимость недвижимости" aria-describedby="price-input-help" type="text" inputMode="numeric" pattern="[0-9 ]*" value={formatMoneyInput(price, focusedMoneyInput === "price")} onFocus={() => setFocusedMoneyInput("price")} onBlur={() => setFocusedMoneyInput(null)} onChange={(event) => { setPrice(parseNumber(event.target.value)); invalidateCalculation(); }} />
          <small id="price-input-help">Введите сумму в рублях, не меньше 0.</small>
        </label>
        <fieldset className="down-payment-field">
          <legend>Первоначальный взнос</legend>
          <div className="choice-row" aria-label="Единицы первоначального взноса">
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "rubles"} onChange={() => { setDownPaymentMode("rubles"); invalidateCalculation(); }} /> В рублях</label>
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "percent"} onChange={() => { setDownPaymentMode("percent"); invalidateCalculation(); }} /> В процентах</label>
          </div>
          {downPaymentMode === "rubles" ? <><input aria-label="Первоначальный взнос в рублях" aria-describedby="down-payment-input-help" type="text" inputMode="numeric" pattern="[0-9 ]*" value={formatMoneyInput(downPayment, focusedMoneyInput === "downPayment")} onFocus={() => setFocusedMoneyInput("downPayment")} onBlur={() => setFocusedMoneyInput(null)} onChange={(event) => { setDownPayment(parseNumber(event.target.value)); invalidateCalculation(); }} /><small id="down-payment-input-help">Сумма не может быть меньше 0 или больше стоимости недвижимости.</small></> : <input aria-label="Первоначальный взнос в процентах" type="number" min="0" max="100" step="0.1" value={price === null || downPayment === null ? "" : downPaymentToPercent(price, downPayment)} onChange={(event) => { const percent = parseNumber(event.target.value); setDownPayment(percent === null || price === null || !Number.isFinite(price) ? null : downPaymentFromPercent(price, percent)); invalidateCalculation(); }} />}
        </fieldset>
        <label>Ставка, % годовых
          <input aria-label="Ставка, % годовых" type="number" min="0" step="0.1" value={rate ?? ""} onChange={(event) => { setRate(parseNumber(event.target.value)); invalidateCalculation(); }} />
        </label>
        <label>Срок, лет
          <input aria-label="Срок, лет" type="number" min="1" step="1" value={years ?? ""} onChange={(event) => { setYears(parseNumber(event.target.value)); invalidateCalculation(); }} />
        </label>
      </div>
      <button className={`button ${styles.calculate}`} type="button" onClick={calculate}>Рассчитать ипотеку</button>
      {calculated.error ? <p className="form-error" role="alert">{calculated.error}</p> : calculated.value && <div className="calculator-result" aria-live="polite">
        <p>Ежемесячный платёж</p><strong>{money.format(calculated.value.monthlyPayment)} ₽</strong>
        <dl><div><dt>Сумма кредита</dt><dd>{money.format(calculated.value.loanAmount)} ₽</dd></div><div><dt>Первоначальный взнос</dt><dd>{money.format(downPayment ?? 0)} ₽</dd></div><div><dt>Переплата</dt><dd>{money.format(calculated.value.overpayment)} ₽</dd></div><div><dt>Всего выплат</dt><dd>{money.format(calculated.value.totalPayment)} ₽</dd></div>{shares && <><div><dt>Взнос от стоимости</dt><dd>{shares.downPaymentPercent}%</dd></div><div><dt>Переплата от суммы кредита</dt><dd>{shares.overpaymentPercent}%</dd></div></>}</dl>
      </div>}
    </div>
  </section>;
}
