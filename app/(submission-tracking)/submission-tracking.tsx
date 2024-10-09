import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Title from "../../components/Title";
import CustomHeader from "../../components/CustomHeader";
import Green1 from "../../components/Green1";
import Green2 from "../../components/Green2";
import { useRouter } from "expo-router";
import Loading from "../../components/Loading";

const SubmissionTracking = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <>
      <CustomHeader />
      <SafeAreaView style={styles.container}>
        <Title title="Submission Tracking" />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              router.push("/process-order");
              setIsLoading(false);
            }}
          >
            <Image source={require("../../assets/images/process-order.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.push("/history-order");
              setIsLoading(false);
            }}
          >
            <Image source={require("../../assets/images/history-order.png")} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Green1 customStyle={{ zIndex: 0 }} />
      <Green2 customStyle={{ zIndex: 1 }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    columnGap: 16,
  },
});

export default SubmissionTracking;
