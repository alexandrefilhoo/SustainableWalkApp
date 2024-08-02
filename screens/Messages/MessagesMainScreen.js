/**
 * Code for the messages main screen. The user is presented to the current conversations list.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";
import { useMessages } from "../../context/MessagesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Function component for the messages Screen
const MessagesScreen = () => {
  // Consts for theme context, retrieve messages, navigation
  const { theme } = useProfile();
  const { messages } = useMessages();
  const navigation = useNavigation();

  // State that stores the user search query
  const [searchQuery, setSearchQuery] = useState("");

  // Retrive the lastest messages to the top of the list, using the reduce function.
  const latestMessages = messages.reduce((acc, msg) => {
    acc[msg.name] = msg;
    return acc;
  }, {});

  // Filter message list based on search input query
  const messageList = Object.values(latestMessages).filter((msg) =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Return statement for the user's messages list
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home")} // Navigation to Home screen
          testID="back-button"
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color={theme === "light" ? "#2d572c" : "#fff"}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.header,
            { color: theme === "light" ? "#2d572c" : "#fff" },
          ]}
        >
          Messages
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => navigation.navigate("DeleteMessagesScreen")} // Navigation to delete messages screen
        >
          <Ionicons
            name="trash"
            size={30}
            color={theme === "light" ? "#2d572c" : "#fff"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={30}
          color="#ccc"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#2d572c"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* Messages if the users has no message chats */}
      {messageList.length === 0 ? (
        <View style={styles.noMessagesContainer}>
          <Text
            style={[
              styles.noMessagesText,
              { color: theme === "light" ? "#2d572c" : "#fff" },
            ]}
          >
            {searchQuery
              ? "No results found."
              : "There are no messages to show. Start messaging your contacts."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={messageList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.messageContainer}
              onPress={() =>
                navigation.navigate("ConversationScreen", {
                  contact: item.name,
                })
              }
            >
              <Image source={item.image} style={styles.profileImage} />
              <View style={styles.messageTextContainer}>
                <Text
                  style={[
                    styles.name,
                    { color: theme === "light" ? "#2d572c" : "#fff" },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.message,
                    { color: theme === "light" ? "#2d572c" : "#fff" },
                  ]}
                >
                  {item.message}
                </Text>
              </View>
              <Text
                style={[
                  styles.time,
                  { color: theme === "light" ? "#2d572c" : "#fff" },
                ]}
              >
                {item.time}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.newMessageButton}
        onPress={() => navigation.navigate("NewMessageScreen")} // Navigation to New message screen
      >
        <MaterialCommunityIcons
          name="message-plus"
          size={24}
          color="green"
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backButton: {},
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  deleteButton: {},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
    color: "#2d572c",
  },
  searchInput: {
    flex: 1,
    color: "#2d572c",
    fontSize: 20,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageTextContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  newMessageButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2d572c",
    padding: 15,
    borderRadius: 50,
  },
  addIcon: {
    color: "#fff",
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMessagesText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default MessagesScreen;
