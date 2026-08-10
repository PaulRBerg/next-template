# Development Instructions

## Validation

After changing code, run applicable checks in this order:

1. `na biome lint <files>` for changed JavaScript, TypeScript, JSON, CSS, or GraphQL files.
2. `na eslint <files>` for changed TypeScript files; ESLint owns Tailwind CSS validation and React Hooks dependencies.
3. `na tsgo --noEmit` for the entire project.

For the first two commands, pass explicit paths when fewer than 10 files changed. With 10 or more changed files, omit
Biome's paths and pass `.` to ESLint. Fix only failures caused by your changes.

Use `just` to discover broader workflows. For dependencies, use `ni`, `ni <package>`, `ni -D <package>`, and
`nun <package>` so the Bun-backed package manager is selected consistently.

## Code Conventions

### Names and Types

- Use `kebab-case` for directories and non-component files, `PascalCase` for component files, and `camelCase` for hooks.
- Prefer `type` over `interface`, `satisfies` for type-safe constants, and `unknown` over `any`.
- Use `null` for known-empty in-memory UI or domain state. Omit boundary values with `undefined` in URLs, storage,
  network payloads, and configuration; preserve existing JSON omission semantics.

### React and Next.js

- Use Server Components by default. Add `"use client"` only for hooks, event handlers, or browser APIs; add
  `"use server"` for Server Actions. Use `server-only` and `client-only` imports for environment-specific modules. Place
  directives before imports.
- Use named exports except where Next.js requires a default export.
- Lazy-load heavy components with `next/dynamic` from `Component.lazy.tsx` files.
- Do not add `useMemo` or `useCallback`; React Compiler is enabled. Wrap unstable external-library values used by an
  effect in `useEffectEvent` when they would otherwise cause resubscriptions or loops.
- Treat `ref` as a normal React 19 prop. Use `forwardRef` only with `useImperativeHandle`.
- Prefer Actions with `useActionState` or `useFormStatus`, and use `<form action>` for server mutations.
- Render every image with `SmartImage` from `@/ui/SmartImage`, which supplies inferred `sizes` and fallback alt text.
- Do not wrap JSX conditions in `Boolean(...)`; use the underlying condition directly.

### Effect

Use `Effect.Duration` for duration constants and conversions instead of arithmetic or numeric timeout literals. For
example, use `Duration.toMillis("5 minutes")` rather than `300_000`.

### UI

- Prefer Tailwind design tokens; use arbitrary values only when the design cannot be expressed on the configured scale.
- Define component variants with `tv` from `tailwind-variants` and use Lucide icons instead of handwritten SVG.
- Build interactive primitives with Base UI. Import individual modules such as `@base-ui/react/dialog`, style parts
  directly with Tailwind, and use `data-[starting-style]` and `data-[ending-style]` for transitions. Base UI components
  are Client Components.

## Troubleshooting

Use Next DevTools MCP for runtime inspection and framework-specific debugging.
