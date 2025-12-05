# EmberMate Foundation Kit

This bundle contains:

- A small **UI component kit** for core inputs.
- A **data schema** describing how logs and care data should be shaped.
- An **input system mapping** so there is no ambiguity about which component to use where.

## Structure

- `ui/` – Reusable React Native components (cards, sliders, dropdowns, chips, etc).
- `docs/data-schema.json` – JSON description of the core data models for logs, vitals, meds, care circle, etc.
- `docs/input-mapping.md` – Human-readable guide mapping fields to UI components by screen.

## How to use

1. Drop `ui/` into your app repo (for example: `app/ui`).
2. Install the slider dependency:

   ```bash
   npx expo install @react-native-community/slider
   ```

3. Import components via:

   ```ts
   import { EmberCard, SliderInput, DropdownInput } from "../ui";
   ```

4. Use `docs/data-schema.json` as the source of truth for the shape of:

   - daily snapshots
   - med logs
   - symptom logs
   - vitals
   - meals & hydration
   - red flags
   - care notes
   - care circle members

5. Use `docs/input-mapping.md` when building or reviewing screens so that:

   - Today tab stays light, quick, and slider/chip-heavy.
   - Log tab uses structured inputs suited for exports.
   - Care Plan uses dropdowns, checkboxes, and pills for roles and permissions.
   - Insights remains read-only and driven by the underlying schema.

This kit is the floor, not the ceiling: you can add more components, but you should not change the data shapes or swap input types without a very good, documented reason.
