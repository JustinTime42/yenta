import { collection, limit, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Portal } from "react-native-paper";
import { db } from "../../services/firestore";
import VideoPlayer from "../../components/VideoPlayer";
import { Image, ScrollView } from "react-native";
import { PrimaryButton } from "../../components/buttons";
import { SafeArea } from "../../components/utility/SafeArea";
import MatchCard from "./MatchCard";

const Feed = ({ navigation, onClose }) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "profiles"), limit(10));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const profilesArray = [];
      querySnapshot.forEach((doc) => {
        profilesArray.push({ ...doc.data(), id: doc.id });
      });
      setProfiles(profilesArray);
    });
    return unsub;
  }, []);
  return (
    <Portal>
      <SafeArea>
        <PrimaryButton onPress={onClose}>exit</PrimaryButton>
        <ScrollView>
          {profiles.map((profile, i) => {
            return (
              <MatchCard
                navigation={navigation}
                key={i}
                profile={profile}
                onClose={onClose}
              />
            );
          })}
        </ScrollView>
      </SafeArea>
    </Portal>
  );
};

export default Feed;
