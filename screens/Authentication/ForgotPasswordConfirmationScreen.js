/**
 * Code for the forgort password, displaying a message to inform the user that 
 * the email will be sent to reset their password.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Function component taking route as props
const ForgotPasswordConfirmationScreen = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;

  return (
    <ImageBackground
      source={require("../../images/background-5.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            If an account is registered, an email will be sent to {email}. Use
            the link provided in the email to reset your password!
          </Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Authentication")}
          >
            <Text style={styles.loginButtonText}>Return to Login Page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "#f0a500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPasswordConfirmationScreen;
