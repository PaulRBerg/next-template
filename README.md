# Next.js Template [![NextJS][next-badge]][next] [![Node.js Version][node-badge]][node-url] [![TypeScript Version][typescript-badge]][typescript-url] [![License: MIT][license-badge]][license-url]

[next]: https://nextjs.org/
[next-badge]: https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white
[node-badge]: https://img.shields.io/badge/node-%3E%3D20-green
[node-url]: https://nodejs.org
[typescript-badge]: https://img.shields.io/badge/typescript-5.9-blue
[typescript-url]: https://www.typescriptlang.org/
[license-badge]: https://img.shields.io/badge/License-MIT-orange.svg
[license-url]: https://opensource.org/licenses/MIT

A modern Next.js template for building production-ready web applications.

![Artwork](./artwork.jpg)

## What's Inside

This template provides:

- **[Next.js v15](https://nextjs.org)** - with App Router and React v19
- **[Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)** - for hosting and CI deployments
- **[TypeScript v5](https://typescriptlang.org)** — type safety and enhanced developer experience
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first CSS framework for rapid styling
- **[Bun](https://bun.sh)** — fast package manager and JavaScript runtime
- **[BiomeJS](https://biomejs.dev)** — lightning-fast linting and formatting for TypeScript and JSON
- **[Prettier](https://prettier.io)** — code formatting for Markdown and YAML files
- **[Just](https://just.systems)** — command runner for streamlined task automation
- **[Husky](https://typicode.github.io/husky)** - automated Git hooks for code quality
- **[Knip](https://github.com/webpro/knip)** — unused code and dependency detection
- **[Claude Code](https://anthropic.com/claude-code)** — `CLAUDE.md` file and MCP servers configuration

Optimized for developer productivity and application performance.

> [!NOTE]
>
> Some of the configuration files depend upon the [Sablier DevKit](https://github.com/sablier-labs/devkit)

## Getting Started

Click the [`Use this template`](https://github.com/PaulRBerg/next-template/generate) button to create a new repository.

Or clone manually:

```bash
git clone https://github.com/PaulRBerg/next-template.git my-app
cd my-app
bun install
bun husky
```

New to Next.js? Check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## Prerequisites

- [Bun](https://bun.sh)
- [Ni](https://github.com/antfu-collective/ni)
- [Just](https://just.systems)

## Usage

Start the development server:

```bash
just dev
```

Open [http://localhost:3000](http://localhost:3000) to view your application.

### Vercel Deployment

To make the CI deployment workflow work, you have to configure these environment variables in your GitHub Actions
secrets:

- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VERCEL_TOKEN`

> [!TIP]
>
> If you use the [`gh`](https://cli.github.com) CLI, you can put your environment variables in a `.env` file and then
> run this command: `gh secret set -f .env`.

## Commands

This template uses [Just](https://just.systems/) for task automation:

### Development

| Command      | Description              |
| ------------ | ------------------------ |
| `just dev`   | Start development server |
| `just build` | Build for production     |
| `just start` | Start production server  |
| `just clean` | Clean build artifacts    |

### Code Linting

| Command             | Description            |
| ------------------- | ---------------------- |
| `just biome-check`  | Check code with Biome  |
| `just biome-format` | Format code with Biome |
| `just full-check`   | Run all quality checks |
| `just full-write`   | Fix all quality issues |

### Other Commands

Run `just` to see all available commands.

## Project Structure

```tree
├── app/                   # Next.js App Router directory
│   ├── favicon.ico        # Favicon
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── public/                # Static files
├── biome.jsonc            # Biome configuration
├── justfile               # Just command definitions
├── knip.jsonc             # Knip configuration
├── next.config.js         # Next.js configuration
├── package.json           # Package configuration
├── postcss.config.js      # PostCSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Customization

### Styling

Customize the design system by editing:

- `app/globals.css` — global styles and Tailwind directives
- `postcss.config.js` — PostCSS configuration

### Linting and Formatting

Code quality is enforced with Biome. See `biome.jsonc` for configuration.

### Dead Code Detection

Knip detects unused dependencies and exports. See `knip.jsonc` for configuration.

## Deployment

Deploy easily with
[Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme),
the platform from Next.js creators.

See the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for other options.

## License

This project is licensed under MIT.
