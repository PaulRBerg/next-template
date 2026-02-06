/**
 * @type {import("lint-staged").Configuration}
 */
module.exports = {
  "*.{js,json,jsonc,ts,tsx}": "bun biome check --write",
  "*.{js,ts,tsx}": "bun biome lint --write --only correctness/noUnusedImports",
  "*.{ts,tsx}": "bun eslint --cache --cache-location node_modules/.cache/eslint/.eslintcache",
  "*.{md,yml,yaml}": "bun prettier --cache --write",
};
