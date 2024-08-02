/**
 * Code for the new messages. This screen the user can start a new chat from the contacts list.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useMessages } from "../../context/MessagesContext"; 

// Function component for the new message screen along with route parameter
const NewMessageScreen = ({ route }) => {

  // Consts for the navigation, add messages, retrieve the messages, retrieve the selected contact
  const navigation = useNavigation();
  const { addMessage } = useMessages(); 

  //State to manage the input messages
  const [message, setMessage] = useState("");
  // State that manages the user's selected contact
  const [selectedContact, setSelectedContact] = useState(
    route.params?.selectedContact || null
  );

  // State to hold local messages
  const [messages, setMessages] = useState([]); 

  // Function that allows the users to send messages
  const sendMessage = () => {

    // Message validation
    if (selectedContact && message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        name: selectedContact.name,
        message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        image: selectedContact.image,
      };
      addMessage(newMessage); // Message is added to the messages list
      setMessages([...messages, newMessage]); // Add message to local state
      setMessage(""); // Clear the input field
      navigation.navigate("ConversationScreen", {
        contact: selectedContact.name,
      }); // Navigate to  the converstation screen
    }
  };

  // Return statement for the new message screen
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
        <Text style={styles.header}>New Message</Text>
        <View style={styles.headerRight} />
      </View>
      <TouchableOpacity
        style={styles.selectContactsButton}
        onPress={() => navigation.navigate("Contacts", { setSelectedContact })}
        testID="select-contacts-button"
      >
        <Text style={styles.selectContactsText}>
          To: {selectedContact ? selectedContact.name : "Select from contacts"}
        </Text>
        <Ionicons name="add" size={20} color="#2d572c" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.flexGrow}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.messageInputContainer}>
        <Ionicons name="add" size={24} color="#2d572c" style={styles.addIcon} />
        <TextInput
          style={styles.messageInput}
          placeholder="Type message here"
          value={message}
          onChangeText={setMessage}
          editable={!!selectedContact}
          testID="message-input"
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
  selectContactsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  selectContactsText: {
    flex: 1,
    fontSize: 16,
    color: "#2d572c",
  },
  flexGrow: {
    flexGrow: 1,
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
});

export default NewMessageScreen;
