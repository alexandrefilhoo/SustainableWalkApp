import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TipDetailScreen from "../screens/Home/Tips/TipDetailScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { tipsData } from "../dummy-data/tipsData";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

describe("TipDetailScreen", () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
      goBack: mockGoBack,
    });

    useRoute.mockReturnValue({
      params: { tip: tipsData[0] },
    });
  });

  it("renders the tip details correctly", () => {
    const { getByText } = render(<TipDetailScreen />);
    expect(getByText(tipsData[0].title)).toBeTruthy();
    expect(getByText(tipsData[0].details)).toBeTruthy();
    tipsData[0].tags.forEach((tag) => {
      expect(getByText(tag)).toBeTruthy();
    });
  });

  it("navigates back when the back button is pressed", () => {
    const { getByTestId } = render(<TipDetailScreen />);
    fireEvent.press(getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("navigates to the next tip when the next button is pressed", () => {
    const { getByText } = render(<TipDetailScreen />);
    const nextTip = tipsData[1];
    fireEvent.press(getByText("Next Tip"));
    expect(mockNavigate).toHaveBeenCalledWith("TipDetail", { tip: nextTip });
  });

  it("navigates to the previous tip when the previous button is pressed", () => {
    useRoute.mockReturnValue({
      params: { tip: tipsData[1] },
    });

    const { getByText } = render(<TipDetailScreen />);
    const prevTip = tipsData[0];
    fireEvent.press(getByText("Previous Tip"));
    expect(mockNavigate).toHaveBeenCalledWith("TipDetail", { tip: prevTip });
  });
});
