/**
 * This code handles the user registration screen.The registration is dived into 5 steps, 
 * handling multi-step form for user registration. Each step is rendered based on the current
 * step.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";
import { useUser } from "../../context/UserContext";


// Functional component 
const RegistrationScreen = () => {
  const navigation = useNavigation(); // navigation object
  const { updateProfile } = useProfile(); // From ProfileContext get the updateProfile
  const { registerUser } = useUser(); // From the UserContext get the registerUser

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    degree: "",
    university: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
  });

  // States for validation errors, date picker visibility, select profile image and password input confirmation
  const [errors, setErrors] = useState({});
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1 validation: User name, email, degree, and university
  const validateStep1 = () => {
    const newErrors = {};
    ["name", "email", "degree", "university"].forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 2 validation:  Date of Birth and Phone Number
  const validateStep2 = () => {
    const newErrors = {};
    ["dateOfBirth", "phoneNumber"].forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 3 validation: Create a password. Ensures the password meets the validations criteria
  const validateStep3 = () => {
    const passwordErrors = {};
    if (!formData.password) {
      passwordErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      passwordErrors.password = "Password must be at least 8 characters";
    } else if (!/[!@#$%^&*]/.test(formData.password)) {
      passwordErrors.password =
        "Password must have at least one special character";
    } else if (formData.password !== confirmPassword) {
      passwordErrors.password = "Passwords do not match";
    }

    setErrors(passwordErrors);
    return Object.keys(passwordErrors).length === 0;
  };

  // Function to hold the calendar and date picker. User inputs their date of birth
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setDatePickerVisible(Platform.OS === "ios");
    setFormData({ ...formData, dateOfBirth: currentDate.toDateString() });
  };

  //Function to hold the user's image profile. User cannot continue registration if an image is not added.
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // This state tracks the current step in the form. User can go forward and backwards if all input fields are added.
  const [step, setStep] = useState(1);

  // Function to handle the Next button press. user cannot go to the next screen if a field is empty.
  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && image) setStep(4);
  };

  // Function to handle the Back button
  const handleBack = () => {
    setStep(step - 1);
  };


  // Function to hadle the Finish button
  const handleFinish = () => {
    if (validateStep3()) {
      const newUser = { ...formData, profileImage: image };
      registerUser(newUser);
      updateProfile(newUser);
      setStep(5);
    }
  };

  // Function to disable the next button if user has not entered all neccessary information
  const isNextDisabled = () => {
    if (step === 3 && !image) return true;
    if (step === 4 && (!formData.password || !confirmPassword)) return true;
    if (step === 4 && formData.password.length < 8) return true;
    if (step === 4 && !/[!@#$%^&*]/.test(formData.password)) return true;
    if (step === 4 && formData.password !== confirmPassword) return true;
    return false;
  };

  //Return the screen funtionalities. The registration is divided into 5 different registration steps .
  return (
    <ImageBackground
      source={require("../../images/background-5.jpg")}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        {/* Step 1: Name, email, degree, university inputs */}
        <ScrollView contentContainerStyle={styles.container}>
          {step === 1 && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Name"
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({ ...formData, email: text })
                }
                placeholder="Email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Degree Title</Text>
              <TextInput
                style={styles.input}
                value={formData.degree}
                onChangeText={(text) =>
                  setFormData({ ...formData, degree: text })
                }
                placeholder="Degree Title"
              />
              {errors.degree && (
                <Text style={styles.errorText}>{errors.degree}</Text>
              )}

              <Text style={styles.label}>University</Text>
              <TextInput
                style={styles.input}
                value={formData.university}
                onChangeText={(text) =>
                  setFormData({ ...formData, university: text })
                }
                placeholder="University"
              />
              {errors.university && (
                <Text style={styles.errorText}>{errors.university}</Text>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.backButton]}
                  onPress={() => navigation.goBack()}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.nextButton]}
                  onPress={handleNext}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Step 2: Date of birth, phone number input fields. */}
          {step === 2 && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setDatePickerVisible(true)}
              >
                <Text>{formData.dateOfBirth || "Select Date"}</Text>
              </TouchableOpacity>
              {errors.dateOfBirth && (
                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
              )}

              {datePickerVisible && (
                <DateTimePicker
                  value={
                    formData.dateOfBirth
                      ? new Date(formData.dateOfBirth)
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  testID="date-time-picker"
                />
              )}

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={(text) =>
                  setFormData({ ...formData, phoneNumber: text })
                }
                placeholder="Phone Number"
                keyboardType="phone-pad"
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.backButton]}
                  onPress={handleBack}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.nextButton]}
                  onPress={handleNext}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* Step 3: Upload user profile picture. */}
          {step === 3 && (
            <View style={styles.formContainer}>
              <Text style={styles.labelPic}>Upload your profile picture</Text>
              <TouchableOpacity onPress={pickImage} testID="image-picker">
                <View style={styles.imagePicker}>
                  {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                  ) : (
                    <Ionicons name="camera" size={50} color="#ccc" />
                  )}
                </View>
              </TouchableOpacity>
              {errors.image && (
                <Text style={styles.errorText}>{errors.image}</Text>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.backButton]}
                  onPress={handleBack}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.nextButton,
                    isNextDisabled() && { backgroundColor: "#ccc" },
                  ]}
                  onPress={handleNext}
                  disabled={isNextDisabled()}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Step 4: Create and confirm password. */}
          {step === 4 && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                placeholder="Password"
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.backButton]}
                  onPress={handleBack}
                >
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.nextButton]}
                  onPress={handleFinish}
                >
                  <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Step 5: Confirm account registration. Go back to Login Screen */}
          {step === 5 && (
            <View style={styles.formContainer}>
              <Text style={styles.successText}>
                Account successfully created!
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.nextButton]}
                onPress={() => navigation.navigate("Authentication")}
              >
                <Text style={styles.buttonText}>Return to Login Page</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#f0a500",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#FDA701",
  },
  backButton: {
    backgroundColor: "#FDA701",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },

  labelPic: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'center'
  },

  image: {
    width: "50%",
    height: "100%",
    borderRadius: 5,
  },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default RegistrationScreen;

