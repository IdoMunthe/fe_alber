import { View, Text } from 'react-native'
import React from 'react'

interface TitleProps {
  title: string;
  customStyle?: {}
}

const Title: React.FC<TitleProps> = ({title, customStyle}) => {
  return (
    <View>
      <Text
        style={[
          {
            color: "#3C3C3C",
            backgroundColor: "white",
            fontWeight: "bold",
            fontSize: 24,
            paddingBottom: 32,
            paddingTop: "5%",
            textAlign: "center",
          },
          customStyle
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

export default Title