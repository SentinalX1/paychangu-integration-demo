import { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get('tx_ref');
  const status = searchParams.get('status');

  if (!tx_ref || !status) {
    return new Response(JSON.stringify({ message: 'Missing tx_ref or status' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const secretKey = process.env.PAYCHANGU_SECRET_KEY;
    if (!secretKey) {
      throw new Error('Missing PAYCHANGU_SECRET_KEY in environment');
    }

    const verifyUrl = `https://api.paychangu.com/verify-payment/${tx_ref}`;

    const { data } = await axios.get(verifyUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${secretKey}`,
      },
    });

    if (data.status === 'success') {
      console.log('✅ Payment verified:', data);

      // TODO: update DB, mark order as paid, etc.

      return new Response(JSON.stringify({ message: 'Payment verified successfully', tx_ref }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.warn('❌ Payment not successful:', data);
      return new Response(JSON.stringify({ message: 'Payment not successful', tx_ref }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    return new Response(JSON.stringify({ message: 'Error verifying payment' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
