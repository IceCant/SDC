# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## SDC design direction

- Preserve SDC's real public business information and source-owned media.
- Use the bold red editorial direction selected from the September 2026 redesign concepts.
- Prioritize a strong first impression for a family presentation while keeping the experience credible for hospitality procurement buyers.
- Keep product discovery and the quote journey as the two primary user paths.
- Do not use AI-generated imagery for this project. Prefer the original SDC website media and original platform thumbnails, with clear, accurate alt text.
