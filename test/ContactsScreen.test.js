import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ContactsScreen from "../screens/Messages/ContactsScreen";
import { NavigationContainer } from "@react-navigation/native";

const mockNavigate = jest.fn();
const mockSetSelectedContact = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockNavigate,
    }),
  };
});

const dummyMessages = [
  {
    id: "1",
    name: "Aline Thomas",
    degree: "MSc Medicine",
    university: "King's College London",
    image: require("../images/person-14.webp"),
    time: "",
    message: "",
  },
  {
    id: "2",
    name: "Clarisse Alves",
    degree: "MSc Biomedicine",
    university: "Imperial College London",
    image: require("../images/person-2.jpg"),
    time: "",
    message: "",
  },
];

describe("ContactsScreen", () => {
  it("renders the ContactsScreen correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );

    expect(getByText("Contacts")).toBeTruthy();
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("displays no contacts found message when search query does not match any contact", () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, "xyz");

    expect(getByText("No contacts found.")).toBeTruthy();
  });

  it("filters and displays contacts based on search query", () => {
    const { getByPlaceholderText, getByText } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, "Aline");

    expect(getByText("Aline Thomas")).toBeTruthy();
    expect(() => getByText("Clarisse Alves")).toThrow();
  });

  it("selects a contact and navigates back", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );
    fireEvent.press(getByText("Aline Thomas"));

    expect(mockSetSelectedContact).toHaveBeenCalledWith(dummyMessages[0]);
    expect(mockNavigate).toHaveBeenCalled();
  });
  
  it("navigates back to previous screen on back button press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );

    fireEvent.press(getByTestId("back-button"));

    expect(mockNavigate).toHaveBeenCalled();
  });


  it("renders the correct number of contacts", () => {
    const { getAllByTestId } = render(
      <NavigationContainer>
        <ContactsScreen
          route={{ params: { setSelectedContact: mockSetSelectedContact } }}
        />
      </NavigationContainer>
    );

    const contacts = getAllByTestId(/contact-item-1/);
    expect(contacts.length).toBe(dummyMessages.length);
  });
});
