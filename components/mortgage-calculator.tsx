"use client";

import { useMemo, useState } from "react";
import { calculateMortgage } from "@/lib/mortgage";

const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });

export function MortgageCalculator() {
  const [price, setPrice] = useState(10_000_000);
  const [downPayment, setDownPayment] = useState(2_000_000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(20);
  const result = useMemo(() => {
    try { return { value: calculateMortgage({ propertyPrice: price, downPayment, annualRate: rate, years }), error: null }; }
    catch (error) { return { value: null, error: error instanceof Error ? error.message : "Проверьте параметры" }; }
  }, [price, downPayment, rate, years]);

  return <section className="calculator" aria-labelledby="calculator-title">
    <div className="calculator-intro"><p className="eyebrow">Предварительный расчёт</p><h1 id="calculator-title">Проверьте ипотеку<br />до разговора с банком.</h1><p>Расчёт ориентировочный: итоговые условия зависят от программы банка и параметров сделки.</p></div>
    <div className="calculator-panel"><div className="calculator-fields">
      <label>Стоимость недвижимости<input type="number" min="0" step="100000" value={price} onChange={(event) => setPrice(Number(event.target.value))} /></label>
      <label>Первоначальный взнос<input type="number" min="0" step="100000" value={downPayment} onChange={(event) => setDownPayment(Number(event.target.value))} /></label>
      <label>Ставка, % годовых<input type="number" min="0" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label>
      <label>Срок, лет<input type="number" min="1" step="1" value={years} onChange={(event) => setYears(Number(event.target.value))} /></label>
    </div>{result.error ? <p className="form-error" role="alert">{result.error}</p> : result.value && <div className="calculator-result" aria-live="polite"><p>Ежемесячный платёж</p><strong>{money.format(result.value.monthlyPayment)} ₽</strong><dl><div><dt>Сумма кредита</dt><dd>{money.format(result.value.loanAmount)} ₽</dd></div><div><dt>Переплата</dt><dd>{money.format(result.value.overpayment)} ₽</dd></div><div><dt>Всего выплат</dt><dd>{money.format(result.value.totalPayment)} ₽</dd></div></dl></div>}<p className="calculator-notice">Отправка расчёта появится после подключения защищённой формы и Telegram-интеграции.</p></div>
  </section>;
}
