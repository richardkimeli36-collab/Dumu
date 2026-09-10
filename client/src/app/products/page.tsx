'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/ProductGrid';

export default function ProductsPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600 mb-8">Browse our complete catalogue of roofing materials and building supplies</p>

        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <input type="range" min="0" max="100000" className="w-full" />
                <p className="text-sm text-gray-600 mt-2">KES 0 - 100,000</p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {['All', 'Roofing Sheets', 'Gutters', 'Fasteners'].map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Supplier */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier</label>
                <div className="space-y-2">
                  {['All Suppliers', 'Mabati Rolling Mills', 'Ruiru Factory'].map((sup) => (
                    <label key={sup} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm text-gray-700">{sup}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="col-span-4 lg:col-span-3">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}
