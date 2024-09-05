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
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import Icon from "react-native-vector-icons/MaterialIcons";

interface FormFields {
  name: string;
  label: string;
  placeholder: string;
}

interface FormProps {
  title: string;
  fields: FormFields[];
  onSubmit: (values: { [key: string]: string }) => void;
  buttonTitle: string;
}

const Form: React.FC<FormProps> = ({
  title,
  fields,
  onSubmit,
  buttonTitle,
}) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleInputChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const renderItem: ListRenderItem<FormFields> = ({ item }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.inputWrapper}>
        {item.name === "role" ? (
          <Picker
            selectedValue={formValues[item.name]}
            onValueChange={(value) => handleInputChange(item.name, value)}
            style={styles.picker} // Apply custom styles to the Picker
          >
            <Picker.Item label="Select Role" value="" />
            <Picker.Item label="Admin PG" value="admin_pg" />
            <Picker.Item label="Admin PCS" value="admin_pcs" />
            <Picker.Item label="Operator PCS" value="opr_pcs" />
          </Picker>
        ) : (
          <TextInput
            placeholder={item.placeholder}
            value={formValues[item.name] || ""}
            onChangeText={(text) => handleInputChange(item.name, text)}
            style={styles.input}
            secureTextEntry={item.name === "password" && !showPassword}
          />
        )}
        {item.name === "password" && (
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const handleSubmit = () => {
    onSubmit(formValues);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: "auto",
  },
  formContent: {
    width: "100%",
    maxWidth: 400,
    alignItems: "stretch",
  },
  title: {
    color: "#3C3C3C",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 36,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  label: {
    marginBottom: 5,
    marginLeft: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
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
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 316,
    alignSelf: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#F0D800",
    padding: 15,
    borderRadius: 8,
    width: 315,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Form;
