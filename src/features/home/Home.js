import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button, Card, Portal } from "react-native-paper";
import { UserContext } from "../../contexts/user.context";
import VideoPlayer from "../../components/VideoPlayer";

import { REACT_APP_API_KEY } from "@env";
import { LoadingContext } from "../../contexts/loading.context";
import { PrimaryButton } from "../../components/buttons";
import ProfileEditor from "../profiles/ProfileEditor";
import { SafeArea } from "../../components/utility/SafeArea";
import ProfileEditorNavigator from "../../components/navigation/ProfileEditorNavigator";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firestore";
import ProfileCard from "./ProfileCard";

const Home = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [showEditor, setShowEditor] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      setShowEditor(false);
    });
    return unsub;
  }, [navigation]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        console.log(doc.data().profiles);
        setProfiles(doc.data().profiles);
      });
      return unsub;
    }
  }, [currentUser]);

  return (
    <>
      {showEditor ? (
        <ProfileEditorNavigator />
      ) : (
        <ScrollView style={{ height: "80%" }}>
          <Text>Hello {currentUser.displayName} </Text>
          <PrimaryButton onPress={() => setShowEditor(true)}>
            Add Friend
          </PrimaryButton>
          {profiles?.map((profile, i) => {
            return <ProfileCard profile={profile} key={i} />;
          })}
        </ScrollView>
      )}
    </>
  );
};

export default Home;
