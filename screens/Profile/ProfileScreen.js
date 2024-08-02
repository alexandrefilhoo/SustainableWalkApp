/**
 * Code for the Profile main Screen. The user can check some of their details in the screen along with 
 * navigation containers for other screens, such as view and edit profile, check app setting, and check 
 * app information. The user can log out the app and delete their accounts through the logout and delete
 * account buttons.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useProfile } from "../../dummy-data/ProfileContext";
import * as ImagePicker from "expo-image-picker";


// Function component for the profile screen
const ProfileScreen = ({ handleLogout }) => {

  // Const for navigation, get and set profile from context
  const navigation = useNavigation();
  const { profile, setProfile } = useProfile();

  // State to initialize the image along with the current profile.
  const [image, setImage] = useState(profile.profileImage);

  // Function  to allow the user to choose an image from their phone picture library
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.uri);
      setProfile({ ...profile, profileImage: result.uri });
    }
  };

  // Function to output and pop up window to confirm the account delettion.
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            handleLogout();
            setProfile({
              name: "",
              about: "",
              university: "",
              degreeTitle: "",
              dob: "",
              phone: "",
              profileImage: null,
            });
          },
        },
      ]
    );
  };

  // Return statemene for the user profile main screen 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Back Navigation
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Profile</Text>
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
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.title}>{profile.degree}</Text>
      <Text style={styles.university}>{profile.university}</Text>
     
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("ViewProfile")} // navigate to view profile screen 
        >
          <Ionicons name="eye" size={50} color="#2d572c" />
          <Text style={styles.iconButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("EditProfile")} //navigate to edit profile screen 
        >
          <Ionicons name="pencil" size={50} color="#2d572c" />
          <Text style={styles.iconButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Settings")} // navigate to settings screen
        >
          <Ionicons name="settings" size={50} color="#2d572c" />
          <Text style={styles.iconButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("ProjectInfo")} // navigate to project info screen
        >
          <Ionicons name="information-circle" size={50} color="#2d572c" />
          <Text style={styles.iconButtonText}>Project Info</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>LOGOUT</Text> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={handleDeleteAccount} // function to log the user out of the application
      >
        <Text style={styles.deleteAccountButtonText}>DELETE ACCOUNT</Text>
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
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
  },
  university: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  bioContainer: {
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
  },
  phone: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconButton: {
    width: "45%",
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  iconButtonText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2d572c",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#2d572c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteAccountButton: {
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  deleteAccountButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
