import { OrderInquiry } from '../types';

const orders: OrderInquiry[] = [];

export class OrderService {
  static createInquiry(inquiry: Omit<OrderInquiry, 'id' | 'status' | 'createdAt'>): OrderInquiry {
    const newInquiry: OrderInquiry = {
      ...inquiry,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    orders.push(newInquiry);
    return newInquiry;
  }

  static getInquiry(id: string): OrderInquiry | null {
    return orders.find((o) => o.id === id) || null;
  }

  static getInquiries(): OrderInquiry[] {
    return orders;
  }

  static generateWhatsAppUrl(inquiry: OrderInquiry): string {
    const phoneNumber = inquiry.phoneNumber.replace(/\D/g, '');
    const message = `Hello, I'm interested in the following products:\n${inquiry.products
      .map((p) => `- Product ID: ${p.productId}, Quantity: ${p.quantity}`)
      .join('\n')}\n\nMessage: ${inquiry.message || 'Please provide a quote'}\n\nCustomer: ${inquiry.customerName}\nEmail: ${inquiry.email}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }
}
