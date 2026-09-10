'use client';

import { useCart } from '@/hooks/useCart';
import { apiService } from '@/services/api';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiry = {
        ...formData,
        products: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const result = await apiService.createOrderInquiry(inquiry);
      if (result.data?.whatsappUrl) {
        window.open(result.data.whatsappUrl, '_blank');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</p>
          <Link href="/products" className="text-primary-600 hover:text-primary-700 font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-medium text-gray-900">{item.productId}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="mb-6 text-right">
              <p className="text-gray-600">Total Items: {items.length}</p>
              <p className="text-3xl font-bold text-primary-600">KES {getTotalPrice().toLocaleString()}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="customerName"
                placeholder="Full Name"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <textarea
                name="message"
                placeholder="Additional message (optional)"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : '📱 Inquire via WhatsApp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
