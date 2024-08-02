/**
 * Code for the user profile view. The user can check all their informations in this screen.
 * To edit the profile the users must go to the profile main screen and click on the edit 
 * profile container.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";
import Ionicons from "@expo/vector-icons/Ionicons";


// Function componenet for view profile screen
const ViewProfileScreen = () => {

  // Consts to get navigation and the get the theme and profile the profile context
  const navigation = useNavigation();
  const { theme, profile } = useProfile();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Back navigation
          testID="back-button"
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color={theme === "light" ? "#2d572c" : "#fff"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.header,
            { color: theme === "light" ? "#2d572c" : "#fff" },
          ]}
        >
          Profile Details
        </Text>
      </View>
      <View style={styles.profileSection}>
        {profile.profileImage ? (
          <Image
            style={styles.profileImage}
            source={{ uri: profile.profileImage }}
            testID="profile-image"
          />
        ) : (
          <View style={styles.imagePlaceholder} testID="image-placeholder">
            <Ionicons name="camera" size={50} color="#ccc" />
          </View>
        )}
        {/* Display all user's information here */}
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{profile.name}</Text>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile.email}</Text>
        <Text style={styles.label}>University</Text>
        <Text style={styles.value}>{profile.university}</Text>
        <Text style={styles.label}>Degree Title</Text>
        <Text style={styles.value}>{profile.degree}</Text>
        <Text style={styles.label}>Date of Birth</Text>
        <Text style={styles.value}>{profile.dateOfBirth}</Text>
        <Text style={styles.label}>Phone Number</Text>
        <Text style={styles.value}>{profile.phoneNumber}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
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
  backButtonText: {
    fontSize: 24,
    color: "#2d572c",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
  },
  profileSection: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d572c",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#000",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 10,
  },
});

export default ViewProfileScreen;
