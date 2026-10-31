import { Link } from 'react-router-dom';

import AccountInfo from '../components/AccountInfo.jsx';
import BalanceCard from '../components/BalanceCard.jsx';
import TransactionList from '../components/TransactionList.jsx';
import { useBank } from '../context/BankContext.jsx';

export default function Dashboard() {
  const { account, balance, totalDeposited, totalWithdrawn, transactions } = useBank();

  return (
    <>
      <div className="page-header">
        <p className="eyebrow">{account.bankName}</p>
        <h1>{account.appTitle}</h1>
      </div>

      <section className="card">
        <AccountInfo
          holderName={account.holderName}
          accountNumber={account.accountNumber}
        />
      </section>

      <div className="card-grid">
        <BalanceCard label="Current Balance" amount={balance} variant="balance" />
        <BalanceCard label="Total Deposited" amount={totalDeposited} variant="deposit" />
        <BalanceCard label="Total Withdrawn" amount={totalWithdrawn} variant="withdraw" />
      </div>

      <section className="card">
        <div className="section-head">
          <h2>Recent Activity</h2>
          <Link to="/transactions">View all</Link>
        </div>
        <TransactionList
          transactions={transactions.slice(0, 3)}
          emptyMessage="No activity yet. Make a deposit to get started."
        />
      </section>
    </>
  );
}
