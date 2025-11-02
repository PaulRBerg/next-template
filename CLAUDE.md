# Development Instructions

AI agents working on this Next.js project must follow these guidelines.

## Most Important Thing

After generating code, run these commands **in order**.

**File argument rules:**

- Changed fewer than 10 files? → Pass specific paths or globs
- Changed 10+ files? → Omit file arguments to process all files

**Command sequence:**

1. **Identify which file types changed**

2. **`just biome-lint <files>`** — lint JS/TS/JSON/CSS/GraphQL (skip if none changed)

3. **`just tsc-check`** — verify TypeScript types (always run on entire project)

**Examples:**

```bash
# Fewer than 10 files: use specific paths
just biome-lint app/page.tsx app/layout.tsx

# More than 10 files: use globs
just biome-lint app/**/*.ts app/**/*.tsx

# 10+ files: omit file arguments
just biome-lint

# TypeScript check always runs on entire project
just tsc-check
```

If any command fails, analyze the errors and fix it before continuing.

## Tech Stack

- **Framework**: Next.js v16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: bun
- **Task Runner**: just (casey/just)
- **Linter and Formatter**: Biome
- **Formatter for Markdown and YAML**: Prettier
- **Date Handling**: dayjs (not native Date)

## Commands

### Dependency Management

```bash
ni                   # Install all dependencies
ni package-name      # Add runtime dependency
ni -D package-name   # Add dev dependency
nun package-name     # Remove dependency
```

## Code Standards

### File Structure

- Components in `app/components/`
- API routes in `app/api/`
- Shared utilities in `app/lib/`
- Types in `app/types/`
- Keep components small and focused (single responsibility)

### TypeScript

- Prefer `type` over `interface` for object shapes
- Use `satisfies` operator for type-safe constants
- Avoid `any`; use `unknown` if type is truly unknown
- Export types from dedicated `.types.ts` files

### React/Next.js Patterns

- Use Server Components by default
- Add `"use client"` only when needed (interactivity, hooks, browser APIs)
- Prefer `async/await` in Server Components over `useEffect`
- Implement proper error boundaries
- Use `next/image` component for all images
- Leverage ISR/SSG where appropriate
- Do not use `useMemo` or `useCallback` - React Compiler (Next.js v15+) automatically optimizes re-renders
- Use named exports: `export function MyComponent()` instead of `export default`

### State Management

- Server state: Server Components + fetch
- Client state: useState/useReducer for local state
- Complex client state: use Zustand

### Styling

- Use Tailwind's design tokens (no arbitrary values unless necessary)
- Component variants with `tv` (tailwind-variants)
- Dark mode support via `dark:` modifier
- Consistent spacing scale
- Always apply `cursor-pointer` to buttons and any clickable HTML elements
- Use `lucide-react` for icons instead of hard-coding SVGs

### Performance

- Lazy load heavy components with `dynamic()`
- Implement proper loading states
- Optimize images (WebP, proper sizes)
- Code split at route boundaries
- Minimize client-side JavaScript

### Common Patterns

#### Component Variants with Tailwind Variants

```ts
import { tv } from "tailwind-variants";

const button = tv({
  base: "font-medium rounded-lg transition-colors cursor-pointer",
  variants: {
    variant: {
      primary: "bg-blue-500 text-white hover:bg-blue-600",
      secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

#### Using Icons with Lucide React

```ts
import { ChevronRight, User, Settings } from "lucide-react";

export function IconExample() {
  return (
    <div className="flex gap-4">
      <ChevronRight className="h-6 w-6 text-blue-500" />
      <User className="h-5 w-5" />
      <Settings className="h-4 w-4 text-gray-600" />
    </div>
  );
}
```

#### Data Fetching (Server Component)

```ts
async function Page() {
  const data = await fetch("...", {
    next: { revalidate: 3600 },
  });
  return <div>{/* render */}</div>;
}
```

#### Client Component with Server Data

```ts
// page.tsx (Server Component)
async function Page() {
  const data = await fetchData();
  return <ClientComponent initialData={data} />;
}

// ClientComponent.tsx
"use client"

function ClientComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  // ...
}
```

## Troubleshooting

### Common Issues

1. **Hydration mismatch**: Check for browser-only code in SSR
2. **Module not found**: Clear `.next` and reinstall with `ni`
3. **Type errors**: Run `just tsc-check` for detailed output
4. **Build failures**: Check `next build` output and env vars

### Debugging

- Use Next DevTools MCP server
- Use `console.dir(obj, { depth: null })` for deep inspection
- Add `debugger` statements for breakpoints
- Check Network tab for API failures
- Use React DevTools for component state
