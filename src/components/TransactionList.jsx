import TransactionItem from './TransactionItem.jsx';

export default function TransactionList({
  transactions,
  emptyMessage = 'No transactions yet.',
}) {
  if (transactions.length === 0) {
    return <p className="empty-state">{emptyMessage}</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
