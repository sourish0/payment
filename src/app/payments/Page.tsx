// pages/payments.tsx

import { useEffect, useState } from 'react';

type Payment = {
  id: string;
  amount: number;
  status: string;
  description: string | null;
};

export default function page() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchPayments() {
      const response = await fetch('/api/payments');
      const data = await response.json();
      setPayments(data.payments);
    }

    fetchPayments();
  }, []);

  return (
    <div>
      <h1>Payments</h1>
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <p>Amount: ${payment.amount / 100}</p>
            <p>Status: {payment.status}</p>
            <p>Description: {payment.description || 'No description'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
