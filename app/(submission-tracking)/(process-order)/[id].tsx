import { View, TextInput, StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import Title from "../../../components/Title";
import SubmitButton from "../../../components/SubmitButton";
import Green1 from "../../../components/Green1";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    time_start,
    time_end,
    id,
  } = useLocalSearchParams();

  // Convert string[] to string and handle undefined or empty values
  const formatValue = (value: string | string[]) =>
    Array.isArray(value) ? value.join("") : value || "";

  // Check if created_at is a string or an array and handle accordingly
  const formattedDate = created_at
    ? Array.isArray(created_at)
      ? new Date(created_at[0]).toLocaleString() // If it's an array, use the first element
      : new Date(created_at).toLocaleString() // Otherwise, directly convert it
    : "";

  const handleSubmit = async () => {
    let action = "";

    switch (status) {
      case "Order Request":
        action = "start_working";
        break;
      case "Start working":
        action = "stop_working";
        break;
    }

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

      console.log(action, id);

      router.replace("/submission-tracking");
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = "";

  switch (status) {
    case "Order Request":
      buttonTitle = "Start Working";
      break;
    case "Start working":
      buttonTitle = "Stop Working";
      break;
    case "Stop working":
      buttonTitle = "Finished Working";
      break;
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
            <Text style={styles.label}>Pekerjaan</Text>
            <TextInput
              style={styles.input}
              value={formatValue(pekerjaan)}
              editable={false}
              placeholder="Pekerjaan"
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

        {formatValue(no_palka) ? (
          <>
            <Text style={styles.label}>no_palka</Text>
            <TextInput
              style={styles.input}
              value={formatValue(no_palka)}
              editable={false}
              placeholder="no_palka"
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

        {formatValue(kegiatan) ? (
          <>
            <Text style={styles.label}>Kegiatan</Text>
            <TextInput
              style={styles.input}
              value={formatValue(kegiatan)}
              editable={false}
              placeholder="Kegiatan"
            />
          </>
        ) : null}

        {formatValue(time_start) && formatValue(time_end) ? (
          <View className="flex-row justify-evenly">
            <View>
              <Text>Time Start</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 6,
                    backgroundColor: "#fff",
                    width: 150,
                    alignSelf: "center",
                  },
                ]}
                value={formatValue(time_start)}
                editable={false}
                placeholder="time_start"
              />
            </View>
            <View>
              <Text>Time End</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 6,
                    backgroundColor: "#fff",
                    width: 150,
                    alignSelf: "center",
                  },
                ]}
                value={formatValue(time_end)}
                editable={false}
                placeholder="time_end"
              />
            </View>
          </View>
        ) : null}
      </View>
      <SubmitButton
        color="#117C00"
        // @ts-ignore
        buttonTitle={buttonTitle}
        marginTop={20}
        handleSubmit={handleSubmit}
      />
      <Green1 />
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
    padding: 8,
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
