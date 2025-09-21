import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { logger } from '@/utils/logger';

export interface AuthenticatedRequest<
  P = ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Query
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
  };
}

// JWT authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required'
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    logger.error('JWT_SECRET not configured');
    res.status(500).json({
      success: false,
      message: 'Server configuration error'
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as any;
    (req as AuthenticatedRequest).user = decoded;
    next();
  } catch (error) {
    logger.warn('Invalid token attempt:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Admin role authorization middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;

  if (!authReq.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
    return;
  }

  if (authReq.user.role !== 'admin') {
    logger.warn('Unauthorized admin access attempt:', {
      userId: authReq.user.id,
      email: authReq.user.email,
      role: authReq.user.role,
      ip: req.ip,
      path: req.path
    });

    res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
    return;
  }

  next();
};

// Optional authentication (for endpoints that work with or without auth)
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    next();
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as any;
    (req as AuthenticatedRequest).user = decoded;
  } catch (error) {
    // Ignore invalid tokens for optional auth
    logger.debug('Optional auth failed:', error);
  }

  next();
};