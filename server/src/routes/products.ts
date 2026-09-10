import { Router } from 'express';
import { getProducts, getProduct, searchProducts } from '../controllers/productController';

const router = Router();

router.get('/search', searchProducts);
router.get('/:id', getProduct);
router.get('/', getProducts);

export default router;
