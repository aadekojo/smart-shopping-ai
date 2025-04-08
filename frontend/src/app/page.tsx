'use client';
import React, { useState } from 'react';
import SearchBar from '../app/components/SearchBar';
import ProductCard from '../app/components/ProductCard';
import { Product } from '../app/types/Product';
import { useRouter } from 'next/navigation';
import { useCart } from '../app/context/CartContext';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: '3599',
    store: 'Amazon',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-family-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346289',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: '2799',
    store: 'Noon',
    image: 'https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-5g-1.jpg',
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    price: '4599',
    store: 'Apple',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-m2-hero-spacegray-20220606?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1654122872852',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    price: '1299',
    store: 'Sony',
    image: 'https://m.media-amazon.com/images/I/61b0gGZfQyL._AC_SL1500_.jpg',
  },
  {
    id: '5',
    name: 'Dell XPS 13 Laptop',
    price: '3999',
    store: 'Dell',
    image: 'https://i.dell.com/sites/csimages/Video_Imagery/all/xps-13-9315-laptop-pdp-mod1.jpg',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { cartItems } = useCart();

  const handleSearch = async (query: string) => {
    setLoading(true);
    setProducts([]);

    // Simulate search delay
    setTimeout(() => {
      setProducts(mockProducts); // You can later connect this to a real AI API
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-900 text-white">
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-3xl font-bold mb-6">🧠 AI Shopping Assistant</h1>
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="mt-12 animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-30" />
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
