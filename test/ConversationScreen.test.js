// test/ConversationScreen.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ConversationScreen from "../screens/Messages/ConversationScreen";
import { useNavigation } from "@react-navigation/native";
import { useMessages } from "../context/MessagesContext";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../context/MessagesContext", () => ({
  useMessages: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockAddMessage = jest.fn();

useNavigation.mockReturnValue({
  navigate: mockNavigate,
  goBack: mockGoBack,
});

const messages = [
  {
    id: "1",
    name: "Alex Smith",
    message: "Hello, Alex!",
    time: "10:00 AM",
    image: require("../images/person-6.jpeg"),
  },
];

useMessages.mockReturnValue({
  messages,
  addMessage: mockAddMessage,
});

describe("ConversationScreen", () => {
  it("renders the ConversationScreen correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <ConversationScreen route={{ params: { contact: "Alex Smith" } }} />
    );

    expect(getByText("Alex Smith")).toBeTruthy();
    expect(getByText("Hello, Alex!")).toBeTruthy();
    expect(getByPlaceholderText("Type message here")).toBeTruthy();
  });

  it("navigates back on back button press", () => {
    const { getByTestId } = render(
      <ConversationScreen route={{ params: { contact: "Alex Smith" } }} />
    );

    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("updates message input and sends a message", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <ConversationScreen route={{ params: { contact: "Alex Smith" } }} />
    );

    const messageInput = getByPlaceholderText("Type message here");

    fireEvent.changeText(messageInput, "New message");
    expect(messageInput.props.value).toBe("New message");

    fireEvent.press(getByTestId("send-button"));
    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Alex Smith",
        message: "New message",
      })
    );
  });
});
