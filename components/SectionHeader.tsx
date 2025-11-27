import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import { layout } from "../constants/layout";

type Props = {
  label: string;
};

export function SectionHeader({ label }: Props) {
  return (
    <View
      style={{
        marginTop: 8,
        marginBottom: 6,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: colors.textMuted,
          textTransform: "uppercase",
          letterSpacing: 0.6,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          marginLeft: 8,
          backgroundColor: colors.borderLight,
        }}
      />
    </View>
  );
}
