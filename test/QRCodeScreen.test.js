import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import QRCodeScreen from "../screens/Home/Rewards/QRCodeScreen";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("QRCodeScreen", () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });
  });

  it("renders the QR code screen correctly", () => {
    const { getByText } = render(<QRCodeScreen />);

    expect(getByText("Reward QR code")).toBeTruthy();
    expect(getByText("Alexandro Filho")).toBeTruthy();
    expect(getByText("King's College London")).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<QRCodeScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("generates a new digit code when the generate button is pressed", () => {
    const { getByText } = render(<QRCodeScreen />);
    const initialCode = getByText(/^[A-Z0-9]+$/).props.children;

    act(() => {
      fireEvent.press(getByText("Generate Code"));
    });

    const newCode = getByText(/^[A-Z0-9]+$/).props.children;
    expect(newCode).not.toBe(initialCode);
  });
});
