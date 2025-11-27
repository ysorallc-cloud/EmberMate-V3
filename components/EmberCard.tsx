import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";

type EmberCardProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  body?: string[];
  footer?: string;
};

export function EmberCard({ title, subtitle, badge, body, footer }: EmberCardProps) {
  return (
    <View
      style={{
        backgroundColor: colors.surfaceCard,
        borderRadius: layout.cardRadius,
        padding: layout.cardPadding,
        marginBottom: layout.cardGap,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: subtitle || badge ? 6 : 0,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            color: colors.textPrimary,
          }}
        >
          {title}
        </Text>
        {badge ? (
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 999,
              backgroundColor: colors.badgeBackground,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "500",
                color: colors.badgeText,
              }}
            >
              {badge}
            </Text>
          </View>
        ) : null}
      </View>

      {subtitle ? (
        <Text
          style={{
            fontSize: 13,
            color: colors.textMuted,
            marginBottom: body && body.length ? 8 : 0,
          }}
        >
          {subtitle}
        </Text>
      ) : null}

      {body && body.length ? (
        <View style={{ marginBottom: footer ? 8 : 0 }}>
          {body.map((line, idx) => (
            <Text
              key={idx}
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                marginBottom: idx === body.length - 1 ? 0 : 3,
              }}
            >
              {line}
            </Text>
          ))}
        </View>
      ) : null}

      {footer ? (
        <Text
          style={{
            fontSize: 12,
            color: colors.textMuted,
          }}
        >
          {footer}
        </Text>
      ) : null}
    </View>
  );
}
