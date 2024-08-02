// App tests
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import App from "../App";
import { useFonts } from "expo-font";

// Simulate expo-font for beaviour of useFonts
jest.mock("expo-font", () => ({
  useFonts: jest.fn(),
}));

// Simulate expo-app-loading to return a simple string
jest.mock("expo-app-loading", () => "AppLoading");

// Simulate @react-navigation/native for navigation behaviour control
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
  NavigationContainer: ({ children }) => children,
}));

// Simulate @react-navigation/bottom-tabs for navigation behaviour
jest.mock("@react-navigation/bottom-tabs", () => {
  return {
    createBottomTabNavigator: jest.fn().mockImplementation(() => {
      return {
        Navigator: ({ children }) => <>{children}</>,
        Screen: ({ children }) => <>{children}</>,
      };
    }),
  };
});

// Simulate @react-navigation/native-stack for navigation behaviour
jest.mock("@react-navigation/native-stack", () => {
  return {
    createNativeStackNavigator: jest.fn().mockImplementation(() => {
      return {
        Navigator: ({ children }) => <>{children}</>,
        Screen: ({ children }) => <>{children}</>,
      };
    }),
  };
});

// Simulate all screens to avoid rendering the actual components
jest.mock(
  "../screens/Authentication/AuthenticationScreen",
  () => "AuthenticationScreen"
);
jest.mock(
  "../screens/Authentication/ForgotPasswordScreen",
  () => "ForgotPasswordScreen"
);
jest.mock(
  "../screens/Authentication/ForgotPasswordConfirmationScreen",
  () => "ForgotPasswordConfirmationScreen"
);
jest.mock(
  "../screens/Authentication/RegistrationScreen",
  () => "RegistrationScreen"
);
jest.mock("../screens/Home/HomeScreen", () => "HomeScreen");
jest.mock("../screens/Messages/MessagesMainScreen", () => "MessagesScreen");
jest.mock("../screens/Profile/ProfileScreen", () => "ProfileScreen");

// Fonts are loaded before each test
describe("App", () => {
  beforeEach(() => {
    useFonts.mockReturnValue([true]);
  });

  // Tests for fonts not being loaded and check if appLoading is rendered.
  it("renders loading screen if fonts are not loaded", () => {
    useFonts.mockReturnValue([false]);
    const { getByTestId } = render(<App />);
    expect(getByTestId("AppLoading")).toBeTruthy();
  });

  // Tests the  authentication screen when user is not logged in
  it("renders authentication screen if user is not logged in", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("AuthenticationScreen")).toBeTruthy();
  });

  //Test for main tabs when the user is logged in
  it("renders main tabs if user is logged in", async () => {
    const { getByTestId, getByText } = render(<App />);

    // Simulate successful login by clicking the loggin button
    const loginButton = getByText("Login");
    fireEvent.press(loginButton);

    // Home screen awaits for render after login
    await waitFor(() => {
      expect(getByTestId("HomeScreen")).toBeTruthy();
    });
  });

  // Tests the app being rendered and create a snapshot
  it("renders correctly and matches snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot(); // Ensure the snashot is equal to the exepcted output
  });
});
