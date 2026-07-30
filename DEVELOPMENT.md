# Development Guide

This guide walks you through contributing to the Aikitr monorepo — from local
setup to releasing a desktop build.

## Prerequisites

| Tool      | Version  | Notes                                                        |
| --------- | -------- | ------------------------------------------------------------ |
| Node.js   | ≥ 20.11  | Use `nvm` to match `.nvmrc`                                  |
| pnpm      | ≥ 9      | `corepack enable && corepack prepare pnpm@9.12.0 --activate` |
| Rust      | ≥ 1.77.2 | Install via [rustup](https://rustup.rs)                      |
| Tauri CLI | bundled  | Installed transitively via `pnpm install`                    |

Platform-specific build tools:

- **Windows**: Visual Studio Build Tools with "Desktop development with C++".
- **macOS**: Xcode Command Line Tools (`xcode-select --install`).
- **Linux**: see
  [`apps/desktop/src-tauri/.cargo/config.toml`](apps/desktop/src-tauri/.cargo/config.toml)
  for required `apt` packages.

## First-time setup

```bash
git clone <repo>
cd aikitr-tauri-monorepo-template
nvm use
corepack enable
pnpm install
pnpm dev:desktop
```

The first run is slow because Cargo compiles the entire Tauri dependency graph.
Subsequent runs are fast.

## Daily workflow

```bash
pnpm dev:desktop        # Vite + Tauri with HMR
pnpm lint               # ESLint
pnpm format             # Prettier write
pnpm typecheck          # vue-tsc --noEmit (per package)
pnpm test               # Vitest
pnpm build:desktop      # Release bundle for the host platform
```

## Coding standards

- **TypeScript strict mode** is mandatory. The base `tsconfig` enables
  `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noImplicitOverride`. Avoid `any`. If you really need it, the lint rule will
  block the PR.
- **Vue 3.5 Composition API with `<script setup lang="ts">`** for every
  component. Components are capped at ~300 lines — split when necessary.
- **Pinia setup stores** only. No Options-store style.
- **No direct `invoke()`** in components or stores. Always go through
  `services/tauri/*` so the call is mockable.
- **Imports are sorted by Prettier** — don't fight it.

## Adding a new page

1. Create `apps/desktop/src/views/<Name>.vue`:

   ```vue
   <script setup lang="ts">
   // logic
   </script>
   <template>
     <div>...</div>
   </template>
   ```

2. Register the route in
   [`apps/desktop/src/router/routes.ts`](apps/desktop/src/router/routes.ts) with
   a `meta: { title }` object.

3. The layout will pick it up automatically.

## Adding a Tauri command

1. Implement the command in `apps/desktop/src-tauri/src/commands/<area>.rs`.
2. Register it in [`lib.rs`](apps/desktop/src-tauri/src/lib.rs) under
   `tauri::generate_handler![...]`.
3. Add a typed wrapper in `apps/desktop/src/services/tauri/<area>.ts`.
4. If the command needs filesystem or network access, declare the relevant
   permission in `apps/desktop/src-tauri/capabilities/`.

## Adding a new shared package

```bash
mkdir -p packages/<name>/src
```

Create `packages/<name>/package.json` with `"name": "@aikitr/<name>"` and add
`workspace:*` to the desktop's `dependencies` in
[`apps/desktop/package.json`](apps/desktop/package.json). The package is picked
up automatically by `pnpm-workspace.yaml`.

## Theming

- Tokens live in `packages/ui/src/styles/index.css` and are exposed as CSS
  variables on `:root` and `.dark`.
- Add a new token there; reference it from Tailwind via
  `hsl(var(--my-token) / <alpha-value>)` in
  [`apps/desktop/tailwind.config.ts`](apps/desktop/tailwind.config.ts).

## Testing recipes

### Store test

```ts
import { setActivePinia, createPinia } from 'pinia';
import { useAppStore } from './app';

beforeEach(() => setActivePinia(createPinia()));

it('starts un-bootstrapped', () => {
  const store = useAppStore();
  expect(store.bootstrapped).toBe(false);
});
```

### Component test

```ts
import { mount } from '@vue/test-utils';
import { Button } from '@aikitr/ui';

it('renders a button', () => {
  const w = mount(Button, { slots: { default: 'Click me' } });
  expect(w.text()).toBe('Click me');
});
```

## Building a release

```bash
git tag v0.1.0
git push origin v0.1.0
```

The `release.yml` workflow builds Windows, macOS, and Linux bundles and drafts a
GitHub release. Configure signing credentials in
`Settings → Secrets and variables → Actions` before tagging.

## Troubleshooting

### `pnpm install` fails with peer dep warnings

We use `auto-install-peers=true`. If a peer is missing, run
`pnpm install --strict-peer-dependencies` to surface the issue.

### Tauri command not found in dev

Make sure the command is registered in `tauri::generate_handler![...]` in
`lib.rs`, and that `apps/desktop/src-tauri/tauri.conf.json` is saved (Tauri
re-reads it on every `tauri dev` start).

### CSP blocks an external resource

Extend the `csp` field in `tauri.conf.json`. Avoid `'unsafe-inline'` /
`'unsafe-eval'` unless absolutely necessary; prefer hashes or nonces.

### Window state not persisting

`tauri-plugin-window-state` only persists main windows by default. Add
additional labels to its `Builder` if you have multiple.

## Release process

1. Bump versions with `pnpm -r exec npm version <patch|minor|major>`.
2. Update `CHANGELOG.md`.
3. Tag and push: `git tag vX.Y.Z && git push --tags`.
4. CI produces signed artifacts and a draft release.

## Getting help

- Open an issue with a clear reproduction and environment details.
- For security disclosures, email `security@aikitr.example.com`.
