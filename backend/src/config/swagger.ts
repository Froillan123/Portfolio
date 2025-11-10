import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '💼 Froillan\'s Portfolio API',
    version: '1.0.0',
    description: `
    🚀 Express TypeScript API for Froillan's Portfolio Website

    This API provides endpoints for:
    - 📝 Contact form submissions
    - 💬 Testimonial management
    - 🛠️ Project management
    - 🔐 Admin authentication

    Built with Express.js, TypeScript, Prisma ORM, and SQLite database.
    `,
    contact: {
      name: 'Froillan Kim B. Edem',
      email: 'froillan.edem@gmail.com',
      url: 'https://github.com/Froillan123'
    }
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Development server'
    },
    {
      url: 'https://your-production-domain.com',
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token for admin authentication'
      }
    },
    schemas: {
      // Contact Schemas
      ContactInput: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'purpose', 'message'],
        properties: {
          firstName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            example: 'John'
          },
          lastName: {
            type: 'string',
            minLength: 2,
            maxLength: 50,
            example: 'Doe'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com'
          },
          purpose: {
            type: 'string',
            enum: [
              'web-development',
              'mobile-app-development',
              'backend-development',
              'cloud-deployment',
              'ai-integration',
              'consultation',
              'maintenance',
              'full-stack',
              'other'
            ],
            example: 'web-development'
          },
          message: {
            type: 'string',
            minLength: 10,
            maxLength: 1000,
            example: 'I would like to discuss a web development project for my business.'
          }
        }
      },
      ContactResponse: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
          purpose: { type: 'string', example: 'web-development' },
          message: { type: 'string', example: 'Project inquiry message...' },
          status: {
            type: 'string',
            enum: ['unread', 'read', 'replied'],
            example: 'unread'
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },

      // Testimonial Schemas
      TestimonialInput: {
        type: 'object',
        required: ['clientName', 'role', 'projectType', 'rating', 'testimonial'],
        properties: {
          clientName: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'Dr. Sarah Chen'
          },
          company: {
            type: 'string',
            maxLength: 100,
            example: 'TechCorp Inc.'
          },
          role: {
            type: 'string',
            minLength: 2,
            maxLength: 100,
            example: 'CTO'
          },
          projectType: {
            type: 'string',
            enum: [
              'web-development',
              'mobile-app',
              'backend-api',
              'cloud-deployment',
              'ai-integration',
              'consultation',
              'full-stack',
              'other'
            ],
            example: 'mobile-app'
          },
          rating: {
            type: 'number',
            minimum: 1,
            maximum: 5,
            example: 5
          },
          testimonial: {
            type: 'string',
            minLength: 20,
            maxLength: 1000,
            example: 'Froillan delivered exceptional work on our mobile app. His expertise in Flutter development made our project a huge success.'
          },
          website: {
            type: 'string',
            format: 'uri',
            example: 'https://techcorp.com'
          }
        }
      },
      TestimonialResponse: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          clientName: { type: 'string', example: 'Dr. Sarah Chen' },
          company: { type: 'string', example: 'TechCorp Inc.' },
          role: { type: 'string', example: 'CTO' },
          projectType: { type: 'string', example: 'mobile-app' },
          rating: { type: 'number', example: 5 },
          testimonial: { type: 'string', example: 'Great work!' },
          approved: { type: 'boolean', example: true },
          featured: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },

      // Project Schemas
      ProjectInput: {
        type: 'object',
        required: ['title', 'subtitle', 'description', 'features', 'techStack', 'technologies', 'visible', 'featured', 'order'],
        properties: {
          title: {
            type: 'string',
            minLength: 3,
            maxLength: 100,
            example: '💡 FaceofMind'
          },
          subtitle: {
            type: 'string',
            minLength: 3,
            maxLength: 200,
            example: '🤖 AI-Powered Mental Health Companion'
          },
          description: {
            type: 'string',
            minLength: 50,
            maxLength: 2000,
            example: 'An AI-powered mental health platform with emotion recognition...'
          },
          features: {
            type: 'array',
            items: { type: 'string' },
            example: ['🎭 Real-Time Emotion Detection', '📊 Mood Tracking & Insights']
          },
          techStack: {
            type: 'object',
            additionalProperties: {
              type: 'array',
              items: { type: 'string' }
            },
            example: {
              'Frontend': ['Flutter', 'React'],
              'Backend': ['.NET C#', 'Flask'],
              'Database': ['PostgreSQL', 'Firebase']
            }
          },
          technologies: {
            type: 'array',
            items: { type: 'string' },
            example: ['Flutter', 'React', '.NET', 'PostgreSQL']
          },
          imageUrl: {
            type: 'string',
            example: '/assets/project-image.jpg'
          },
          liveUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://www.faceofmind.it.com'
          },
          githubUrl: {
            type: 'string',
            format: 'uri',
            example: 'https://github.com/Froillan123/Faceofmind'
          },
          visible: {
            type: 'boolean',
            example: true
          },
          featured: {
            type: 'boolean',
            example: true
          },
          order: {
            type: 'number',
            minimum: 1,
            example: 1
          }
        }
      },
      ProjectResponse: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: '💡 FaceofMind' },
          subtitle: { type: 'string', example: '🤖 AI-Powered Mental Health Companion' },
          description: { type: 'string', example: 'Project description...' },
          features: { type: 'array', items: { type: 'string' } },
          techStack: { type: 'object' },
          technologies: { type: 'array', items: { type: 'string' } },
          imageUrl: { type: 'string', example: '/assets/project.jpg' },
          liveUrl: { type: 'string', example: 'https://project.com' },
          githubUrl: { type: 'string', example: 'https://github.com/user/repo' },
          visible: { type: 'boolean', example: true },
          featured: { type: 'boolean', example: true },
          order: { type: 'number', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },

      // Common Schemas
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Operation completed successfully' },
          data: { type: 'object' }
        }
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error message' },
          error: { type: 'string', example: 'Detailed error information' }
        }
      },
      ValidationErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Validation failed' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Invalid email format' }
              }
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Health',
      description: '🏥 API health check endpoints'
    },
    {
      name: 'Contact',
      description: '📝 Contact form management'
    },
    {
      name: 'Testimonials',
      description: '💬 Testimonial management with approval workflow'
    },
    {
      name: 'Projects',
      description: '🛠️ Project portfolio management'
    },
    {
      name: 'Admin',
      description: '🔐 Admin-only endpoints (requires JWT authentication)'
    }
  ]
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);