import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import RewardsScreen from "../screens/Home/Rewards/RewardsMainScreen";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("RewardsScreen", () => {
  const mockGoBack = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
  });

  it("renders the rewards screen correctly", () => {
    const { getByText } = render(<RewardsScreen />);

    expect(getByText("Rewards")).toBeTruthy();
    expect(getByText("Current Reward Target")).toBeTruthy();
    expect(getByText("15 % off public Transport")).toBeTruthy();
    expect(getByText("Reward Stars")).toBeTruthy();
    expect(getByText("175 ★")).toBeTruthy();
    expect(getByText("Goal: 20 km")).toBeTruthy();
    expect(getByText("17.5 km")).toBeTruthy();
    expect(getByText("Next Reward")).toBeTruthy();
    expect(getByText("20% off HP")).toBeTruthy();
    expect(getByText("Currently Unavailable")).toBeTruthy();
    expect(
      getByText("Complete your current reward to unlock this reward.")
    ).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<RewardsScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("navigates to QRCodeScreen when the redeem button is pressed", () => {
    const { getByText } = render(<RewardsScreen />);
    fireEvent.press(getByText("Redeem"));
    expect(mockNavigate).toHaveBeenCalledWith("QRCodeScreen");
  });
});
