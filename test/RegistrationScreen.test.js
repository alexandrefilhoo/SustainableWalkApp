import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import RegistrationScreen from "../screens/Authentication/RegistrationScreen";
import { useNavigation } from "@react-navigation/native";
import { useProfile } from "../dummy-data/ProfileContext";
import { useUser } from "../context/UserContext";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("../dummy-data/ProfileContext", () => ({
  useProfile: jest.fn(),
}));

jest.mock("../context/UserContext", () => ({
  useUser: jest.fn(),
}));

describe("RegistrationScreen", () => {
  const mockNavigate = jest.fn();
  const mockUpdateProfile = jest.fn();
  const mockRegisterUser = jest.fn();

  beforeEach(() => {
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });
    useProfile.mockReturnValue({
      updateProfile: mockUpdateProfile,
    });
    useUser.mockReturnValue({
      registerUser: mockRegisterUser,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component and displays initial fields", () => {
    const { getByPlaceholderText, getByText } = render(<RegistrationScreen />);
    expect(getByPlaceholderText("Name")).toBeTruthy();
    expect(getByPlaceholderText("Email")).toBeTruthy();
    expect(getByPlaceholderText("Degree Title")).toBeTruthy();
    expect(getByPlaceholderText("University")).toBeTruthy();
    expect(getByText("Next")).toBeTruthy();
  });

  it("displays error messages for empty required fields in step 1", async () => {
    const { getByText, getAllByText } = render(<RegistrationScreen />);
    fireEvent.press(getByText("Next"));
    await waitFor(() => {
      expect(getAllByText("This field is required")).toHaveLength(4);
    });
  });

  it("navigates to step 2 on valid input in step 1", () => {
    const { getByText, getByPlaceholderText } = render(<RegistrationScreen />);
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Degree Title"),
      "Computer Science"
    );
    fireEvent.changeText(getByPlaceholderText("University"), "XYZ University");
    fireEvent.press(getByText("Next"));
    expect(getByText("Date of Birth")).toBeTruthy();
  });

  it("displays error messages for empty required fields in step 2", async () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(
      <RegistrationScreen />
    );

    // Navigate to step 2
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Degree Title"),
      "Computer Science"
    );
    fireEvent.changeText(getByPlaceholderText("University"), "XYZ University");
    fireEvent.press(getByText("Next"));

    fireEvent.press(getByText("Next")); // Attempt to go to step 3 without filling step 2

    await waitFor(() => {
      expect(getAllByText("This field is required")).toHaveLength(2);
    });
  });

  it("navigates to step 3 on valid input in step 2", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <RegistrationScreen />
    );

    // Fill step 1
    fireEvent.changeText(getByPlaceholderText("Name"), "John Doe");
    fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
    fireEvent.changeText(
      getByPlaceholderText("Degree Title"),
      "Computer Science"
    );
    fireEvent.changeText(getByPlaceholderText("University"), "XYZ University");
    fireEvent.press(getByText("Next")); // Move to step 2

    // Ensure date is selected
    fireEvent.press(getByText("Select Date"));
    // Simulate date selection
    const datePicker = getByTestId("date-time-picker");
    fireEvent(datePicker, "onChange", {
      nativeEvent: { timestamp: new Date().getTime() },
    });

    // Fill step 2
    fireEvent.changeText(getByPlaceholderText("Phone Number"), "1234567890");
    fireEvent.press(getByText("Next")); // Attempt to move to step 3

    // Verify we have moved to step 3
    await waitFor(() => {
      expect(getByText("Upload your profile picture")).toBeTruthy();
    });
  });
});
