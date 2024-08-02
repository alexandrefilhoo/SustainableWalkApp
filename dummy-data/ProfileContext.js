/**
 * Code to create a contex for managingg user profile. Initilizes the state 
 * for the profile, and provide functions to updte the profile.
 */
import React, { createContext, useState, useContext } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {

  // Using useState hook initilize the state for the profile
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    university: "",
    degreeTitle: "",
    dob: "",
    phone: "",
    profileImage: null,
  });

  const [theme, setTheme] = useState("light");

  // Updates profile
  const updateProfile = (newProfile) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...newProfile }));
  };

  return (
    <ProfileContext.Provider
      value={{ profile,setProfile, updateProfile, theme, setTheme }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
