# Next.js Template [![NextJS][next-badge]][next] [![TypeScript Version][typescript-badge]][typescript-url] [![License: MIT][license-badge]][license-url]

[next]: https://nextjs.org/
[next-badge]: https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white
[typescript-badge]: https://img.shields.io/badge/typescript-5.9-blue
[typescript-url]: https://www.typescriptlang.org/
[license-badge]: https://img.shields.io/badge/License-MIT-orange.svg
[license-url]: https://opensource.org/licenses/MIT

A Next.js 16 template for building production web applications with React 19, TypeScript, Effect, and Tailwind CSS 4.

![Artwork](./artwork.jpg)

## Included

- Next.js App Router, React Compiler, and typed routes
- Effect 3, Effect Platform, and `@prb/effect-next` for typed server workflows
- Tailwind CSS 4, tailwind-variants, Base UI, and Lucide icons
- `SmartImage`, a project wrapper around `next/image` with inferred sizes and fallback alt text
- Bun, Biome, ESLint, Prettier, Just, Husky, and lint-staged
- Vercel deployment with encrypted environment variables managed by dotenvx

Some configuration and Just recipes are provided by [devkit](https://github.com/PaulRBerg/devkit).

## Getting Started

Use the [`Use this template`](https://github.com/PaulRBerg/next-template/generate) button, or clone it manually:

```bash
git clone https://github.com/PaulRBerg/next-template.git my-app
cd my-app
```

Install [Bun](https://bun.sh), [Ni](https://github.com/antfu-collective/ni), and
[Just](https://just.systems), then run:

```bash
bun install
just dev
```

The development URL is printed in the terminal. Run `just` to list the available build, quality, and deployment
recipes.

## Vercel Deployment

The committed `.env` is encrypted; private decryption keys remain local in the ignored `.env.keys` file. A clone cannot
decrypt the template's environment, so remove that `.env` and create project-specific values:

```bash
na dotenvx set VERCEL_ORG_ID <value>
na dotenvx set VERCEL_PROJECT_ID <value>
na dotenvx set VERCEL_TOKEN <value>
```

Add the generated private key to GitHub Actions as `DOTENV_PRIVATE_KEY`. With the GitHub CLI, load it directly from the
keys file:

```bash
gh secret set -f .env.keys
```

The deployment workflow runs manually through `workflow_dispatch`; enable its commented `push` trigger if deployments
should run automatically from `main`.

## Contributing

See [`AGENTS.md`](./AGENTS.md) for development and validation conventions.

## License

MIT
