import React, { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home/HomeScreen";
import MessagesScreen from "./screens/Messages/MessagesMainScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import ViewProfileScreen from "./screens/Profile/ViewProfileScreen";
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
import SettingsScreen from "./screens/Profile/SettingsScreen";
import ProjectInfoScreen from "./screens/Profile/ProjectInfo";
import DeleteMessagesScreen from "./screens/Messages/DeleteMessagesScreen";
import Icon from "react-native-vector-icons/Ionicons";
import CustomBottomTabBar from "./navigation/CustomBottomTabBar";
import { ProfileProvider } from "./dummy-data/ProfileContext";
import NewMessageScreen from "./screens/Messages/NewMessageScreen";
import ContactsScreen from "./screens/Messages/ContactsScreen";
import { ImageBackground, StyleSheet, View } from "react-native";
import { MessagesProvider } from "./context/MessagesContext";
import ConversationScreen from "./screens/Messages/ConversationScreen";
import WalkingPathsScreen from "./screens/Home/DiscoverWalkingPaths/WalkingPathMainScreen";
import PathDetailsScreen from "./screens/Home/DiscoverWalkingPaths/PathDetailsScreen";
import WalkingPathMapScreen from "./screens/Home/DiscoverWalkingPaths/WalkingPathMapScreen";
import SummaryScreen from "./screens/Home/DiscoverWalkingPaths/SummaryScreen";
import TipsScreen from "./screens/Home/Tips/TipsScreen";
import TipDetailScreen from "./screens/Home/Tips/TipDetailScreen";
import ConnectWithOthersScreen from "./screens/Home/ConnectWithOthers/ConnectWithOthersScreen";
import SeeAllConnectionsScreen from "./screens/Home/ConnectWithOthers/SeeAllConnectionsScreen";
import StudentDetailScreen from "./screens/Home/ConnectWithOthers/StudentDetailScreen";
import RewardsScreen from "./screens/Home/Rewards/RewardsMainScreen";
import QRCodeScreen from "./screens/Home/Rewards/QRCodeScreen";
import AuthenticationScreen from "./screens/Authentication/AuthenticationScreen";
import ForgotPasswordScreen from "./screens/Authentication/ForgotPasswordScreen";
import ForgotPasswordConfirmationScreen from "./screens/Authentication/ForgotPasswordConfirmationScreen";
import RegistrationScreen from "./screens/Authentication/RegistrationScreen";
import { UserProvider } from "./context/UserContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ThemedBackground = ({ children }) => {
  const { theme } = useProfile();

  const backgroundImage =
    theme === "light"
      ? require("./images/background-image.jpg")
      : require("./images/background-image-dark.jpg");

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="WalkingPathsScreen"
        component={WalkingPathsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PathDetailsScreen"
        component={PathDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalkingPathMapScreen"
        component={WalkingPathMapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TipsScreen"
        component={TipsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TipDetail"
        component={TipDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RewardsScreen"
        component={RewardsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QRCodeScreen"
        component={QRCodeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MessagesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="NewMessageScreen"
        component={NewMessageScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="DeleteMessagesScreen"
        component={DeleteMessagesScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack({ handleLogout }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      >
        {(props) => <ProfileScreen {...props} handleLogout={handleLogout} />}
      </Stack.Screen>
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfileScreen}
        options={{
          headerShown: false,
          title: "View Profile",
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          title: "Edit Profile",
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: "Settings",
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="ProjectInfo"
        component={ProjectInfoScreen}
        options={{
          headerShown: false,
          title: "Project Info",
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

function MyTabs({ handleLogout }) {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomBottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#2d572c" },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={{
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerStyle: { backgroundColor: "#2d572c" },
          headerTintColor: "white",
        }}
      >
        {(props) => <ProfileStack {...props} handleLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "caveat-brush": require("./fonts/CaveatBrush-Regular.ttf"),
    "cantata-one": require("./fonts/CantataOne-Regular.ttf"),
  });
  const [user, setUser] = useState(null);

  const handleAuthSuccess = (email) => {
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <MessagesProvider>
      <ProfileProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {!user ? (
                <>
                  <Stack.Screen
                    name="Authentication"
                    options={{ headerShown: false }}
                  >
                    {(props) => (
                      <AuthenticationScreen
                        {...props}
                        onAuthSuccess={handleAuthSuccess}
                      />
                    )}
                  </Stack.Screen>
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ResetPassword"
                    component={ForgotPasswordConfirmationScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Registration"
                    options={{ headerShown: false }}
                  >
                    {(props) => (
                      <RegistrationScreen
                        {...props}
                        onAuthSuccess={handleAuthSuccess}
                      />
                    )}
                  </Stack.Screen>
                </>
              ) : (
                <Stack.Screen name="Main" options={{ headerShown: false }}>
                  {(props) => <MyTabs {...props} handleLogout={handleLogout} />}
                </Stack.Screen>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ProfileProvider>
    </MessagesProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
  },
});
