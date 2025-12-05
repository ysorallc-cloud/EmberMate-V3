// app/log/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function LogLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#021827"
        }
      }}
    />
  );
}
