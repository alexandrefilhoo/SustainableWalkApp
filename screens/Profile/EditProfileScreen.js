/**
 * Code for the edit profile screen. The user can edit their personal information accordindly. 
 * The new information should be displayed in the profile main screen.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useProfile } from "../../dummy-data/ProfileContext";
import * as ImagePicker from "expo-image-picker";

// Function component to edit the profile screen
const EditProfileScreen = () => {

  // Consts for the navigation, get and update the profile
  const navigation = useNavigation();
  const { profile, updateProfile } = useProfile();

  // States to initialize form data and image state with current profile image
  const [formData, setFormData] = useState({ ...profile });
  const [image, setImage] = useState(profile.profileImage);

  // Function to pick an image from the user pictures library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormData({ ...formData, profileImage: result.assets[0].uri });
    }
  };

  // Function updated user profile image
  const handleSave = () => {
    updateProfile(formData); // Update the user profile image
    navigation.goBack();
  };

  // Return statement for user edit profile
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Back navigation
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
      </View>
      <TouchableOpacity onPress={pickImage} testID="image-picker">
        {image ? (
          <Image style={styles.profileImage} source={{ uri: image }} />
        ) : (
          <View style={styles.imagePicker}>
            <Ionicons name="camera" size={50} color="#ccc" />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <Text style={styles.label}>Degree</Text>
      <TextInput
        style={styles.input}
        value={formData.degree}
        onChangeText={(text) => setFormData({ ...formData, degree: text })}
      />
      <Text style={styles.label}>University</Text>
      <TextInput
        style={styles.input}
        value={formData.university}
        onChangeText={(text) => setFormData({ ...formData, university: text })}
      />
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
    height: 150,
    width: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
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
  saveButton: {
    backgroundColor: "#2d572c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
