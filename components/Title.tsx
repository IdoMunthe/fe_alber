import { View, Text } from 'react-native'
import React from 'react'

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({title}) => {
  return (
    <View>
      <Text
        style={{
          color: "#3C3C3C",
          backgroundColor: 'white',
          fontWeight: "bold",
          fontSize: 24,
          paddingBottom: 32,
          paddingTop: '5%',
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default Title