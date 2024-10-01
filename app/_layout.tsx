import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(new-request)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(submission-tracking)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="setting-application"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
