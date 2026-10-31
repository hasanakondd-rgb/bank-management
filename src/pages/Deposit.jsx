import BalanceCard from '../components/BalanceCard.jsx';
import DepositForm from '../components/DepositForm.jsx';
import { useBank } from '../context/BankContext.jsx';

export default function Deposit() {
  const { balance, deposit } = useBank();

  return (
    <>
      <div className="page-header">
        <h1>Deposit</h1>
      </div>

      <BalanceCard label="Current Balance" amount={balance} variant="balance" />
      <DepositForm onDeposit={deposit} />
    </>
  );
}
