import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { asyncHandler } from '../middleware/asyncHandler';
import Joi from 'joi';

const createInquirySchema = Joi.object({
  customerName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
  message: Joi.string().optional(),
});

export const createOrderInquiry = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = createInquirySchema.validate(req.body);
  if (error) {
    res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: error.details.map((d) => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      },
    });
    return;
  }

  const inquiry = OrderService.createInquiry(value);
  const whatsappUrl = OrderService.generateWhatsAppUrl(inquiry);

  res.status(201).json({
    success: true,
    data: {
      id: inquiry.id,
      status: inquiry.status,
      whatsappUrl,
      message: 'Inquiry created successfully. You will receive a quote via WhatsApp.',
    },
  });
});
