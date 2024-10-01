import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import Title from "../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import AntDesign from "@expo/vector-icons/AntDesign";

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

      <View>
        <View className="items-center mb-8">
          <Image
            source={require("../assets/images/user.jpg")}
            className="w-20 h-20 rounded-full mb-4"
          />
          <Text className=" text-base">{userInfo.name}</Text>
          <Text className="font-bold text-base">
            {userInfo.role === "admin_pg" ? "User" : userInfo.role}
          </Text>
        </View>

        <View className="mx-6 gap-y-[8]">
          <Text className="font-bold text-lg">Akun</Text>
          <View className="h-[0.7] w-[100%] bg-black" />
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Ganti Password</Text>
            <AntDesign name="right" size={24} color="black" />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Ganti Foto Profil</Text>
            <AntDesign name="right" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingApplication;
