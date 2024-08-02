/**
 * This code create the Walking path map screeen. User starts the walking activity throught the start button at 
 * the bottom of the screen. The activity will be tracking accordindly.
 */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import walkingPaths from "../../../dummy-data/walkingPathsData";
import { getTrailCoordinates } from "../../../api/mockAllTrailsApi"; // Mock API function

const { width, height } = Dimensions.get("window");


// Function component for Walk path map 
const WalkingPathMapScreen = () => {

  // Consts for navigation object, route, pathID extraction, and find walking path through pathID
  const navigation = useNavigation();
  const route = useRoute();
  const { pathId } = route.params;
  const path = walkingPaths.find((p) => p.id === pathId);

  //States for coordinates, timers, distance, user activity tracking, pause activity, and finish activity.
  const [coordinates, setCoordinates] = useState([]);
  const [timer, setTimer] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [finishModalVisible, setFinishModalVisible] = useState(false);

  useEffect(() => {
    // Fetch walking path coordinates from the API
    getTrailCoordinates(path.title).then((coords) => {
      setCoordinates(coords);
    });


    // Star the interval to update the timer and distance
    let interval;
    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
        if ((timer + 1) % 5 === 0){
          setDistance((prev) => prev + 0.1);
        }
      }, 1000);
    } else if (!isTracking && timer !== 0) {
      clearInterval(interval); // Clear the interval is the activity is not been tracked.
    }
    return () => clearInterval(interval);
  }, [isTracking, isPaused,timer]);

  // Function to handle start click button
  const handleStart = () => {
    setIsTracking(true);
    setIsPaused(false);
  };

  // Function to handle the the  pause and resume buttons
  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  // Function to hold the finish button
  const handleFinish = () => {
    setFinishModalVisible(true);
  };

  // Function to confirm the end of the activity. User is directed to the summary screen.
  const confirmFinish = () => {
    setIsTracking(false);
    navigation.navigate("SummaryScreen", { distance, time: timer });
    setFinishModalVisible(false);
  };

  // Function to format the time of the walking path activity
  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  // Return statement to outp the walking path map, and the its traking 
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates[0]?.latitude || 51.5074,
          longitude: coordinates[0]?.longitude || -0.1278,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#2d572c"
            strokeWidth={6}
          />
        )}
        {coordinates.length > 0 && (
          <Marker coordinate={coordinates[0]} title="Start" />
        )}
        {coordinates.length > 0 && (
          <Marker
            coordinate={coordinates[coordinates.length - 1]}
            title="End"
          />
        )}
      </MapView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        testID="back-button"
      >
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        {!isTracking ? (
          <>
            <View style={styles.infoBox} testID="map">
              <Text style={styles.infoText}>Time</Text>
              <Text style={styles.infoValue}>{formatTime(timer)}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>Distance</Text>
              <Text style={styles.infoValue}>{distance.toFixed(2)} Km</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.trackingContainer}>
            <Text style={styles.trackingText}>{formatTime(timer)}</Text>
            <Text style={styles.trackingText}>{distance.toFixed(2)} Km</Text>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={handlePauseResume}
            >
              <Text style={styles.pauseButtonText}>
                {isPaused ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={finishModalVisible}
        onRequestClose={() => setFinishModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Finished your activity?</Text>
            <TouchableOpacity
              style={styles.resumeButton}
              onPress={confirmFinish}
            >
              <Text style={styles.resumeButtonText}>Yes, I'm finished</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFinishModalVisible(false)}>
              <Text style={styles.resumeButtonTextpopup}>Resume</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  infoBox: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2d572c",
  },
  infoValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2d572c",
  },
  startButton: {
    backgroundColor: "#2d572c",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
  trackingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  trackingText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2d572c",
    flex: 1,
    textAlign: "center",
  },
  pauseButton: {
    backgroundColor: "#ffcc00",
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
    alignItems: "center",
  },
  pauseButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  finishButton: {
    backgroundColor: "#ff4c4c",
    paddingVertical: 5,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  finishButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resumeButtonTextpopup: {
    fontSize: 20,
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
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  resumeButton: {
    backgroundColor: "#2d572c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  resumeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#2d572c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  modalButtonResume: {
    backgroundColor: "#2d572c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonFinish: {
    backgroundColor: "#ff4c4c",
  },
});

export default WalkingPathMapScreen;
