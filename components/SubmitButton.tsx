import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

interface SubmitButtonProps {
  buttonTitle: string;
  handleSubmit: () => void
}

const SubmitButton: React.FC<SubmitButtonProps> = ({buttonTitle, handleSubmit}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F0D800",
    padding: 15,
    borderRadius: 8,
    width: 315,
    alignItems: "center",
    marginTop: 64,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default SubmitButton