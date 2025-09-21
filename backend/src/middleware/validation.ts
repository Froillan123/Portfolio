import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { logger } from '@/utils/logger';

export interface ValidatedRequest<T = any> extends Request {
  validatedData: T;
}

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// Generic validation middleware factory
export const validate = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validatedData = schema.parse(req.body);
      (req as ValidatedRequest<T>).validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn('Validation error:', {
          path: req.path,
          method: req.method,
          errors: error.errors,
          body: req.body
        });

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code
          }))
        });
        return;
      }

      logger.error('Unexpected validation error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error during validation'
      });
    }
  };
};

// Spam protection middleware (checks honeypot)
export const antiSpam = (req: Request, res: Response, next: NextFunction): void => {
  const honeypot = req.body.website;

  if (honeypot && honeypot.trim() !== '') {
    logger.warn('Spam attempt detected:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      honeypot: honeypot
    });

    // Return success to not reveal spam detection
    res.status(200).json({
      success: true,
      message: 'Thank you for your submission!'
    });
    return;
  }

  next();
};

// Input sanitization middleware
export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        // Basic HTML tag removal and trim
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<[^>]*>/g, '')
          .trim();
      }
    }
  }
  next();
};