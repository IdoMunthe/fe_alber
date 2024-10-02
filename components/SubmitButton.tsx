import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

interface SubmitButtonProps {
  buttonTitle: string;
  color?: string;
  marginTop?: number;
  handleSubmit: () => void;
  isDisabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonTitle,
  handleSubmit,
  color = "#F0D800",
  marginTop = 64,
  isDisabled
}) => {
  // Check if the button should be disabled

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: isDisabled ? "#cccccc" : color, // Gray if disabled
            marginTop: marginTop,
          },
          styles.button,
        ]}
        onPress={handleSubmit}
        disabled={isDisabled}
      >
        <Text
          style={[
            styles.buttonText,
            { color: isDisabled ? "#888888" : "#fff" }, // Light gray text if disabled
          ]}
        >
          {buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: 315,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SubmitButton;
