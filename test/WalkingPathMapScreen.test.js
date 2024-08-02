import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import WalkingPathMapScreen from "../screens/Home/DiscoverWalkingPaths/WalkingPathMapScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getTrailCoordinates } from "../api/mockAllTrailsApi";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock("../api/mockAllTrailsApi", () => ({
  getTrailCoordinates: jest.fn(),
}));

describe("WalkingPathMapScreen", () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });

    useRoute.mockReturnValue({
      params: { pathId: "1" },
    });

    getTrailCoordinates.mockResolvedValue([
      { latitude: 51.5074, longitude: -0.1278 },
      { latitude: 51.5075, longitude: -0.1279 },
    ]);
  });

  it("renders the map and initial elements correctly", async () => {
    const { getByTestId, getByText } = render(<WalkingPathMapScreen />);
    expect(getByTestId("map")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
    expect(getByText("Time")).toBeTruthy();
    expect(getByText("Distance")).toBeTruthy();
    expect(getByText("Start")).toBeTruthy();
  });

  it("starts tracking when the start button is pressed", async () => {
    const { getByText } = render(<WalkingPathMapScreen />);
    const startButton = getByText("Start");
    fireEvent.press(startButton);
    expect(getByText("Pause")).toBeTruthy();
    expect(getByText("Finish")).toBeTruthy();
  });

  it("pauses and resumes tracking correctly", async () => {
    const { getByText } = render(<WalkingPathMapScreen />);
    fireEvent.press(getByText("Start"));
    const pauseButton = getByText("Pause");
    fireEvent.press(pauseButton);
    expect(getByText("Resume")).toBeTruthy();
    fireEvent.press(getByText("Resume"));
    expect(getByText("Pause")).toBeTruthy();
  });

  it("finishes tracking and shows the finish modal", async () => {
    const { getByText } = render(<WalkingPathMapScreen />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Finish"));
    expect(getByText("Finished your activity?")).toBeTruthy();
    expect(getByText("Yes, I'm finished")).toBeTruthy();
  });

  it("confirms finish and navigates to summary screen", async () => {
    const { getByText } = render(<WalkingPathMapScreen />);
    fireEvent.press(getByText("Start"));
    fireEvent.press(getByText("Finish"));
    fireEvent.press(getByText("Yes, I'm finished"));
    expect(mockNavigate).toHaveBeenCalledWith("SummaryScreen", {
      distance: 0,
      time: expect.any(Number),
    });
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<WalkingPathMapScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });
});
