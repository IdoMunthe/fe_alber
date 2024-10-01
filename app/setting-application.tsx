import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import Title from "../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";

const SettingApplication = () => {
  const [userInfo, setUserInfo] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("no token found!");
        }
        const response = await axios.get(`${BASE_URL}/api/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <CustomHeader />
      <Title title="Setting Application" />
      <View className="items-center">
        <Image
          source={require("../assets/images/user.jpg")}
          className="w-20 h-20 rounded-full mb-4"
        />
        <Text>{userInfo.name}</Text>
        <Text className="font-bold">
          {userInfo.role === 'admin_pg' ? 'User' : userInfo.role}
        </Text>
      </View>
    </View>
  );
};

export default SettingApplication;
