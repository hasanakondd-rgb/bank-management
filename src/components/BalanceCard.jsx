import { formatCurrency } from '../utils/helpers.js';

export default function BalanceCard({ label, amount, variant = 'balance' }) {
  return (
    <div className={`card balance-card balance-card--${variant}`}>
      <p className="balance-label">{label}</p>
      <p className="balance-amount">{formatCurrency(amount)}</p>
    </div>
  );
}
