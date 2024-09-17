import {
  View,
  Text,
  ListRenderItem,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon component

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
        <TextInput
          placeholder={item.placeholder}
          value={formValues[item.name] || ""}
          onChangeText={(text) => handleInputChange(item.name, text)}
          style={styles.input}
          secureTextEntry={item.name === "password" && !showPassword} // Toggle password visibility
        />
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
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
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
    // marginBottom: 200,
    marginVertical: 'auto'
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
    width: 316, // Ensures the TextInput takes full width
    alignSelf: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 5,
    padding: 10,
  },
  buttonContainer: {
    alignItems: "center", // Center the button within the container
    marginTop: 20, // Add space between inputs and button
  },
  forgotPassword: {
    marginLeft: 16,
    color: "#707070",
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
