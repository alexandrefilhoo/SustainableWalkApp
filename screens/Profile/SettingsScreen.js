/**
 * Code for the application settings. The user can make some changes in the application
 * appearace, allow notifications, and enable location.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";
import Ionicons from "@expo/vector-icons/Ionicons";


// Function component for the setting screen 
const SettingsScreen = () => {

  // Consts for the navigation and the theme and set theme from profile context
  const navigation = useNavigation();
  const { theme, setTheme } = useProfile();

  // Function to change the application theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };


  // Return statements for the settings application
  return (
    <View
      style={[
        styles.container,
        theme === "light" ? styles.lightTheme : styles.darkTheme,
      ]}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Back navigation
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Display</Text>
          <Switch
            value={theme === "dark"}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={theme === "dark" ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Share Location</Text>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={false ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => navigation.navigate("ProjectInfo")} // Navigation to Project information
        >
          <Text style={styles.settingText}>About</Text>
          <Ionicons name="chevron-forward" size={24} color="#2d572c" />
        </TouchableOpacity>
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
  lightTheme: {
    backgroundColor: "#fff",
  },
  darkTheme: {
    backgroundColor: "#333",
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
  settingsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: "#2d572c",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#2d572c",
  },
});

export default SettingsScreen;
