# Vendored OATS schemas

Vendored from `@awebai/oats` 0.67.1 (`docs/`):

- `capability-manifest.schema.json`
- `oats-package.schema.json`
- `soul.schema.json`

`scripts/validate-package.mjs` checks the package against them. Update them
together when the package's `compatibility.oats` floor moves.
