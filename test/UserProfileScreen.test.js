import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { NavigationContainer } from "@react-navigation/native";
import { Alert } from "react-native";

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
const mockNavigate = jest.fn();
const mockSetProfile = jest.fn();

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNavigation.mockReturnValue({
      goBack: mockGoBack,
      navigate: mockNavigate,
    });
    useProfile.mockReturnValue({
      profile: {
        name: "Aline Thomas",
        about: "This is an about test for Aline",
        university: "King's College London",
        degreeTitle: "MSc Medicine",
        dob: "1990-01-01",
        phone: "1234567890",
        profileImage: null,
      },
      setProfile: mockSetProfile,
    });
  });

  it("renders correctly with given profile data", () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <ProfileScreen />
      </NavigationContainer>
    );

    expect(getByText("Aline Thomas")).toBeTruthy();
    expect(getByText("This is an about test for Aline")).toBeTruthy();
    expect(getByText("King's College London")).toBeTruthy();
    expect(getByText("MSc Medicine")).toBeTruthy();
    expect(getByText("1234567890")).toBeTruthy();
    expect(getByTestId("image-picker")).toBeTruthy();
  });

  it("navigates back on back button press", () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <ProfileScreen />
      </NavigationContainer>
    );

    const backButton = getByTestId("back-button");
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalled();
  });



  it("navigates to ViewProfile screen on button press", () => {
    const { getByText } = render(
      <NavigationContainer>
        <ProfileScreen />
      </NavigationContainer>
    );

    const viewProfileButton = getByText("View Profile");
    fireEvent.press(viewProfileButton);

    expect(mockNavigate).toHaveBeenCalledWith("ViewProfile");
  });

  it("logs out on logout button press", () => {
    const mockHandleLogout = jest.fn();
    const { getByText } = render(
      <NavigationContainer>
        <ProfileScreen handleLogout={mockHandleLogout} />
      </NavigationContainer>
    );

    const logoutButton = getByText("LOGOUT");
    fireEvent.press(logoutButton);

    expect(mockHandleLogout).toHaveBeenCalled();
  });

  it("shows delete account alert and deletes account", () => {
    const mockHandleLogout = jest.fn();
    Alert.alert = jest.fn((title, message, buttons) => {
      buttons[1].onPress();
    });

    const { getByText } = render(
      <NavigationContainer>
        <ProfileScreen handleLogout={mockHandleLogout} />
      </NavigationContainer>
    );

    const deleteAccountButton = getByText("DELETE ACCOUNT");
    fireEvent.press(deleteAccountButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      expect.any(Array)
    );
    expect(mockHandleLogout).toHaveBeenCalled();
    expect(mockSetProfile).toHaveBeenCalledWith({
      name: "",
      about: "",
      university: "",
      degreeTitle: "",
      dob: "",
      phone: "",
      profileImage: null,
    });
  });
});
