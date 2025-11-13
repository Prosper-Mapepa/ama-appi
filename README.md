## AMA at CMU Backend

NestJS + PostgreSQL service that powers the AMA at CMU website. It exposes CRUD APIs for every piece of editable content inside the Next.js admin dashboard (page sections, events, team, gallery, and settings). The frontend consumes these APIs both on the public site (SSR) and inside the admin tools.

### 1. Quick Start

```bash
# install dependencies
pnpm install

# start postgres locally (optional but recommended)
docker compose up -d

# seed the database with initial AMA content
pnpm run seed

# start the API in watch mode
pnpm run start:dev
```

The server listens on `http://localhost:4000/api` by default. Configure with environment variables (see below).

### 2. Environment Variables

Create a `.env` file in `backend/` with the following variables:

```
PORT=4000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/ama_cmu
FRONTEND_URL=http://localhost:3000
JWT_SECRET=super-secret-development-key
JWT_EXPIRES_IN=1d
ADMIN_EMAIL=admin@ama-cmu.org
ADMIN_PASSWORD=Letmein@99x!
ADMIN_NAME=Site Administrator
```

`DATABASE_URL` must be a valid PostgreSQL connection string. `FRONTEND_URL` accepts a comma‑separated list of origins for CORS.  
`JWT_SECRET` protects issued admin tokens—replace with a strong value before deploying.

### 3. Database

The project uses TypeORM with auto-loading entities. Tables are generated automatically in non-production environments.

- Start a local database: `docker compose up -d`
- Stop database: `docker compose down`
- Reset data: `docker compose down -v`

### 4. Available Commands

| Command               | Description                                      |
| --------------------- | ------------------------------------------------ |
| `pnpm run start:dev`  | Start the API with hot reloading                 |
| `pnpm run start`      | Start without file watching                      |
| `pnpm run build`      | Compile TypeScript to JavaScript                 |
| `pnpm run start:prod` | Run the compiled application from `dist/`        |
| `pnpm run lint`       | Run ESLint                                       |
| `pnpm run test`       | Unit tests (Jest)                                |
| `pnpm run test:e2e`   | End-to-end tests (Supertest)                     |
| `pnpm run seed`       | Populate the database with initial chapter data  |

### 5. API Overview

All endpoints are prefixed with `/api`.

| Resource         | Methods                                             |
| ---------------- | --------------------------------------------------- |
| `/page-sections` | `GET ?page=home|about`, `POST`, `PATCH/:id`, `DELETE/:id` |
| `/events`        | `GET`, `POST`, `PATCH/:id`, `DELETE/:id`            |
| `/team`          | `GET`, `POST`, `PATCH/:id`, `DELETE/:id`            |
| `/gallery`       | `GET`, `POST`, `PATCH/:id`, `DELETE/:id`            |
| `/settings`      | `GET`, `GET/:key`, `POST` (upsert), `DELETE/:key`   |

Validation is handled via `class-validator` DTOs and Nest global `ValidationPipe`.

### 6. Project Structure

```
backend/
  src/
    main.ts                # bootstrap + global config
    app.module.ts          # root module, TypeORM + feature modules
    common/entities/       # Base entity with UUID + timestamps
    modules/
      page-sections/
      events/
      team/
      gallery/
      settings/
```

Each module contains:

- `*.entity.ts` – TypeORM entity definition
- `dto/` – Validation DTOs
- `*.service.ts` – Business logic / repository access
- `*.controller.ts` – REST endpoints

### 7. Integrating with the Frontend

1. Ensure `backend` server is running on `http://localhost:4000`.
2. Set `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api` in the Next.js app.
3. Admin dashboard components already call these routes via `adminApi`.
4. Public pages fetch content server-side using the same endpoints for SSR.
5. Seed script provisions default content plus an admin account (see `.env`).

### 8. Deployment Notes

- Disable `synchronize` in production and manage schema via migrations.
- Provide production-ready values for `DATABASE_URL`, `PORT`, and `FRONTEND_URL`.
- Replace the seeded admin credentials and `JWT_SECRET` with secure values before launch.

### 9. Troubleshooting

- **CORS errors** – Check `FRONTEND_URL` and ensure it includes the deployed domain(s).
- **Database connection failures** – Validate the `DATABASE_URL` and Postgres availability.
- **Validation errors** – API returns descriptive messages; ensure admin form payloads align with DTO shapes.

---

For questions about the backend or to propose improvements, feel free to open an issue or start a discussion in the main repository.
