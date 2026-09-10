import { Router } from 'express';
import { getSuppliers } from '../controllers/supplierController';

const router = Router();

router.get('/', getSuppliers);

export default router;
