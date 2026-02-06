# Development Instructions

AI agents working on this Next.js project must follow these guidelines.

References:

- **Project overview**: @README.md
- **Dependencies**: @package.json

## Lint Rules

After generating code, run these commands **in order**.

**File argument rules:**

- Changed fewer than 10 files? → Pass specific paths or globs
- Changed 10+ files? → Omit file arguments to process all files

**Command sequence:**

1. **Identify which file types changed**

2. **`na biome lint <files>`** — lint JS/TS/JSON/CSS/GraphQL (skip if none changed)

3. **`na tsgo --noEmit`** — verify TypeScript types (always run on entire project)

**Examples:**

```bash
# Fewer than 10 files: use specific paths and/or globs
na biome lint app/page.tsx lib/**/*

# 10+ files: run default command
na biome lint

# TypeScript check runs on entire project
na tsgo --noEmit
```

If any command fails, analyze the errors and fix only those related to files you changed.

## Commands

### Dependency Management

```bash
ni                   # Install all dependencies
ni package-name      # Add dependency
ni -D package-name   # Add dev dependency
nun package-name     # Remove dependency
```

## Code Standards

### Naming Conventions

- **Directories**: Always use `kebab-case` for directories (e.g., `user-profile`)
- **Files**:
  - Use `PascalCase` for components (e.g., `UserProfile.tsx`)
  - Use `camelCase` for hooks (e.g., `useIsClient.ts`)
  - Use `kebab-case` for all other files, e.g. utilities, machines, etc. (e.g., `error-handler.ts`)

### TypeScript

- Prefer `type` over `interface`
- Prefer `function` over `() =>` for function types (unless you have to use an arrow function for a callback or event
  handler)
- Use `satisfies` operator for type-safe constants
- Avoid `any`; use `unknown` if type is truly unknown
- Export types from dedicated `.types.ts` files

### Null vs Undefined

- Use `null` for internal UI/domain state to represent "known empty" (previews, caches, in-memory state)
- Use `undefined`/omission for serialized or boundary-crossing payloads (URL params, localStorage, network payloads,
  configs)
- Don't change JSON omission semantics unless all consumers are updated

### Comments

- Use `/** */` (JSDoc-style) for functions, classes, file overviews, and type/object properties
- Use `//` for comments explaining variables and inline logic within functions
- Prefer self-documenting code; avoid obvious comments that restate what the code does
- Use `// TODO:` for temporary notes that need follow-up work

### React/ Next.js

- Lazy load heavy components with `next/dynamic` from `Component.lazy.tsx` files
- Use named exports: `export function Foo()` instead of `export default`, unless you have to use a default export (e.g.,
  in a `page.tsx` file)
- Do not use `useMemo` or `useCallback` - React Compiler automatically optimizes re-renders
- Use `<SmartImage>` from `@/ui/SmartImage` for all images (wraps `next/image` with auto-inferred `sizes` and alt text)
- Avoid `Boolean(condition) && <Component />`; use `condition ? <Component /> : null` and raw checks

### React 19

- Treat `ref` as a normal prop; avoid `forwardRef` unless you need `useImperativeHandle`
- Prefer Actions with `useActionState` / `useFormStatus` for forms; use `<form action>` for server mutations
- Use `useEffectEvent` for event listeners to avoid resubscribe churn

**React Compiler limitation:** React Compiler cannot stabilize return values from external libraries. Wrap unstable
external refs in `useEffectEvent` to avoid infinite loops in `useEffect`.

### Server/Client Boundaries

Core rules:

- Use Server Components by default
- Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- Prefer `async/await` in Server Components over `useEffect`

When creating or moving files, apply the appropriate boundary marker:

- `"use client"` — files using React hooks, browser APIs, or event handlers
- `"use server"` — files containing Server Actions (form submissions, mutations)
- `import "server-only"` — files that must never reach the client (internal logic, non-`NEXT_PUBLIC_` env vars)
- `import "client-only"` — files relying on browser APIs (`window`, `document`, etc.)

Place directives at the very top of the file, before imports. Server Components need no directive—they are the default.

### Time Durations

Use `Effect.Duration` instead of manual calculations for time constants:

```ts
// ❌ Avoid
const SECONDS_IN_DAY = 24 * 60 * 60;
const timeout = 60_000;

// ✅ Prefer
import { Duration } from "effect";
Duration.toSeconds("1 day"); // 86400
Duration.toMillis("5 minutes"); // 300000
```

### Styling

- Use Tailwind's design tokens (no arbitrary values unless necessary)
- Component variants with `tv` (tailwind-variants)
- Consistent spacing scale
- Use `lucide-react` for icons instead of hard-coding SVGs

## Troubleshooting

Use Next DevTools MCP server.
