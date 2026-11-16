# NestJS service starter

NestJS, TypeScript, and PostgreSQL starter for a new backend service. It uses `pg` for SQL, and includes environment validation, request validation, one error response shape, a health check, and a sample feature.

## Start from this template

This repository is a [GitHub template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template). Create each new service from it, then build the first feature with Cursor Plan mode and Agent. GitHub Spec Kit is not installed in this repository.

1. On the template repository in GitHub, click **Use this template**, then **Create a new repository**.
2. Clone the new repository to your computer:

   ```bash
   git clone https://github.com/<you>/<new-repo>.git
   cd <new-repo>
   ```

3. Open that folder in Cursor.
4. Install dependencies, copy `.env`, start PostgreSQL, and apply migrations as described in [Setup](#setup).

The **Use this template** button is available when the source repository is marked as a template under **Settings → General → Template repository**.

### Plan mode and Agent

1. Write the feature in the **Feature** section of `ASSIGNMENT.md`. Leave the checklist as the definition of done.
2. In Cursor **Plan** mode, invoke the `plan-feature` skill with `/plan-feature`. It plans the feature from `ASSIGNMENT.md` and follows `.cursor/rules/project.mdc`: a module under `src/modules/<feature>`, thin controllers, services, parameterized SQL through `DatabaseService`, DTOs, SQL migrations, and service and controller tests.
3. Read the plan. The agent does not change application code until you accept it.
4. Switch to **Agent** mode and ask the agent to implement the accepted plan.

Plan mode is the path for this service. When the assignment also includes the React starter, Spec Kit stays in that frontend repository. Do not install it here, and do not run Spec Kit on the same feature.

### GitHub Spec Kit

[GitHub Spec Kit](https://github.com/github/spec-kit) is not part of this template. Skip this section when the assignment includes the React starter.

When the assignment has no React starter, install Spec Kit in this repository, then use the commands below. Do not also run the Plan mode flow for the same feature.

Check whether the CLI is already installed:

```bash
specify version
```

When that prints a version, skip the install. `specify self check` compares the installed CLI with the latest GitHub release. Install only when `specify` is missing, or when you want a newer tag. The CLI comes from the GitHub repository. The PyPI package named `specify-cli` is unaffiliated. [Install uv](https://docs.astral.sh/uv/getting-started/installation/) first, then:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.4.0
```

Use `v1.4.0` or a newer stable tag. From this repository, initialize Spec Kit for Cursor:

```bash
specify init --here --force --script sh --integration cursor-agent
```

`--force` merges Spec Kit into this starter. The command adds `.specify/` and the `speckit-*` skills under `.cursor/skills`. Reopen the folder in Cursor so those skills load. Spec Kit plans follow `.cursor/rules/project.mdc`. The checklist in `ASSIGNMENT.md` stays the definition of done.

In Cursor chat, run these commands in order. Optional commands are marked.

1. `/speckit-constitution` — required the first time. Record the rules in `.cursor/rules/project.mdc`. Later, run it only when a project rule should change.
2. `/speckit-specify` — describe the feature. Review the generated `spec.md` before continuing.
3. `/speckit-clarify` *(optional)* — resolve gaps in the spec before planning.
4. `/speckit-plan` — review the plan before generating tasks.
5. `/speckit-checklist` *(optional)* — generate a requirement checklist.
6. `/speckit-tasks`.
7. `/speckit-analyze` *(optional)* — check `spec.md`, `plan.md`, and `tasks.md` before implementation.
8. `/speckit-implement`.
9. `/speckit-converge` *(optional)* — if work is still missing, append the remaining tasks to `tasks.md`, then run `/speckit-implement` again.

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

How to create a service from this template is in [Start from this template](#start-from-this-template).

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
