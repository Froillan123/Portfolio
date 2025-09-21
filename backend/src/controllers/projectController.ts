import { Response } from 'express';
import { prisma } from '@/utils/database';
import { logger } from '@/utils/logger';
import {
  ProjectInput,
  ProjectUpdateInput,
  ProjectResponse,
  PublicProjectResponse,
  ProjectSummary
} from '@/models/Project';
import { ValidatedRequest, AuthenticatedRequest } from '@/middleware/validation';

// Helper function to parse JSON fields
const parseProjectData = (project: any): ProjectResponse => ({
  ...project,
  features: JSON.parse(project.features),
  techStack: JSON.parse(project.techStack),
  technologies: JSON.parse(project.technologies)
});

// Get all visible projects (public)
export const getPublicProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const featured = req.query.featured === 'true';

    const where = {
      visible: true,
      ...(featured && { featured: true })
    };

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured first
        { order: 'asc' },     // Then by order
        { createdAt: 'desc' }  // Then by creation date
      ],
      select: {
        id: true,
        title: true,
        subtitle: true,
        description: true,
        features: true,
        techStack: true,
        technologies: true,
        imageUrl: true,
        liveUrl: true,
        githubUrl: true,
        order: true
        // Don't include admin fields like visible, featured, createdAt, updatedAt
      }
    });

    const parsedProjects: PublicProjectResponse[] = projects.map((project: any) => ({
      ...project,
      features: JSON.parse(project.features),
      techStack: JSON.parse(project.techStack),
      technologies: JSON.parse(project.technologies)
    }));

    res.json({
      success: true,
      data: parsedProjects
    });
  } catch (error) {
    logger.error('Error fetching public projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get all projects (admin only)
export const getAllProjects = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const visible = req.query.visible;
    const skip = (page - 1) * limit;

    let where = {};
    if (visible === 'true') where = { visible: true };
    if (visible === 'false') where = { visible: false };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [
          { featured: 'desc' },
          { order: 'asc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.project.count({ where })
    ]);

    const parsedProjects = projects.map(parseProjectData);

    res.json({
      success: true,
      data: {
        projects: parsedProjects,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching all projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
};

// Get single project (public)
export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        visible: true // Only visible projects for public access
      }
    });

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    const parsedProject = parseProjectData(project);

    res.json({
      success: true,
      data: parsedProject
    });
  } catch (error) {
    logger.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
};

// Create project (admin only)
export const createProject = async (
  req: ValidatedRequest<ProjectInput>,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      subtitle,
      description,
      features,
      techStack,
      technologies,
      imageUrl,
      liveUrl,
      githubUrl,
      visible,
      featured,
      order
    } = req.validatedData;

    const project = await prisma.project.create({
      data: {
        title,
        subtitle,
        description,
        features: JSON.stringify(features),
        techStack: JSON.stringify(techStack),
        technologies: JSON.stringify(technologies),
        imageUrl,
        liveUrl,
        githubUrl,
        visible,
        featured,
        order
      }
    });

    logger.info('Project created:', {
      id: project.id,
      title: project.title,
      createdBy: (req as AuthenticatedRequest).user?.email
    });

    const parsedProject = parseProjectData(project);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: parsedProject
    });
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
};

// Update project (admin only)
export const updateProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert arrays/objects to JSON strings if present
    if (updateData.features) {
      updateData.features = JSON.stringify(updateData.features);
    }
    if (updateData.techStack) {
      updateData.techStack = JSON.stringify(updateData.techStack);
    }
    if (updateData.technologies) {
      updateData.technologies = JSON.stringify(updateData.technologies);
    }

    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    logger.info('Project updated:', {
      id: project.id,
      title: project.title,
      updatedBy: req.user?.email
    });

    const parsedProject = parseProjectData(project);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: parsedProject
    });
  } catch (error) {
    logger.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
};

// Delete project (admin only)
export const deleteProject = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    logger.info('Project deleted:', {
      id,
      deletedBy: req.user?.email
    });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

// Get projects summary (admin only)
export const getProjectSummary = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const [total, visible, featured, hidden, recent] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { visible: true } }),
      prisma.project.count({ where: { featured: true } }),
      prisma.project.count({ where: { visible: false } }),
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      })
    ]);

    const parsedRecent = recent.map(parseProjectData);

    const summary: ProjectSummary = {
      total,
      visible,
      featured,
      hidden,
      recent: parsedRecent
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error('Error fetching project summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project summary'
    });
  }
};