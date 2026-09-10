import { Router } from 'express';
import { createOrderInquiry } from '../controllers/orderController';

const router = Router();

router.post('/inquiry', createOrderInquiry);

export default router;
