const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export const formatCurrency = (value) => currencyFormatter.format(value);

export const formatDate = (isoString) => dateFormatter.format(new Date(isoString));


export const roundMoney = (value) => Math.round(value * 100) / 100;


export function validateAmount(raw, { max } = {}) {
  const text = String(raw).trim();

  if (text === '') {
    return { ok: false, message: 'Please enter an amount.' };
  }

  const amount = Number(text);

  if (!Number.isFinite(amount)) {
    return { ok: false, message: 'Please enter a valid number.' };
  }

  if (amount <= 0) {
    return { ok: false, message: 'Amount must be greater than zero.' };
  }

  if (roundMoney(amount) !== amount) {
    return { ok: false, message: 'Amount can have at most 2 decimal places.' };
  }

  if (max !== undefined && amount > max) {
    return {
      ok: false,
      message: `Insufficient funds. Your available balance is ${formatCurrency(max)}.`,
    };
  }

  return { ok: true, amount };
}
