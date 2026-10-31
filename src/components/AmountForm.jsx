import { useEffect, useId, useRef, useState } from 'react';

import Message from './Message.jsx';
import { formatCurrency, validateAmount } from '../utils/helpers.js';


export default function AmountForm({
  title,
  description,
  label = 'Amount',
  buttonText,
  variant,
  max,
  requireConfirm = false,
  confirmVerb = 'continue with',
  onSubmit,
}) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(null);

  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setFeedback(null);
  };

  const finish = (result) => {
    setFeedback(result);
    setPendingAmount(null);
    if (result.ok) setValue('');
    inputRef.current?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const check = validateAmount(value, { max });
    if (!check.ok) {
      setPendingAmount(null);
      setFeedback({ ok: false, message: check.message });
      inputRef.current?.focus();
      return;
    }

    if (requireConfirm) {
      setFeedback(null);
      setPendingAmount(check.amount);
      return;
    }

    finish(onSubmit(check.amount));
  };

  const handleConfirm = () => finish(onSubmit(pendingAmount));

  const handleCancel = () => {
    setPendingAmount(null);
    inputRef.current?.focus();
  };

  const isConfirming = pendingAmount !== null;

  return (
    <section className={`card form-card form-card--${variant}`}>
      <h2>{title}</h2>
      {description && <p className="muted">{description}</p>}

      {}
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor={inputId}>{label}</label>
        <div className="input-row">
          <span className="input-prefix" aria-hidden="true">
            $
          </span>
          <input
            id={inputId}
            ref={inputRef}
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={value}
            onChange={handleChange}
            readOnly={isConfirming}
          />
        </div>

        {feedback && (
          <Message type={feedback.ok ? 'success' : 'error'}>{feedback.message}</Message>
        )}

        {isConfirming && (
          <div className="confirm" role="group" aria-label="Confirmation">
            <p>
              Are you sure you want to {confirmVerb} <strong>{formatCurrency(pendingAmount)}</strong>?
            </p>
            <div className="confirm-actions">
              <button type="button" className={`btn btn--${variant}`} onClick={handleConfirm}>
                Yes, {confirmVerb}
              </button>
              <button type="button" className="btn btn--ghost" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className={`btn btn--${variant} btn--block`}
          disabled={isConfirming}
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}
