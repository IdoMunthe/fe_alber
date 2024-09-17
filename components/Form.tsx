import {
  View,
  Text,
  ListRenderItem,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "./CustomHeader";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import SubmitButton from "./SubmitButton";

interface FormFields {
  name: string;
  label: string;
  placeholder: string;
}

interface FormProps {
  jenisPekerjaan: string
}

const Form: React.FC<FormProps> = ({
  jenisPekerjaan
}) => {

  return (
    <>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.title}>New Request</Text>
        <Text style={styles.label}>No Order</Text>
        <TextInput
          style={styles.input}
          // value={noOrder}
          value="PO-FO-001"
          editable={false}
          // onChangeText={setNoOrder}
        />

        <Text style={styles.label}>Jenis Pekerjaan</Text>
        <Picker
          // selectedValue={jenisPekerjaan}
          // onValueChange={(value: string) => setJenisPekerjaan(value)}
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
              // value={deskripsiKegiatan}
              // onChangeText={setDeskripsiKegiatan}
            />
            <Text style={styles.label}>Area</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Area"
              // value={area}
              // onChangeText={setArea}
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
                      // setShowPicker(true);
                      // setCurrentPicker("start");
                    }}
                  >
                    <TextInput
                      style={styles.input1}
                      placeholder="07.00"
                      // value={timeStart}
                      editable={false} // disable manual input
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.label1}>Time End</Text>
                  <TouchableOpacity
                    onPress={() => {
                      // setShowPicker(true);
                      // setCurrentPicker("end");
                    }}
                  >
                    <TextInput
                      style={styles.input1}
                      placeholder="13.00"
                      // value={timeEnd}
                      editable={false} // disable manual input
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* <DateTimePicker
                value={new Date()}
                mode="time"
                display="default"
                // onChange={handleTimeChange}
              /> */}

            </View>
          </>
        ) : null}

        {jenisPekerjaan === "Loading/Unloading" ? (
          <>
            <Text style={styles.label}>Nama Kapal</Text>
            <TextInput
              style={styles.input}
              placeholder="Sukowati"
              // value={namaKapal}
              // onChangeText={setNamaKapal}
            />
            <Text style={styles.label}>Nomor Palka</Text>
            <TextInput
              style={styles.input}
              placeholder="1"
              // value={nomorPalka}
              // onChangeText={setNomorPalka}
            />
          </>
        ) : null}

        <SubmitButton buttonTitle="Send Request" 
        handleSubmit={() => console.log('submitted')} 
        />
      </View>
      {/* {!buttonClicked ? (
        <></>
      ) : (
        <Image
          style={styles.image}
          source={require("../../assets/images/order-alber-success.png")}
        />
      )} */}
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

export default Form;
