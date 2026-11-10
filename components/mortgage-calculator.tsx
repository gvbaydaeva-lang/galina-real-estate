"use client";

import { useMemo, useState } from "react";
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
  headingLevel?: "h1" | "h2";
  showBackNavigation?: boolean;
};

export function MortgageCalculator({ cityName, headingLevel = "h1", showBackNavigation = true }: MortgageCalculatorProps) {
  const [price, setPrice] = useState<number | null>(null);
  const [downPayment, setDownPayment] = useState<number | null>(null);
  const [downPaymentMode, setDownPaymentMode] = useState<"rubles" | "percent">("rubles");
  const [rate, setRate] = useState<number | null>(null);
  const [years, setYears] = useState<number | null>(null);
  const [focusedMoneyInput, setFocusedMoneyInput] = useState<"price" | "downPayment" | null>(null);
  const Heading = headingLevel;

  const result = useMemo(() => {
    if (price === null || downPayment === null || rate === null || years === null) return { value: null, error: null };
    try {
      return { value: calculateMortgage({ propertyPrice: price, downPayment, annualRate: rate, years }), error: null };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : "Проверьте параметры" };
    }
  }, [price, downPayment, rate, years]);
  const shares = result.value && price !== null && downPayment !== null ? calculateMortgageShares(price, downPayment, result.value) : null;

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
          <input aria-label="Стоимость недвижимости" aria-describedby="price-input-help" type="text" inputMode="numeric" pattern="[0-9 ]*" value={formatMoneyInput(price, focusedMoneyInput === "price")} onFocus={() => setFocusedMoneyInput("price")} onBlur={() => setFocusedMoneyInput(null)} onChange={(event) => setPrice(parseNumber(event.target.value))} />
          <small id="price-input-help">Введите сумму в рублях, не меньше 0.</small>
        </label>
        <fieldset className="down-payment-field">
          <legend>Первоначальный взнос</legend>
          <div className="choice-row" aria-label="Единицы первоначального взноса">
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "rubles"} onChange={() => setDownPaymentMode("rubles")} /> В рублях</label>
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "percent"} onChange={() => setDownPaymentMode("percent")} /> В процентах</label>
          </div>
          {downPaymentMode === "rubles" ? <><input aria-label="Первоначальный взнос в рублях" aria-describedby="down-payment-input-help" type="text" inputMode="numeric" pattern="[0-9 ]*" value={formatMoneyInput(downPayment, focusedMoneyInput === "downPayment")} onFocus={() => setFocusedMoneyInput("downPayment")} onBlur={() => setFocusedMoneyInput(null)} onChange={(event) => setDownPayment(parseNumber(event.target.value))} /><small id="down-payment-input-help">Сумма не может быть меньше 0 или больше стоимости недвижимости.</small></> : <input aria-label="Первоначальный взнос в процентах" type="number" min="0" max="100" step="0.1" value={price === null || downPayment === null ? "" : downPaymentToPercent(price, downPayment)} onChange={(event) => { const percent = parseNumber(event.target.value); setDownPayment(percent === null || price === null || !Number.isFinite(price) ? null : downPaymentFromPercent(price, percent)); }} />}
        </fieldset>
        <label>Ставка, % годовых
          <input type="number" min="0" step="0.1" value={rate ?? ""} onChange={(event) => setRate(parseNumber(event.target.value))} />
        </label>
        <label>Срок, лет
          <input type="number" min="1" step="1" value={years ?? ""} onChange={(event) => setYears(parseNumber(event.target.value))} />
        </label>
      </div>
      <button className={`button ${styles.clear}`} type="button" onClick={() => { setPrice(null); setDownPayment(null); setRate(null); setYears(null); setFocusedMoneyInput(null); }}>Очистить расчёт</button>
      {result.error ? <p className="form-error" role="alert">{result.error}</p> : result.value && <div className="calculator-result" aria-live="polite">
        <p>Ежемесячный платёж</p><strong>{money.format(result.value.monthlyPayment)} ₽</strong>
        <dl><div><dt>Сумма кредита</dt><dd>{money.format(result.value.loanAmount)} ₽</dd></div><div><dt>Переплата</dt><dd>{money.format(result.value.overpayment)} ₽</dd></div><div><dt>Всего выплат</dt><dd>{money.format(result.value.totalPayment)} ₽</dd></div>{shares && <><div><dt>Первоначальный взнос от стоимости</dt><dd>{shares.downPaymentPercent}%</dd></div><div><dt>Переплата от суммы кредита</dt><dd>{shares.overpaymentPercent}%</dd></div></>}</dl>
      </div>}
    </div>
  </section>;
}
