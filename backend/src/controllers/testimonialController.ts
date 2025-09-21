import { Response } from 'express';
import { prisma } from '@/utils/database';
import { logger } from '@/utils/logger';
import {
  TestimonialInput,
  TestimonialApprovalInput,
  TestimonialResponse,
  TestimonialSummary
} from '@/models/Testimonial';
import { ValidatedRequest, AuthenticatedRequest } from '@/middleware/validation';

// Submit testimonial
export const submitTestimonial = async (
  req: ValidatedRequest<TestimonialInput>,
  res: Response
): Promise<void> => {
  try {
    const { clientName, company, role, projectType, rating, testimonial } = req.validatedData;

    // Check for duplicate submissions (same name/email in last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const existingTestimonial = await prisma.testimonial.findFirst({
      where: {
        clientName,
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    if (existingTestimonial) {
      logger.warn('Duplicate testimonial submission attempt:', {
        clientName,
        ip: req.ip,
        existingId: existingTestimonial.id
      });

      res.status(429).json({
        success: false,
        message: 'A testimonial from this name was already submitted recently. Please wait 30 days before submitting another.'
      });
      return;
    }

    // Create testimonial record
    const newTestimonial = await prisma.testimonial.create({
      data: {
        clientName,
        company,
        role,
        projectType,
        rating,
        testimonial,
        approved: false, // Requires admin approval
        featured: false
      }
    });

    logger.info('New testimonial submission:', {
      id: newTestimonial.id,
      clientName: newTestimonial.clientName,
      company: newTestimonial.company,
      rating: newTestimonial.rating,
      ip: req.ip
    });

    // TODO: Send email notification to admin
    // await sendTestimonialNotification(newTestimonial);

    res.status(201).json({
      success: true,
      message: 'Thank you for your testimonial! It will be reviewed and published soon.',
      data: {
        id: newTestimonial.id,
        submittedAt: newTestimonial.createdAt
      }
    });
  } catch (error) {
    logger.error('Error submitting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit testimonial. Please try again later.'
    });
  }
};

// Get approved testimonials (public)
export const getApprovedTestimonials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // @ts-ignore
    const featured = req.query.featured === 'true';
    // @ts-ignore
    const limit = parseInt(req.query.limit as string) || 10;

    const where = {
      approved: true,
      ...(featured && { featured: true })
    };

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured first
        { createdAt: 'desc' }
      ],
      take: limit,
      select: {
        id: true,
        clientName: true,
        company: true,
        role: true,
        projectType: true,
        rating: true,
        testimonial: true,
        featured: true,
        createdAt: true
        // Don't include updatedAt for public API
      }
    });

    res.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    logger.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials'
    });
  }
};

// Get all testimonials (admin only)
export const getAllTestimonials = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const approved = req.query.approved;
    const skip = (page - 1) * limit;

    let where = {};
    if (approved === 'true') where = { approved: true };
    if (approved === 'false') where = { approved: false };

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.testimonial.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        testimonials,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching all testimonials:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials'
    });
  }
};

// Approve/disapprove testimonial (admin only)
export const updateTestimonialApproval = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { approved, featured } = req.body;

    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        approved,
        ...(featured !== undefined && { featured })
      }
    });

    logger.info('Testimonial approval updated:', {
      id: testimonial.id,
      approved,
      featured,
      updatedBy: req.user?.email
    });

    res.json({
      success: true,
      message: `Testimonial ${approved ? 'approved' : 'disapproved'} successfully`,
      data: testimonial
    });
  } catch (error) {
    logger.error('Error updating testimonial approval:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update testimonial approval'
    });
  }
};

// Get testimonials summary (admin only)
export const getTestimonialSummary = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const [total, approved, pending, featured, recent, ratingStats] = await Promise.all([
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { approved: true } }),
      prisma.testimonial.count({ where: { approved: false } }),
      prisma.testimonial.count({ where: { featured: true } }),
      prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.testimonial.aggregate({
        where: { approved: true },
        _avg: { rating: true }
      })
    ]);

    const summary: TestimonialSummary = {
      total,
      approved,
      pending,
      featured,
      averageRating: ratingStats._avg.rating || 0,
      recent
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error('Error fetching testimonial summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonial summary'
    });
  }
};

// Delete testimonial (admin only)
export const deleteTestimonial = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.testimonial.delete({
      where: { id: parseInt(id) }
    });

    logger.info('Testimonial deleted:', {
      id,
      deletedBy: req.user?.email
    });

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting testimonial:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete testimonial'
    });
  }
};