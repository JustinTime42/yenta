import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../features/home/Home";
import Account from "../../features/account/Account";
import Login from "../../features/auth/Login";
import { UserContext } from "../../contexts/user.context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import AccountNavigator from "./AccountNavigator";
import ChatList from "../../features/messages/ChatList";
import ChatCard from "../../features/messages/ChatCard";
import MessagesNavigator from "./MessagesNavigator";

const SetIcon = ({ route }) => {
  const theme = useTheme();
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      switch (route.name) {
        case "Home":
          iconName = focused ? "home" : "home-outline";
          break;
        case "Messages":
          iconName = focused ? "mail" : "mail-outline";
          break;
        case "Account":
          iconName = focused ? "settings" : "settings-outline";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.secondary,
  };
};

const NavContainer = () => {
  const Tab = createBottomTabNavigator();
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return (
      <Tab.Navigator screenOptions={SetIcon}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen
          name="Messages"
          component={MessagesNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  } else {
    return <Login />;
  }
};

export default NavContainer;
