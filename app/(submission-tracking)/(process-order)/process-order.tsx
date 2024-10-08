import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../../../components/Title";
import CustomHeader from "../../../components/CustomHeader";
import Green1 from "../../../components/Green1";
import Green2 from "../../../components/Green2";
import OrderCard from "../../../components/OrderCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../components/Loading";
// @ts-ignore
import { BASE_URL } from "@env";

type Item = {
  id: number;
  no_order: string;
  jenis_alber: string;
  pekerjaan: string;
  kapal?: string;
  no_palka?: string;
  created_at: Date;
  area?: string;
  kegiatan?: string;
  requested_by: string;
  status: string;
  updated_by: string;
  time_start: string;
  time_end: string;
};

const ProcessOrder = () => {
  const [orderData, setOrderData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          throw new Error("no token found!");
        }

        const response = await axios.get(`${BASE_URL}/api/user-albers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderData(response.data.data);
        // console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <OrderCard
      no_order={item.no_order}
      jenis_alber={item.jenis_alber}
      pekerjaan={item.pekerjaan}
      created_at={new Date(item.created_at)}
      requested_by={item.requested_by}
      status={item.status}
      updated_by={item.requested_by}
      no_palka={item.no_palka}
      kapal={item.kapal}
      area={item.area}
      kegiatan={item.kegiatan}
      id={item.id}
      time_start = {item.time_start}
      time_end = {item.time_end}
    />
  );

  if (loading) {
    return <Loading />;
  }

  if (orderData.length === 0) {
    return (
      <View className="bg-white flex-1">
        <CustomHeader />
        <Title title="Process Order" />
        <Text className="text-lg mx-auto">Belum ada process order</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: "5%" }}>
      <CustomHeader customStyle={{paddingTop: "10%"}} arrowStyle={{top: -10}}/>
      <View className="mt-4">
        <Title title="Process Order" />
      </View>
      <FlatList
        data={orderData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      <Green1 />
      <Green2 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: "8%",
  },
});

export default ProcessOrder;
