# Development Instructions

AI agents working on this Next.js project must follow these guidelines.

References:

- **Project overview**: @README.md
- **Dependencies**: @package.json
- **Commands**: @justfile

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

If any command fails, analyze the errors and fix only those related to files you changed. Ignore pre-existing errors in
other files. Then, run `just biome-write` to format all code at the end.

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

### React/ Next.js

- Lazy load heavy components with `next/dynamic` from `Component.lazy.tsx` files
- Use named exports: `export function Foo()` instead of `export default`, unless you have to use a default export (e.g.,
  in a `page.tsx` file)
- Do not use `useMemo` or `useCallback` - React Compiler automatically optimizes re-renders
- React 19+: prefer `ref` as a prop over `React.forwardRef`
- Prefer Next.js `<Image>` over `<img>` for images

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

### TypeScript

- Prefer `type` over `interface`
- Prefer `function` over `() =>` for function types (unless you have to use an arrow function for a callback or event
  handler)
- Use `satisfies` operator for type-safe constants
- Avoid `any`; use `unknown` if type is truly unknown
- Export types from dedicated `.types.ts` files

### State Management

- Server state: Server Components + fetch
- Client state: useState/useReducer for local state
- Complex client state: use Zustand

### Styling

- Use Tailwind's design tokens (no arbitrary values unless necessary)
- Component variants with `tv` (tailwind-variants)
- Consistent spacing scale
- Use `lucide-react` for icons instead of hard-coding SVGs

## Troubleshooting

Use Next DevTools MCP server.
