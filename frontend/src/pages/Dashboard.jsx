import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    api.get('/sales/summary').then((res) => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Revenue: {summary.revenue}</p>
      <p>Expenses: {summary.expenses}</p>
      <p>Profit: {summary.profit}</p>
    </div>
  );
}
