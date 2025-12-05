<!-- copilot-instructions.md for embermate-v3 -->
# Copilot / AI Agent Instructions — EmberMate V3

Purpose: quick, actionable guidance so an AI coding agent can be productive in this Expo + TypeScript app.

- Project type: Expo (React Native) app using `expo-router` for file-based routing and TypeScript. Main entry: `expo-router/entry` (see `package.json`).
- Primary UI folders: `app/` (routes + screens), `components/` (shared view components), `ui/` (form inputs & small UI primitives).
- State & domain: lightweight React Context providers (no active persistence). Key contexts:
  - `app/context/CareContext.tsx` — care domain (meds, mood). Exposes `useCareData()` and `CareProvider`.
  - `src/state/dayState.tsx` — today's metrics. Exposes `useToday()` and `TodayProvider`.
- Storage: persistence stubs in `src/storage/db.ts`. Currently persistence is disabled (functions are no-ops and return defaults). Do not assume a DB exists; change `db.ts` only when intentionally enabling persistence.

Big picture / architecture notes
- Routing: `app/` is organized for `expo-router`. Tabs live under `app/(tabs)/` (e.g., `today`, `log`, `insights`, `people`, `calendar`). Adding a screen is done by adding a file under `app/` following the file-based routing.
- UI composition: high-level cards live in `components/EmberCard.tsx`. Styles/colors/layout constants live in `constants/` (e.g., `constants/colors.ts`, `constants/layout.ts`). Follow existing style tokens.
- Data flow: UI screens call context hooks (`useCareData`, `useToday`) to read/update state. Example: `app/(tabs)/log.tsx` calls `useCareData()` to read meds and mutate via `setMedStatus`.

Developer workflows / commands
- Start Metro / dev server: `npm start` (runs `expo start`).
- iOS / Android: `npm run ios`, `npm run android` (useful on machines configured for native builds). Web: `npm run web`.
- Reset helper: `npm run reset-project` runs `node ./scripts/reset-project.js` — used by the team for local resets. Inspect the script before running in CI.
- Lint: `npm run lint` uses `expo lint` (ESLint + TypeScript rules via `eslint-config-expo`).

Project-specific conventions
- TypeScript + TSX across the repo. Components export named functions (e.g., `export function EmberCard(...)`) and are imported with relative paths.
- Contexts throw when used outside providers — e.g., `useCareData()` and `useToday()` will throw if provider is missing. Wrap app entry with providers if adding new screens that need them.
- Minimal local persistence: `src/storage/db.ts` intentionally returns defaults (see comments). Feature work that requires persistence should update this file and add migrations/tests.
- UI tokens: use `constants/colors.ts` and `constants/layout.ts` rather than inline hex values when possible.

Integration points & external deps
- Expo modules: many `expo-*` packages (notifications, splash screen, sqlite listed but not used for persistence currently). Check `package.json` before editing native modules.
- Navigation: `@react-navigation/*` and `expo-router` file-based routing. Use `Redirect` from `expo-router` for route redirects (see `app/index.tsx`).
- State libs: `@reduxjs/toolkit` is listed in `package.json` but app currently uses React Contexts. Confirm before converting any part to Redux.

When making changes
- Adding a route: create a new file under `app/` (e.g., `app/new-screen.tsx` or `app/(tabs)/new.tsx`). Use existing screens as patterns for layout and data access.
- Adding a shared component: prefer `components/` for larger reusable pieces and `ui/` for small controls (inputs, chips, etc.). Keep props typed and avoid `any`.
- Enabling persistence: update `src/storage/db.ts` and coordinate with `src/state/dayState.tsx` and any providers that expect `loadEntry`/`saveEntry`. Add tests or manual verification steps.
- Styling: use `constants/colors.ts` and `constants/layout.ts`. Keep inline styles consistent with existing patterns (no styled-components in this codebase).

Quick examples (copyable patterns)
- Read care data: `const { meds, setMedStatus } = useCareData();` (from `app/context/CareContext.tsx`)
- Update today state: `const { today, updateToday } = useToday(); updateToday({ mood: 4 });` (from `src/state/dayState.tsx`)
- Add a tab route: create `app/(tabs)/mytab.tsx` and export a default React component.

Limits & warnings
- Do not assume a backend or working SQLite persistence — `src/storage/db.ts` is intentionally inert.
- Avoid adding native-only dependencies without updating `eas.json`/build config and confirming Expo SDK version compatibility (project uses Expo ~54 per `package.json`).

Where to look first
- App entry & routing: `app/index.tsx`, `app/(tabs)/*`
- Domain contexts: `app/context/CareContext.tsx`, `src/state/dayState.tsx`
- Storage & persistence: `src/storage/db.ts`
- UI tokens and layout: `constants/colors.ts`, `constants/layout.ts`, `components/EmberCard.tsx`

If anything here is unclear or you'd like more detail (examples, tests, or CI notes), tell me which area to expand and I'll iterate.
