# NestJS Rapid Boilerplate

A comprehensive NestJS boilerplate with authentication, pagination, logging, and API documentation.

## Features

- 🔐 **JWT Authentication** with refresh tokens
- 👥 **Role-based Access Control** (RBAC)
- 📄 **Pagination Support** with decorators
- 📊 **MongoDB Integration** with Mongoose
- 📚 **Swagger Documentation**
- 📝 **Pino Logging** with request context
- 🔄 **Response Interceptor** for standardized API responses
- ✅ **Input Validation** with class-validator
- 🏗️ **Modular Architecture**

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Documentation**: Swagger/OpenAPI
- **Logging**: Pino
- **Validation**: class-validator & class-transformer

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nestjs-rapid-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Edit `.env` with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/nestjs-boilerplate
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
PORT=3000
NODE_ENV=development
LOG_LEVEL=debug
```

4. Start the application:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access:

- **API Documentation**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/health

## Authentication

### Register a new user
```bash
POST /auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```bash
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Refresh Token
```bash
POST /auth/refresh
{
  "refreshToken": "your-refresh-token"
}
```

## Pagination

The boilerplate includes built-in pagination support:

```typescript
@Get()
async findAll(@Pagination() paginationDto: PaginationDto) {
  return this.usersService.findAll(paginationDto);
}
```

Query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `search`: Search term
- `sortBy`: Sort field (default: 'createdAt')
- `sortOrder`: Sort order ('asc' or 'desc', default: 'desc')

Example: `GET /users?page=1&limit=10&search=john&sortBy=createdAt&sortOrder=desc`

## Role-Based Access Control

Use the `@Roles()` decorator to protect endpoints:

```typescript
@Get()
@Roles(UserRole.ADMIN, UserRole.MODERATOR)
async findAll() {
  // Only admins and moderators can access
}
```

Available roles:
- `USER` (default)
- `MODERATOR`
- `ADMIN`

## Logging

The application uses Pino for structured logging with request context:

```typescript
import { Logger } from '@nestjs/common';

export class MyService {
  private readonly logger = new Logger(MyService.name);

  someMethod() {
    this.logger.log('This will include request context');
    this.logger.error('Error message', error.stack);
  }
}
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── decorators/       # Auth decorators (roles, current-user, public)
│   ├── dto/             # Auth DTOs
│   ├── guards/          # JWT and roles guards
│   ├── strategies/      # Passport strategies
│   └── auth.service.ts  # Auth business logic
├── common/              # Shared utilities
│   ├── decorators/      # Common decorators (pagination)
│   ├── dto/            # Common DTOs
│   ├── interceptors/   # Response interceptor
│   ├── interfaces/     # TypeScript interfaces
│   └── utils/          # Utility functions
├── config/             # Configuration
├── database/           # Database configuration and schemas
│   └── schemas/        # Mongoose schemas
├── users/              # Users module (example implementation)
└── main.ts            # Application entry point
```

## Scripts

```bash
# Development
npm run start:dev

# Build
npm run build

# Production
npm run start:prod

# Testing
npm run test
npm run test:e2e
npm run test:cov

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
```

## License

This project is licensed under the MIT License.
