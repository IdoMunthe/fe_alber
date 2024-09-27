import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="submission-tracking"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="history-order"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tracking-history"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(process-order)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
