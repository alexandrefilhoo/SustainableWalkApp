/* 
  File to determine which background to display.
*/

import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useProfile } from "../dummy-data/ProfileContext";


const ThemedBackground = ({ children }) => {
  const { theme } = useProfile();

  // Choose the background image based on the current theme
  const backgroundImage =
    theme === "light"
      ? require("../images/background-image.jpg")
      : require("../images/background-image-dark.jpg");

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
  },
});

export default ThemedBackground;
