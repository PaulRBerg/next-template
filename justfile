# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

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

# Deploy website to Vercel
deploy environment="production":
    na vercel pull --environment={{ environment }} --token=$VERCEL_TOKEN --yes
    na vercel build --target={{ environment }} --token=$VERCEL_TOKEN
    na vercel deploy --target={{ environment }} --prebuilt --token=$VERCEL_TOKEN
alias d := deploy

# ---------------------------------------------------------------------------- #
#                                      APP                                     #
# ---------------------------------------------------------------------------- #

# Start the Next.js app
[group("app")]
@build:
    na next build

# Start the Next.js app in dev mode on a random port
[group("app")]
@dev:
    na next dev --port 0 --turbopack

# Build and start the Next.js app
[group("app")]
start: build
    na next start

# ---------------------------------------------------------------------------- #
#                             OXC COMMAND OVERRIDES                            #
# ---------------------------------------------------------------------------- #

# Override devkit's GLOBS_PRETTIER to include JSON, CSS, and GraphQL
GLOBS_PRETTIER := "\"**/*.{css,graphql,json,jsonc,md,mdx,yaml,yml}\""

# Check code with oxlint and oxfmt (replaces biome-check)
[group("checks"), no-cd]
@biome-check +globs=".":
    na oxlint {{ globs }}
    na oxfmt --check . "!**/*.json" "!**/*.jsonc" --no-error-on-unmatched-pattern

# Lint code with oxlint (replaces biome-lint)
[group("checks"), no-cd]
@biome-lint +globs=".":
    na oxlint {{ globs }}

# Fix code with oxfmt and oxlint (replaces biome-write)
[group("checks"), no-cd]
@biome-write +globs=".":
    na oxfmt --write . "!**/*.json" "!**/*.jsonc" --no-error-on-unmatched-pattern
    na oxlint --fix {{ globs }}
