export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  category: string;
  supplier: string;
  images: ProductImage[];
  specs: ProductSpec[];
  inStock: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  icon?: string;
}

export interface Supplier {
  id: string;
  name: string;
  location: string;
  productCount: number;
  rating: number;
  verified: boolean;
}

export interface OrderInquiry {
  id?: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  products: CartItem[];
  message?: string;
  status?: 'pending' | 'contacted' | 'completed';
  createdAt?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
