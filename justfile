set allow-duplicate-variables
set allow-duplicate-recipes
set shell := ["bash", "-euo", "pipefail", "-c"]
set unstable

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Bun: https://github.com/oven-sh/bun
bun := require("bun")

# ---------------------------------------------------------------------------- #
#                                   CONSTANTS                                  #
# ---------------------------------------------------------------------------- #

GLOBS_PRETTIER := "**/*.{md,mdx,yaml,yml}"

# ---------------------------------------------------------------------------- #
#                                    SCRIPTS                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Clear node_modules recursively
[confirm("Are you sure you want to delete all node_modules, including in subdirectories? y/n")]
clean-modules:
    bunx del-cli "node_modules" "**/node_modules"

# Deploy website to Vercel
deploy environment="production":
    na vercel pull --environment={{ environment }} --token=$VERCEL_TOKEN --yes
    na vercel build --prod --token=$VERCEL_TOKEN
    na vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
alias d := deploy

# ---------------------------------------------------------------------------- #
#                                     LINT                                     #
# ---------------------------------------------------------------------------- #

# Check code with Biome
[group("lint")]
biome-check paths=".":
    bun biome check {{ paths }}
alias bc := biome-check

# Fix code with Biome
[group("lint")]
biome-write paths=".":
    bun biome check --write {{ paths }}
    bun biome lint --unsafe --write --only correctness/noUnusedImports {{ paths }}
alias bw := biome-write

# Run all code checks
[group("lint")]
full-check: biome-check prettier-check tsc-check
alias fc := full-check

# Run all code fixes
[group("lint")]
full-write: biome-write prettier-write
alias fw := full-write

# Run knip checks
[group("lint")]
knip-check:
    bun knip
alias kc := knip-check

# Run knip fix
[group("lint")]
knip-write:
    bun knip --fix
alias kw := knip-write

# Check Prettier formatting
[group("lint")]
prettier-check globs=GLOBS_PRETTIER:
    bun prettier --check --cache "{{ globs }}"
alias pc := prettier-check

# Format using Prettier
[group("lint")]
prettier-write globs=GLOBS_PRETTIER:
    bun prettier --write --cache "{{ globs }}"
alias pw := prettier-write

# Type check with TypeScript
[group("lint")]
tsc-check:
    bun tsc --noEmit

# ---------------------------------------------------------------------------- #
#                                      APP                                     #
# ---------------------------------------------------------------------------- #

# Start the Next.js app
[group("app")]
@build:
    bun next build

# Clean the .next directory (overrides the base clean recipe for this specific use case)
clean:
    bunx del-cli .next

# Start the Next.js app in dev mode
[group("app")]
@dev:
    bun next dev --turbopack

# Build and start the Next.js app
[group("app")]
@start: build
    bun next start

