import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { ISplash } from "../assets/images";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen'
// import * as Haptics from "expo-haptics";

SplashScreen.preventAutoHideAsync();

const Home = () => {

  useEffect(() => {
    // Simulate a small delay (for loading data, assets, etc.)
    setTimeout(async () => {
      await SplashScreen.hideAsync(); // Hide splash screen after loading
    }, 700);
  }, []);

  const [fontsLoaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const router = useRouter();

  const handlePress = (route: string) => {
    // Haptics.selectionAsync();
    router.push(route);
  };

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }
  return (
    <ImageBackground source={ISplash} className="flex-1">
      <View className="flex-1 justify-center gap-x-2 items-end mb-16 flex-row">
        <TouchableOpacity
          activeOpacity={0.2}
          className="bg-white p-4 rounded-lg w-40 items-center"
          onPress={() => handlePress("login")}
        >
          <Text className="font-bold">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className=" p-4 rounded-lg w-40 items-center"
          style={{ backgroundColor: "#F0D800" }}
          onPress={() => handlePress("register")}
        >
          <Text 
          className="font-bold"
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
