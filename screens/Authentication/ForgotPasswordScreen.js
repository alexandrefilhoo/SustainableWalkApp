/**
 * Code for the forgot password screen. It provides an user interface for
 * the users to reset their passwords, includind input emails fields with
 * validation. User needs to add their email in both fields, otherwise the 
 * funtionality will not work.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Function component without props
const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");


  // Handler for button press to reset password
  const handleResetPassword = () => {
    let valid = true;
    if (!email) {
      setEmailError("Enter email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (email !== confirmEmail) {
      setConfirmEmailError("Emails do not match");
      valid = false;
    } else {
      setConfirmEmailError("");
    }
    if (valid) {
      // Proceed with password reset
      navigation.navigate("ResetPassword", { email });
    }
  };

  //Returns the reset password screen, containing email and confirm email input fields
  return (
    <ImageBackground
      source={require("../../images/background-5.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Confirm Email"
            placeholderTextColor="#888"
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />
          {confirmEmailError ? (
            <Text style={styles.errorText}>{confirmEmailError}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.loginButtonText}>Login</Text>
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
  formContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 16,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: "#f0a500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButtonText: {
    color: "#2d572c",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
});

export default ForgotPasswordScreen;
