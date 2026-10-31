import BalanceCard from '../components/BalanceCard.jsx';
import WithdrawForm from '../components/WithdrawForm.jsx';
import { useBank } from '../context/BankContext.jsx';

export default function Withdraw() {
  const { balance, withdraw } = useBank();

  return (
    <>
      <div className="page-header">
        <h1>Withdraw</h1>
      </div>

      <BalanceCard label="Current Balance" amount={balance} variant="balance" />
      <WithdrawForm balance={balance} onWithdraw={withdraw} />
    </>
  );
}
