import { Router } from 'express';
import productRoutes from './products';
import categoryRoutes from './categories';
import supplierRoutes from './suppliers';
import orderRoutes from './orders';

const router = Router();

router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/suppliers', supplierRoutes);
router.use('/orders', orderRoutes);

router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default router;
