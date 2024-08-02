import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TipsScreen from "../screens/Home/Tips/TipsScreen";
import { useNavigation } from "@react-navigation/native";
import { tipsData } from "../dummy-data/tipsData";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("TipsScreen", () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });
  });

  it("renders the header and categories correctly", () => {
    const { getByText } = render(<TipsScreen />);
    expect(getByText("Tips")).toBeTruthy();
    expect(getByText("Tips for Sustainable Transportation")).toBeTruthy();
    expect(getByText("Tips for Encouraging Walking")).toBeTruthy();
    expect(getByText("General Tips")).toBeTruthy();
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<TipsScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("renders tips under each category correctly", () => {
    const { getByText } = render(<TipsScreen />);
    tipsData.forEach((tip) => {
      expect(getByText(tip.title)).toBeTruthy();
    });
  });

  it("navigates to TipDetail when a tip is pressed", () => {
    const { getByText } = render(<TipsScreen />);
    const tip = tipsData[0];
    fireEvent.press(getByText(tip.title));
    expect(mockNavigate).toHaveBeenCalledWith("TipDetail", { tip });
  });
});
