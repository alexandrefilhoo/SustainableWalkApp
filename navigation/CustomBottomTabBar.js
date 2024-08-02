/**
 * The code defines the bottom tabs of the application. It sets the icon and styles for each
 * tab item based  on the current navigation state.
 */
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

//Define the functional component to take state, descriptors, and props as navigation
const CustomBottomTabBar = ({ state, descriptors, navigation }) => {
  return (

    //Render a View component to hold the tab bar items
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // On press handler for the tab item
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // On long press for the tab item
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };


        // Set icon based on the route name
        let iconName;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home";
        } else if (route.name === "Messages") {
          iconName = isFocused ? "chatbubbles-sharp" : "chatbubbles-sharp";
        } else if (route.name === "Profile") {
          iconName = isFocused ? "person" : "person";
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, isFocused ? styles.focusedTab : null]}
          >
            <Ionicons
              name={iconName}
              size={30}
              color={isFocused ? "#1b5e20" : "white"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#2d572c",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 25,
    marginBottom: 0,
  },
  focusedTab: {
    backgroundColor: "#a5d6a7",
  },
});

export default CustomBottomTabBar;
