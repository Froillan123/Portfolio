import { z } from 'zod';

// Testimonial submission validation schema
export const TestimonialSchema = z.object({
  clientName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters, spaces, dots, hyphens and apostrophes'),

  company: z
    .string()
    .max(100, 'Company name must be less than 100 characters')
    .optional(),

  role: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role must be less than 100 characters'),

  projectType: z.enum([
    'web-development',
    'mobile-app',
    'backend-api',
    'cloud-deployment',
    'ai-integration',
    'full-stack',
    'consultation',
    'other'
  ], {
    errorMap: () => ({ message: 'Please select a valid project type' })
  }),

  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1 star')
    .max(5, 'Rating cannot exceed 5 stars'),

  testimonial: z
    .string()
    .min(20, 'Testimonial must be at least 20 characters')
    .max(1000, 'Testimonial must be less than 1000 characters'),

  // Honeypot field for spam protection
  website: z
    .string()
    .optional()
    .refine(val => !val, 'Invalid submission detected')
});

export type TestimonialInput = z.infer<typeof TestimonialSchema>;

// Admin approval schema
export const TestimonialApprovalSchema = z.object({
  approved: z.boolean(),
  featured: z.boolean().optional()
});

export type TestimonialApprovalInput = z.infer<typeof TestimonialApprovalSchema>;

// Response types
export interface TestimonialResponse {
  id: number;
  clientName: string;
  company?: string;
  role: string;
  projectType: string;
  rating: number;
  testimonial: string;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TestimonialSummary {
  total: number;
  approved: number;
  pending: number;
  featured: number;
  averageRating: number;
  recent: TestimonialResponse[];
}