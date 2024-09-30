import { View, Text, Image } from 'react-native'
import React from 'react'

interface Props {
  customStyle?: {}
}

const Green1:React.FC<Props> = ({customStyle}) => {
  return (
    <Image
      source={require("../assets/images/Ellipse.png")}
      className="absolute scale-[0.6]"
      style={[{ bottom: -64, left: -64, zIndex: -1}, customStyle]}
    />
  );
}

export default Green1