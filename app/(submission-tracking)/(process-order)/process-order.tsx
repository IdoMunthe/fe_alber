import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
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
import { useFocusEffect } from "@react-navigation/native";

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
  const [role, setRole] = useState("admin_pg");

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("no token found!");
      }
      const { role } = (
        await axios.get("https://alber.my.id/api/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).data;

      setRole(role);
      console.log(role);

      const response = await axios.get(`${BASE_URL}/api/user-albers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        fetchOrders(); // Fetch data every 3 seconds
      }, 3000);

      return () => clearInterval(interval);
    }, [])
  );

  const renderItem = ({ item }: { item: Item }) => {
    const isDisabled =
      (role === "admin_pg" &&
        (item.status === "Manage Alber" ||
          item.status === "Order Request" ||
          item.status === "Checklist")) ||
      (role === "admin_pcs" &&
        (item.status === "Start Working" ||
          item.status === "On Working" ||
          item.status === "Stop Working" ||
          item.status === "Alber To Hatch" ||
          item.status === "Manage Alber")) ||
      (role === "opr_pcs" && item.status !== "Manage Alber") ||
      item.status === "Stop Working";

    return (
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
        time_start={item.time_start}
        time_end={item.time_end}
        isDisabled={isDisabled}
      />
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <CustomHeader customStyle={{ paddingTop: "11%" }} />
      <Title title="Process Order" />
      {orderData.length === 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchOrders} />
          }
          className="bg-white flex-1"
        >
          <Text className="text-lg mx-auto">Belum ada process order</Text>
        </ScrollView>
      ) : (
        <FlatList
          data={orderData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchOrders} />
          }
        />
      )}
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
