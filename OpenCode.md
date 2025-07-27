# OpenCode.md

## Build, Lint, and Test Commands

### Building the Project
- `pnpm build`: Builds the application for production.

### Linting
- `pnpm lint`: Checks code formatting and linting.
- `pnpm lint:fix`: Applies automatic fixes for lint issues.

### Testing
Ensure setup for Playwright:
- `pnpm dlx playwright install`: Install necessary browsers.
- Run tests:
  - `pnpm test`: Executes all tests.
  - `pnpm test path/to/test.ts`: Run a specific test file.

### Development
- `pnpm dev`: Starts development server using Turbopack.

---

## Code Style Guidelines

### Imports
- Use absolute imports where aliases are defined in `components.json`.
- Organize: External libraries > Aliased imports > Relative imports.

### Formatting
- Prettier is used for formatting (`pnpm format`).
- Line length: 80 (Default).

### Types
- Full TypeScript stack.
- Prefer `type` aliases over `interface` unless extending.

### Naming Conventions
- Components: PascalCase (`MyComponent.tsx`).
- Variables/Functions: camelCase (`usePokemon`).
- Files: kebab-case (`tailwind.config.ts`).

### Error Handling
- Use `zod` for validation.
- Implement `try/catch` for API calls and async code.

### Miscellaneous
- TailwindCSS is used heavily with `clsx`.
- Registry components adhere stricter typed props than regular UI libraries.

---
**Helpful Notes**