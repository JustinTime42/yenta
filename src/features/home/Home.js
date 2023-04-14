import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Button, Portal } from "react-native-paper";
import { UserContext } from "../../contexts/user.context";
import VideoPlayer from "../../components/VideoPlayer";

import { REACT_APP_API_KEY } from "@env";
import { LoadingContext } from "../../contexts/loading.context";
import { PrimaryButton } from "../../components/buttons";
import ProfileEditor from "../profiles/ProfileEditor";
import { SafeArea } from "../../components/utility/SafeArea";
import ProfileEditorNavigator from "../../components/navigation/ProfileEditorNavigator";

const Home = (props) => {
  const { currentUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [showEditor, setShowEditor] = useState(false);
  const videoRef = useRef(null);

  return (
    <>
      {showEditor ? (
        <ProfileEditorNavigator />
      ) : (
        <View>
          <Text>Hello {currentUser.displayName} </Text>
          <PrimaryButton onPress={() => setShowEditor(true)}>
            Add Friend
          </PrimaryButton>
          <VideoPlayer src="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
        </View>
      )}
    </>
  );
};

export default Home;

//look at react-native-paper BottomNavigation for the basic navigation and routing
// Home, Settings, Messages
