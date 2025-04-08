// utils/formatCurrency.ts

export function formatCurrency(amount: number, currency = 'AED', locale = 'en-AE') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(amount);
  }
  