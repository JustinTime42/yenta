import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatList from "../../features/messages/ChatList";
import Chat from "../../features/messages/Chat";

const Stack = createStackNavigator();

const MessagesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat List"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MessagesNavigator;
