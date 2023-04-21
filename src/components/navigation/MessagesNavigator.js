import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { pubnub } from "../../services/message";
import { PubNubProvider } from "pubnub-react";

const Stack = createStackNavigator();

const MessagesNavigator = (profile, onSave) => {
  return (
    <PubNubProvider client={pubnub}>
      <Stack.Navigator>
        <Stack.Screen
          name="FirstName"
          component={FirstName}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Messages" component={Channels} />
        <Stack.Screen name="ProfileVideo" component={ProfileVideo} />
      </Stack.Navigator>
    </PubNubProvider>
  );
};

export default MessagesNavigator;
