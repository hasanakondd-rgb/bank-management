import AmountForm from './AmountForm.jsx';
import { formatCurrency } from '../utils/helpers.js';

export default function WithdrawForm({ balance, onWithdraw }) {
  return (
    <AmountForm
      title="Withdraw Money"
      description={`Available to withdraw: ${formatCurrency(balance)}`}
      label="Withdrawal amount"
      buttonText="Withdraw"
      variant="withdraw"
      max={balance}
      requireConfirm
      confirmVerb="withdraw"
      onSubmit={onWithdraw}
    />
  );
}
