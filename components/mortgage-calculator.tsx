"use client";

import { type FormEvent, useMemo, useState } from "react";
import { calculateMortgage, downPaymentFromPercent, downPaymentToPercent } from "@/lib/mortgage";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

type MortgageCalculatorProps = {
  cityName?: string;
  headingLevel?: "h1" | "h2";
};

export function MortgageCalculator({ cityName, headingLevel = "h1" }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(10_000_000);
  const [downPayment, setDownPayment] = useState(2_000_000);
  const [downPaymentMode, setDownPaymentMode] = useState<"rubles" | "percent">("rubles");
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(20);
  const [formStatus, setFormStatus] = useState<"idle" | "not-connected">("idle");
  const Heading = headingLevel;

  const result = useMemo(() => {
    try {
      return { value: calculateMortgage({ propertyPrice: price, downPayment, annualRate: rate, years }), error: null };
    } catch (error) {
      return { value: null, error: error instanceof Error ? error.message : "Проверьте параметры" };
    }
  }, [price, downPayment, rate, years]);

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
      <div className="calculator-fields">
        <label>Стоимость недвижимости, ₽
          <input type="number" min="0" step="100000" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
        </label>
        <fieldset className="down-payment-field">
          <legend>Первоначальный взнос</legend>
          <div className="choice-row" aria-label="Единицы первоначального взноса">
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "rubles"} onChange={() => setDownPaymentMode("rubles")} /> В рублях</label>
            <label><input type="radio" name={`down-payment-mode-${cityName ?? "page"}`} checked={downPaymentMode === "percent"} onChange={() => setDownPaymentMode("percent")} /> В процентах</label>
          </div>
          {downPaymentMode === "rubles" ? <input aria-label="Первоначальный взнос в рублях" type="number" min="0" step="100000" value={downPayment} onChange={(event) => setDownPayment(Number(event.target.value))} /> : <input aria-label="Первоначальный взнос в процентах" type="number" min="0" max="100" step="0.1" value={downPaymentToPercent(price, downPayment)} onChange={(event) => setDownPayment(downPaymentFromPercent(price, Number(event.target.value)))} />}
        </fieldset>
        <label>Ставка, % годовых
          <input type="number" min="0" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} />
        </label>
        <label>Срок, лет
          <input type="number" min="1" step="1" value={years} onChange={(event) => setYears(Number(event.target.value))} />
        </label>
      </div>
      {result.error ? <p className="form-error" role="alert">{result.error}</p> : result.value && <div className="calculator-result" aria-live="polite">
        <p>Ежемесячный платёж</p><strong>{money.format(result.value.monthlyPayment)} ₽</strong>
        <dl><div><dt>Сумма кредита</dt><dd>{money.format(result.value.loanAmount)} ₽</dd></div><div><dt>Переплата</dt><dd>{money.format(result.value.overpayment)} ₽</dd></div><div><dt>Всего выплат</dt><dd>{money.format(result.value.totalPayment)} ₽</dd></div></dl>
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
