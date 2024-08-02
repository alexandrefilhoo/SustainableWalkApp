import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MessagesScreen from "../screens/Messages/MessagesMainScreen";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { useMessages } from "../context/MessagesContext";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

jest.mock("../context/MessagesContext", () => ({
  useMessages: jest.fn(),
}));

const mockNavigate = jest.fn();

describe("MessagesScreen", () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useProfile.mockReturnValue({ theme: "light" });
    useMessages.mockReturnValue({
      messages: [
        {
          id: "1",
          name: "Alex Smith",
          message: "Hello my friend!",
          time: "11:00 AM",
          image: { uri: "../images/person-6.jpeg" },
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the MessagesScreen correctly", () => {
    const { getByText, getByPlaceholderText } = render(<MessagesScreen />);

    expect(getByText("Messages")).toBeTruthy();
    expect(getByPlaceholderText("Search")).toBeTruthy();
    expect(getByText("Alex Smith")).toBeTruthy();
    expect(getByText("Hello my friend!")).toBeTruthy();
    expect(getByText("11:00 AM")).toBeTruthy();
  });

  it("navigates to ConversationScreen on message press", () => {
    const { getByText } = render(<MessagesScreen />);

    fireEvent.press(getByText("Alex Smith"));
    expect(mockNavigate).toHaveBeenCalledWith("ConversationScreen", {
      contact: "Alex Smith",
    });
  });

  it("navigates to Home on back button press", () => {
    const { getByTestId } = render(<MessagesScreen />);

    fireEvent.press(getByTestId("back-button"));
    expect(mockNavigate).toHaveBeenCalledWith("Home");
  });

  it("filters messages based on search query", () => {
    const { getByPlaceholderText, queryByText } = render(<MessagesScreen />);

    const searchInput = getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, "Jane");
    expect(queryByText("Alex Smith")).toBeNull();
  });

  it("shows no messages found message when no messages match search query", () => {
    const { getByPlaceholderText, getByText } = render(<MessagesScreen />);

    const searchInput = getByPlaceholderText("Search");
    fireEvent.changeText(searchInput, "Jane");
    expect(getByText("No results found.")).toBeTruthy();
  });
});
