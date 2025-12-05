# EmberMate Dev Summary (Consolidated)

This file contains a single, consolidated developer summary that you can upload directly into Visual Studio Code without hitting character limits.

## 1. Core Theme
Teal + coral emotional wellness aesthetic, consistent across:
- Today tab (orb visualization)
- Log (structured input)
- Care Plan (care circle & goals)
- Insights (report cards)

## 2. App Structure
```
app/
  (tabs)/
    _layout.tsx
    today.tsx
    log.tsx
    care-plan.tsx
    insights.tsx
ui/
docs/
data-schema.json
README.md
```

## 3. Tabs
### Today
- Orb indicator
- Coffee moment emotional support block
- Quick sliders: pain, energy, mood
- Quick actions: log meds, symptoms, voice note

### Log
- Meds dropdowns
- Vitals numeric inputs
- Symptoms sliders + tags
- Sleep/energy/mood sliders
- Voice notes + flags

### Care Plan
- Shared goals: comfort, safety, dignity
- Care circle with roles, permissions
- Safety flags
- Communication helpers

### Insights
- Medication adherence
- Vitals stability
- Sleep/energy/mood patterns
- Red flags & visit prep
- Tags for filtering context

## 4. Required UI Kit Components
Must exist and be exported in `ui/index.ts`:
- EmberCard
- SectionHeader
- SliderInput
- DropdownInput
- CheckboxInput
- NumericField
- TagPill
- QuickAddButton
- VoiceNoteButton

## 5. Data Schema (Simplified)
```
meds: { name, dose, schedule[], taken, timestamp }
symptoms: { type, severity, notes, timestamp }
vitals: { bp, hr, o2, temp, timestamp }
hydration: { ounces, timestamp }
meals: { mealType, notes }
careCircle: { name, role, permissions[] }
```

## 6. General Notes
- All pages use centralized emotional-tone components
- Inputs map directly to schema for export/reporting
- Sliders use 0–10 scale unless stated
- Dropdown options mapped to `value: string`
- Layout uses unified dark-teal background
