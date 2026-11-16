# NestJS service starter

NestJS, TypeScript, and PostgreSQL starter for a new backend service. It uses `pg` for SQL, and includes environment validation, request validation, one error response shape, a health check, and a sample feature.

## Prerequisites

- Node.js 24.15 or newer
- Docker
- npm

## Setup

```bash
npm ci
cp .env.example .env
docker compose up -d
npm run db:migrate
npm run start:dev
```

On Windows, create the env file with `copy .env.example .env`.

The values in `.env.example` (`app` / `app`) are development defaults.

`npm run db:migrate` applies the SQL files in `db/migrations` and records them in `schema_migrations`. The sample table is `notes` (`id`, `title`, `created_at`). The HTTP API still returns `createdAt`.

## Tests

```bash
npm test
npm run test:e2e
```

## Sample feature

`src/modules/note` is a sample of the feature pattern. The first real feature replaces it: remove the module and add a migration that drops the `notes` table.

## Next feature

The next feature goes in `ASSIGNMENT.md`. Planning steps are in `.cursor/skills/plan-feature/SKILL.md`.

## Scripts

- `npm run start:dev` — start the API on the host with watch mode
- `npm run build` — compile TypeScript
- `npm run lint` — run oxlint
- `npm run format` — format TypeScript with Prettier
- `npm test` — run unit tests
- `npm run test:watch` — run unit tests in watch mode
- `npm run test:cov` — run unit tests with coverage
- `npm run test:e2e` — point `DATABASE_URL` at `TEST_DATABASE_URL`, apply SQL migrations, and request `GET /api/health`
- `npm run db:migrate` — apply pending SQL migrations in `db/migrations`
