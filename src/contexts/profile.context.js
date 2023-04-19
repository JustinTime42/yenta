import React, { createContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firestore";

export const ProfileContext = createContext({
  currentProfile: {},
  setCurrentProfile: () => null,
});

export const ProfileProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const value = { currentProfile, setCurrentProfile };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
