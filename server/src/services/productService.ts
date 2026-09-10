import { Product, PaginationParams } from '../types';
import productsData from '../data/products.json';

const ALL_PRODUCTS: Product[] = productsData;

export class ProductService {
  static getProducts(
    page: number = 1,
    limit: number = 20,
    filters?: any
  ): { products: Product[]; pagination: PaginationParams } {
    let filtered = [...ALL_PRODUCTS];

    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters?.supplier) {
      filtered = filtered.filter((p) => p.supplier === filters.supplier);
    }

    if (filters?.minPrice) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice);
    }
    if (filters?.maxPrice) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice);
    }

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    const sortField = filters?.sort || '-createdAt';
    const isDescending = sortField.startsWith('-');
    const field = sortField.replace('-', '') as keyof Product;

    filtered.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === 'string') {
        return isDescending
          ? (bVal as string).localeCompare(aVal as string)
          : (aVal as string).localeCompare(bVal as string);
      }
      return isDescending ? (bVal as number) - (aVal as number) : (aVal as number) - (bVal as number);
    });

    const total = filtered.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const products = filtered.slice(start, start + limit);

    return {
      products,
      pagination: { page, limit, total, pages },
    };
  }

  static getProduct(id: string): Product | null {
    return ALL_PRODUCTS.find((p) => p.id === id) || null;
  }

  static searchProducts(query: string, page: number = 1, limit: number = 20) {
    const q = query.toLowerCase();
    const filtered = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const total = filtered.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const products = filtered.slice(start, start + limit);

    return {
      products,
      pagination: { page, limit, total, pages },
    };
  }
}
