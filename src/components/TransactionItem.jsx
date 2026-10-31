import { formatCurrency, formatDate } from '../utils/helpers.js';

export default function TransactionItem({ transaction }) {
  const { type, amount, date } = transaction;
  const isDeposit = type === 'Deposit';

  return (
    <li
      className={`transaction ${isDeposit ? 'transaction--deposit' : 'transaction--withdraw'}`}
    >
      <span className="transaction-icon" aria-hidden="true">
        {isDeposit ? '↓' : '↑'}
      </span>

      <div className="transaction-info">
        <span className="transaction-type">{type}</span>
        <time dateTime={date}>{formatDate(date)}</time>
      </div>

      <span className="transaction-amount">
        {isDeposit ? '+' : '−'}
        {formatCurrency(amount)}
      </span>
    </li>
  );
}
