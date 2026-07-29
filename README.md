# Aikitr Desktop

> Enterprise Tauri 2 + Vue 3 desktop application monorepo template.

[![CI](https://img.shields.io/badge/CI-passing-brightgreen)](.github/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-339933)](.nvmrc)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220)](package.json)

A production-grade starting point for building cross-platform desktop
applications with **Tauri 2**, **Vue 3**, **TypeScript**, **Tailwind CSS 4**,
**Pinia**, and **Vue Router 4**. Designed for long-term maintenance, large
team collaboration, and CI/CD automation.

## Highlights

- **Tauri 2** — secure-by-default capabilities, multi-window, native updater.
- **Vue 3.5 + `<script setup>`** — Composition API everywhere, strict TypeScript.
- **pnpm workspace** monorepo with `apps/desktop` and `packages/{ui,hooks,types,utils}`.
- **shadcn-vue** on top of **reka-ui** primitives + **Tailwind 4** design tokens.
- **Pinia** setup stores with persistent hydration via `tauri-plugin-store`.
- **ofetch** HTTP client with interceptors and `Result` error model.
- **Vitest** unit/component tests, **ESLint 9** flat config, **Prettier 3**.
- **GitHub Actions** CI/CD across Windows / macOS / Linux + CodeQL + Dependabot.

## Quick start

```bash
# Prerequisites: Node 20+, pnpm 9+, Rust 1.77+
nvm use                 # use the pinned Node version
corepack enable         # install pnpm shim
pnpm install            # install all workspace dependencies
pnpm dev:desktop        # launch desktop app in dev mode (Tauri)
```

The first launch may take several minutes while Rust dependencies are
compiled. Subsequent launches are incremental.

## Repository layout

```
aikitr/
├── apps/
│   └── desktop/        # Tauri 2 + Vue 3 desktop application
├── packages/
│   ├── ui/             # shadcn-vue component primitives
│   ├── hooks/          # Vue composables
│   ├── types/          # Shared TypeScript types (DTO, errors, domain)
│   └── utils/          # Pure functions (logger, http, date, result)
├── .github/            # CI/CD workflows
├── .vscode/            # Editor configuration
├── docs/               # Additional documentation
├── package.json        # Root workspace manifest
├── pnpm-workspace.yaml
├── eslint.config.js
├── prettier.config.js
└── tsconfig.base.json
```

## Common scripts

| Command                  | What it does                                 |
| ------------------------ | -------------------------------------------- |
| `pnpm dev:desktop`       | Start Tauri dev (Vite + Rust hot-reload)     |
| `pnpm build:desktop`     | Produce a signed, release-ready bundle       |
| `pnpm lint`              | Run ESLint with zero-warnings policy         |
| `pnpm format`            | Format everything with Prettier              |
| `pnpm typecheck`         | Run `tsc --noEmit` across all packages       |
| `pnpm test`              | Run Vitest in all packages                   |
| `pnpm clean`             | Remove build artifacts & node_modules        |

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — system design, module boundaries, data flow.
- [DEVELOPMENT.md](./DEVELOPMENT.md) — contributor workflow, conventions, recipes.
- [docs/](./docs/) — additional guides (security, deployment, troubleshooting).

## License

[MIT](./LICENSE) © 2026 Aikitr.
