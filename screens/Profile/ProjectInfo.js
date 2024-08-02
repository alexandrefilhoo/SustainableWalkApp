/**
 * Code for the project info screen. The user can check information about the project,
 * such as the project name, university, student responsible for the project, and the 
 * supervisor as a guide for the project.
 */
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useProfile } from "../../dummy-data/ProfileContext";

// Fucntion component for the project information
const ProjectInfoScreen = () => {

  // Consts for the navigation and theme profile context
  const navigation = useNavigation();
  const { theme } = useProfile();

  //Return statement that creates the project information
  return (
    <View style={styles.container}>
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
          About the Project
        </Text>
      </View>
      <Image
        source={require("../../images/King's_College_London_logo.png")}
        style={styles.logo}
        testID="logo-image"
      />
      <Text
        style={[
          styles.projectTitle,
          { color: theme === "light" ? "#2d572c" : "#fff" },
        ]}
      >
        Project Title
      </Text>
      <Text
        style={[
          styles.projectSubtitle,
          { color: theme === "light" ? "#2d572c" : "#fff" },
        ]}
      >
        Sustainability in Higher Education
      </Text>
      <View style={styles.membersContainer}>
        <View style={styles.member}>
          <Image
            source={require("../../images/Alex.jpeg")}
            style={styles.memberImage}
            testID="alex-image"
          />
          <Text style={styles.memberName}>Alexandro Filho</Text>
          <Text style={styles.memberRole}>Student</Text>
          <TouchableOpacity style={styles.connectButton}>
            <Ionicons name="logo-linkedin" size={20} color="#2d572c" />
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.member}>
          <Image
            source={require("../../images/leonardo.jpeg")}
            style={styles.memberImage}
            testID="leonardo-image"
          />
          <Text style={styles.memberName}>Leonardo Magela</Text>
          <Text style={styles.memberRole}>Supervisor</Text>
          <TouchableOpacity style={styles.connectButton}>
            <Ionicons name="logo-linkedin" size={20} color="#2d572c" />
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.footer}>Copyright © 2024 Alexandro Filho</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 200,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  projectSubtitle: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  membersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  member: {
    alignItems: "center",
  },
  memberImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  memberRole: {
    fontSize: 14,
    marginBottom: 10,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  connectButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#2d572c",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
  },
});

export default ProjectInfoScreen;
