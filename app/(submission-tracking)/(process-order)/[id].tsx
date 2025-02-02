import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import CustomHeader from "../../../components/CustomHeader";
import Title from "../../../components/Title";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// @ts-ignore
import { BASE_URL } from "@env";
import SubmitButton from "../../../components/SubmitButton";
import Loading from "../../../components/Loading";
import { useTailwind } from "nativewind";
import Green1 from "../../../components/Green1";

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

  const [noLambung, setNoLambung] = useState("");
  const [operator, setOperator] = useState("");

  const [buttonClicked, setButtonClicked] = useState(false);

  const [isNoLambungClicked, setIsNoLambungClicked] = useState(false);
  const [isOperatorclicked, setIsOperatorclicked] = useState(false);

  const handleManageLambung = () => {
    setIsNoLambungClicked(true);
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  const handleManageOperator = () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      // if (!token) {
      //   throw new Error("No token found!");
      // }
      // const action = "manage_operator";

      // console.log("Action:", action);
      // console.log("ID:", id);

      // await axios.put(
      //   `${BASE_URL}/api/history-order`,
      //   { action, id },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );
      // const response = await axios.get(`${BASE_URL}/api/alber-status/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });

      // setCurrentStatus(response.data.status);
      setIsOperatorclicked(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("No token found!");
        }

        if (currentStatus !== "Manage Alber") setIsLoading(true);

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

        setCurrentStatus(response.data.status);
        setRole(role);
        console.log(role);

        const res = await axios.get(
          `https://alber.my.id/api/nomor-lambung-dan-operator/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { no_lambung, operator } = res.data.data;

        if (status !== "Order Request") {
          setNoLambung(no_lambung);
          setOperator(operator);
        }

        setIsLoading(false);
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
    if (currentStatus === "Manage Alber") action = "managed_alber";
    if (currentStatus === "Checklist") action = "alber_to_hatch";
    if (currentStatus === "Alber To Hatch") action = "start_working";
    if (currentStatus === "Start Working") action = "stop_working";
    // if (currentStatus === "On Working") action = "stop_working";
    // if (currentStatus === "Stop Working") action = "check_maintenance";

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("no token found!");
      }

      if (currentStatus !== "Manage Alber") setIsLoading(true);

      if (noLambung === "" || operator === "") {
        setIsLoading(false);
        return Alert.alert(
          "Error!",
          "Pastikan 'No Lambung' dan 'Nama Operator' sudah terisi"
        );
      }

      if (currentStatus === "Order Request") {
        const edit = await axios.put(
          `https://alber.my.id/api/nomor-lambung-dan-operator/${id}`,
          {
            no_lambung: noLambung,
            operator: operator,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

      const response = await axios.get(`${BASE_URL}/api/alber-status/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentStatus(response.data.status);
      setIsLoading(false);
      if (currentStatus === "Manage Alber") {
        setButtonClicked(true);
        setTimeout(() => {
          router.back();
        }, 800);
      }
      router.back();
      console.log(buttonTitle);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCheckMaintenance = async () => {
    const action = "check_maintenance";

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
      const response = await axios.get(`${BASE_URL}/api/alber-status/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentStatus(response.data.status);
      // router.back();
    } catch (error) {
      console.log(error);
    }
  };

  let buttonTitle = "";
  if (currentStatus === "Order Request") buttonTitle = "Manage Alber";
  if (currentStatus === "Manage Alber") buttonTitle = "Checklist";
  if (currentStatus === "Checklist") buttonTitle = "Alber Ready";
  if (currentStatus === "Alber To Hatch") buttonTitle = "Start Working";
  if (currentStatus === "Start Working") buttonTitle = "Stop Working";
  if (currentStatus === "Stop Working") buttonTitle = "Finished Working";

  // Determine if the button should be disabled
  const isDisabled =
    (role === "admin_pg" &&
      (buttonTitle === "Manage Alber" ||
        buttonTitle === "Alber Ready" ||
        buttonTitle === "Checklist")) ||
    (role === "admin_pcs" &&
      (buttonTitle === "Start Working" ||
        buttonTitle === "On Working" ||
        buttonTitle === "Stop Working" ||
        buttonTitle === "Checklist")) ||
    (role === "opr_pcs" && buttonTitle != "Checklist") ||
    buttonTitle === "Finished Working";

  if (isLoading) {
    return <Loading />;
  }

  const isAdminPCS = role === "admin_pcs" && buttonTitle === "Manage Alber";

  const additionalFieldNotVisible =
    role === "admin_pg" && currentStatus === "Order Request";

  return (
    <>
      {currentStatus !== "Check Maintenance" ? (
        <ScrollView className="flex-1 bg-white">
          <CustomHeader customStyle={{ paddingTop: 50, paddingBottom: 20 }} />
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

          {!additionalFieldNotVisible && (
            <View>
              <View className="h-[1] w-[100%] bg-black mb-4" />
              <View className="flex-row justify-center gap-x-8 px-[4.5%] ">
                <View>
                  <Text style={styles.label}>Nomor Lambung</Text>
                  {noLambung !== null ? (
                    <TextInput
                      style={[styles.input, { width: 140 }]}
                      value={noLambung.toString()}
                      onChangeText={(text) => setNoLambung(text)}
                      editable={isAdminPCS}
                      placeholder="isi dengan angka"
                      keyboardType="numeric"
                    />
                  ) : (
                    <TextInput
                      style={[styles.input, { width: 140 }]}
                      onChangeText={(text) => setNoLambung(text)}
                      editable={isAdminPCS}
                      placeholder="Isi dengan angka"
                      keyboardType="numeric"
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.label}>Nama Operator</Text>
                  <TextInput
                    style={[styles.input, { width: 140 }]}
                    value={operator}
                    onChangeText={(text) => setOperator(text)}
                    editable={isAdminPCS}
                    placeholder="Ex. Yanto"
                  />
                </View>
              </View>
            </View>
          )}

          {currentStatus === "Start Working" && role === "admin_pg" && (
            <SubmitButton
              buttonTitle="Request Check Maintenance"
              color="#117C00"
              handleSubmit={handleSubmitCheckMaintenance}
            />
          )}

          <SubmitButton
            buttonTitle={buttonTitle}
            color="#F0D800"
            marginTop={15}
            handleSubmit={handleSubmit}
            isDisabled={isDisabled}
            customStyle={{
              color: buttonTitle === "Stop Working" ? "black" : "white",
            }}
          />
          {buttonClicked && (
            <Image
              style={{ position: "absolute", top: 220, left: 30 }}
              source={require("../../../assets/images/alber-to-hatch.png")}
            />
          )}
        </ScrollView>
      ) : (
        <View className="flex-1 bg-white">
          <CustomHeader />
          <Title title="Process Order" />
          <SubmitButton
            buttonTitle="Manage No. Lambung"
            color="#117C00"
            handleSubmit={handleManageLambung}
          />
          <SubmitButton
            buttonTitle="Manage Operator"
            handleSubmit={handleManageOperator}
          />
          {isNoLambungClicked && (
            <Image
              style={{ position: "absolute", top: 220, left: 36 }}
              source={require("../../../assets/images/request-manage-no-lambung-success.png")}
            />
          )}
          {isOperatorclicked && (
            <Image
              style={{ position: "absolute", top: 220, left: 36 }}
              source={require("../../../assets/images/request-manage-operator-success.png")}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: "3%",
    alignContent: "stretch",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    borderRadius: 6,
    backgroundColor: "#fff",
    alignSelf: "stretch",
    marginBottom: 16,
    color: "black",
    height: 40,
  },
  label: {
    // marginLeft: "4.8%",
  },
});

export default ProcessOrderDetail;
