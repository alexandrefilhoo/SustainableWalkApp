/**
 * Code for the walking path main screen. Allow users to search for and filter walking paths
 * according to their preferences.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import PagerView from "react-native-pager-view";
import Slider from "@react-native-community/slider";
import CheckBox from "expo-checkbox";
import walkingPaths from "../../../dummy-data/walkingPathsData";

const { width } = Dimensions.get("window");


// Function to component for Walking Path main screen
const WalkingPathsScreen = () => {

  // States for navigaton, queries, filter paths, visibility, sort options, sort distance filter.
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPaths, setFilteredPaths] = useState(walkingPaths);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState("Best Match");
  const [distance, setDistance] = useState(10);

  // State for path difficulty level.
  const [difficulty, setDifficulty] = useState({
    Easy: false,
    Moderate: false,
    Hard: false,
  });
  const [pathsFound, setPathsFound] = useState(walkingPaths.length);

  // Function to render images
  const renderPagerView = (images) => (
    <View style={styles.pagerViewContainer}>
      <PagerView style={styles.pagerView} initialPage={0}>
        {images.map((image, index) => (
          <View key={index} style={styles.page}>
            <Image source={image} style={styles.carouselImage} />
          </View>
        ))}
      </PagerView>
    </View>
  );

  // Function to render all walking paths individually
  const renderWalkingPathItem = ({ item }) => (
    <View style={styles.walkingPathContainer}>
      {renderPagerView(item.images)}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PathDetailsScreen", { pathId: item.id })
        }
      >
        <Text style={styles.walkingPathTitle}>{item.title}</Text>
        <Text style={styles.walkingPathDetails}>
          {item.distance} • {item.difficulty} • {item.duration}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Function to search 
  const handleSearch = (query) => {
    setSearchQuery(query);
    filterPaths(query, distance, difficulty, sortOption);
  };

  // Function to filter paths on a pop-up window
  const filterPaths = (query, distance, difficulty, sortOption) => {
    let filtered = walkingPaths;

    if (query) {
      filtered = filtered.filter((path) =>
        path.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (distance) {
      filtered = filtered.filter(
        (path) => parseFloat(path.distance) <= distance
      );
    }

    if (difficulty.Easy || difficulty.Moderate || difficulty.Hard) {
      filtered = filtered.filter(
        (path) =>
          (difficulty.Easy && path.difficulty === "Easy") ||
          (difficulty.Moderate && path.difficulty === "Moderate") ||
          (difficulty.Hard && path.difficulty === "Hard")
      );
    }

    setFilteredPaths(filtered);
    setPathsFound(filtered.length);
  };

  // Function to apply filters
  const handleFilterApply = () => {
    filterPaths(searchQuery, distance, difficulty, sortOption);
    setIsFilterVisible(false);
  };

  // Function to clear filters
  const handleFilterClear = () => {
    setSearchQuery("");
    setDistance(10);
    setDifficulty({
      Easy: false,
      Moderate: false,
      Hard: false,
    });
    setFilteredPaths(walkingPaths);
    setPathsFound(0);
  };

  // Use effect function to filter paths 
  useEffect(() => {
    filterPaths(searchQuery, distance, difficulty, sortOption);
  }, [distance, difficulty, sortOption]);


  // Return statement for the walking path main screen 
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Walking Paths</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={30}
          color="#2d572c"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search walking paths"
          placeholderTextColor="#2d572c"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <Ionicons
          name="options"
          size={30}
          color="#2d572c"
          style={styles.filterIcon}
          onPress={() => setIsFilterVisible(true)}
          testID="filter-icon"
        />
      </View>
      {/* Only appears if the are no walking paths */}
      {filteredPaths.length === 0 ? (
        <View style={styles.noPathsContainer}>
          <Text style={styles.noPathsText}>No paths found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPaths}
          keyExtractor={(item) => item.id}
          renderItem={renderWalkingPathItem}
          contentContainerStyle={styles.listContentContainer}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        {/* Pop-up window to filter paths accordingly to user's preferences */}
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFilterVisible(false)}
              testID="close-filter"
            >
              <Ionicons name="close" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Filters</Text>
            <Text style={styles.modalSubHeader}>Sort</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity onPress={() => setSortOption("Best Match")}>
                <Text style={styles.radioText}>
                  {sortOption === "Best Match" ? "●" : "○"} Best Match
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSortOption("Newly Added")}>
                <Text style={styles.radioText}>
                  {sortOption === "Newly Added" ? "●" : "○"} Newly Added
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSortOption("Most Popular")}>
                <Text style={styles.radioText}>
                  {sortOption === "Most Popular" ? "●" : "○"} Most Popular
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubHeader}>Distance</Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={1}
              maximumValue={20}
              minimumTrackTintColor="#2d572c"
              maximumTrackTintColor="#ccc"
              value={distance}
              onValueChange={(value) => setDistance(value)}
            />
            <Text>{distance.toFixed(1)} Km</Text>
            <Text style={styles.modalSubHeader}>Difficulty</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <CheckBox
                  value={difficulty.Easy}
                  onValueChange={(value) =>
                    setDifficulty({ ...difficulty, Easy: value })
                  }
                />
                <Text style={styles.checkboxLabel}>Easy</Text>
              </View>
              <View style={styles.checkbox}>
                <CheckBox
                  value={difficulty.Moderate}
                  onValueChange={(value) =>
                    setDifficulty({ ...difficulty, Moderate: value })
                  }
                />
                <Text style={styles.checkboxLabel}>Moderate</Text>
              </View>
              <View style={styles.checkbox}>
                <CheckBox
                  value={difficulty.Hard}
                  onValueChange={(value) =>
                    setDifficulty({ ...difficulty, Hard: value })
                  }
                />
                <Text style={styles.checkboxLabel}>Hard</Text>
              </View>
            </View>
            <View style={styles.filterButtonsContainer}>
              <Text style={styles.pathsFoundText}>
                {pathsFound} paths found
              </Text>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.button, styles.clearButton]}
                  onPress={handleFilterClear}
                >
                  <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.applyButton]}
                  onPress={handleFilterApply}
                >
                  <Text style={styles.buttonText}>See paths</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    justifyContent: "center",
    padding: 20,
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
  headerRight: {
    position: "absolute",
    right: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    margin: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#2d572c",
    fontSize: 20,
  },
  filterIcon: {
    marginLeft: 10,
  },
  listContentContainer: {
    paddingHorizontal: 20,
  },
  walkingPathContainer: {
    marginBottom: 20,
    backgroundColor: "#2d572c",
    borderRadius: 20,
    overflow: "hidden",
    paddingBottom: 10,
  },
  pagerViewContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  pagerView: {
    width: "100%",
    height: 200,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
  },
  pathInfoContainer: {
    padding: 10,
    alignItems: "center",
  },
  walkingPathTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  walkingPathDetails: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
  },
  noPathsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPathsText: {
    fontSize: 18,
    color: "#2d572c",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalSubHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    alignSelf: "flex-start",
  },
  radioContainer: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  radioText: {
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
  },
  pathsFoundText: {
    fontSize: 16,
    marginBottom: 10,
  },
  filterButtonsContainer: {
    alignItems: "center",
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  clearButton: {
    backgroundColor: "#d9534f",
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: "#2d572c",
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WalkingPathsScreen;

