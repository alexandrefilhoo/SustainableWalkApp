import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ForgotPasswordConfirmationScreen from "../screens/Authentication/ForgotPasswordConfirmationScreen";
import { useNavigation } from "@react-navigation/native";


jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("ForgotPasswordConfirmationScreen", () => {
  const mockNavigate = jest.fn();
  const route = { params: { email: "test@example.com" } };

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows the correct message", () => {
    const { getByText } = render(
      <ForgotPasswordConfirmationScreen route={route} />
    );
    expect(
      getByText(
        /If an account is registered, an email will be sent to test@example.com. Use the link provided in the email to reset your password/i
      )
    ).toBeTruthy();
  });

  it("navigates to Authentication screen on button press", () => {
    const { getByText } = render(
      <ForgotPasswordConfirmationScreen route={route} />
    );
    const button = getByText("Return to Login Page");
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith("Authentication");
  });

});
