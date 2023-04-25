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
import {
  createNewProfile,
  onSaveNewProfile,
  updateProfile,
} from "../profiles/utils";
import { ProfileContext } from "../../contexts/profile.context";

const Home = ({ navigation }) => {
  const { currentUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const { setCurrentProfile, currentProfile } = useContext(ProfileContext);
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
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (res) => {
        setProfiles(res.data().profiles);
      });
      return unsub;
    }
  }, [currentUser]);

  const showProfileEditor = async (profileId = null) => {
    let profile;
    console.log("profileID: ", profileId);
    if (!profileId) {
      console.log("no profile");
      profile = await createNewProfile(currentUser);
      console.log("profile ", profile);
      setCurrentProfile(profile);
      setShowEditor(true);
    } else {
      console.log("profile ", profile);
      profile = profileId;
    }
    setCurrentProfile(profile);
    setShowEditor(true);
  };

  const onSave = async (details, next) => {
    const profileDocId = await updateProfile(details);
    setCurrentProfile(profileDocId);
    navigation.navigate(next);
  };

  return (
    <>
      {showEditor ? (
        <ProfileEditor onSave={onSave} />
      ) : (
        <ScrollView style={{ height: "80%" }}>
          <Text>Hello {currentUser.displayName} </Text>
          <PrimaryButton onPress={() => showProfileEditor()}>Add Friend</PrimaryButton>
          {profiles?.map((profile, i) => {
            return (
              <ProfileCard
                navigation={navigation}
                profile={profile}
                key={i}
                showProfileEditor={showProfileEditor}
              />
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default Home;
