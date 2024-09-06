import {
  View,
  Text,
  SafeAreaView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import FormRegister from "../../components/FormRegister";
import { useRouter } from "expo-router";

const Register = () => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const formFields = [
    {
      name: "username",
      label: "Username",
      placeholder: "mulyono",
    },
    {
      name: "role",
      label: "Role",
      placeholder: "adminpg",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "••••••••",
    },
  ];

  // const handleFormSubmit = (formValues: { [key: string]: string }) => {
  //   Alert.alert("Form Submitted", JSON.stringify(formValues));
  // };
  const handleFormSubmit = () => {
    setButtonClicked(true);
    console.log(buttonClicked);
  };

  useEffect(() => {
    if (buttonClicked) {
      const timer = setTimeout(() => {
        router.replace("/login");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [buttonClicked]);

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-center gap-y-1">
      <View>
        <Image
          className="w-80 h-10 object-cover mb-10"
          source={require("../../assets/images/gambarlogo.png")}
        />
        <View className="w-full">
          <FormRegister
            title="Register"
            fields={formFields}
            onSubmit={handleFormSubmit}
            buttonTitle="Register"
          ></FormRegister>
        </View>
      </View>
      {!buttonClicked ? (
        <></>
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/images/register-success.png")}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 300,
  },
});
export default Register;
