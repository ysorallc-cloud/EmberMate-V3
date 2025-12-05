import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export type SignalLevel = "ok" | "watch" | "concern";

type SignalRingProps = {
  size?: number;
  value: number; // 0 to 100
  level: SignalLevel;
  children?: ReactNode;
};

const SignalRing: React.FC<SignalRingProps> = ({
  size = 72,
  value,
  level,
  children
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const clampedValue = Math.min(100, Math.max(0, value));
  const progress = clampedValue / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const indicatorColor =
    level === "ok"
      ? "#22C55E" // green
      : level === "watch"
      ? "#FACC15" // yellow
      : "#F97316"; // orange or red for concern

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1F2933"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Progress ring */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={indicatorColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Centered inner content */}
      <View style={styles.innerContent}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default SignalRing;
