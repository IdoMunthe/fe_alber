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
import SubmitButton from "../components/SubmitButton";
import CustomHeader from "../components/CustomHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Image } from "react-native";

export type RootStackParamList = {
  excavator: { jenis_alber: string };
};

const Excavator = () => {
  const router = useRouter();
  const route = useRoute<RouteProp<RootStackParamList, "excavator">>();
  const { jenis_alber } = route.params;

  // State for other form fields
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

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowPicker(false); // hide picker after time is chosen
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (currentPicker === "start") {
        setTimeStart(timeString);
      } else if (currentPicker === "end") {
        setTimeEnd(timeString);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const formData = {
      jenis_alber, // Include jenis_alber
      no_order: noOrder,
      jenis_pekerjaan: jenisPekerjaan,
      deskripsi_kegiatan: deskripsiKegiatan,
      area,
      time_start: timeStart,
      time_end: timeEnd,
      nama_kapal: namaKapal,
      nomor_palka: nomorPalka,
    };

    // Handle API POST here later on
    // Send the formData to your backend API
    //   try {
    //     const response = await fetch("YOUR_API_ENDPOINT", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     });

    //     const data = await response.json();
    //     console.log("Response from server:", data);
    //   } catch (error) {
    //     console.error("Error submitting form:", error);
    //   }
    setButtonClicked(true);
  };

  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (buttonClicked) {
      const timer = setTimeout(() => {
        router.replace("/dashboard");
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
        </Picker>

        {jenisPekerjaan === "Housekeeping" ? (
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

        {jenisPekerjaan === "Loading/Unloading" ? (
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
          source={require("../assets/images/order-alber-success.png")}
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

export default Excavator;
