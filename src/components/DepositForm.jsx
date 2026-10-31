import AmountForm from './AmountForm.jsx';

export default function DepositForm({ onDeposit }) {
  return (
    <AmountForm
      title="Deposit Money"
      description="Add funds to your account."
      label="Deposit amount"
      buttonText="Deposit"
      variant="deposit"
      onSubmit={onDeposit}
    />
  );
}
