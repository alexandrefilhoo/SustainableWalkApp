import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
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

jest.mock("expo-image-picker", () => ({
  launchImageLibraryAsync: jest.fn(),
  MediaTypeOptions: {
    All: "All",
  },
}));

const mockGoBack = jest.fn();
const mockUpdateProfile = jest.fn();

describe("EditProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
    });
    useProfile.mockReturnValue({
      profile: {
        name: "Aline Thomas",
        email: "aline@example.com",
        degree: "MSc Medicine",
        university: "King's College London",
        dateOfBirth: "1990-01-01",
        phoneNumber: "1234567890",
        profileImage: null,
      },
      updateProfile: mockUpdateProfile,
    });
  });

  it("renders correctly with given profile data", () => {
    const { getByText, getByDisplayValue, getByTestId } = render(
      <NavigationContainer>
        <EditProfileScreen />
      </NavigationContainer>
    );

    expect(getByDisplayValue("Aline Thomas")).toBeTruthy();
    expect(getByDisplayValue("aline@example.com")).toBeTruthy();
    expect(getByDisplayValue("MSc Medicine")).toBeTruthy();
    expect(getByDisplayValue("King's College London")).toBeTruthy();
    expect(getByDisplayValue("1990-01-01")).toBeTruthy();
    expect(getByDisplayValue("1234567890")).toBeTruthy();
    expect(getByTestId("image-picker")).toBeTruthy();
  });

  it("updates form data on input change", () => {
    const { getByDisplayValue } = render(
      <NavigationContainer>
        <EditProfileScreen />
      </NavigationContainer>
    );

    const nameInput = getByDisplayValue("Aline Thomas");
    fireEvent.changeText(nameInput, "Clarisse Alves");

    expect(nameInput.props.value).toBe("Clarisse Alves");
  });

  it("saves the profile and navigates back on save button press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <EditProfileScreen />
      </NavigationContainer>
    );

    const saveButton = getByText("Save");
    fireEvent.press(saveButton);

    expect(mockUpdateProfile).toHaveBeenCalledWith({
      name: "Aline Thomas",
      email: "aline@example.com",
      degree: "MSc Medicine",
      university: "King's College London",
      dateOfBirth: "1990-01-01",
      phoneNumber: "1234567890",
      profileImage: null,
    });
    expect(mockGoBack).toHaveBeenCalled();
  });

  it("navigates back on back button press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <EditProfileScreen />
      </NavigationContainer>
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });
});
