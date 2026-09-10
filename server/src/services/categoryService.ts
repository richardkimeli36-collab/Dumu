import { Category } from '../types';
import categoriesData from '../data/categories.json';

const ALL_CATEGORIES: Category[] = categoriesData;

export class CategoryService {
  static getCategories(): Category[] {
    return ALL_CATEGORIES;
  }

  static getCategory(id: string): Category | null {
    return ALL_CATEGORIES.find((c) => c.id === id) || null;
  }
}
