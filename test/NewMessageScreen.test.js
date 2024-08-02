import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import NewMessageScreen from "../screens/Messages/NewMessageScreen";
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

describe("NewMessageScreen", () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
    useMessages.mockReturnValue({ addMessage: mockAddMessage });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the NewMessageScreen correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NewMessageScreen route={{ params: {} }} />
    );

    expect(getByText("New Message")).toBeTruthy();
    expect(getByText("To: Select from contacts")).toBeTruthy();
    expect(getByPlaceholderText("Type message here")).toBeTruthy();
  });

  it("navigates to Contacts screen on select contacts button press", () => {
    const { getByTestId } = render(<NewMessageScreen route={{ params: {} }} />);

    fireEvent.press(getByTestId("select-contacts-button"));
    expect(mockNavigate).toHaveBeenCalledWith("Contacts", {
      setSelectedContact: expect.any(Function),
    });
  });

  it("updates message input and sends a message", () => {
    const selectedContact = {
      name: "John Doe",
      image: { uri: "https://via.placeholder.com/150" },
    };
    const { getByPlaceholderText, getByTestId } = render(
      <NewMessageScreen route={{ params: { selectedContact } }} />
    );

    fireEvent.changeText(
      getByPlaceholderText("Type message here"),
      "Hello, John!"
    );
    fireEvent.press(getByTestId("send-button"));

    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        message: "Hello, John!",
        image: selectedContact.image,
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith("ConversationScreen", {
      contact: "John Doe",
    });
  });

  it("disables message input when no contact is selected", () => {
    const { getByPlaceholderText } = render(
      <NewMessageScreen route={{ params: {} }} />
    );
    const messageInput = getByPlaceholderText("Type message here");

    expect(messageInput.props.editable).toBe(false);
  });
});
