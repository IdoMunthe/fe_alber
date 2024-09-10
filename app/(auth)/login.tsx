import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React from "react";
import FormLogin from "../../components/FormLogin";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const formFields = [
    {
      name: "username",
      label: "Username",
      placeholder: "Masukkan username",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "••••••••",
    },
  ];

  const handleFormSubmit = (formValues: { [key: string]: string }) => {
    // Alert.alert("Form Submitted", JSON.stringify(formValues));
    setTimeout(() => {
      router.replace("/dashboard");
    }, 500);
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
