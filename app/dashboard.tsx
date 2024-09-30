import {
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import Green1 from "../components/Green1";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = () => {
  const router = useRouter();
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
    <SafeAreaView className="flex-1 bg-white justify-start items-center mt relative">
      <Image
        className="w-80 h-10 object-cover mb-5 pt-8 mt-10"
        source={require("../assets/images/gambarlogo.png")}
      />

      <View className="bg-[#F0D800] py-2 px-32 w-full items-center gap-y-2 rounded-b-xl">
        <Text
          // style={{ backgroundColor: "red" }}
          className="text-3xl font-bold text-white text-center w-64"
        >
          Dashboard User
        </Text>
        <Image
          source={require("../assets/images/user.jpg")}
          className="w-20 h-20 rounded-full"
        />
        <MaterialCommunityIcons
          style={{ position: "absolute", left: 10, top: 10 }}
          className="absolute right-20 top-20"
          name="bell"
          size={32}
          color="white"
        />
        <View className="items-center gap-0">
          <Text className="text-lg">{userInfo.name}</Text>
          <Text className="text-lg font-bold">
            {userInfo.role === 'admin_pg' ? 'user' : userInfo.role}
          </Text>
        </View>
      </View>

      <View className=" flex-row justify-center pt-8 mb-6 gap-y-2 gap-x-4 flex-wrap">
        <TouchableOpacity onPress={() => router.push("/new-request")}>
          <Image
            style={{ objectFit: "contain" }}
            className="w-32 h-32"
            source={require("../assets/images/newRequest.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{ objectFit: "contain" }}
            className="w-32 h-32 "
            source={require("../assets/images/alberVisualization.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/submission-tracking")}>
          <Image
            style={{ objectFit: "contain" }}
            className="w-32 h-32 "
            source={require("../assets/images/submissionTracking.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{ objectFit: "contain" }}
            className="w-32 h-32 "
            source={require("../assets/images/applicationSettings.png")}
          />
        </TouchableOpacity>
      </View>

      <Text className="text-center font-extrabold text-[#117C00] text-2xl tracking-wider">
        Selamat Datang di {"\n"} Aplikasi Pemesanan Alat {"\n"} Berat
      </Text>
      <Green1 />
    </SafeAreaView>
  );
};

export default Dashboard;
