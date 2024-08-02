import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import WalkingPathsScreen from "../screens/Home/DiscoverWalkingPaths/WalkingPathMainScreen";
import { useNavigation } from "@react-navigation/native";
import walkingPaths from "../dummy-data/walkingPathsData";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("WalkingPathsScreen", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header and search bar", () => {
    const { getByPlaceholderText, getByText } = render(<WalkingPathsScreen />);
    expect(getByText("Walking Paths")).toBeTruthy();
    expect(getByPlaceholderText("Search walking paths")).toBeTruthy();
  });



  it("filters walking paths based on search query", async () => {
    const { getByPlaceholderText, getByText } = render(<WalkingPathsScreen />);
    fireEvent.changeText(
      getByPlaceholderText("Search walking paths"),
      "Covent Garden Wander"
    );
    await waitFor(() => {
      expect(getByText("Covent Garden Wander")).toBeTruthy();
    });
  });



  it("applies filters and shows the filtered results", async () => {
    const { getByText, getByTestId } = render(<WalkingPathsScreen />);
    fireEvent.press(getByTestId("filter-icon"));
    fireEvent.press(getByText("Easy"));
    fireEvent.press(getByText("See paths"));
    await waitFor(() => {
      expect(getByText("Covent Garden Circular")).toBeTruthy();
    });
  });

  it("clears filters and shows all results", async () => {
    const { getByText, getByTestId } = render(<WalkingPathsScreen />);
    fireEvent.press(getByTestId("filter-icon"));
    fireEvent.press(getByText("Clear"));
    await waitFor(() => {
      expect(getByText("Covent Garden Wander")).toBeTruthy();
    });
  });
});
