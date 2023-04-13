import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../features/account/Account";
import CameraScreen from "../camera/CameraScreen";
const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountSettings"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Camera" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
