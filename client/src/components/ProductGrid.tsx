'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInfiniteProducts } from '@/hooks/useProducts';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';

interface ProductGridProps {
  filters?: any;
  limit?: number;
}

export function ProductGrid({ filters, limit = 20 }: ProductGridProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteProducts(limit, filters);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-300 rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold">Failed to load products</p>
      </div>
    );
  }

  const products = data?.pages.flatMap((page) => page.data.items || []) || [];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Infinite scroll observer */}
      <div ref={observerTarget} className="py-8 text-center">
        {isFetchingNextPage && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full" />
          </motion.div>
        )}
      </div>
    </>
  );
}
