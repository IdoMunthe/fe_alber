import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { BASE_URL } from "@env";
import CustomHeader from "../../../components/CustomHeader";
import Title from "../../../components/Title";
import Loading from "../../../components/Loading";

interface Status {
  id: number;
  alber_id: number;
  status: string;
  status_time: string;
  pic: string;
}

const TrackingHistory = () => {
  const { id } = useLocalSearchParams();
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          return alert("Unauthorized");
        }

        const response = await axios.get(`${BASE_URL}/api/alber/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStatuses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchStatuses();
  }, [id]);

  const renderStatus = ({ item }: { item: Status }) => (
    <View style={{ flexDirection: "row", marginVertical: "2%",}}>
      {/* Time column */}
      <Text style={{ flex: 1, textAlign: "center", fontSize: 12 }}>{item.status_time}</Text>
      {/* Status/Activity column */}
      <Text style={{ flex: 1, textAlign: 'center', fontSize: 12 }}>{item.status}</Text>
      {/* PIC column */}
      <Text style={{ flex: 1, textAlign: "center", fontSize: 12 }}>{item.pic}</Text>
    </View>
  );

  if (loading) {
    return <Loading />
  }

  return (
    <>
    <CustomHeader />
    <Title title="Tracking History" />
    <View style={{ flex: 1, padding: 20, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          paddingBottom: 10,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
          Time
        </Text>
        <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
          Activity
        </Text>
        <Text style={{ flex: 1, fontWeight: "bold", textAlign: "center" }}>
          PIC
        </Text>
      </View>

      <FlatList
        data={statuses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStatus}
      />
    </View>
    </>
  );
};

export default TrackingHistory;
