import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { asyncHandler } from '../middleware/asyncHandler';
import { createApiError } from '../middleware/errorHandler';

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));

  const filters = {
    category: req.query.category,
    supplier: req.query.supplier,
    minPrice: req.query.minPrice ? parseInt(req.query.minPrice as string) : undefined,
    maxPrice: req.query.maxPrice ? parseInt(req.query.maxPrice as string) : undefined,
    search: req.query.search,
    sort: req.query.sort || '-createdAt',
  };

  const { products, pagination } = ProductService.getProducts(page, limit, filters);

  res.json({
    success: true,
    data: {
      items: products,
      pagination,
    },
  });
});

export const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = ProductService.getProduct(id);

  if (!product) {
    throw createApiError('NOT_FOUND', 'Product not found', 404);
  }

  res.json({
    success: true,
    data: product,
  });
});

export const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query || query.length < 2) {
    throw createApiError('VALIDATION_ERROR', 'Search query must be at least 2 characters', 400);
  }

  const page = Math.max(1, parseInt(req.query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));

  const { products, pagination } = ProductService.searchProducts(query, page, limit);

  res.json({
    success: true,
    data: {
      items: products,
      pagination,
    },
  });
});
