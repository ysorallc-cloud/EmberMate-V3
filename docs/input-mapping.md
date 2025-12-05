# EmberMate Input System Mapping

This document tells developers EXACTLY which input component to use for which field, by screen.

## Components

From `ui/`:

- `SliderInput` – for 0–10 style ratings (mood, pain, energy, symptom severity, sleep quality).
- `CheckboxInput` – for binary yes/no like "dose taken", "meal eaten", "flag for provider".
- `DropdownInput` – for constrained sets like symptoms, meds, side effects, meal type, roles.
- `ChipGroup` – for emotional words, appetite, mobility, quick semantic tags.
- `QuickAddButton` – for "+8 oz", "Same as yesterday", "Copy from last entry".
- `NumericField` – for vitals and numeric entries.
- `VoiceNoteButton` – to attach an audio-backed note (UI only).
- `TagPill` – for status like "red flag", "stable", "follow up".

---

## Today tab

**Goal:** fast, low-friction daily snapshot.

- Mood: `SliderInput`
- Energy: `SliderInput`
- Sleep quality: `SliderInput` or `ChipGroup` (Bad / Okay / Good)
- Hydration: `SliderInput` plus `QuickAddButton` (e.g. "+8 oz")
- Meals eaten: `CheckboxInput` per meal (breakfast / lunch / dinner / snack)
- Emotional word of the day: `ChipGroup`
- Quick note: plain `TextInput` + `VoiceNoteButton`

The Orb consumes:
- mood
- energy
- recent symptom severity
- last 24h meds adherence
- sleep quality

---

## Log tab

**Meds section**

- Medication: `DropdownInput` (pre-populated from care plan med list)
- Dose taken: `CheckboxInput`
- Time: native time picker
- Late dose: `CheckboxInput`
- Side effects present: `CheckboxInput`
- Side effect type: `DropdownInput`
- Side effect severity: `SliderInput`
- Optional context: text + `VoiceNoteButton`

**Symptoms section**

- Symptom: `DropdownInput` (catalog + custom)
- Severity: `SliderInput`
- Triggers: `ChipGroup` (e.g. "meal", "movement", "stress", "med change")
- Notes: text + `VoiceNoteButton`

**Vitals section**

- BP: `NumericField` (with unit "mmHg")
- HR: `NumericField` ("bpm")
- O₂: `NumericField` ("%")
- Weight: `NumericField` ("lb")
- Temperature: `NumericField` ("°F")
- Glucose: `NumericField` ("mg/dL")
- Notes: text + optional `VoiceNoteButton`
- Quick-add patterns: `QuickAddButton` for "Same as yesterday", "Copy last good reading"

**Sleep, energy, activity**

- Hours slept: `NumericField`
- Sleep quality: `SliderInput` or `ChipGroup`
- Energy today: `SliderInput`
- Activity level: `ChipGroup` (low / moderate / usual)

**Notes & reflections**

- Free text area
- `VoiceNoteButton` for speech

---

## Care Plan tab

**Care circle members**

- Name: text
- Role: `DropdownInput` (primary caregiver, secondary, nurse, physician, therapist, other)
- Relationship: text
- Permissions: multiple `CheckboxInput`s:
  - View meds
  - View symptoms
  - View vitals
  - View notes
  - Export reports

**Medications**

- Name: text
- Dose: text
- Schedule: `DropdownInput` (morning, afternoon, evening, bedtime, PRN)
- Notes: text

**Goals & routines**

- Goal description: text
- Priority: `ChipGroup` (low / medium / high)
- Linked metric: `DropdownInput` (hydration, steps, sleep, etc.)

---

## Insights tab

Mostly read-only. Uses:

- `EmberCard` for each report block.
- `TagPill` for "Stable", "Red flag", "Improving".
- `DropdownInput` for report range (7 days / 30 days / custom).
- Export actions wired to buttons in the screen, not to these UI primitives.

---

## Implementation rules

1. Do not use raw `TextInput` where a slider, dropdown, chip, or checkbox makes sense.
2. Every log entry must be created via these components to preserve consistent shape for exports.
3. When in doubt: if a value is:
   - a rating → `SliderInput`
   - a yes/no → `CheckboxInput`
   - from a known list → `DropdownInput`
   - a feeling or quick category → `ChipGroup`
   - a small, repeatable action → `QuickAddButton`
   - a number with units → `NumericField`
4. Voice is additive, not primary. Always store structured data where possible.
