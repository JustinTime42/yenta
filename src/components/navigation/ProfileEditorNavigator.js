import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from "../../features/account/Account";
import CameraScreen from "../camera/CameraScreen";
import FirstName from "../../features/profiles/FirstName";
import ProfilePicture from "../../features/profiles/ProfilePicture"
import ProfileVideo from "../../features/profiles/ProfileVideo";
const Stack = createStackNavigator();

const ProfileEditorNavigator = (profile, onSave) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstName"
        component={FirstName}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProfilePicture" component={ProfilePicture} />
      <Stack.Screen name="ProfileVideo" component={ProfileVideo} />
    </Stack.Navigator>
  );
};

export default ProfileEditorNavigator;
