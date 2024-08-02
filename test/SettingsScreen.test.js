import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SettingsScreen from "../screens/Profile/SettingsScreen";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: jest.fn(),
  };
});

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();
const mockSetTheme = jest.fn();

describe("SettingsScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
    useProfile.mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
    });
  });

  it("renders correctly with given settings data", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    );

    expect(getByText("Settings")).toBeTruthy();
    expect(getByText("Display")).toBeTruthy();
    expect(getByText("Notifications")).toBeTruthy();
    expect(getByText("Share Location")).toBeTruthy();
    expect(getByText("About")).toBeTruthy();
    expect(getByText("Copyright © 2024 Alexandro Filho")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
  });

  it("navigates back on back button press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it("navigates to ProjectInfo screen on About button press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <SettingsScreen />
      </NavigationContainer>
    );

    const aboutButton = getByText("About");
    fireEvent.press(aboutButton);

    expect(mockNavigate).toHaveBeenCalledWith("ProjectInfo");
  });
});
