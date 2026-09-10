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
  customerName: string;
  phoneNumber: string;
  email: string;
  products: CartItem[];
  message?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    items?: T[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  };
}
