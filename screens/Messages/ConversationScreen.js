/**
 * Code to display the user's converstation screen. 
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useMessages } from "../../context/MessagesContext";


//Function component for the converstation
const ConversationScreen = ({ route }) => {

  // Consts for the navigation, add and get messages, retrieve contacts
  const navigation = useNavigation();
  const { messages, addMessage } = useMessages();
  const { contact } = route.params;
  const [message, setMessage] = useState(""); // State to store message input

  // Function to filter the user's selected contact
  const contactMessages = messages.filter((msg) => msg.name === contact);

  // Function to handle the user's sending messages 
  const sendMessage = () => {
    if (message.trim()) {

      // Format new message along with contact, message, and time of message sent
      const newMessage = {
        id: Date.now().toString(),
        name: contact,
        message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image: contactMessages[0].image, // Retrieve the contact's message
      };
      addMessage(newMessage); // Message is added
      setMessage(""); // Clear the message input field.
    }
  };

  // Return stament for the conversations
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Back navigation
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>{contact}</Text>
        <View style={styles.headerRight} />
      </View>
      <FlatList
        data={contactMessages}
        keyExtractor={(item) => item.id} // Flatlist items key 
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
        )}
        contentContainerStyle={styles.flatListContentContainer}
      />
      <View style={styles.messageInputContainer}>
        <Ionicons name="add" size={24} color="#2d572c" style={styles.addIcon} />
        <TextInput
          style={styles.messageInput}
          placeholder="Type message here"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} testID="send-button">
          <Ionicons name="send" size={24} color="#2d572c" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d572c",
    textAlign: "center",
    flex: 1,
  },
  headerRight: {
    width: 40,
  },
  flatListContentContainer: {
    paddingBottom: 80,
  },
  messageBubble: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageTime: {
    fontSize: 12,
    color: "#555",
    textAlign: "right",
  },
  messageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  messageInput: {
    flex: 1,
    color: "#2d572c",
  },
  addIcon: {
    marginRight: 10,
  },
});

export default ConversationScreen;
