# See https://github.com/PaulRBerg/devkit/blob/main/just/base.just
import "./node_modules/@prb/devkit/just/base.just"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Ni: https://github.com/antfu-collective/ni
na := require("na")
ni := require("ni")
nlx := require("nlx")

# ---------------------------------------------------------------------------- #
#                                   COMMANDS                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Clean the .next directory
clean:
    nlx del-cli .next

# Deploy website to Vercel (dotenvx decrypts VERCEL_* from .env)
deploy environment="production":
    na dotenvx run -- na vercel pull --environment={{ environment }} --yes
    na dotenvx run -- na vercel build --target={{ environment }}
    na dotenvx run -- na vercel deploy --target={{ environment }} --prebuilt
alias d := deploy

# ---------------------------------------------------------------------------- #
#                                    CHECKS                                    #
# ---------------------------------------------------------------------------- #

# Run all code checks
[group("checks"), no-cd]
@_full-check:
    just _run-with-status biome-check
    just _run-with-status eslint-check
    just _run-with-status prettier-check
    just _run-with-status type-check

# Run all code fixes
[group("checks"), no-cd]
@_full-write:
    just _run-with-status biome-write
    just _run-with-status eslint-write
    just _run-with-status prettier-write

# Type check with TypeScript's native compiler
[group("checks"), no-cd]
[arg("project", long, short, help="Path to tsconfig.json")]
type-check project="tsconfig.json":
    na tsc --noEmit --project {{ project }}

# ---------------------------------------------------------------------------- #
#                                    ESLINT                                    #
# ---------------------------------------------------------------------------- #

# Run ESLint checks
[group("checks")]
@eslint-check dir=".":
    just _run-eslint {{ dir }}
alias ec := eslint-check

# Run ESLint auto-fixes
[group("checks")]
@eslint-write dir=".":
    just _run-eslint {{ dir }} --fix
alias ew := eslint-write

# Private ESLint invocation helper
[private]
@_run-eslint dir *args:
    na eslint \
        --cache \
        --cache-location node_modules/.cache/eslint/.eslintcache \
        --concurrency auto \
        {{ args }} \
        {{ dir }}

# ---------------------------------------------------------------------------- #
#                                      APP                                     #
# ---------------------------------------------------------------------------- #

# Start the Next.js app
[group("app")]
@build:
    na next build

# Start the Next.js app in dev mode on a random port
[group("app")]
@dev *args:
    na next dev {{ args }}

# Build and start the Next.js app
[group("app")]
start: build
    na next start
