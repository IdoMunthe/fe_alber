import { View, Text, Image } from "react-native";
import React from "react";
import CustomHeader from "../components/CustomHeader";
import Title from "../components/Title";

const SettingApplication = () => {

  

  return (
    <View className="flex-1 bg-white">
      <CustomHeader />
      <Title title="Setting Application" />
      <View>
        <Image
          source={require("../assets/images/user.jpg")}
          className="w-20 h-20 rounded-full"
        />

      </View>
    </View>
  );
};

export default SettingApplication;
