/**
 * Code for the delete messages. The user can delete messages by choosing any 
 * messages, or delete all messages by selecting all button.
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
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../../dummy-data/ProfileContext";
import { useMessages } from "../../context/MessagesContext";


// Function component for the delete messages screen
const DeleteMessagesScreen = () => {

  // Consts for theme, get and delete messages, navigation
  const { theme } = useProfile();
  const { messages, deleteMessages } = useMessages();
  const navigation = useNavigation();

  // States to hold selected messages, query search, and control visibility
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);


  // Function to hold user messages selection using the message id.
  const toggleSelectMessage = (id) => {
    setSelectedMessages((prevSelectedMessages) =>
      prevSelectedMessages.includes(id)
        ? prevSelectedMessages.filter((msgId) => msgId !== id)
        : [...prevSelectedMessages, id]
    );
  };

  // function that allows users to select all messages at once.
  const selectAllMessages = () => {
    if (selectedMessages.length === messages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(messages.map((msg) => msg.id));
    }
  };

  // Function to delete selected messages.
  const confirmDeleteMessages = () => {
    deleteMessages(selectedMessages);
    setSelectedMessages([]);
    setIsModalVisible(false);
  };

  // Function to filter messages through the search query
  const filteredMessages = messages.filter((msg) =>
    msg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Return statement for the messages delettion
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("MessagesScreen")} // Back navigation 
          testID="back-button"
        >
          <Ionicons
            name="arrow-back"
            size={30}
            color={theme === "light" ? "#2d572c" : "#fff"}
          />
        </TouchableOpacity>
        <Text style={styles.header} testID="header-text">
          Delete Messages
        </Text>
        {messages.length > 0 && (
          <TouchableOpacity
            style={styles.selectAllButton}
            onPress={selectAllMessages} // Select all messages
            testID="select-all-button"
          >
            {/* Allows the users to select and deselect all messages */}
            <Text style={styles.selectAllText}>
              {selectedMessages.length === messages.length
                ? "Deselect All"
                : "Select All"}
            </Text>
          </TouchableOpacity>
        )}
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
          placeholder="Search"
          placeholderTextColor="#2d572c"
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="search-input"
        />
      </View>
      {/* Messages for empty messages. Otherwise the message results are returned in the screen */}
      {filteredMessages.length === 0 && searchQuery !== "" ? (
        <View style={styles.noMessagesContainer}>
          <Text
            style={[
              styles.noMessagesText,
              { color: theme === "light" ? "#2d572c" : "#fff" },
            ]}
            testID="no-messages-text"
          >
            No results found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.messageContainer}
              onPress={() => toggleSelectMessage(item.id)}
              testID={`message-${`item.id`}`}
            >
              <View style={styles.checkboxContainer}>
                {selectedMessages.includes(item.id) ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#2d572c"
                    testID={`checkmark-${item.id}`}
                  />
                ) : (
                  <Ionicons
                    name="ellipse-outline"
                    size={24}
                    color="#2d572c"
                    testID={`ellipse-${item.id}`}
                  />
                )}
              </View>
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
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
      {filteredMessages.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              styles.cancelButton,
              { opacity: selectedMessages.length ? 1 : 0.5 },
            ]}
            onPress={() => setSelectedMessages([])} // Users selects messages for deletion
            disabled={!selectedMessages.length}
            testID="cancel-button"
          >
            <Text style={styles.footerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.footerButton,
              styles.deleteButton,
              { opacity: selectedMessages.length ? 1 : 0.5 },
            ]}
            onPress={() => setIsModalVisible(true)}
            disabled={!selectedMessages.length}
            testID="delete-button"
          >
            <Text style={styles.footerButtonText}>Delete Messages</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        {/* Pop-up window to confirm if the use would like to delete messages */}
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Delete these messages? You may not be able to recover them again!
            </Text>
            <TouchableOpacity
              style={styles.modalDeleteButton}
              onPress={confirmDeleteMessages}
              testID="confirm-delete-button"
            >
              <Text style={styles.modalButtonText}>Delete Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
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
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2d572c",
  },
  selectAllButton: {
    position: "absolute",
    right: 0,
    borderRadius: 5,
    backgroundColor: "#d9534f",
  },
  selectAllText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    padding: 6,
  },
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
  checkboxContainer: {
    marginRight: 10,
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
  flatListContentContainer: {
    paddingBottom: 80,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#2d572c",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalDeleteButton: {
    backgroundColor: "#2d572c",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
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

export default DeleteMessagesScreen;
