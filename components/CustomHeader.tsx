import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native";

interface Props {
  customStyle?: {}
  arrowStyle?: {};
}

const CustomHeader: React.FC<Props> = ({ arrowStyle, customStyle }) => {
  const router = useRouter();

  return (
    <View
      style={[{
        flex: 1,
        maxHeight: 80,
        marginTop: '1%',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        // paddingBottom: '10%',
        paddingTop: "6%",
        height: 12,
        backgroundColor: "#FBFBFB",
        zIndex: 11,
      }, customStyle]}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 40, left: 20 }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          style={arrowStyle}
        />
      </TouchableOpacity>
      <Image
        style={{
          width: 250,
          height: 48,
          marginLeft: 48,
          resizeMode: "cover",
        }}
        source={require("../assets/images/logoright.png")}
      />
    </View>
  );
};

export default CustomHeader;
