# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Bun: https://github.com/oven-sh/bun
bun := require("bun")

# Ni: https://github.com/antfu-collective/ni
na := require("na")
ni := require("ni")
nlx := require("nlx")

# ---------------------------------------------------------------------------- #
#                                    SCRIPTS                                   #
# ---------------------------------------------------------------------------- #

# Default recipe
default:
    just --list

# Clean the .next directory
clean:
    bunx del-cli .next

# Deploy website to Vercel
deploy environment="production":
    na vercel pull --environment={{ environment }} --token=$VERCEL_TOKEN --yes
    na vercel build --prod --token=$VERCEL_TOKEN
    na vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
alias d := deploy

# ---------------------------------------------------------------------------- #
#                                      APP                                     #
# ---------------------------------------------------------------------------- #

# Start the Next.js app
[group("app")]
@build:
    na next build

# Start the Next.js app in dev mode
[group("app")]
@dev:
    na next dev --turbopack

# Build and start the Next.js app
[group("app")]
start: build
    na next start

