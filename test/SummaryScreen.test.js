import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SummaryScreen from "../screens/Home/DiscoverWalkingPaths/SummaryScreen";
import { useNavigation, useRoute } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe("SummaryScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    useRoute.mockReturnValue({
      params: { distance: 5, time: 3600 }, // Example values for distance and time
    });
  });

  it("renders the summary screen correctly", () => {
    const { getByText } = render(<SummaryScreen />);
    expect(getByText("Activity Summary")).toBeTruthy();
    expect(getByText("Total Distance: 5.00 Km")).toBeTruthy();
    expect(getByText("Total Time: 01:00:00")).toBeTruthy();
    expect(getByText("Calories: 550.00 kcal")).toBeTruthy(); // Updated expected value
    expect(getByText("Steps: 6500")).toBeTruthy();
    expect(getByText("Points: 50")).toBeTruthy();
  });

  it("calculates and displays the correct values", () => {
    const { getByText } = render(<SummaryScreen />);
    expect(getByText("Calories: 550.00 kcal")).toBeTruthy(); // Updated expected value
    expect(getByText("Steps: 6500")).toBeTruthy();
    expect(getByText("Points: 50")).toBeTruthy();
  });

  it("navigates back to WalkingPathsScreen when the close button is pressed", () => {
    const { getByTestId } = render(<SummaryScreen />);
    fireEvent.press(getByTestId("close-button"));
    expect(mockNavigate).toHaveBeenCalledWith("WalkingPathsScreen");
  });
});
