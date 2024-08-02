// test/ViewProfileScreen.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ViewProfileScreen from "../screens/Profile/ViewProfileScreen";
import { useProfile } from "../dummy-data/ProfileContext";
import { NavigationContainer } from "@react-navigation/native";

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  };
});

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

describe("ViewProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with given profile data", () => {
    useProfile.mockReturnValue({
      theme: "light",
      profile: {
        name: "Aline Thomas",
        email: "aline@example.com",
        about: "This is an about test for Aline",
        university: "King's College London",
        degree: "MSc Medicine",
        dateOfBirth: "1990-01-01",
        phoneNumber: "1234567890",
        profileImage: "../images/person-14.webp",
      },
    });

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ViewProfileScreen />
      </NavigationContainer>
    );

    expect(getByText("Aline Thomas")).toBeTruthy();
    expect(getByText("Email")).toBeTruthy();
    expect(getByText("aline@example.com")).toBeTruthy();
    expect(getByText("About")).toBeTruthy();
    expect(getByText("This is an about test for Aline")).toBeTruthy();
    expect(getByText("University")).toBeTruthy();
    expect(getByText("King's College London")).toBeTruthy();
    expect(getByText("Degree Title")).toBeTruthy();
    expect(getByText("MSc Medicine")).toBeTruthy();
    expect(getByText("Date of Birth")).toBeTruthy();
    expect(getByText("1990-01-01")).toBeTruthy();
    expect(getByText("Phone Number")).toBeTruthy();
    expect(getByText("1234567890")).toBeTruthy();
    expect(getByTestId("profile-image")).toBeTruthy();
  });

  it("navigates back on back button press", () => {
    useProfile.mockReturnValue({
      theme: "light",
      profile: {
        name: "Aline Thomas",
        email: "aline@example.com",
        about: "This is an about test for Aline",
        university: "King's College London",
        degree: "MSc Medicine",
        dateOfBirth: "1990-01-01",
        phoneNumber: "1234567890",
        profileImage: "../images/person-14.webp",
      },
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <ViewProfileScreen />
      </NavigationContainer>
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });

  it("displays placeholder when no profile image is provided", () => {
    useProfile.mockReturnValue({
      theme: "light",
      profile: {
        name: "Aline Thomas",
        email: "aline@example.com",
        about: "This is an about test for Aline",
        university: "King's College London",
        degree: "MSc Medicine",
        dateOfBirth: "1990-01-01",
        phoneNumber: "1234567890",
        profileImage: "",
      },
    });

    const { getByTestId } = render(
      <NavigationContainer>
        <ViewProfileScreen />
      </NavigationContainer>
    );

    const placeholder = getByTestId("image-placeholder");
    expect(placeholder).toBeTruthy();
  });
});
