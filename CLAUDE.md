# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LoginGiK is a user and permission management system built as a monorepo using pnpm workspaces, Turbo for task orchestration, TypeScript, Express.js backend, and Vue.js frontend.

## Development Commands

### Root Level Commands
- `pnpm dev` - Start all packages in development mode
- `pnpm build` - Build all packages
- `pnpm test` - Run all tests (backend and frontend)
- `pnpm start` - Start production build of all packages

### Backend-Specific Commands
- `pnpm build:backend` - Build only the backend (@logingik/main)
- `pnpm test:backend` - Run backend tests only
- `pnpm --filter=@logingik/main dev` - Start backend development server on port 3000
- `pnpm --filter=@logingik/main test` - Run backend Jest tests

### Frontend-Specific Commands
- `pnpm build:frontend` - Build only the frontend (@logingik/ui)
- `pnpm test:frontend` - Run frontend tests only
- `pnpm dev:ui` - Start frontend development server

### Database-Specific Commands
- `pnpm --filter=@logingik/db build` - Build database entities package
- `pnpm --filter=@logingik/db test` - Run database entity tests

## Architecture

### Monorepo Structure
The project uses pnpm workspaces with three main packages:

- **@logingik/db** (`packages/core/db/`) - TypeORM entities and database models
- **@logingik/main** (`packages/main/`) - Express.js REST API backend
- **@logingik/ui** (`packages/ui/`) - Vue.js frontend SPA

### Database Layer (@logingik/db)
- Uses TypeORM with SQLite for data persistence
- Entities: User, Enterprise, UserGroup, Permission, UserGroupPermission, UserUserGroupMap
- User passwords are automatically hashed using bcrypt before insertion
- Located in `packages/core/db/src/entities/`

### Backend (@logingik/main)
- Express.js server with JWT authentication
- Database connection configured in `src/index.ts` with TypeORM DataSource
- Authentication middleware protects routes after `/api` mount
- Entry point: `src/server.ts` (initializes DB and starts server on port 3000)
- Seeding functionality in `src/seed.ts` runs on startup
- Route structure:
  - Public routes: auth endpoints (login/register)
  - Protected routes: all other CRUD operations for entities

### Frontend (@logingik/ui)
- Vue 3 SPA with Vue Router
- Development server uses Vite
- API communication via axios (configured in `src/services/api.ts`)
- Components organized by feature: UserManagement, RoleManagement, etc.
- Views: Login, Home, Landing

### Testing Strategy
- Backend: Jest with ts-jest preset, supertest for API testing
- Frontend: Vitest for Vue component testing
- Database: Jest tests for entity behavior
- Tests run in band for backend (`--runInBand`) to avoid SQLite conflicts

### Key Technical Details
- Node.js >=20.15 and pnpm >=10.2.1 required
- TypeScript 5.x across all packages
- SQLite database with automatic schema synchronization in development
- JWT tokens for authentication
- CORS enabled for cross-origin requests
- Password hashing with bcrypt (10 rounds)

### Development Workflow
1. Database entities are defined in `@logingik/db` and shared across packages
2. Backend API routes consume entities through TypeORM repositories
3. Frontend consumes REST API endpoints with axios
4. Authentication flow: login returns JWT, middleware validates on protected routes
5. Database seeding occurs automatically on server startup