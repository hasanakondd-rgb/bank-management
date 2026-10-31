import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { formatCurrency, roundMoney, validateAmount } from '../utils/helpers.js';

const STORAGE_KEY = 'bank-management-state-v1';


const ACCOUNT = {
  bankName: 'Evergreen National Bank',
  appTitle: 'Bank Management System',
  holderName: 'Hasan Akond',
  accountNumber: '1029 3847 5561',
};

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    if (typeof data.balance !== 'number' || !Array.isArray(data.transactions)) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const BankContext = createContext(null);

export function BankProvider({ children }) {
  const [balance, setBalance] = useState(() => loadSavedState()?.balance ?? 0);
  const [transactions, setTransactions] = useState(
    () => loadSavedState()?.transactions ?? [],
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ balance, transactions }));
    } catch {}
  }, [balance, transactions]);

  const totalDeposited = useMemo(
    () =>
      roundMoney(
        transactions
          .filter((t) => t.type === 'Deposit')
          .reduce((sum, t) => sum + t.amount, 0),
      ),
    [transactions],
  );

  const totalWithdrawn = useMemo(
    () =>
      roundMoney(
        transactions
          .filter((t) => t.type === 'Withdrawal')
          .reduce((sum, t) => sum + t.amount, 0),
      ),
    [transactions],
  );

  const addTransaction = (type, amount) => {
    const transaction = { id: makeId(), type, amount, date: new Date().toISOString() };
    setTransactions((prev) => [transaction, ...prev]); // newest first
  };

  const deposit = (rawAmount) => {
    const check = validateAmount(rawAmount);
    if (!check.ok) return check;

    setBalance((prev) => roundMoney(prev + check.amount));
    addTransaction('Deposit', check.amount);

    return { ok: true, message: `Successfully deposited ${formatCurrency(check.amount)}.` };
  };

  const withdraw = (rawAmount) => {
    const check = validateAmount(rawAmount, { max: balance });
    if (!check.ok) return check;

    setBalance((prev) => roundMoney(prev - check.amount));
    addTransaction('Withdrawal', check.amount);

    return { ok: true, message: `Successfully withdrew ${formatCurrency(check.amount)}.` };
  };

  const value = {
    account: ACCOUNT,
    balance,
    totalDeposited,
    totalWithdrawn,
    transactions,
    deposit,
    withdraw,
  };

  return <BankContext.Provider value={value}>{children}</BankContext.Provider>;
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used inside a <BankProvider>.');
  }
  return context;
}
