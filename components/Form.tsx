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

  const handleInputChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const renderItem: ListRenderItem<FormFields> = ({ item }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{item.label}</Text>
      <TextInput
        placeholder={item.placeholder}
        value={formValues[item.name] || ""}
        onChangeText={(text) => handleInputChange(item.name, text)}
        style={styles.input}
      />
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
    justifyContent: "center", // Centers items vertically
    alignItems: "center", // Centers items horizontally
    paddingHorizontal: 20, // Adds padding on the sides
    marginBottom: 200,
  },
  formContent: {
    width: "100%", // Ensures form content takes full width of its parent
    maxWidth: 400, // Optional: to limit the maximum width of the form
    alignItems: "stretch", // Ensures child items take full width of the container
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
    color: "#707070",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#fff",
    width: 316, // Ensures the TextInput takes full width
    alignSelf: "center",
  },
  buttonContainer: {
    alignItems: "center", // Center the button within the container
    marginTop: 20, // Add space between inputs and button
  },
  button: {
    backgroundColor: "#F0D800",
    padding: 15,
    borderRadius: 8,
    width: 315, // Adjust width as needed
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Form;
