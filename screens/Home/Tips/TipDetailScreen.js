/**
 * Code for the tips details screen. The user can navigate forwards and backwards among tips.
 */
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { tipsData } from "../../../dummy-data/tipsData";


// Function component for tips details screen
const TipDetailScreen = () => {

  // Const for navigation, route, tip parameter, index finder, get next tip, get previous tip
  const navigation = useNavigation();
  const route = useRoute();
  const { tip } = route.params;
  const tipIndex = tipsData.findIndex((t) => t.title === tip.title);
  const nextTip = tipsData[tipIndex + 1];
  const prevTip = tipsData[tipIndex - 1];

  // Function to handle next tip navigation
  const handleNextTip = () => {
    if (nextTip) {
      navigation.navigate("TipDetail", { tip: nextTip });
    }
  };

  // Function to handle previous tip navigation
  const handlePrevTip = () => {
    if (prevTip) {
      navigation.navigate("TipDetail", { tip: prevTip });
    }
  };

  // Return statement to output the tips details
  return (
    <View style={styles.container}>
      <Image source={tip.image} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        testID="back-button"
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>{tip.title}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.tagsBox}>
            {tip.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.details}>{tip.details}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {prevTip && (
          <TouchableOpacity style={styles.prevButton} onPress={handlePrevTip}>
            <Text style={styles.buttonText}>Previous Tip</Text>
          </TouchableOpacity>
        )}
        {nextTip && (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextTip}>
            <Text style={styles.buttonText}>Next Tip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleBox: {
    flex: 1,
    alignItems: "center",
  },
  tagsBox: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontFamily: "CaveatBrush-Regular",
    color: "#2d572c",
    textAlign: "center",
  },
  separator: {
    width: 2,
    height: "100%",
    backgroundColor: "#2d572c",
    marginHorizontal: 10,
  },
  tag: {
    fontSize: 20,
    fontFamily: "CaveatBrush-Regular",
    color: "#2d572c",
    textAlign: "center",
  },
  details: {
    paddingTop: 10,
    fontSize: 25,
    fontFamily: "CantataOne-Regular",
    color: "#2d572c",
    textAlign: "center",
    marginBottom: 20,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  prevButton: {
    backgroundColor: "#ffbf00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  nextButton: {
    backgroundColor: "#2d572c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});

export default TipDetailScreen;
