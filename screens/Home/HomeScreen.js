/**
 * Code for the Home screen. This is the first screen the user will see when logged in.
 * The screen provides link containers for other screens, such as walking paths list,
 * tips and suggestions, and rewards.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Function component for the Home Screen
const HomeScreen = () => {
  const navigation = useNavigation(); // Retrieve the navigation

  // Return Statement for the Home screen. This screen provides links to other screens.
  return (
    <ImageBackground
      source={require("../../images/background-image.jpg")}
      style={styles.background}
    >
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Welcome👋</Text>
      </View>

      {/* Link navigation container to walking paths */}
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("WalkingPathsScreen")}
        >
          <Text style={styles.cardText}>Discover walking paths</Text>
          <Image
            style={styles.cardImage}
            source={require("../../images/discover-walking-paths.jpg")}
          />
        </TouchableOpacity>
        {/* This section will be developed in the future */}

        {/* <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>Make your own path</Text>
          <Image
            style={styles.cardImage}
            source={require("../../images/make-your-path.jpg")}
          />
        </TouchableOpacity> */}

        {/* Link navigation container for Tips */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TipsScreen")}
        >
          <Text style={styles.cardText}>Tips to promote Sustainability</Text>
          <Image
            style={styles.cardImage}
            source={require("../../images/tips-to-promote-sustainability.jpg")}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ConnectWithOthers")}
        >
          <Text style={styles.cardText}>Connect with others</Text>
          <Image
            style={styles.cardImage}
            source={require("../../images/connect-with-others.jpg")}
          />
        </TouchableOpacity> */}

        {/* Link navigation container for the Rewards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("RewardsScreen")}
        >
          <Text style={styles.cardText}>Your Rewards</Text>
          <Image
            style={styles.cardImage}
            source={require("../../images/rewards.jpg")}
          />
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },

  container: {
    flex: 1,
    padding: 20,
  },

  greetingContainer: {
    backgroundColor: "#2d572c",
  },

  greeting: {
    fontSize: 30,
    fontFamily: "Roboto-Regular",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#2d572c",
    height: 300,
    borderRadius: 20,
    padding: 15,
    marginTop: 0,
    marginBottom: 40,
    alignItems: "center",
  },
  cardText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "white",
  },
  cardImage: {
    width: "100%",
    height: 225,
    borderRadius: 10,
  },
});

export default HomeScreen;
