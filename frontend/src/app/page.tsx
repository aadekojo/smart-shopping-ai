'use client';
import React, { useState } from 'react';
import SearchBar from '../app/components/SearchBar';
import ProductCard from '../app/components/ProductCard';
import { Product } from '../app/types/Product';
import { useRouter } from 'next/navigation';
import { useCart } from '../app/context/CartContext';


export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();

  const handleSearch = async (query: string) => {
    setLoading(true);
    setProducts([]);

  // Here’s where the search API is called 
  const res = await fetch('/api/ai-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  setProducts(data.products || []);
  setLoading(false);
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-3xl font-bold mb-6"> Deliverado Shopping Assistant</h1>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="mt-12 animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-30" />
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {products.map((p, index) => (
              <ProductCard key={p.id || `${p.name}-${index}`} product={p}/>
            ))}
          </div>
        )}
      </div>
      <footer className="mt-auto pt-12 text-center text-sm text-gray-400">
  Built by{' '}
  <a
    href="https://github.com/aadekojo"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline"
  >
    Adekojo Abimbola © 2025
  </a>{' '}
  |{' '}
  <a
    href="https://linkedin.com/in/adekojo-abimbola"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 hover:underline"
  >
    LinkedIn
  </a>
</footer>

    </main>
  );
}
