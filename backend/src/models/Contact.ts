import { z } from 'zod';

// Contact form validation schema
export const ContactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),

  email: z
    .string()
    .email('Please provide a valid email address')
    .max(100, 'Email must be less than 100 characters'),

  purpose: z.enum([
    'web-development',
    'mobile-app-development',
    'backend-development',
    'cloud-deployment',
    'ai-integration',
    'database-design',
    'full-stack-project',
    'consultation',
    'code-review',
    'maintenance',
    'other'
  ], {
    errorMap: () => ({ message: 'Please select a valid purpose' })
  }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
});

export type ContactInput = z.infer<typeof ContactSchema>;

// Response types
export interface ContactResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  purpose: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSummary {
  total: number;
  unread: number;
  read: number;
  replied: number;
  recent: ContactResponse[];
}