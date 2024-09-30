import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

interface HistoryOrderCardProps {
  id: number;
  jenis_alber: string;
  pekerjaan: string;
  kapal?: string;
  area?: string;
  no_order: string;
  requested_by: string;
}

const HistoryOrderCard: React.FC<HistoryOrderCardProps> = ({
  id,
  jenis_alber,
  pekerjaan,
  kapal,
  area,
  no_order,
  requested_by,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 4,
        paddingHorizontal: "10%",
        paddingVertical: "4%",
        width: 350,
        marginVertical: 10,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 25,
      }}
      onPress={() => {
        router.push(`tracking-history/${id}`);
      }}
    >
      <View>
        <View className="flex-row items-center">
          <Text className="text-lg font-bold">{jenis_alber} </Text>
          <Text className="text-sm font-bold">({pekerjaan})</Text>
        </View>
        {kapal ? <Text>Kapal {kapal}</Text> : <Text>Area {area}</Text>}
        <Text>No Order : {no_order}</Text>
        <Text>No Order : {no_order}</Text>
        <Text>Request by : {requested_by}</Text>
      </View>
      <AntDesign name="right" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default HistoryOrderCard;
