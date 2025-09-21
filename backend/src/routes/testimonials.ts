import { Router } from 'express';
import {
  submitTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  updateTestimonialApproval,
  getTestimonialSummary,
  deleteTestimonial
} from '@/controllers/testimonialController';
import { validate, antiSpam, sanitizeInput } from '@/middleware/validation';
import { authenticateToken, requireAdmin } from '@/middleware/auth';
import { submissionLimiter, adminLimiter, generalLimiter } from '@/middleware/rateLimit';
import { TestimonialSchema, TestimonialApprovalSchema } from '@/models/Testimonial';

const router = Router();

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: 💬 Get approved testimonials
 *     description: Retrieve all approved testimonials for public display
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter by featured testimonials only
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of testimonials to return
 *     responses:
 *       200:
 *         description: Approved testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/TestimonialResponse'
 *   post:
 *     summary: ✍️ Submit testimonial
 *     description: Submit a new testimonial with spam protection
 *     tags: [Testimonials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestimonialInput'
 *     responses:
 *       201:
 *         description: Testimonial submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         message:
 *                           type: string
 *                           example: "Thank you for your testimonial! It will be reviewed before being published."
 *       400:
 *         description: Validation error or spam detected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Public routes
// @ts-ignore
router.get('/', generalLimiter, getApprovedTestimonials);

router.post(
  '/',
  submissionLimiter,
  sanitizeInput,
  antiSpam,
  validate(TestimonialSchema),
  // @ts-ignore
  submitTestimonial
);

// Admin routes
router.use(authenticateToken, requireAdmin, adminLimiter);

/**
 * @swagger
 * /api/testimonials/all:
 *   get:
 *     summary: 📋 Get all testimonials (Admin only)
 *     description: Retrieve all testimonials including pending approvals
 *     tags: [Testimonials, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: approved
 *         schema:
 *           type: boolean
 *         description: Filter by approval status
 *     responses:
 *       200:
 *         description: All testimonials retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         testimonials:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/TestimonialResponse'
 *                         pagination:
 *                           type: object
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/testimonials/summary:
 *   get:
 *     summary: 📊 Get testimonial summary (Admin only)
 *     description: Get statistical summary of testimonials
 *     tags: [Testimonials, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Testimonial summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: number
 *                           example: 50
 *                         approved:
 *                           type: number
 *                           example: 35
 *                         pending:
 *                           type: number
 *                           example: 15
 *                         featured:
 *                           type: number
 *                           example: 8
 *                         averageRating:
 *                           type: number
 *                           example: 4.8
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/testimonials/{id}/approval:
 *   put:
 *     summary: ✅ Update testimonial approval (Admin only)
 *     description: Approve or disapprove a testimonial submission
 *     tags: [Testimonials, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Testimonial ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - approved
 *             properties:
 *               approved:
 *                 type: boolean
 *                 example: true
 *               featured:
 *                 type: boolean
 *                 example: false
 *                 description: Mark as featured testimonial (optional)
 *     responses:
 *       200:
 *         description: Testimonial approval updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Testimonial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/testimonials/{id}:
 *   delete:
 *     summary: 🗑️ Delete testimonial (Admin only)
 *     description: Permanently delete a testimonial
 *     tags: [Testimonials, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Testimonial not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/all', getAllTestimonials);
router.get('/summary', getTestimonialSummary);
router.put(
  '/:id/approval',
  validate(TestimonialApprovalSchema),
  // @ts-ignore
  updateTestimonialApproval
);
router.delete('/:id', deleteTestimonial);

export default router;