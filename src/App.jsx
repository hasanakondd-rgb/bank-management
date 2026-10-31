import { Navigate, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Deposit from './pages/Deposit.jsx';
import Withdraw from './pages/Withdraw.jsx';
import Transactions from './pages/Transactions.jsx';
import { useBank } from './context/BankContext.jsx';

export default function App() {
  const { account } = useBank();

  return (
    <div className="app">
      {}
      <Navbar bankName={account.bankName} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transactions" element={<Transactions />} />
          {/* Unknown URLs go back to the dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        Thank you for banking with us.
      </footer>
    </div>
  );
}
