import { View, Text, Image } from "react-native";
import React from "react";

const Green2 = () => {
  return (
    <Image
      source={require("../assets/images/Ellipse2.png")}
      className="absolute"
      style={{ right: -10, top: 400, zIndex: -1 }}
    />
  );
};

export default Green2;
