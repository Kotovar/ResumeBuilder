/** Format "YYYY-MM" → "Jan 2020" */
export function fmtDate(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const m = parseInt(month, 10);
  return isNaN(m) ? year : `${months[m - 1]} ${year}`;
}

/** Format a date range, e.g. "Jan 2020 – Present" */
export function dateRange(start: string, end: string, current: boolean): string {
  const s = fmtDate(start);
  const e = current ? 'Present' : fmtDate(end);
  if (!s && !e) return '';
  if (!s) return e;
  if (!e) return s;
  return `${s} – ${e}`;
}

/** Format salary amount + currency, e.g. "$2,000" or "150 000 ₽" */
export function formatSalary(amount: number, currency: 'RUB' | 'USD'): string {
  if (!amount) return '';
  if (currency === 'RUB') return amount.toLocaleString('ru-RU') + '\u00a0₽';
  return '$' + amount.toLocaleString('en-US');
}
