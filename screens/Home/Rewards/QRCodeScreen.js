/**
 * Code for the reward QR code along with the random generated code. This screen display the user's name and 
 * university.
 */
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../../dummy-data/ProfileContext";
import QRCode from "react-native-qrcode-svg"; 

// Function component for the QR code reward
const QRCodeScreen = () => {

  // Consts for navigation, profile context, and generate code
  const navigation = useNavigation();
  const { profile } = useProfile(); 
  const [digitCode, setDigitCode] = useState("");

  // Use effect to generate code when component mounts
  useEffect(() => {
    generateDigitCode();
  }, []);

  // Function to that generates a random digit code
  const generateDigitCode = () => {
    const code = Math.random().toString(36).substring(2, 16).toUpperCase();
    setDigitCode(code);
  };

  // Return statement that outputs the reward QR code along witht the generated code.
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Reward QR code</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.university}>{profile.university}</Text>
        <QRCode
          value="static_qr_code_value"
          size={300}
          color="black"
          backgroundColor="white"
        />
        <Text style={styles.digitCode}>{digitCode}</Text>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={generateDigitCode}
        >
          <Text style={styles.generateButtonText}>Generate Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    zIndex: 10,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
    textAlign: "center",
  },
  qrCodeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2d572c",
  },
  university: {
    fontSize: 25,
    marginBottom: 20,
    color: "#2d572c",
  },
  digitCode: {
    fontSize: 25,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    color: "#2d572c",
  },
  generateButton: {
    marginTop: 20,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default QRCodeScreen;
