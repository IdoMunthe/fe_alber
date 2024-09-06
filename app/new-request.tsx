import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../components/CustomHeader";
import { IExcav, IForklift, IWheeloader } from "../assets/images";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  NewRequest: undefined; // No params for this screen
  "wheel-loader": { jenis_alber: string }; // Params for wheel-loader screen
  excavator: { jenis_alber: string }; // Params for excavator screen
  forklift: { jenis_alber: string }; // Params for forklift screen
  // Add more routes if needed
};
type NavigationProp = StackNavigationProp<RootStackParamList, "NewRequest">;

const NewRequest = () => {
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

  const handlePress = (id: number, route: string) => {
    setClickedId(id);
    // @ts-ignore
    navigation.navigate(route, { jenis_alber: route });
  };

  const renderItem = ({ item }: { item: (typeof items)[0] }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.id, item.route)}
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
      <Text
        style={{
          color: "#3C3C3C",
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: 56,
          textAlign: "center",
        }}
      >
        New Request
      </Text>

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
        source={require("../assets/images/Ellipse2.png")}
        className="absolute"
        style={{ right: -10, top: 400 }}
      />
      <Image
        source={require("../assets/images/Ellipse.png")}
        className="absolute scale-[0.6]"
        style={{ bottom: -64, left: -64 }}
      />
    </SafeAreaView>
  );
};

export default NewRequest;
