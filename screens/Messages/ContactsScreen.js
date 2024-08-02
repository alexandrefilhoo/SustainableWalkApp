/**
 * Code for the contacts screen. This screen appears only when the user would like to send a message
 * to a specfic contact. The list can be found when the user click the create message button.
 */
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import dummyMessages from "../../dummy-data/MessagesContext";

// Function component to create the contacts list
const ContactsScreen = ({ route }) => {

  // Consts to extract the the selected contacts, navigation, and states to store the contact ID search query
  const { setSelectedContact } = route.params;
  const navigation = useNavigation();
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter contact based on user query
  const filteredContacts = dummyMessages.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle contact selection
  const selectContact = (contact) => {
    setSelectedContactId(contact.id); // Set contact ID
    setSelectedContact(contact); // Set contact
    navigation.goBack();// navigate back 
  };

  // Return statement to output the contact list
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}  // Navigates back
          testID="back-button"
        >
          <Ionicons name="arrow-back" size={30} color="#2d572c" />
        </TouchableOpacity>
        <Text style={styles.header}>Contacts</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#ccc"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="search-input"
        />
      </View>
      {/* Messages to display if the user has no contacts */}
      {filteredContacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No contacts found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id} // Extract the key for each contact
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.contactContainer,
                item.id === selectedContactId && styles.selectedContact,
              ]}
              onPress={() => selectContact(item)}
              testID={`contact-item-${item.id}`}
            >
              <Image source={item.image} style={styles.profileImage} />
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactDetails}>{item.degree}</Text>
                <Text style={styles.contactDetails}>{item.university}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
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
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedContact: {
    backgroundColor: "#c8e6c9",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2d572c",
  },
  contactDetails: {
    fontSize: 14,
    color: "#2d572c",
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noContactsText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    color: "#2d572c",
  },
});

export default ContactsScreen;
