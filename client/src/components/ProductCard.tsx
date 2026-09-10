'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product.id, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
          <Image
            src={product.images[0]?.url || '/placeholder.png'}
            alt={product.images[0]?.alt || product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600">
              KES {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">From {product.supplier}</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
              product.inStock
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
