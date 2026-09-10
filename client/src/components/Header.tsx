'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = useCart((state) => state.getItemCount());

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            D
          </div>
          <span className="font-bold text-xl text-gray-900">Dumu</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium">
            Products
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
            Categories
          </Link>
          <Link href="/suppliers" className="text-gray-700 hover:text-primary-600 font-medium">
            Suppliers
          </Link>
        </div>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="relative flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <span>🛒</span>
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-primary-600"
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 flex flex-col gap-4">
          <Link href="/products" className="text-gray-700 hover:text-primary-600 font-medium">
            Products
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium">
            Categories
          </Link>
          <Link href="/suppliers" className="text-gray-700 hover:text-primary-600 font-medium">
            Suppliers
          </Link>
        </div>
      )}
    </header>
  );
}
