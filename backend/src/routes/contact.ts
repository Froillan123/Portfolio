import { Router } from 'express';
import {
  submitContact,
  getContacts,
  getContactSummary,
  updateContactStatus
} from '@/controllers/contactController';
import { validate, antiSpam, sanitizeInput } from '@/middleware/validation';
import { authenticateToken, requireAdmin } from '@/middleware/auth';
import { submissionLimiter, adminLimiter } from '@/middleware/rateLimit';
import { ContactSchema } from '@/models/Contact';

const router = Router();

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: 📝 Submit contact form
 *     description: Submit a new contact form with spam protection and validation
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
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
 *   get:
 *     summary: 📋 Get all contacts (Admin only)
 *     description: Retrieve all contact form submissions with pagination
 *     tags: [Contact, Admin]
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
 *         name: status
 *         schema:
 *           type: string
 *           enum: [unread, read, replied]
 *         description: Filter by contact status
 *     responses:
 *       200:
 *         description: List of contacts retrieved successfully
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
 *                         contacts:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ContactResponse'
 *                         pagination:
 *                           type: object
 *                           properties:
 *                             page:
 *                               type: number
 *                               example: 1
 *                             limit:
 *                               type: number
 *                               example: 10
 *                             total:
 *                               type: number
 *                               example: 50
 *                             pages:
 *                               type: number
 *                               example: 5
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Forbidden - Admin access required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
// Public routes
router.post(
  '/',
  submissionLimiter,
  sanitizeInput,
  antiSpam,
  validate(ContactSchema),
  // @ts-ignore
  submitContact
);

// Admin routes
router.use(authenticateToken, requireAdmin, adminLimiter);

/**
 * @swagger
 * /api/contact/summary:
 *   get:
 *     summary: 📊 Get contact summary (Admin only)
 *     description: Get statistical summary of contact form submissions
 *     tags: [Contact, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact summary retrieved successfully
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
 *                           example: 150
 *                         unread:
 *                           type: number
 *                           example: 25
 *                         read:
 *                           type: number
 *                           example: 100
 *                         replied:
 *                           type: number
 *                           example: 25
 *                         thisMonth:
 *                           type: number
 *                           example: 30
 *                         lastMonth:
 *                           type: number
 *                           example: 45
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/contact/{id}/status:
 *   put:
 *     summary: 🔄 Update contact status (Admin only)
 *     description: Update the status of a contact form submission
 *     tags: [Contact, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [unread, read, replied]
 *                 example: read
 *     responses:
 *       200:
 *         description: Contact status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid status value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Contact not found
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

router.get('/', getContacts);
router.get('/summary', getContactSummary);
router.put('/:id/status', updateContactStatus);

export default router;