import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import Title from "../../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import SubmitButton from "../../../components/SubmitButton";
import Loading from "../../../components/Loading";

const ProcessOrderDetail = () => {
  const {
    no_order,
    jenis_alber,
    pekerjaan,
    kapal,
    no_palka,
    created_at,
    area,
    kegiatan,
    requested_by,
    status,
    updated_by,
    id,
    time_start,
    time_end,
  } = useLocalSearchParams();

  const [currentStatus, setCurrentStatus] = useState(status); // Store the status in the state
  const [isLoading, setIsLoading] = useState(false);

  // Convert string[] to string and handle undefined or empty values
  const formatValue = (value: any) =>
    Array.isArray(value) ? value.join("") : value || "";

  const formattedDate = created_at
    ? Array.isArray(created_at)
      ? new Date(created_at[0]).toLocaleString()
      : new Date(created_at).toLocaleString()
    : "";

  const handleSubmit = async () => {
    let action = "";
    if (currentStatus === "Order Request") action = "start_working";
    if (currentStatus === "Start Working") action = "stop_working";

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("no token found!");
      }

      setIsLoading(true);

      await axios.put(
        `${BASE_URL}/api/history-order`,
        { action, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await axios.get(`${BASE_URL}/api/alber-status/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentStatus(response.data.status);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = "";
  if (currentStatus === "Order Request") buttonTitle = "Start Working";
  if (currentStatus === "Start Working") buttonTitle = "Stop Working";
  if (currentStatus === "Stop Working") buttonTitle = "Finished Working";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-white">
      <CustomHeader />
      <Title title="Process Order" />
      <View style={styles.container}>
        {formatValue(no_order) ? (
          <>
            <Text style={styles.label}>No Order</Text>
            <TextInput
              style={styles.input}
              value={formatValue(no_order)}
              editable={false}
              placeholder="No Order"
            />
          </>
        ) : null}

        {formatValue(pekerjaan) ? (
          <>
            <Text style={styles.label}>Jenis Pekerjaan</Text>
            <TextInput
              style={styles.input}
              value={formatValue(pekerjaan)}
              editable={false}
              placeholder="Pekerjaan"
            />
          </>
        ) : null}

        {formatValue(kegiatan) ? (
          <>
            <Text style={styles.label}>Kegiatan</Text>
            <TextInput
              style={styles.input}
              value={formatValue(kegiatan)}
              editable={false}
              placeholder="kegiatan"
            />
          </>
        ) : null}

        {formatValue(kapal) ? (
          <>
            <Text style={styles.label}>Kapal</Text>
            <TextInput
              style={styles.input}
              value={formatValue(kapal)}
              editable={false}
              placeholder="Kapal"
            />
          </>
        ) : null}

        {formatValue(area) ? (
          <>
            <Text style={styles.label}>Area</Text>
            <TextInput
              style={styles.input}
              value={formatValue(area)}
              editable={false}
              placeholder="Area"
            />
          </>
        ) : null}

        {formatValue(no_palka) ? (
          <>
            <Text style={styles.label}>Nomor Palka</Text>
            <TextInput
              style={styles.input}
              value={formatValue(no_palka)}
              editable={false}
              placeholder="No Palka"
            />
          </>
        ) : null}

        {formatValue(time_start) ? (
          <View className="flex-row justify-between px-[4.5%] ">
            <View>
              <Text style={styles.label}>Time Start</Text>
              <TextInput
                style={[styles.input, { width: 140 }]}
                value={formatValue(time_start).substring(0, 5)}
                editable={false}
                placeholder="Time Start"
              />
            </View>
            <View>
              <Text style={styles.label}>Time End</Text>
              <TextInput
                style={[styles.input, { width: 140 }]}
                value={formatValue(time_end).substring(0, 5)}
                editable={false}
                placeholder="Time End"
              />
            </View>
          </View>
        ) : null}
      </View>
      <SubmitButton
        buttonTitle={buttonTitle}
        color="#117C00"
        marginTop={15}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 316,
    alignSelf: "center",
    marginBottom: 16,
    color: "black",
  },
  label: {
    // marginLeft: "4.8%",
  },
});

export default ProcessOrderDetail;
