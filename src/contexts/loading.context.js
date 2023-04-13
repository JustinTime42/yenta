import React, { createContext, useState } from "react";
import Loading from "../components/utility/Loading";

export const LoadingContext = createContext({
  isLoading: false,
  setIsLoading: () => null,
});

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const value = { isLoading, setIsLoading };

  return (
    <LoadingContext.Provider value={value}>
      {/* {isLoading && <Loading />} */}
      {children}
    </LoadingContext.Provider>
  );
};
