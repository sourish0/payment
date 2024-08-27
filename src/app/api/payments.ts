// pages/api/payments.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

type Payment = {
  id: string;
  amount: number;
  status: string;
  description: string | null;
};

type Data = {
  payments: Payment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | { error: string }>
) {
  try {
    const charges = await stripe.charges.list({
      limit: 10, // Adjust the limit as needed
    });

    const payments: Payment[] = charges.data.map(charge => ({
      id: charge.id,
      amount: charge.amount,
      status: charge.status,
      description: charge.description,
    }));

    res.status(200).json({ payments });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
