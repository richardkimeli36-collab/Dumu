import { Supplier } from '../types';
import suppliersData from '../data/suppliers.json';

const ALL_SUPPLIERS: Supplier[] = suppliersData;

export class SupplierService {
  static getSuppliers(): Supplier[] {
    return ALL_SUPPLIERS;
  }

  static getSupplier(id: string): Supplier | null {
    return ALL_SUPPLIERS.find((s) => s.id === id) || null;
  }
}
