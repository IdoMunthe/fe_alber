import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import SubmitButton from "../../components/SubmitButton";
import CustomHeader from "../../components/CustomHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// @ts-ignore
import { BASE_URL } from "@env";

export type RootStackParamList = {
  forklift: { jenis_alber: string };
};

const Forklift = () => {
  const router = useRouter();
  const route = useRoute<RouteProp<RootStackParamList, "forklift">>();

  // State for other form fields
  const [jenisAlber, setJenisAlber] = useState("");
  const [noOrder, setNoOrder] = useState("");
  const [jenisPekerjaan, setJenisPekerjaan] = useState("Housekeeping"); // dropdown value
  const [deskripsiKegiatan, setDeskripsiKegiatan] = useState("");
  const [area, setArea] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [namaKapal, setNamaKapal] = useState("");
  const [nomorPalka, setNomorPalka] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<"start" | "end" | null>(
    null
  ); // track which time field is being set

  // Fetch next no_order from backend when component mounts
  useEffect(() => {
    const fetchNextOrder = async () => {
      try {
        let jenis_alber = await AsyncStorage.getItem("jenis_alber");

        if (jenis_alber === "Forklift") {
          jenis_alber = "forklift";
        }

        console.log(jenis_alber);

        const token = await AsyncStorage.getItem("token");
        if (jenis_alber) {
          setJenisAlber(jenis_alber);
        }
        if (!token) {
          throw new Error("no token found!");
        }

        const response = await axios.get(
          `${BASE_URL}/api/next-order/Forklift`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNoOrder(response.data.no_order);
        console.log(response.data.no_order);
      } catch (error) {
        console.error("Error fetching next order:", error);
      }
    };

    fetchNextOrder();
  }, []);

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowPicker(false); // hide picker after time is chosen
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();

      // Format hours and minutes to two digits
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      const timeString = `${formattedHours}:${formattedMinutes}`;

      if (currentPicker === "start") {
        setTimeStart(timeString);
      } else if (currentPicker === "end") {
        setTimeEnd(timeString);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    let formData: any = {
      jenis_alber: "Forklift",
      pekerjaan: jenisPekerjaan,
    };

    if (jenisPekerjaan === "Housekeeping") {
      formData = {
        ...formData,
        kegiatan: deskripsiKegiatan,
        area: area,
        time_start: timeStart,
        time_end: timeEnd,
      };
    }
    if (jenisPekerjaan === "Loading/Unloading") {
      formData = {
        ...formData,
        kapal: namaKapal,
        no_palka: nomorPalka,
      };
    }

    console.log(formData);

    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        throw new Error("no token found!");
      }

      const response = await axios.post(
        `${BASE_URL}/api/request-alber`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response from server:", response.data);
    } catch (error) {
      alert(error);
      console.error("Error submitting form:", error);
    }
    setButtonClicked(true);
  };

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked) {
      const timer = setTimeout(() => {
        router.replace("/process-order");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [buttonClicked]);

  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>New Request</Text>
        <Text style={styles.label}>No Order</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter No Order"
          value={noOrder}
          editable={false}
          onChangeText={setNoOrder}
        />

        <Text style={styles.label}>Jenis Pekerjaan</Text>
        <Picker
          selectedValue={jenisPekerjaan}
          onValueChange={(value: string) => setJenisPekerjaan(value)}
          style={styles.picker}
        >
          <Picker.Item label="Housekeeping" value="Housekeeping" />
          <Picker.Item label="Loading/Unloading" value="Loading/Unloading" />
          <Picker.Item label="Kepentingan Pabrik" value="Kepentingan Pabrik" />
        </Picker>

        {jenisPekerjaan === "Housekeeping" ||
        jenisPekerjaan === "Kepentingan Pabrik" ? (
          <>
            <Text style={styles.label}>Deskripsi Kegiatan</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Deskripsi Kegiatan"
              value={deskripsiKegiatan}
              onChangeText={setDeskripsiKegiatan}
            />
            <Text style={styles.label}>Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Area"
              value={area}
              onChangeText={setArea}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 16,
                }}
              >
                <View>
                  <Text style={styles.label1}>Time Start</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowPicker(true);
                      setCurrentPicker("start");
                    }}
                  >
                    <TextInput
                      style={styles.input1}
                      placeholder="07.00"
                      value={timeStart}
                      editable={false} // disable manual input
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.label1}>Time End</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowPicker(true);
                      setCurrentPicker("end");
                    }}
                  >
                    <TextInput
                      style={styles.input1}
                      placeholder="13.00"
                      value={timeEnd}
                      editable={false} // disable manual input
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {showPicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </>
        ) : null}

        {jenisPekerjaan === "Loading/Unloading" ||
        jenisPekerjaan === "Kepentingan Pabrik" ? (
          <>
            <Text style={styles.label}>Nama Kapal</Text>
            <TextInput
              style={styles.input}
              placeholder="Sukowati"
              value={namaKapal}
              onChangeText={setNamaKapal}
            />
            <Text style={styles.label}>Nomor Palka</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              value={nomorPalka}
              onChangeText={setNomorPalka}
            />
          </>
        ) : null}

        <SubmitButton buttonTitle="Send Request" handleSubmit={handleSubmit} />
      </View>
      {!buttonClicked ? (
        <></>
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/images/order-alber-success.png")}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 220,
    left: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 3,
    // backgroundColor: "white",
  },
  title: {
    color: "#3C3C3C",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 36,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 316,
    alignSelf: "center",
    color: "black",
  },
  input1: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 150,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 16,
  },
  label1: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#FBFBFB",
    width: 316,
    alignSelf: "center",
  },
});

export default Forklift;
