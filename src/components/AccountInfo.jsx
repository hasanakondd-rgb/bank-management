export default function AccountInfo({ holderName, accountNumber }) {
  return (
    <dl className="account-info">
      <div>
        <dt>Account holder</dt>
        <dd>{holderName}</dd>
      </div>
      <div>
        <dt>Account number</dt>
        <dd>{accountNumber}</dd>
      </div>
    </dl>
  );
}
