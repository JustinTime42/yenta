import React from "react";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/theme";
import { UserProvider } from "./src/contexts/user.context";
import { SafeArea } from "./src/components/utility/SafeArea";
import { NavigationContainer } from "@react-navigation/native";
import NavContainer from "./src/components/navigation/NavContainer";
import { LoadingProvider } from "./src/contexts/loading.context";

const paperTheme = {
  ...DefaultTheme,
  // Specify custom property
  colors: theme.colors,
};

const App = () => {
  return (
    <UserProvider>
      <LoadingProvider>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <SafeArea>
              <ThemeProvider theme={theme}>
                <NavigationContainer>
                  <NavContainer />
                </NavigationContainer>
              </ThemeProvider>
            </SafeArea>
          </SafeAreaProvider>
        </PaperProvider>
      </LoadingProvider>
    </UserProvider>
  );
};

export default App;
