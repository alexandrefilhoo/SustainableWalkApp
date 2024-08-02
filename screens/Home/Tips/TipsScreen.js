/**
 * Code for the tips main screen. The tips have been categorized to facilitate
 * its location and organization.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { tipsData } from "../../../dummy-data/tipsData";

// Function componets for the Tips main screen
const TipsScreen = () => {
  const navigation = useNavigation(); // Retrive the use navigation

  // Function that renders the tips based in a given category
  const renderTipCategory = (category) => (
    <View key={category} style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.tipsRow}>
        {tipsData
          .filter((tip) => tip.category === category)
          .map((tip) => (
            <TouchableOpacity
              key={tip.title}
              style={styles.tipContainer}
              onPress={() => navigation.navigate("TipDetail", { tip })}
            >
              <Image source={tip.image} style={styles.tipImage} />
              <View style={styles.tipTextContainer}>
                <Text style={styles.tipText}>{tip.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );

  // Return statement to output the tips screen
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Navigation to return to previous screen
          style={styles.backButton}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Tips</Text>
      </View>
      {/* Different categories for tips */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderTipCategory("Tips for Sustainable Transportation")}
        {renderTipCategory("Tips for Encouraging Walking")}
        {renderTipCategory("General Tips")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
    textAlign: "center",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  categoryContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d572c",
    paddingBottom: 20,
    textAlign: 'center'
  },
  tipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tipContainer: {
    width: "47%",
    marginBottom: 15,
    backgroundColor: "#2d572c",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  tipImage: {
    width: "100%",
    height: 100,
  },
  tipTextContainer: {
    padding: 10,
  },
  tipText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default TipsScreen;
