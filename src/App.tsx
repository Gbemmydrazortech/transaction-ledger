import { useState } from 'react';
import './App.css';

interface Transaction {
id: string;
date: string;
description: string;
amount: number;
category: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
{
id: '1',
date: '2026-10-24',
description: 'Monthly Salary',
amount: 450000,
category: 'Salary',
},
{
id: '2',
date: '2026-10-25',
description: 'Supermarket Shopping',
amount: -35000,
category: 'Groceries',
},
{
id: '3',
date: '2026-10-25',
description: 'Stocks Dividend',
amount: 12000,
category: 'Investment',
},
{
id: '4',
date: '2026-10-26',
description: 'Restaurant Dinner',
amount: -18000,
category: 'Groceries',
},
];

function App() {
const [selectedCategory, setSelectedCategory] =
useState<string>('All');

const [searchText, setSearchText] = useState<string>('');

const categories = [
'All',
...new Set(MOCK_TRANSACTIONS.map((transaction) => transaction.category)),
];

const filteredTransactions = MOCK_TRANSACTIONS.filter(
  (transaction) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      transaction.category === selectedCategory;

  const matchesSearch =
  transaction.description.toLowerCase().includes(searchText.toLowerCase()) ||
  transaction.category.toLowerCase().includes(searchText.toLowerCase()) ||
  transaction.date.includes(searchText);

    return matchesCategory && matchesSearch;
  },
);

const totalBalance = filteredTransactions.reduce(
(sum, transaction) => sum + transaction.amount,
0,
);

const formatCurrency = (amount: number): string =>
new Intl.NumberFormat('en-NG', {
style: 'currency',
currency: 'NGN',
maximumFractionDigits: 2,
}).format(amount);

return (
<main className="dashboard">
<header className="dashboard-header">
<div>
<p className="eyebrow">PERSONAL FINANCE</p>
<h1>Transaction Ledger</h1>
<p className="subtitle">
Track your income and expenses in one place.
</p>
</div>

    <div className="account-badge" aria-label="Demo account">
      Demo Account
    </div>
  </header>

  <section className="balance-card" aria-live="polite">
    <p className="balance-label">
      {selectedCategory === 'All'
        ? 'Total Balance'
        : `${selectedCategory} Balance`}
    </p>

    <h2 className={totalBalance < 0 ? 'negative' : 'positive'}>
      {formatCurrency(totalBalance)}
    </h2>

    <p className="balance-note">
      Calculated from {filteredTransactions.length}{' '}
      {filteredTransactions.length === 1
        ? 'transaction'
        : 'transactions'}
    </p>
  </section>

  <section className="transactions-section">
    <div className="section-heading">
      <div>
        <h2>Recent Transactions</h2>
        <p>Review your latest financial activity.</p>
      </div>
      
    <div className="search-control">
  <label htmlFor="transaction-search">
    Search Transactions
  </label>

  <input
    id="transaction-search"
    type="text"
    placeholder="Search descriptions..."
    value={searchText}
    onChange={(event) =>
      setSearchText(event.target.value)
    }
  />
</div>

      <div className="filter-control">
        <label htmlFor="category-filter">Category</label>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value)
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'All' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col" className="amount-heading">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="date-cell">{transaction.date}</td>

              <td className="description-cell">
                {transaction.description}
              </td>

              <td>
                <span className="category-badge">
                  {transaction.category}
                </span>
              </td>

              <td
                className={`amount-cell ${
                  transaction.amount < 0 ? 'expense' : 'income'
                }`}
              >
                {transaction.amount > 0 ? '+' : ''}
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}

          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan={4} className="empty-state">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <p className="table-footer">
      Showing {filteredTransactions.length} of{' '}
      {MOCK_TRANSACTIONS.length} transactions
    </p>
  </section>

  <footer className="dashboard-footer">
    <p>Transaction Ledger · React + TypeScript</p>
    <p>Demo data only — not connected to a bank.</p>
  </footer>
</main>

);
}

export default App;