# Bank Management System

A simple, frontend-only Bank Management System built with **React** and **Vite**. Users can view account information, check their balance, deposit money, withdraw money, and browse their transaction history.

> **Note:** This is a practice project. There is no backend, database, or real bank account. All balances are simulated and stored in the browser's `localStorage`.

## Features

- **Dashboard**: bank name, application title, account holder, account number, current balance, total deposited, total withdrawn, and the three most recent transactions.
- **Deposit**: form with validation (empty, zero, and negative amounts are rejected), instant balance update, and a success message.
- **Withdraw**: rejects zero, negative, and over-balance amounts, shows clear success or error messages, and asks for confirmation before withdrawing.
- **Transaction History**: every deposit and withdrawal with its type, amount, and date, newest first. Deposits are styled green and withdrawals red. A friendly message appears when there are no transactions.
- **Navigation**: React Router DOM with `NavLink`; the same navbar appears on every page and highlights the active page.
- **Persistence**: balance and transactions are saved to `localStorage` and survive a page refresh.
- **Responsive design**: works on phones, tablets, and desktops.

## Tech Stack

- React 18 (functional components, hooks)
- Vite
- React Router DOM v6
- Plain CSS (no UI library)

## Concepts Practised

| Concept | Where |
| --- | --- |
| `useState` | `BankContext` (balance, transactions), `AmountForm` (input, messages, confirmation) |
| `useEffect` | Saving to `localStorage`, focusing the input on page load |
| `useRef` | Focusing the amount input in `AmountForm` |
| Context API | `context/BankContext.jsx` shares account data and actions across pages |
| Props and composition | `DepositForm` and `WithdrawForm` are built on the shared `AmountForm`; `TransactionList` renders `TransactionItem`s |
| Conditional rendering | Empty transaction list, success/error messages, confirmation box |
| Lists with `map()` | `TransactionList` |
| Routing | `App.jsx`, `Navbar.jsx` |

## Project Structure

```
bank-management/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx                  # App entry: Router + Context provider
    ├── App.jsx                   # Navbar + route definitions
    ├── index.css                 # Global responsive styles
    ├── context/
    │   └── BankContext.jsx       # Balance, transactions, deposit/withdraw logic
    ├── components/
    │   ├── Navbar.jsx
    │   ├── AccountInfo.jsx
    │   ├── BalanceCard.jsx
    │   ├── AmountForm.jsx        # Shared form (validation, messages, confirmation)
    │   ├── DepositForm.jsx
    │   ├── WithdrawForm.jsx
    │   ├── Message.jsx
    │   ├── TransactionList.jsx
    │   └── TransactionItem.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Deposit.jsx
    │   ├── Withdraw.jsx
    │   └── Transactions.jsx
    └── utils/
        └── helpers.js            # Currency/date formatting and amount validation
```

## Installation

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/bank-management.git
cd bank-management

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open the local URL printed in the terminal (usually http://localhost:5173).

### Other scripts

```bash
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## How to Use

1. Open **Deposit** and add some money. The balance starts at $0.00.
2. Open **Withdraw** and withdraw part of it. You will be asked to confirm.
3. Try invalid amounts (empty, `0`, negative, or more than your balance) to see the error messages.
4. Check **Transaction History** and the **Dashboard** totals.
5. Refresh the page. Your data is still there.

To start over, clear the site's data in your browser's developer tools (Application → Local Storage), or run `localStorage.clear()` in the console.

## Customising the Account

The demo account holder, account number, and bank name are defined in the `ACCOUNT` object at the top of `src/context/BankContext.jsx`.
