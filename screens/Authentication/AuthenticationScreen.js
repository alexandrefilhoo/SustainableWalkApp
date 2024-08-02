/**
 * Code for the user autentication, providing a user interface for logging in and registering.
 * Includes the input fields for email and password with validations, and buttons for login,
 * register and forgot password.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";


// Define the component using onAuthSuccess as the function prop.
const AuthenticationScreen = ({ onAuthSuccess }) => {
  const navigation = useNavigation();
  const { profile } = useProfile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  // Button press handler for login
  const handleLogin = () => {
    let valid = true;
    if (!email) {
      setEmailError("Enter email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Enter password");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Check if user has registered in the app
    if (valid) {
      if (profile.email === email) {
        onAuthSuccess();
      } else {
        Alert.alert("Error", "User not registered. Please register first.");
      }
    }
  };


  // Function to navigate to Registration Screen
  const handleRegister = () => {
    navigation.navigate("Registration");
  };

  // Function to navigate to Forgoto Password
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };


  // Returns the Login and Register Inital Screen.
  return (
    <ImageBackground
      source={require("../../images/background-5.jpg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
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
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  forgotPasswordText: {
    color: "#2d572c",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#2d572c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: "#FDA701",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AuthenticationScreen;
