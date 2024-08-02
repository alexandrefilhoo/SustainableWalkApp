import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DeleteMessagesScreen from "../screens/Messages/DeleteMessagesScreen";
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

describe("DeleteMessagesScreen", () => {
  const mockNavigate = jest.fn();
  const mockDeleteMessages = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useProfile.mockReturnValue({ theme: "light" });
    useMessages.mockReturnValue({
      messages: [
        {
          id: "1",
          name: "Alex Smith",
          message: "Hello!",
          time: "10:00 AM",
          image: require("../images/person-6.jpeg"),
        },
        {
          id: "2",
          name: "Jane Smith",
          message: "Hi there!",
          time: "10:05 AM",
          image: require("../images/person-20.jpeg"),
        },
      ],
      deleteMessages: mockDeleteMessages,
    });
  });

  it("renders the DeleteMessagesScreen correctly", () => {
    const { getByText } = render(<DeleteMessagesScreen />);
  });

  it("navigates back to MessagesScreen on back button press", () => {
    const { getByTestId } = render(<DeleteMessagesScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockNavigate).toHaveBeenCalledWith("MessagesScreen");
  });

  it("selects and deselects messages", () => {
    const { getByText, getByTestId } = render(<DeleteMessagesScreen />);
    fireEvent.press(getByText("Hello!"));
    expect(getByTestId("checkmark-1")).toBeTruthy();
    fireEvent.press(getByText("Hello!"));
    expect(getByTestId("ellipse-1")).toBeTruthy();
  });

  it("deletes selected messages", () => {
    const { getByText, getByTestId } = render(<DeleteMessagesScreen />);
    fireEvent.press(getByText("Hello!"));
    fireEvent.press(getByTestId("delete-button"));
  });

  it("filters messages based on search query", () => {
    const { getByPlaceholderText, queryByText } = render(
      <DeleteMessagesScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Search"), "Jane");
    expect(queryByText("Hello!")).toBeNull();
    expect(queryByText("Hi there!")).toBeTruthy();
  });
});
