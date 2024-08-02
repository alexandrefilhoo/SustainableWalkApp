/**
 * This code creates a summary screen for the user activity. the screens outputs the 
 * time, total distance, calories burned, number of steps, and the total points earned.
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

// Functional Component for the Summary activity
const SummaryScreen = () => {
  // Objects for the navigation, route, and distance and time parameters
  const navigation = useNavigation();
  const route = useRoute();
  const { distance, time } = route.params;

  // Function to format time to HH:MM:SS
  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // Function to calculate calories lost using time and distance references
  const calculateCalories = (time, distance) => {
    const caloriesPerKm = 100; // Average calories burned per kilometer
    const caloriesPerMinute = 10; // Average calories burned per minute
    return (distance * caloriesPerKm + (time / 60) * caloriesPerMinute).toFixed(
      2
    ); // Return the final amount of caloried in the activity
  };

  //Function to calculate the Steps
  const calculateSteps = (distance) => {
    const stepsper100m = 140; // Average steps per 100 metres
    return Math.floor(distance * stepsper100m); // Returns the final steps in the activity
  };


  // function to returns the points earned 
  const calculatePoints = (distance) => {
    const pointsPer100m = 10; // Points earned per 100 metres walked
    return Math.floor(distance * pointsPer100m); // Returns the total points earned in the activity
  };


  // Return tthe walking activity summary screen, showin the distance, time, calories, steps, and total points.
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate("WalkingPathsScreen")}
        testID="close-button"
      >
        <Ionicons name="close" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Activity Summary</Text>
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>
          Total Distance: {distance.toFixed(2)} Km
        </Text>
        <Text style={styles.summaryText}>Total Time: {formatTime(time)}</Text>
        <Text style={styles.summaryText}>
          Calories: {calculateCalories(time, distance)} kcal
        </Text>
        <Text style={styles.summaryText}>
          Steps: {calculateSteps(distance)}
        </Text>
        <Text style={styles.summaryText}>
          Points: {calculatePoints(distance)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#2d572c",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d572c",
    marginVertical: 5,
  },
});

export default SummaryScreen;
