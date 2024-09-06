import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";

const CustomHeader = () => {
  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
        marginTop: 32,
        height: 20,
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        paddingVertical: 24,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 12, left: 20 }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image
        style={{
          width: 250,
          height: 40,
          marginLeft: 48,
          resizeMode: "cover",
        }}
        source={require("../assets/images/logoright.png")}
      />
    </View>
  );
};

export default CustomHeader;
