# Portfolio Backend API

Express TypeScript backend for Froillan's portfolio website with SQLite database.

## 🚀 Features

- **Contact Form API** - Handle contact form submissions
- **Testimonials API** - Manage client testimonials with approval workflow
- **Projects API** - Dynamic project management
- **Admin Panel** - JWT-based authentication for admin operations
- **Rate Limiting** - Spam protection and API abuse prevention
- **Input Validation** - Zod schema validation
- **Docker Support** - Containerized deployment
- **SQLite Database** - Easy setup with Prisma ORM

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/         # Data models and validation schemas
│   ├── routes/         # API route definitions
│   ├── middleware/     # Custom middleware (auth, validation, etc.)
│   ├── utils/          # Utility functions
│   └── app.ts          # Express app configuration
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Database seeding
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose for development
└── package.json        # Dependencies and scripts
```

## 🛠️ Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the environment template:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
DATABASE_URL="file:./dev.db"
PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

Generate Prisma client and run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

Seed the database with sample data:
```bash
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 🐳 Docker Setup

### Build and Run with Docker

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/projects` - Get all visible projects
- `GET /api/projects/:id` - Get single project
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/contact` - Submit contact form
- `POST /api/testimonials` - Submit testimonial

### Admin Endpoints (Requires Authentication)

- `GET /api/contact` - Get all contacts
- `GET /api/contact/summary` - Get contact summary
- `PUT /api/contact/:id/status` - Update contact status
- `GET /api/testimonials/all` - Get all testimonials
- `GET /api/testimonials/summary` - Get testimonial summary
- `PUT /api/testimonials/:id/approval` - Approve/disapprove testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `GET /api/projects/admin/all` - Get all projects (admin view)
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🔒 Authentication

The API uses JWT tokens for admin authentication. To get a token:

1. Create an admin user via the seed script
2. Implement a login endpoint (not included in this basic setup)
3. Include the token in requests: `Authorization: Bearer <token>`

## 🛡️ Security Features

- **Rate Limiting** - Prevents API abuse
- **Input Validation** - Zod schema validation
- **Spam Protection** - Honeypot fields and duplicate detection
- **Helmet** - Security headers
- **CORS** - Cross-origin request protection
- **Input Sanitization** - XSS prevention

## 📊 Database Schema

### Tables

- **contacts** - Contact form submissions
- **testimonials** - Client testimonials
- **projects** - Portfolio projects
- **analytics** - Usage analytics (optional)
- **admins** - Admin users

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database with sample data

### Code Quality

The project includes:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Structured error handling
- Comprehensive logging

## 🚀 Deployment

### Docker Deployment

1. Build the production image:
```bash
docker build -t portfolio-backend .
```

2. Run the container:
```bash
docker run -p 3001:3001 -e NODE_ENV=production portfolio-backend
```

### Traditional Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 📈 Migration to PostgreSQL

To migrate from SQLite to PostgreSQL:

1. Update `DATABASE_URL` in `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:
```bash
npm run prisma:migrate
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Froillan Kim B. Edem**
- Portfolio: [Your Portfolio URL]
- GitHub: [@Froillan123](https://github.com/Froillan123)
- Email: froillan.edem@gmail.com