'use client';

import { useSearchParams } from 'next/navigation';
import { useCart } from '../../app/context/CartContext';
import { useState } from 'react';

export default function PaymentPage() {
  const { cartItems, clearCart } = useCart();
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';
  const total = searchParams.get('total') || '0';

  const [email, setEmail] = useState('');
  const [paid, setPaid] = useState(false);

  const handlePayment = async () => {
    // Call send-quote API to trigger email notifications
    const res = await fetch('/api/send-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        address,
        cartItems,
        total,
      }),
    });

    const data = await res.json();
    if (data.success) {
        clearCart();
        setPaid(true);
    } else {
      alert('Payment failed (or email failed).');
    }
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">💳 Payment</h1>

      {!paid ? (
        <>
          <div className="mb-6 space-y-2">
            <h2 className="text-xl font-semibold">Quote Summary</h2>
            <p>Items: {cartItems.length}</p>
            <p>Delivery Address: {address}</p>
            <p className="text-xl font-bold">Total: AED {total}</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Customer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-md text-white"
            />
          </div>

          {/* Fake payment form UI (real Stripe/Flutterwave can be added later) */}
          <div className="mb-6">
            <label className="block mb-2">Card Info (simulated)</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-md text-white"
              disabled
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold"
            onClick={handlePayment}
            disabled={!email}
          >
            Pay Now
          </button>
        </>
      ) : (
        <p className="text-green-400 text-xl mt-6">
          ✅ Payment complete! Receipt sent. Your items are on their way. 🚚
        </p>
      )}
    </main>
  );
}
