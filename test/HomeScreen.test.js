import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("HomeScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({ navigate: mockNavigate });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders welcome greeting", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Welcome👋")).toBeTruthy();
  });

  it("renders the Discover walking paths card", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Discover walking paths")).toBeTruthy();
  });

  it("navigates to WalkingPathsScreen on card press", () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Discover walking paths"));
    expect(mockNavigate).toHaveBeenCalledWith("WalkingPathsScreen");
  });

  it("renders the Tips to promote Sustainability card", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Tips to promote Sustainability")).toBeTruthy();
  });

  it("navigates to TipsScreen on card press", () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Tips to promote Sustainability"));
    expect(mockNavigate).toHaveBeenCalledWith("TipsScreen");
  });

  it("renders the Your Rewards card", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Your Rewards")).toBeTruthy();
  });

  it("navigates to RewardsScreen on card press", () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Your Rewards"));
    expect(mockNavigate).toHaveBeenCalledWith("RewardsScreen");
  });
});
