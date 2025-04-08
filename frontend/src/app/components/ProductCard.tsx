'use client';

import React from 'react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { formatCurrency } from '../../../utils/formatCurrency';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const { currency, locale } = useCurrency();

  return (
    <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-xl shadow-md flex flex-col text-white">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg mb-3"
        />
      )}

      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-gray-400 mb-1">From: {product.store}</p>
      <p className="text-md font-bold mb-4">
        {formatCurrency(Number(product.price), currency, locale)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
