/**
 * @type {import("lint-staged").Configuration}
 */
module.exports = {
  "*.{js,ts,tsx}": ["bun oxfmt --write", "bun oxlint --fix"],
  "*.{json,jsonc,css,graphql}": "bun prettier --cache --write",
  "*.{md,yml,yaml}": "bun prettier --cache --write",
};
