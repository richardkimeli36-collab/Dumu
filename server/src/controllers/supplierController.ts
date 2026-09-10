import { Request, Response } from 'express';
import { SupplierService } from '../services/supplierService';
import { asyncHandler } from '../middleware/asyncHandler';

export const getSuppliers = asyncHandler(async (req: Request, res: Response) => {
  const suppliers = SupplierService.getSuppliers();

  res.json({
    success: true,
    data: suppliers,
  });
});
