import React, { createContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firestore";

export const ProfileContext = createContext({
  currentProfile: null,
  setCurrentProfile: () => null,
});

export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const value = { currentProfile, setCurrentProfile };

  /*
    We are storing only the profileId in context. keep the rest in local component state
    while making a new profile. then when editing a profile, subscribe to the profile document
    so you can track changes as they happen

*/

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
