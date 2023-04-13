import React, { useContext, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { UserContext } from "../../contexts/user.context";
import VideoPlayer from "../../components/VideoPlayer"

import { REACT_APP_API_KEY } from "@env";
import { LoadingContext } from "../../contexts/loading.context";
import { PrimaryButton } from "../../components/buttons";

const Home = (props) => {
  const { currentUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const videoRef = useRef(null);

  return (
    <View>
      <Text>Hello {currentUser.displayName} </Text>
      <PrimaryButton onPress={() => console.log("adding")}>Add Friend</PrimaryButton>
      <VideoPlayer src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
    </View>
  );
};

export default Home;

//look at react-native-paper BottomNavigation for the basic navigation and routing
// Home, Settings, Messages

