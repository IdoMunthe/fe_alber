import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="new-request"
        options={{
          title: "New Request",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="wheel-loader"
        options={{
          title: "Wheel Loader",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="excavator"
        options={{
          title: "Excavator",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forklift"
        options={{
          title: "Forklift",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
