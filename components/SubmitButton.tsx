import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

interface SubmitButtonProps {
  buttonTitle: string;
  color?: string;
  marginTop?: number;
  handleSubmit: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  buttonTitle,
  handleSubmit,
  color = "#F0D800",
  marginTop = 64,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          { backgroundColor: color, marginTop: marginTop },
          styles.button,
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{buttonTitle}</Text>
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
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SubmitButton