# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Tech stack: TypeScript, Express 5, Mongoose, Zod, ESLint, Prettier.
- Entry points: src/server.ts (process boot & DB connect), src/app.ts (Express app, routes, middlewares).
- API base path: /api/v1

Common commands
- Install dependencies (uses package-lock.json):
  - npm ci  # preferred in CI or clean installs
  - npm install  # for local development
- Start in watch mode (ts-node-dev):
  - npm run dev
- Build TypeScript to dist/:
  - npm run build
- Run production build:
  - npm run prod  # requires prior build
  - Or: npm run build && npm run prod
- Lint TypeScript:
  - npm run lint
  - npm run lint-fix  # autofix under src/
- Format with Prettier:
  - npm run prettier
  - npm run prettier-fix
- Tests: There is no test runner configured. The "test" script intentionally fails (package.json). Running a single test is not applicable until a test framework is added.

Environment configuration
- Environment is loaded from a .env file at the repository root (src/app/config/index.ts via dotenv).
- Required variables (as used in code):
  - NODE_ENV
  - PORT
  - DATABASE_URL
  - BCRYPT_SALT_ROUNDS
  - DEFAULT_PASS
- Example .env (replace placeholders with your own values):
  PORT=5000
  DATABASE_URL=mongodb://localhost:27017/your-db
  BCRYPT_SALT_ROUNDS=10
  DEFAULT_PASS=changeme
  NODE_ENV=development

Architecture and request flow
1) Boot and DB connection
   - src/server.ts initializes Mongoose with DATABASE_URL and starts the HTTP server on PORT.
   - Global process guards are set for unhandledRejection and uncaughtException to exit safely.

2) Express app composition
   - src/app.ts configures JSON parsing and CORS, mounts the API router at /api/v1, and registers error/not-found middlewares.

3) Routing aggregation
   - src/app/routes/index.ts centralizes module mounting using moduleRoutes and router.use(path, route).
   - Current mounted modules include users, students, academic-semesters, academic-faculties, academic-dept, and faculties.

4) Module pattern (per feature area)
   - Each feature in src/app/modules/<feature>/ typically contains:
     - <feature>.route.ts: Express routes. Bodies are validated with Zod via validateRequest(schema).
     - <feature>.controller.ts: Orchestrates request handling, often wrapped with catchAsync and using sendResponse for consistent responses.
     - <feature>.service.ts: Business logic and DB interactions.
     - <feature>.model.ts: Mongoose schema/model.
     - <feature>.validation.ts: Zod schemas for input validation.
     - Optional files: *.const.ts, *.interface.ts, *.utils.ts.

5) Validation
   - Zod schemas enforce request body shapes. validateRequest(schema) parses req.body and forwards ZodError to the error pipeline.

6) Error handling
   - src/app/middlewares/globalErrorhandlers.ts consolidates error responses.
   - Specialized handlers map common error types to a consistent shape:
     - ZodError (handleZodError)
     - Mongoose ValidationError (handleValidationError)
     - Mongoose CastError (handleCastError)
     - Duplicate key errors (handleDuplicateError)
   - Custom AppError supports controlled HTTP errors. Not-found requests return a 404 JSON via notFound middleware.
   - Error responses include: success=false, message, errorSources (array of {path, message}), and stack in development.

7) Data access and query utilities
   - src/app/builder/QueryBuilder.ts standardizes list queries with chainable operations:
     - search(searchableFields)
     - filter()  // removes searchTerm, sort, limit, page, fields from filters and applies remaining
     - sort()    // default -createdAt if not specified
     - paginate() // page, limit
     - fields()   // projection; default excludes __v
   - Recognized query parameters: searchTerm, sort, limit, page, fields.

8) Responses and async handling
   - sendResponse<T>(res, { statusCode, success, message?, data }) ensures consistent success payloads.
   - catchAsync wraps async controllers and forwards errors to the central handler.

9) Security-related model behavior
   - User model (src/app/modules/user/user.model.ts) hashes passwords pre-save using bcrypt with BCRYPT_SALT_ROUNDS and clears password in post-save to avoid returning it.

Notes on tooling
- ESLint: No explicit ESLint configuration file is present. The lint scripts invoke ESLint over the codebase; if you encounter "No ESLint configuration found" or TypeScript parsing issues, add a config (Flat Config or .eslintrc) that enables @typescript-eslint/parser and @typescript-eslint/eslint-plugin.
- Prettier: Configured via .prettierrc.json (semi: false, singleQuote: true).

Operational tips specific to this codebase
- All API routes are mounted under /api/v1. Root / responds with a simple "Hello World!" test handler.
- When adding a new module, follow the existing pattern: define model, validation (Zod), service, controller, and route, then add it to moduleRoutes in src/app/routes/index.ts.
- Use QueryBuilder in services for list endpoints to keep filtering/sorting/pagination behavior consistent across modules.

