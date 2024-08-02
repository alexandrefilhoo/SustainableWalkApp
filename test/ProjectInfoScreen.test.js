import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProjectInfoScreen from "../screens/Profile/ProjectInfo";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useNavigation: jest.fn(),
}));

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

const mockGoBack = jest.fn();

describe("ProjectInfoScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });
    useProfile.mockReturnValue({
      theme: "light",
    });
  });

  it("renders correctly with given profile data", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ProjectInfoScreen />
      </NavigationContainer>
    );

    expect(getByText("About the Project")).toBeTruthy();
    expect(getByText("Project Title")).toBeTruthy();
    expect(getByText("Sustainability in Higher Education")).toBeTruthy();
    expect(getByText("Alexandro Filho")).toBeTruthy();
    expect(getByText("Student")).toBeTruthy();
    expect(getByText("Leonardo Magela")).toBeTruthy();
    expect(getByText("Supervisor")).toBeTruthy();
    expect(getByText("Copyright © 2024 Alexandro Filho")).toBeTruthy();
    expect(getByTestId("back-button")).toBeTruthy();
  });

  it("navigates back on back button press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ProjectInfoScreen />
      </NavigationContainer>
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it("renders the logo image correctly", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ProjectInfoScreen />
      </NavigationContainer>
    );

    const logo = getByTestId("logo-image");
    expect(logo.props.source).toEqual(
      require("../images/King's_College_London_logo.png")
    );
  });

  it("renders the profile images correctly", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ProjectInfoScreen />
      </NavigationContainer>
    );

    const alexImage = getByTestId("alex-image");
    const leonardoImage = getByTestId("leonardo-image");
    expect(alexImage.props.source).toEqual(require("../images/Alex.jpeg"));
    expect(leonardoImage.props.source).toEqual(
      require("../images/leonardo.jpeg")
    );
  });
});
