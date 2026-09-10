import axios, { AxiosInstance } from 'axios';
import { Product, Category, Supplier, PaginatedResponse, OrderInquiry } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }

  // Products
  async getProducts(page = 1, limit = 20, filters?: any) {
    const response = await this.client.get<any>('/products', {
      params: {
        page,
        limit,
        ...filters,
      },
    });
    return response.data;
  }

  async getProduct(id: string) {
    const response = await this.client.get<any>(`/products/${id}`);
    return response.data;
  }

  async searchProducts(query: string, page = 1, limit = 20) {
    const response = await this.client.get<any>('/products/search', {
      params: { q: query, page, limit },
    });
    return response.data;
  }

  // Categories
  async getCategories() {
    const response = await this.client.get<any>('/categories');
    return response.data;
  }

  // Suppliers
  async getSuppliers() {
    const response = await this.client.get<any>('/suppliers');
    return response.data;
  }

  // Orders
  async createOrderInquiry(inquiry: OrderInquiry) {
    const response = await this.client.post<any>('/orders/inquiry', inquiry);
    return response.data;
  }
}

export const apiService = new ApiService();
