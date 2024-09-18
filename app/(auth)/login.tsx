import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React from "react";
import FormLogin from "../../components/FormLogin";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import {BASE_URL} from '@env'

const Login = () => {
  const router = useRouter();
  const formFields = [
    {
      name: "name",
      label: "Username",
      placeholder: "Masukkan username",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "••••••••",
    },
  ];

  const handleFormSubmit = async (formValues: { [key: string]: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, formValues);

      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);

        console.log("success", token);
        router.replace("/dashboard");
      } else return Alert.alert("Login failed", "Invalid Credentials.");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Unable to log in. Try again later!");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-y-1">
      <Image
        className="w-80 h-10 object-cover mb-10"
        source={require("../../assets/images/gambarlogo.png")}
      />
      <View className="w-full">
        <FormLogin
          title="Log In"
          fields={formFields}
          onSubmit={handleFormSubmit}
          buttonTitle="Log In"
        ></FormLogin>
      </View>
    </SafeAreaView>
  );
};

export default Login;
