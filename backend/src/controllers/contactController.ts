import { Response } from 'express';
import { prisma } from '@/utils/database';
import { logger } from '@/utils/logger';
import { ContactInput, ContactResponse, ContactSummary } from '@/models/Contact';
import { ValidatedRequest, AuthenticatedRequest } from '@/middleware/validation';

// Submit contact form
export const submitContact = async (
  req: ValidatedRequest<ContactInput>,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, purpose, message } = req.validatedData;

    // Check for duplicate submissions (same email + similar message in last 24 hours)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingContact = await prisma.contact.findFirst({
      where: {
        email,
        createdAt: { gte: yesterday },
        message: { contains: message.substring(0, 50) }
      }
    });

    if (existingContact) {
      logger.warn('Duplicate contact submission attempt:', {
        email,
        ip: req.ip,
        existingId: existingContact.id
      });

      res.status(429).json({
        success: false,
        message: 'A similar message was already submitted recently. Please wait 24 hours before submitting again.'
      });
      return;
    }

    // Create contact record
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        purpose,
        message,
        status: 'unread'
      }
    });

    logger.info('New contact submission:', {
      id: contact.id,
      email: contact.email,
      purpose: contact.purpose,
      ip: req.ip
    });

    // TODO: Send email notification to admin
    // await sendContactNotification(contact);

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you within 24 hours.',
      data: {
        id: contact.id,
        submittedAt: contact.createdAt
      }
    });
  } catch (error) {
    logger.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.'
    });
  }
};

// Get all contacts (admin only)
export const getContacts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.contact.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    logger.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

// Get contact summary (admin only)
export const getContactSummary = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const [total, unread, read, replied, recent] = await Promise.all([
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'unread' } }),
      prisma.contact.count({ where: { status: 'read' } }),
      prisma.contact.count({ where: { status: 'replied' } }),
      prisma.contact.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          purpose: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true
        }
      })
    ]);

    const summary: ContactSummary = {
      total,
      unread,
      read,
      replied,
      // @ts-ignore
      recent
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error('Error fetching contact summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact summary'
    });
  }
};

// Update contact status (admin only)
export const updateContactStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: unread, read, or replied'
      });
      return;
    }

    const contact = await prisma.contact.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    logger.info('Contact status updated:', {
      id: contact.id,
      status,
      updatedBy: req.user?.email
    });

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    logger.error('Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
};