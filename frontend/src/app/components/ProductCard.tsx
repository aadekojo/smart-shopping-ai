// src/components/ProductCard.tsx
import React from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  store: string;
  image?: string;
}

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="p-4 border rounded-xl shadow-sm flex flex-col">
      {product.image && <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />}
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">From: {product.store}</p>
      <p className="font-bold my-1">{product.price}</p>
      <button
        className="mt-auto bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
