import TransactionList from '../components/TransactionList.jsx';
import { useBank } from '../context/BankContext.jsx';

export default function Transactions() {
  const { transactions } = useBank();

  return (
    <>
      <div className="page-header">
        <h1>Transaction History</h1>
        <p className="muted">
          {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}, newest first
        </p>
      </div>

      <section className="card">
        <TransactionList
          transactions={transactions}
          emptyMessage="No transactions yet. Your deposits and withdrawals will appear here."
        />
      </section>
    </>
  );
}
