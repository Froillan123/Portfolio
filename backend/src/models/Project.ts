import { z } from 'zod';

// Project validation schema
export const ProjectSchema = z.object({
  title: z
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must be less than 100 characters'),

  subtitle: z
    .string()
    .min(5, 'Subtitle must be at least 5 characters')
    .max(200, 'Subtitle must be less than 200 characters'),

  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),

  features: z
    .array(z.string().min(5, 'Each feature must be at least 5 characters'))
    .min(1, 'At least one feature is required')
    .max(20, 'Maximum 20 features allowed'),

  techStack: z
    .record(z.string(), z.array(z.string()))
    .refine(
      (data) => Object.keys(data).length > 0,
      'Tech stack must have at least one category'
    ),

  technologies: z
    .array(z.string().min(1, 'Technology name cannot be empty'))
    .min(1, 'At least one technology is required')
    .max(30, 'Maximum 30 technologies allowed'),

  imageUrl: z
    .string()
    .url('Image URL must be a valid URL')
    .optional(),

  liveUrl: z
    .string()
    .url('Live URL must be a valid URL')
    .optional(),

  githubUrl: z
    .string()
    .url('GitHub URL must be a valid URL')
    .optional(),

  visible: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0)
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

// Update schema (all fields optional except id)
export const ProjectUpdateSchema = ProjectSchema.partial();
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>;

// Response types
export interface ProjectResponse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: Record<string, string[]>;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  visible: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Public project response (for non-admin users)
export interface PublicProjectResponse {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: Record<string, string[]>;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  order: number;
}

export interface ProjectSummary {
  total: number;
  visible: number;
  featured: number;
  hidden: number;
  recent: ProjectResponse[];
}