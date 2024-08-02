/**
 * Code that defines the path details. Utilizes the PageView to display images
 * related to the path, shows the path details including the name, difficulty 
 * level, distance, duration, and a short description.
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import walkingPaths from "../../../dummy-data/walkingPathsData";

const { width } = Dimensions.get("window");

// Function Component called PathDetailScreen
const PathDetailsScreen = () => {

  // Const for the navigation, route, extract pathID, and find walking paths
  const navigation = useNavigation();
  const route = useRoute();
  const { pathId } = route.params;
  const path = walkingPaths.find((p) => p.id === pathId);

  // Return statement for the path details
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Path Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <PagerView style={styles.pagerView} initialPage={0} testID="pager-view">
          {path.images.map((image, index) => (
            <View key={index} style={styles.page}>
              <Image source={image} style={styles.image} />
            </View>
          ))}
        </PagerView>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{path.title}</Text>
          <View style={styles.subDetailsContainer}>
            <Text style={styles.subDetailsText}>{path.difficulty}</Text>
            <Text style={styles.subDetailsText}>• {path.distance}</Text>
            <Text style={styles.subDetailsText}>• {path.duration}</Text>
          </View>
          <Text style={styles.description}>{path.description}</Text>
          <Image style={styles.mapImage} source={path.map} testID="map-image" />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("WalkingPathMapScreen", { pathId: path.id })
            }
          >
            <Text style={styles.buttonText}>Go to the path</Text>
          </TouchableOpacity>
        </View>
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    zIndex: 10,
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
  scrollViewContent: {
    paddingTop: 80, // Space for the fixed header
  },
  pagerView: {
    width: "100%",
    height: 250,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d572c",
    marginBottom: 10,
  },
  subDetailsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  subDetailsText: {
    fontSize: 16,
    color: "#2d572c",
    marginRight: 10,
  },
  description: {
    fontSize: 16,
    color: "#2d572c",
    marginBottom: 20,
  },
  mapImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2d572c",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PathDetailsScreen;
