import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import { Colors } from "../theme/theme-tokens";

export default function BreathingOrb() {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.12,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 2200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [scale, opacity]);

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          transform: [{ scale }],
          opacity
        }
      ]}
    />
  );
}

const styles = StyleSheet.create({
  orb: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: Colors.ok,
    backgroundColor: "rgba(34,211,238,0.15)"
  }
});
