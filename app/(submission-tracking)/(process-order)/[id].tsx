import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text, ScrollView } from "react-native";
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
  const [role, setRole] = useState("admin_pg");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found!");
        }

        setIsLoading(true);

        const response = await axios.get(`${BASE_URL}/api/alber-status/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { role } = (
          await axios.get("https://alber.my.id/api/user-info", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).data;

        setCurrentStatus(response.data.status); // Update the state with the latest status from the backend
        setIsLoading(false);

        setRole(role);
        console.log(role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStatus();
    console.log(status);
  }, [status]);

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
    if (currentStatus === "Order Request") action = "request_accepted";
    if (currentStatus === "Manage Alber") action = "alber_to_hatch";
    if (currentStatus === "Alber To Hatch") action = "start_working";
    if (currentStatus === "Start Working") action = "on_working";
    if (currentStatus === "On Working") action = "stop_working";
    if (currentStatus === "Stop Working") action = "check_maintenance";

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
      console.log(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = "";
  if (currentStatus === "Order Request") buttonTitle = "Manage Alber";
  if (currentStatus === "Manage Alber") buttonTitle = "Alber Ready";
  if (currentStatus === "Alber To Hatch") buttonTitle = "Start Working";
  if (currentStatus === "Start Working") buttonTitle = "On Working";
  if (currentStatus === "On Working") buttonTitle = "Stop Working";
  if (currentStatus === "Stop Working") buttonTitle = "Finished Working";

  // Determine if the button should be disabled
  const isDisabled =
    (role === "admin_pg" &&
      (buttonTitle === "Manage Alber" || buttonTitle === "Alber Ready")) ||
    (role === "admin_pcs" &&
      (buttonTitle === "Start Working" ||
        buttonTitle === "On Working" ||
        buttonTitle === "Stop Working")) ||
    buttonTitle === "Finished Working";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ScrollView className="flex-1 bg-white">
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

      <View>
        <View className="h-[1] w-[100%] bg-black mb-4" />
        <View className="flex-row justify-center gap-x-8 px-[4.5%] ">
          <View>
            <Text style={styles.label}>Nomor Lambung</Text>
            <TextInput
              style={[styles.input, { width: 140 }]}
              value={""}
              placeholder="1"
            />
          </View>
          <View>
            <Text style={styles.label}>Nama Operator</Text>
            <TextInput
              style={[styles.input, { width: 140 }]}
              value={""}
              placeholder="Yanto"
            />
          </View>
        </View>
      </View>

      <SubmitButton
        buttonTitle={buttonTitle}
        color="#117C00"
        marginTop={15}
        handleSubmit={handleSubmit}
        isDisabled={isDisabled}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: "3%",
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
    height: 40,
  },
  label: {
    // marginLeft: "4.8%",
  },
});

export default ProcessOrderDetail;
