import React, { useState } from "react";
import { IEye, IEyee } from "../../../assets/icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

const Input = ({ label, password, error, onFocus, ...props }) => {
  const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>

      <View style={[style.inputContainer]}>
        <TextInput
          secureTextEntry={hidePassword}
          {...props}
          style={style.textInput}
        />
        {password && (
          <TouchableOpacity
            style={style.showHide}
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            {hidePassword ? (
              <Image source={IEye} style={style.gambar}></Image>
            ) : (
              <Image source={IEyee} style={style.gambar}></Image>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: { marginBottom: 10 },
  label: { marginVertical: 5, fontSize: 16, color: "#565656" },
  gambar: { height: 22, width: 22 },
  inputContainer: {
    borderRadius: 10,
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#858585",
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  showHide: { marginRight: 4 },
  textInput: { marginLeft: 4, flex: 1 },
});

export default Input;
