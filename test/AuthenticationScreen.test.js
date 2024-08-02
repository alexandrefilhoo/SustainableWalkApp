import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthenticationScreen from "../screens/Authentication/AuthenticationScreen";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { Alert } from "react-native";

// Mock useNavigation and useProfile hooks
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

describe("AuthenticationScreen", () => {
  const mockNavigate = jest.fn();
  const mockOnAuthSuccess = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
    useProfile.mockReturnValue({ profile: { email: "test@example.com" } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows error messages if email and password fields are empty", () => {
    const { getByText } = render(
      <AuthenticationScreen onAuthSuccess={mockOnAuthSuccess} />
    );

    fireEvent.press(getByText("Login"));

    expect(getByText("Enter email")).toBeTruthy();
    expect(getByText("Enter password")).toBeTruthy();
  });

  it("calls the method onAuthSuccess only if the email and password are precise", async () => {
    const { getByText, getByPlaceholderText } = render(
      <AuthenticationScreen onAuthSuccess={mockOnAuthSuccess} />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.press(getByText("Login"));

    await waitFor(() => {
      expect(mockOnAuthSuccess).toHaveBeenCalled();
    });
  });


  it("navigates the user to the Registration screen by pressing the Register button", () => {
    const { getByText } = render(
      <AuthenticationScreen onAuthSuccess={mockOnAuthSuccess} />
    );

    fireEvent.press(getByText("Register"));

    expect(mockNavigate).toHaveBeenCalledWith("Registration");
  });

  it("navigates the user to the Forgot Password screen by pressing Forgot Password button", () => {
    const { getByText } = render(
      <AuthenticationScreen onAuthSuccess={mockOnAuthSuccess} />
    );

    fireEvent.press(getByText("Forgot password ?"));

    expect(mockNavigate).toHaveBeenCalledWith("ForgotPassword");
  });

  it("renders correctly", () => {
    const tree = renderer.create(<AuthenticationScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
