import { Router } from 'express';
import contactRoutes from './contact';
import testimonialRoutes from './testimonials';
import projectRoutes from './projects';
import { checkDatabaseHealth } from '@/utils/database';
import { logger } from '@/utils/logger';

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: 🏥 Health check endpoint
 *     description: Check the health status of the API and database connection
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Portfolio API is running"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 environment:
 *                   type: string
 *                   example: "development"
 *                 database:
 *                   type: string
 *                   example: "connected"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *       503:
 *         description: Service unavailable
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const dbHealthy = await checkDatabaseHealth();

    res.json({
      success: true,
      message: 'Portfolio API is running',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: dbHealthy ? 'connected' : 'disconnected',
      version: '1.0.0'
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'Service unavailable',
      timestamp: new Date().toISOString()
    });
  }
});

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    author: 'Froillan Kim B. Edem',
    endpoints: {
      contact: '/api/contact',
      testimonials: '/api/testimonials',
      projects: '/api/projects',
      health: '/api/health'
    },
    documentation: 'https://github.com/your-username/portfolio-backend#api-documentation'
  });
});

// Route handlers
router.use('/contact', contactRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/projects', projectRoutes);

// 404 handler for API routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

export default router;