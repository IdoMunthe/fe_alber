import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HistoryOrderCard from "../../components/HistoryOrderCard";
import CustomHeader from "../../components/CustomHeader";
import Title from "../../components/Title";
import Loading from "../../components/Loading";

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

const HistoryOrder = () => {
  const [finishedAlbers, setFinishedAlbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinishedAlbers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const response = await axios.get(
          `https://alber.my.id/api/alber-finished`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(token);
        setFinishedAlbers(response.data);
      } catch (error) {
        console.error("Error fetching finished albers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedAlbers();
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <View className=" bg-white flex-1 pt-[10%]">
      <CustomHeader arrowStyle={{top: -20}}/>
      <Title title="History Order" customStyle={{marginTop: 30, marginBottom: 1, paddingBottom: 16}} />
      <FlatList
        data={finishedAlbers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        renderItem={({ item }: { item: Item }) => (
          <HistoryOrderCard
          id= {item.id}
            jenis_alber={item.jenis_alber}
            pekerjaan={item.pekerjaan}
            kapal={item.kapal}
            area={item.area}
            no_order={item.no_order}
            requested_by={item.requested_by}
          />
        )}
      />
    </View>
  );
};

export default HistoryOrder;
