import { View, Text, Image } from "react-native";
import React from "react";

interface Props {
  customStyle?: {};
}

const Green2: React.FC<Props> = ({customStyle}) => {
  return (
    <Image
      source={require("../assets/images/Ellipse2.png")}
      className="absolute"
      style={[{ right: -10, top: 400, zIndex: -1 }, customStyle]}
    />
  );
};

export default Green2;
