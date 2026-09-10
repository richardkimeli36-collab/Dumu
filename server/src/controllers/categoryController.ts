import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { asyncHandler } from '../middleware/asyncHandler';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = CategoryService.getCategories();

  res.json({
    success: true,
    data: categories,
  });
});
