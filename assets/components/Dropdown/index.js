import React, { useState } from "react";
import { IEye, IEyee } from "../../assets/icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const Dropdown = ({
  label,
  data,
  onSelect,
  buttonTextAfterSelections,
  rowTextForSelection,
  ...props
}) => {
  //   const [hidePassword, setHidePassword] = useState(password);
  return (
    <View style={style.container}>
      <Text style={style.label}>{label}</Text>

      <View style={[style.inputContainer]}>
        <SelectDropdown
          dropdownStyle={style.textInput}
          data={data}
          onSelect={onSelect}
          buttonTextAfterSelections={buttonTextAfterSelections}
          rowTextForSelection={rowTextForSelection}
        />
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
    height: 60,
    backgroundColor: "#fff",
    borderColor: "#858585",
    borderWidth: 1,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    //  position: 'relative',
  },
  showHide: { marginRight: 4 },
  textInput: {
    marginLeft: 5,
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  },
});

export default Dropdown;
