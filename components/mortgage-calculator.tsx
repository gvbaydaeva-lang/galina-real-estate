"use client";

import { type FormEvent, useMemo, useState } from "react";
import { calculateMortgage, calculateMortgageShares, downPaymentFromPercent, downPaymentToPercent } from "@/lib/mortgage";
import styles from "./mortgage-calculator.module.css";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const exampleCalculation = { price: 10_000_000, downPayment: 2_000_000, rate: 12, years: 20 };

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
};

export function MortgageCalculator({ cityName, headingLevel = "h1" }: MortgageCalculatorProps) {
  const [price, setPrice] = useState<number | null>(exampleCalculation.price);
  const [downPayment, setDownPayment] = useState<number | null>(exampleCalculation.downPayment);
  const [downPaymentMode, setDownPaymentMode] = useState<"rubles" | "percent">("rubles");
  const [rate, setRate] = useState<number | null>(exampleCalculation.rate);
  const [years, setYears] = useState<number | null>(exampleCalculation.years);
  const [focusedMoneyInput, setFocusedMoneyInput] = useState<"price" | "downPayment" | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "not-connected">("idle");
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

  function handleRequestSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("not-connected");
  }

  return <section className="calculator" aria-labelledby="calculator-title">
    <div className="calculator-intro">
      <p className="eyebrow">Предварительный расчёт{cityName ? ` · ${cityName}` : ""}</p>
      <Heading id="calculator-title">Проверьте ипотеку<br />до разговора с банком.</Heading>
      <p>Расчёт ориентировочный: итоговые условия зависят от программы банка и параметров сделки.</p>
    </div>
    <div className="calculator-panel">
      <p className={styles.example}>Пример расчёта: значения в полях можно заменить своими или очистить.</p>
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
      <form className="calculation-request" onSubmit={handleRequestSubmit}>
        <h3>Получить расчёт</h3>
        <p>Форма готова для защищённого канала. До его подключения данные не отправляются и не сохраняются.</p>
        <label>Имя<input name="name" autoComplete="name" required /></label>
        <label>Телефон<input name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></label>
        <label className="consent-field"><input name="consent" type="checkbox" required /> Согласен(на) на обработку данных для ответа на заявку</label>
        <button className="button button-primary" type="submit">Подготовить заявку</button>
        {formStatus === "not-connected" && <p className="form-error" role="status">Защищённая отправка пока не подключена: данные не сохранены и никуда не переданы.</p>}
      </form>
    </div>
  </section>;
}
