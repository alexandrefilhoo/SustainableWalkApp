import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import PathDetailsScreen from "../screens/Home/DiscoverWalkingPaths/PathDetailsScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import walkingPaths from "../dummy-data/walkingPathsData";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe("PathDetailsScreen", () => {
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
  });

  it("renders the header and back button", () => {
    const { getByText, getByTestId } = render(<PathDetailsScreen />);
    expect(getByText("Path Details")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
  });

  it("renders the path details correctly", () => {
    const { getByText, getByTestId } = render(<PathDetailsScreen />);
    const path = walkingPaths.find((p) => p.id === "1");
    expect(getByText(path.title)).toBeTruthy();
    expect(getByText(path.difficulty)).toBeTruthy();
    expect(getByText(`• ${path.distance}`)).toBeTruthy();
    expect(getByText(`• ${path.duration}`)).toBeTruthy();
    expect(getByText(path.description)).toBeTruthy();
    expect(getByTestId("pager-view")).toBeTruthy();
    expect(getByTestId("map-image")).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<PathDetailsScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("navigates to WalkingPathMapScreen when 'Go to the path' button is pressed", () => {
    const { getByText } = render(<PathDetailsScreen />);
    fireEvent.press(getByText("Go to the path"));
    expect(mockNavigate).toHaveBeenCalledWith("WalkingPathMapScreen", {
      pathId: "1",
    });
  });
});