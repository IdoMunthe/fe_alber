import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import Title from "../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

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

  const handleSubmit = () => {
    AsyncStorage.removeItem("token");

    router.replace("/login");
  };

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

        <View className="mx-6 gap-y-[12]">
          <Text className="font-bold text-lg">Akun</Text>
          <View className="h-[0.7] w-[100%] bg-black" />
          <TouchableOpacity className="flex-row justify-between">
            <Text className="text-gray-500 text-base">Ganti Password</Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between">
            <Text className="text-gray-500 text-base">Ganti Foto Profil</Text>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
        className="bg-[#FF0D0D] mt-32 items-center w-32 py-2 rounded-full mx-auto"
        onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingApplication;
