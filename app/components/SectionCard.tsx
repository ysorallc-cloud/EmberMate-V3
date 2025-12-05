import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing, FontSizes, Radii } from "../theme/theme-tokens";

type EmberTone = "story" | "reflection" | "data" | "sharing";

type SectionCardProps = {
  title: string;
  subtitle?: string;
  tone?: EmberTone;
  iconName?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
  style?: ViewStyle;
  headerRight?: ReactNode;
};

const TONE_COLORS: Record<
  EmberTone,
  { iconBg: string; iconColor: string; pillBg: string }
> = {
  story: {
    iconBg: Colors.ok,
    iconColor: Colors.background,
    pillBg: "rgba(34,211,238,0.15)"
  },
  reflection: {
    iconBg: Colors.watch,
    iconColor: Colors.background,
    pillBg: "rgba(251,191,36,0.18)"
  },
  data: {
    iconBg: Colors.concern,
    iconColor: Colors.background,
    pillBg: "rgba(248,113,113,0.18)"
  },
  sharing: {
    iconBg: Colors.borderSubtle,
    iconColor: Colors.textPrimary,
    pillBg: "rgba(148,163,184,0.18)"
  }
};

export default function SectionCard({
  title,
  subtitle,
  tone = "story",
  iconName = "stats-chart-outline",
  children,
  style,
  headerRight
}: SectionCardProps) {
  const toneColors = TONE_COLORS[tone];

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <View
            style={[
              styles.iconWrapper,
              { backgroundColor: toneColors.iconBg }
            ]}
          >
            <Ionicons
              name={iconName}
              size={18}
              color={toneColors.iconColor}
            />
          </View>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? (
              <Text style={styles.subtitle}>{subtitle}</Text>
            ) : null}
          </View>
        </View>

        {headerRight ? (
          <View style={styles.headerRight}>{headerRight}</View>
        ) : null}
      </View>

      {children ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

type Styles = {
  card: ViewStyle;
  headerRow: ViewStyle;
  leftHeader: ViewStyle;
  iconWrapper: ViewStyle;
  titleBlock: ViewStyle;
  headerRight: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  body: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm
  },
  titleBlock: {
    flexShrink: 1
  },
  headerRight: {
    marginLeft: Spacing.sm
  },
  title: {
    color: Colors.textPrimary,
    fontSize: FontSizes.md,
    fontWeight: "600"
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: FontSizes.sm,
    marginTop: 2
  },
  body: {
    marginTop: Spacing.sm
  }
});
