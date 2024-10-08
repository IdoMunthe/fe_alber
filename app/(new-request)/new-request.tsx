import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../../components/CustomHeader";
import { IExcav, IForklift, IWheeloader } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Title from "../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  NewRequest: undefined; // No params for this screen
  "wheel-loader": { jenis_alber: string }; // Params for wheel-loader screen
  excavator: { jenis_alber: string }; // Params for excavator screen
  forklift: { jenis_alber: string }; // Params for forklift screen
  // Add more routes if needed
};
type NavigationProp = StackNavigationProp<RootStackParamList, "NewRequest">;

const NewRequest = () => {
  const router = useRouter();

  const [clickedId, setClickedId] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp>();

  const items = [
    {
      id: 1,
      source: IWheeloader,
      label: "Wheel Loader",
      route: "wheel-loader",
    },
    { id: 2, source: IExcav, label: "Excavator", route: "excavator" },
    { id: 3, source: IForklift, label: "Forklift", route: "forklift" },
  ];

  const handlePress = async (id: number, route: string, label: string) => {
    setClickedId(id);
    const jenis_alber = AsyncStorage.setItem('jenis_alber', label )
    setTimeout(() => {
      setClickedId(null);
    }, 500);
    router.push(route);
  };

  const renderItem = ({ item }: { item: (typeof items)[0] }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.id, item.route, item.label)}
      style={{
        backgroundColor: clickedId === item.id ? "#F0D800" : "#F6F6F6DE",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        margin: 5,
      }}
    >
      <Image
        source={item.source}
        style={{
          resizeMode: "contain",
          width: 120,
          height: 90,
        }}
      />
      <Text
        style={{
          color: "#3C3C3C",
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <CustomHeader />
      <Title title="New Request" />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          columnGap: 10,
        }}
        contentContainerStyle={{
          alignItems: "center",
          rowGap: 15,
        }}
      />

      <Image
        source={require("../../assets/images/Ellipse2.png")}
        className="absolute"
        style={{ right: -10, top: 400 }}
      />
      <Image
        source={require("../../assets/images/Ellipse.png")}
        className="absolute scale-[0.6]"
        style={{ bottom: -64, left: -64 }}
      />
    </SafeAreaView>
  );
};

export default NewRequest;
