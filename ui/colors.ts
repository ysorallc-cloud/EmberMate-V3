export const emberColors = {
  background: "#020617",
  surface: "#020617",
  surfaceSoft: "#02081F",
  borderSubtle: "rgba(148, 163, 184, 0.3)",
  textPrimary: "#F9FAFB",
  textSecondary: "#CBD5F5",
  textMuted: "#9CA3AF",

  tabActive: "#22D3EE",
  tabInactive: "#64748B",

  tones: {
    story: {
      border: "#FACC15",
      label: "#FACC15",
      icon: "#FACC15",
    },
    reflection: {
      border: "#38BDF8",
      label: "#38BDF8",
      icon: "#38BDF8",
    },
    data: {
      border: "#0EA5E9",
      label: "#0EA5E9",
      icon: "#0EA5E9",
    },
    sharing: {
      border: "#22C55E",
      label: "#22C55E",
      icon: "#22C55E",
    },
  },
} as const;

export type EmberTone = keyof typeof emberColors.tones;