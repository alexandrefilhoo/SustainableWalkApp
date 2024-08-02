import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";

import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("ForgotPasswordScreen", () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows error messages for empty email field" , () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "");
    fireEvent.changeText(
      getByPlaceholderText("Confirm Email"),
      "test@example.com"
    );
    fireEvent.press(getByText("Reset Password"));

    expect(getByText("Enter email")).toBeTruthy();
  });

  it("displays error messages for unmatched emails", () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Confirm Email"),
      "different@example.com"
    );
    fireEvent.press(getByText("Reset Password"));

    expect(getByText("Emails do not match")).toBeTruthy();
  });

  it("navigates to ResetPassword screen with correct email", async () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen />
    );

    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Confirm Email"),
      "test@example.com"
    );
    fireEvent.press(getByText("Reset Password"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("ResetPassword", {
        email: "test@example.com",
      });
    });
  });

  it("goes back to the previous screen on pressing Login", () => {
    const { getByText } = render(<ForgotPasswordScreen />);

    fireEvent.press(getByText("Login"));

    expect(mockGoBack).toHaveBeenCalled();
  });

});
