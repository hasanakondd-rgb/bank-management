import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/deposit', label: 'Deposit' },
  { to: '/withdraw', label: 'Withdraw' },
  { to: '/transactions', label: 'Transaction History' },
];

export default function Navbar({ bankName }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="navbar-brand">
          <span className="logo" aria-hidden="true">
            $
          </span>
          {bankName}
        </span>

        <nav aria-label="Main navigation">
          <ul className="nav-links">
            {LINKS.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
