import { Router } from 'express';
import {
  getPublicProjects,
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectSummary
} from '@/controllers/projectController';
import { validate } from '@/middleware/validation';
import { authenticateToken, requireAdmin } from '@/middleware/auth';
import { adminLimiter, generalLimiter } from '@/middleware/rateLimit';
import { ProjectSchema } from '@/models/Project';

const router = Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: 🛠️ Get public projects
 *     description: Retrieve all visible projects for portfolio display
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter by featured projects only
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of projects to return
 *     responses:
 *       200:
 *         description: Public projects retrieved successfully
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
 *                         $ref: '#/components/schemas/ProjectResponse'
 *   post:
 *     summary: 🚀 Create new project (Admin only)
 *     description: Create a new portfolio project
 *     tags: [Projects, Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: 🎯 Get project by ID
 *     description: Retrieve a specific project by its ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ProjectResponse'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: ✏️ Update project (Admin only)
 *     description: Update an existing project
 *     tags: [Projects, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *       404:
 *         description: Project not found
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
 *   delete:
 *     summary: 🗑️ Delete project (Admin only)
 *     description: Permanently delete a project
 *     tags: [Projects, Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Project not found
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
// Public routes
// @ts-ignore
router.get('/', generalLimiter, getPublicProjects);
// @ts-ignore
router.get('/:id', generalLimiter, getProjectById);

// Admin routes
router.use(authenticateToken, requireAdmin, adminLimiter);

/**
 * @swagger
 * /api/projects/admin/all:
 *   get:
 *     summary: 📋 Get all projects (Admin only)
 *     description: Retrieve all projects including hidden ones for admin management
 *     tags: [Projects, Admin]
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
 *         name: visible
 *         schema:
 *           type: boolean
 *         description: Filter by visibility status
 *     responses:
 *       200:
 *         description: All projects retrieved successfully
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
 *                         projects:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ProjectResponse'
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
 * /api/projects/admin/summary:
 *   get:
 *     summary: 📊 Get project summary (Admin only)
 *     description: Get statistical summary of projects
 *     tags: [Projects, Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Project summary retrieved successfully
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
 *                           example: 12
 *                         visible:
 *                           type: number
 *                           example: 8
 *                         hidden:
 *                           type: number
 *                           example: 4
 *                         featured:
 *                           type: number
 *                           example: 3
 *                         technologies:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "React"
 *                               count:
 *                                 type: number
 *                                 example: 5
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/admin/all', getAllProjects);
router.get('/admin/summary', getProjectSummary);
// @ts-ignore
router.post('/', validate(ProjectSchema), createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;