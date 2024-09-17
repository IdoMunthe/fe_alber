import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <ActivityIndicator
      color="#117C00"
      style={{ margin: "auto", transform: [{ scale: 1.5 }] }}
      size="large"
    />
  );
}

export default Loading