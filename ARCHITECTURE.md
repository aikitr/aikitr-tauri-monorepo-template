# Architecture

This document describes the architecture of the Aikitr monorepo and the design
decisions behind it. It is intended for engineers contributing to the codebase,
reviewing PRs, or extending the template for a new product.

## Goals

1. **Long-term maintainability** — explicit module boundaries, strong typing,
   predictable data flow.
2. **Large-team collaboration** — workspace packages, feature folders,
   unambiguous ownership.
3. **Modular extension** — add a new app or package without modifying the rest
   of the workspace.
4. **Performance** — code splitting, lazy loading, shallow reactive state.
5. **Security** — least-privilege capabilities, sandboxed IPC, CSP.
6. **Cross-platform** — single Tauri config produces Windows, macOS, Linux.
7. **Automation** — CI/CD for lint / typecheck / test / build / release.

## High-level topology

```
┌────────────────────────┐
│  apps/desktop          │   UI (Vue 3) ── IPC ── Rust commands
│  (Tauri 2 frontend)    │                    │
└──────────┬─────────────┘                    ▼
           │                          ┌──────────────────┐
           │                          │  Tauri runtime   │
           ▼                          │  plugins (store,  │
┌────────────────────────┐            │  fs, sql, http…)  │
│  packages/ui           │            └──────────────────┘
│  packages/hooks        │            ┌──────────────────┐
│  packages/types        │───────────▶│  Rust backend     │
│  packages/utils        │            │  (lib.rs)         │
└────────────────────────┘            └──────────────────┘
```

## Data flow

```
View (Vue)
  │ user event
  ▼
Composable / Action                状态写
  │ invoke(cmd)                    ▼
  ▼                              Pinia store
Rust command ────► Service ────► (reactive state)
  │                  │                │
  │                  ▼                ▼
  │               SQLite         shallowRef / ref
  │              (sqlite)        (component)
  ▼
emit event ──► Tauri event bus ──► @tauri-apps/api/event
```

### Key principles

- **One-way data flow**: state changes flow through a single store, then out to
  components via reactive bindings.
- **Boundary isolation**: UI never calls `invoke` directly — it goes through
  `services/tauri/*`. This makes mocking trivial in tests.
- **Pure TypeScript at the edges**: stores, composables and services are
  unit-testable without a Tauri runtime.
- **Capability-first security**: every command and plugin permission is declared
  in `capabilities/*.json` and scoped to a specific window.

## Module responsibilities

### `apps/desktop`

- Mounts the Vue app, registers Pinia and the router.
- Owns the layout (`DefaultLayout.vue`), theme initialization, and global
  providers (e.g. `Toaster`, `TooltipProvider`).
- Bootstraps persistent stores (settings, user) on startup.

### `packages/ui`

- Renders accessible primitives on top of `reka-ui` with Tailwind 4 design
  tokens.
- Zero business logic. Components are presentational and accept typed
  props/emits.
- Exports a subpath per component (`@aikitr/ui/button` etc.) so apps can
  tree-shake aggressively.

### `packages/hooks`

- Generic Vue composables (`useDebounceFn`, `useDarkMode`, `useAsyncState`).
- No domain knowledge. Importable from any app/package.

### `packages/types`

- DTOs, domain models, error codes, and shared utility types.
- The single source of truth for cross-boundary contracts.

### `packages/utils`

- Pure functions: HTTP client, logger, `Result` type, formatters.
- The only package that can talk to network primitives (e.g. `ofetch`).

## Frontend layering

```
┌──────────────────────────────────────────────────┐
│ views/         (Route-level pages, thin surfaces) │
├──────────────────────────────────────────────────┤
│ layouts/       (Shell + nav + chrome)            │
├──────────────────────────────────────────────────┤
│ components/    (Feature-specific UI)             │
├──────────────────────────────────────────────────┤
│ composables/   (Reusable Vue logic)              │
├──────────────────────────────────────────────────┤
│ services/      (Tauri IPC, HTTP)                 │
├──────────────────────────────────────────────────┤
│ stores/        (Pinia setup stores)              │
├──────────────────────────────────────────────────┤
│ utils/, types/ (Pure)                            │
└──────────────────────────────────────────────────┘
```

Strictly top-down: lower layers must not import from upper layers.

## State management (Pinia)

Each store is a **setup store** with explicit `state / actions / getters`:

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const doubled = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  return { count, doubled, increment };
});
```

Store categories:

- `app` — runtime metadata (version, platform, locale).
- `settings` — user preferences; persisted via `tauri-plugin-store`.
- `user` — auth state; persisted separately from settings.

## Security model

- **CSP** is declared in `tauri.conf.json` and includes no `unsafe-eval`.
- **Capabilities** are split per window. `default.json` covers the main window;
  `fs-scoped.json` adds filesystem access limited to `$APPDATA`, `$APPCONFIG`,
  etc.
- The Rust backend only exposes explicitly registered commands via
  `tauri::generate_handler!`.
- HTTP requests in the frontend go through `@aikitr/utils` `HttpClient` which
  validates the URL and serializes `AppError` consistently.
- Dependencies are kept up to date by Dependabot (weekly).

## Performance strategy

- **Code splitting**: `vite` manual chunks for `vue-vendor`, `ui-vendor`, and
  `tauri-vendor` keep initial JS lean.
- **Lazy routes**: every view is dynamically imported.
- **Shallow refs**: large state objects use `shallowRef` to avoid deep proxy
  overhead.
- **Computed over watch**: derived state lives in `computed`, side effects in
  `watch` — never duplicate logic in both.
- **Render budget**: components are split at the 300-line threshold; the layout
  never contains business logic.

## Testing

- **Vitest** runs unit + component tests in jsdom/happy-dom.
- **Stores** are tested in isolation with `setActivePinia(createPinia())`.
- **Composables** use `mount` from `@vue/test-utils`.
- **Tauri services** are mocked at the `services/tauri/*` boundary.

## CI/CD

```
lint  →  typecheck  →  test  →  rust-check  →  build-frontend
                                                  │
                                      tag push   ▼
                                      release.yml (Tauri action)
                                                  │
                                                  ▼
                                       Windows / macOS / Linux bundles
```

CodeQL performs weekly security analysis; Dependabot opens weekly PRs for npm,
cargo, and GitHub Actions.

## Extension points

- **Add a new app**: `pnpm create aikitr-app <name>` (not provided in the
  template — adapt the desktop package as a starting point).
- **Add a new shared package**: create `packages/<name>` with a `package.json`
  and `src/index.ts`; it will be picked up by `pnpm-workspace.yaml`
  automatically.
- **Add a new capability**: drop a JSON file into
  `apps/desktop/src-tauri/capabilities/` and reference it in `tauri.conf.json`.
- **Add a Tauri command**: register the handler in `src-tauri/src/lib.rs` inside
  `generate_handler![...]`.
