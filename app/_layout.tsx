import React from "react";
import { Stack } from "expo-router";
import { CareProvider } from "./context/CareContext";

export default function RootLayout() {
  return (
    <CareProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CareProvider>
  );
}
