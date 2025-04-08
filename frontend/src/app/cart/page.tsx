'use client';
import React, { useState } from 'react';
import { useCart } from '../../app/context/CartContext';
import { useRouter } from 'next/navigation';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../../../utils/formatCurrency';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { currency, locale } = useCurrency();
  const [address, setAddress] = useState('');
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price.replace(/[^0-9.]/g, '')) * item.quantity,
    0
  );

  const logisticsFee = address ? 25 : 0;
  const total = subtotal + logisticsFee;

  const handleQuote = () => {
    router.push(
      '/payment?' +
        new URLSearchParams({
          address,
          total: total.toString(),
        }).toString()
    );
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-xl">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-400">From {item.store}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-zinc-700 text-white rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-zinc-700 text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
            <span className="font-bold">
              {formatCurrency(Number(item.price), currency, locale)}
            </span>
          </div>
        ))}
      </div>
      
      {/*  Clear cart button*/}
      {cartItems.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear the cart?')) {
                clearCart();
              }
            }}
            className="text-sm text-red-400 hover:text-red-500 underline"
          >
            Clear Cart
          </button>
        </div>
      )}

      <div className="mt-8">
        <label className="block mb-2">Delivery Address:</label>
        <textarea
          rows={3}
          className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mt-6 space-y-2">
        <p>
          Subtotal:{' '}
          <span className="font-semibold">
            {formatCurrency(subtotal, currency, locale)}
          </span>
        </p>
        <p>
          Delivery Fee:{' '}
          <span className="font-semibold">
            {formatCurrency(logisticsFee, currency, locale)}
          </span>
        </p>
        <p className="text-xl font-bold">
          Total: {formatCurrency(total, currency, locale)}
        </p>
      </div>

      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
        onClick={handleQuote}
        disabled={!address}
      >
        Generate Quote
      </button>

      {quoteGenerated && (
        <p className="mt-4 text-green-400">
          ✅ Quote generated! Confirmation email sent.
        </p>
      )}
    </main>
  );
}
