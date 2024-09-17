import { View, Text, Image } from 'react-native'
import React from 'react'

const Green1 = () => {
  return (
    <Image
      source={require("../assets/images/Ellipse.png")}
      className="absolute scale-[0.6]"
      style={{ bottom: -64, left: -64, zIndex: -1}}
    />
  );
}

export default Green1