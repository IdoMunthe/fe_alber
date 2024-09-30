import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import Title from "../../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import SubmitButton from "../../../components/SubmitButton";

const ProcessOrderDetail = () => {
  const router = useRouter();
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

  // Convert string[] to string and handle undefined or empty values
  const formatValue = (value: any) =>
    Array.isArray(value) ? value.join("") : value || "";

  // Check if created_at is a string or an array and handle accordingly
  const formattedDate = created_at
    ? Array.isArray(created_at)
      ? new Date(created_at[0]).toLocaleString() // If it's an array, use the first element
      : new Date(created_at).toLocaleString() // Otherwise, directly convert it
    : "";

  const handleSubmit = async () => {
    let action = "";
    if (status === "Order Request") action = "start_working";
    if (status === "Start Working") action = "stop_working";
    // if (status === "Stop Working") action = "Finished Working";

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("no token found!");
      }

      await axios.put(
        `${BASE_URL}/api/history-order`,
        { action, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = "";
  if (status === "Order Request") buttonTitle = "Start Working";
  if (status === "Start Working") buttonTitle = "Stop Working";
  if (status === "Stop Working") buttonTitle = "Finished Working";

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
          <>
            <Text style={styles.label}>Time Start</Text>
            <TextInput
              style={styles.input}
              value={formatValue(time_start)}
              editable={false}
              placeholder="Time Start"
            />
          </>
        ) : null}

        {formatValue(time_end) ? (
          <>
            <Text style={styles.label}>Time End</Text>
            <TextInput
              style={styles.input}
              value={formatValue(time_end)}
              editable={false}
              placeholder="Time End"
            />
          </>
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
    marginLeft: "4.8%",
  },
});

export default ProcessOrderDetail;
