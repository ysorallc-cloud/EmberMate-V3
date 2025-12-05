// app/(tabs)/_layout.tsx

import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CoffeeFab from "../components/CoffeeFab";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#020617",
            borderTopColor: "rgba(148,163,184,0.2)",
            paddingTop: 6,
            paddingBottom: 10,
            height: 65
          },
          tabBarActiveTintColor: "#22D3EE",
          tabBarInactiveTintColor: "#94A3B8"
        }}
      >
        <Tabs.Screen
          name="today"
          options={{
            title: "Today",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sunny-outline" color={color} size={size} />
            )
          }}
        />

        <Tabs.Screen
          name="log"
          options={{
            title: "Log",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="create-outline" color={color} size={size} />
            )
          }}
        />

        <Tabs.Screen
          name="people"
          options={{
            title: "People",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" color={color} size={size} />
            )
          }}
        />

        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bar-chart-outline" color={color} size={size} />
            )
          }}
        />
      </Tabs>

      {/* Floating Coffee Moment pause button, centered above tab bar */}
      <CoffeeFab />
    </>
  );
}
